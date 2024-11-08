import type { GetResourcesRequest, GetQueryableResourcesRequest, XPKitResponse, XPKitResources, ErrorResponse, AuthResponse, XPKitResource, XPKitAcknowledgement, XPKitAcknowledgements, XPKitSummaryResponse } from '../types';
import { load, save } from './storage';
import { Logger } from './logger';
import { XPKitError } from '../errors';

export class Api {

  /**
   * Parse the API response.
   * @param {Response} response - The response from the API
   * @returns {Promise<XPKitResponse>} - The parsed response
   *
   * @throws XPKitError
   * Throws an error if an unexpected response is received from the API
   */
  async _parseApiResponse(response: Response): Promise<XPKitResponse> {
    let data: XPKitResponse;

    try {
      data = await response.json();
    } catch (error) {
      throw new XPKitError('Could not get resources', response.status, error.message);
    }

    if (!response.ok) {
      const errorResponse: XPKitResponse = data as ErrorResponse;
      const error = new XPKitError(errorResponse.error || 'Unknown error', response.status, JSON.stringify(errorResponse));
      throw error;
    }
    return data;
  }

  /**
   * Get an access token from the XPKit Auth API.
   * @param {string} clientId - The OAuth 2 client ID
   * @param {string} clientSecret - The OAuth 2 client secret
   * @param {string} baseUrl - The base URL for the API
   * @returns {Promise<AuthResponse>} - The access token
   */
  async getToken(clientId: string, clientSecret: string, baseUrl: string): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);

    const endpoint = `https://auth.${baseUrl}/api/token/`;

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'xpkit-js-sdk',
      }
    });

    return await this._parseApiResponse(response) as AuthResponse;
  }

  /**
   * Exchange an authorization code for an access token.
   * @param {string} code - The authorization code
   * @param {string} client_id - The OAuth 2 client ID
   * @param {string} redirectUrl - The redirect URL
   * @param {string} codeVerifier - The code verifier
   * @param {string} baseUrl - The base URL for the API
   * @returns {Promise<AuthResponse>} - The access token
   */
  async exchangeCodeForToken(code: string, client_id: string, redirectUrl: string, codeVerifier: string, baseUrl: string): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append('client_id', client_id);
    formData.append('redirect_uri', redirectUrl);
    formData.append('code_verifier', codeVerifier);

    const endpoint = `https://auth.${baseUrl}/api/token/`;

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'xpkit-js-sdk',
      }
    });

    return await this._parseApiResponse(response) as AuthResponse;
  }

  /**
   * Refresh the access token
   */
  async refreshToken(): Promise<void> {
    const auth = await load('xpkit.auth');
    if (auth.client_id && auth.client_secret && auth.base_url) {
      const accessToken = await this.getToken(auth.client_id, auth.client_secret, auth.base_url);
      if (accessToken) {
        await save('xpkit.auth', {
          access_token: accessToken.access_token,
          expires: Date.now() + 3500 * 1000, // Slightly before the actual expiration
          base_url: auth.base_url,
          client_id: auth.client_id,
          client_secret: auth.client_secret
        });
      }
    }
  }

  /**
   * Upload files to XPKit.
   * @param {string} endpoint - The endpoint for the API
   * @param {object} resource - The resource to upload
   * @param {boolean} retry - Flag to retry the request if it fails (default: true)
   * @returns {Promise<XPKitResponse>} - The response from the API
   */
  async uploadMultipart(endpoint: string, resource: object, retry: boolean = true): Promise<XPKitResponse> {
    const formData = new FormData();

    Object.keys(resource).forEach(key => {
      if (resource[key] instanceof File) {
        formData.append(key, resource[key], resource[key].name);
      } else {
        formData.append(key, resource[key]);
      }
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'xpkit-js-sdk',
        'Authorization': `Bearer ${(await load('xpkit.auth')).access_token}`
      }
    });

    try {
      return await this._parseApiResponse(response);
    } catch (error) {
      if (error instanceof XPKitError) {
        const authErrorCodes = [401, 403];
        if ((authErrorCodes.indexOf(error.code) > -1) && (retry)) {
          await this.refreshToken();
          return await this.uploadMultipart(endpoint, resource, false);
        }
      }
      throw error;
    }
  }

  /**
   * Call XPKit list endpoints with filter options.
   * @param {string} endpoint - The endpoint for the API
   * @param {GetResourcesRequest | GetQueryableResourcesRequest} options - The options for the request
   * @param {boolean} retry - Flag to retry the request if it fails (default: true)
   * @returns {Promise<XPKitResources>} - The resources from the API
   */
  async getResources(endpoint: string, options: GetResourcesRequest | GetQueryableResourcesRequest, retry: boolean = true): Promise<XPKitResources> {
    const logger = Logger.instance;
    const url = new URL(endpoint);
    Object.keys(options).forEach(key => {
      const value = (options[key] || '').toString();
      if (options[key] !== '') {
        url.searchParams.append(key, value);
      }
    });
    if (url.searchParams.size > 0) {
      logger.log(`Filter options: ${url.searchParams}`);
    }

    const response = await fetch(
      url.href,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'xpkit-js-sdk',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await load('xpkit.auth')).access_token}`
        }
      }
    );
    try {
      return await this._parseApiResponse(response) as XPKitResources;
    } catch (error) {
      if (error instanceof XPKitError) {
        const authErrorCodes = [401, 403];
        if ((authErrorCodes.indexOf(error.code) > -1) && (retry)) {
          await this.refreshToken();
          return await this.getResources(endpoint, options, false);
        }
      }
      throw error;
    }
  }

  /**
   * Get an individual resource from XPKit.
   * @param {string} endpoint - The endpoint for the API
   * @param {string} method - The HTTP method to use
   * @param {object} resource - The resource to send
   * @param {object} additionalHeaders - Additional HTTP headers to send
   * @param {boolean} retry - Flag to retry the request if it fails (default: true)
   * @returns {Promise<XPKitResponse>} - The resource from the API
   */
  async _getResource(
    endpoint: string,
    method: string,
    resource: object = {},
    additionalHeaders: object = {},
    retry: boolean = true
  ): Promise<XPKitResponse> {
    const url = new URL(endpoint);

    const requestOptions = {
      method: method,
      headers: {
        'User-Agent': 'xpkit-js-sdk',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await load('xpkit.auth')).access_token}`,
        ...additionalHeaders
      }
    };

    if (Object.keys(resource).length > 0) {
      requestOptions['body'] = JSON.stringify(resource);
    }

    const response = await fetch(url.href, requestOptions);
    try {
      return await this._parseApiResponse(response);
    } catch (error) {
      if (error instanceof XPKitError) {
        const authErrorCodes = [401, 403];
        if ((authErrorCodes.indexOf(error.code) > -1) && (retry)) {
          await this.refreshToken();
          return await this._getResource(endpoint, method, resource, additionalHeaders, false);
        }
      }
      throw error;
    }
  }

  /**
   * Wrapper function for calling an XPKit resource.
   * @param {string} endpoint - The endpoint for the API
   * @param {string} method - The HTTP method to use
   * @param {object} resource - The resource to send
   * @param {object} additionalHeaders - Additional HTTP headers to send
   * @param {boolean} retry - Flag to retry the request if it fails (default: true)
   * @returns {Promise<XPKitResource>} - The resource from the API
   */
  async callResource(
    endpoint: string,
    method: string,
    resource: object = {},
    additionalHeaders: object = {},
    retry: boolean = true
  ): Promise<XPKitResource> {
    return await this._getResource(endpoint, method, resource, additionalHeaders, retry) as XPKitResource;
  }

  /**
   * Wrapper function for calling an XPKit summary.
   * @param {string} endpoint - The endpoint for the API
   * @param {string} method - The HTTP method to use
   * @param {object} resource - The resource to send
   * @param {object} additionalHeaders - Additional HTTP headers to send
   * @param {boolean} retry - Flag to retry the request if it fails (default: true)
   * @returns {Promise<XPKitSummaryResponse>} - The resource from the API
   */
  async callSummary(
    endpoint: string,
    method: string,
    resource: object = {},
    additionalHeaders: object = {},
    retry: boolean = true
  ): Promise<XPKitSummaryResponse> {
    return await this._getResource(endpoint, method, resource, additionalHeaders, retry) as XPKitSummaryResponse;
  }

  /**
   * Wrapper function for triggering an async XPKit task.
   * @param {string} endpoint - The endpoint for the API
   * @param {string} method - The HTTP method to use
   * @param {object} resource - The resource to send
   * @param {object} additionalHeaders - Additional HTTP headers to send
   * @param {boolean} retry - Flag to retry the request if it fails (default: true)
   * @returns {Promise<XPKitAcknowledgement>} - An acknowledgement of the task
   */
  async callAsyncRequest(
    endpoint: string,
    method: string,
    resource: object = {},
    additionalHeaders: object = {},
    retry: boolean = true
  ): Promise<XPKitAcknowledgement> {
    return await this._getResource(endpoint, method, resource, additionalHeaders, retry) as XPKitAcknowledgement;
  }

  /**
   * Wrapper function for triggering an async XPKit task.
   * @param {string} endpoint - The endpoint for the API
   * @param {string} method - The HTTP method to use
   * @param {object} resource - The resource to send
   * @param {object} additionalHeaders - Additional HTTP headers to send
   * @param {boolean} retry - Flag to retry the request if it fails (default: true)
   * @returns {Promise<XPKitAcknowledgements>} - An acknowledgement of the task
   */
  async callAsyncRequests(
    endpoint: string,
    method: string,
    resource: object = {},
    additionalHeaders: object = {},
    retry: boolean = true
  ): Promise<XPKitAcknowledgements> {
    return await this._getResource(endpoint, method, resource, additionalHeaders, retry) as XPKitAcknowledgements;
  }

  /**
   * Delete an XPKit resource.
   * @param {string} endpoint - The endpoint for the API
   * @param {object} resource - The resource to create
   * @param {object} additionalHeaders - Additional HTTP headers to send
   * @param {boolean} retry - Flag to retry the request if it fails (default: true)
   * @returns {Promise<boolean>} whether the resource was deleted
   */
  async deleteResource(
    endpoint: string,
    resource: object = {},
    additionalHeaders: object = {},
    retry: boolean = true
  ): Promise<boolean> {
    const url = new URL(endpoint);

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'User-Agent': 'xpkit-js-sdk',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await load('xpkit.auth')).access_token}`,
        ...additionalHeaders
      }
    };

    if (Object.keys(resource).length > 0) {
      requestOptions['body'] = JSON.stringify(resource);
    }

    const response = await fetch(url.href, requestOptions);
    if (response.status === 204) {
      return true;
    }
    const authErrorCodes = [401, 403];
    if (authErrorCodes.indexOf(response.status) > -1) {
      if (retry) {
        await this.refreshToken();
        return await this.deleteResource(endpoint, resource, additionalHeaders, false);
      } else {
        throw new XPKitError('Authentication error', response.status, JSON.stringify(response));
      }
    }
    throw new XPKitError('Unexpected API response', response.status, JSON.stringify(response));
  }

  /**
   * Download a resource (file) from XPKit.
   * @param {string} endpoint - The endpoint for the API
   * @param {string} method - The HTTP method to use
   * @param {object} body - The body to send
   * @param {object} options - The options for the request
   * @param {object} additionalHeaders - Additional HTTP headers to send
   * @param {string} fileType - The type of file to download (default: 'text/text')
   * @param {boolean} retry - Flag to retry the request if it fails (default: true)
   * @returns {Promise<string | Blob>} the resource from the API
   */
  async downloadResource(
    endpoint: string,
    method: string,
    body: object = {},
    options: object = {},
    additionalHeaders: object = {},
    fileType: string = 'text/text',
    retry: boolean = true
  ): Promise<string | Blob> {
    const logger = Logger.instance;
    const url = new URL(endpoint);

    if (Object.keys(options).length > 0) {
      Object.keys(options).forEach(key => url.searchParams.append(key, options[key]));
      logger.log(`Options: ${url.searchParams}`);
    }

    const requestOptions = {
      method: method,
      headers: {
        'User-Agent': 'xpkit-js-sdk',
        'Authorization': `Bearer ${(await load('xpkit.auth')).access_token}`,
        ...additionalHeaders
      }
    };

    if (Object.keys(body).length > 0) {
      requestOptions['body'] = JSON.stringify(body);
    }

    const response = await fetch(url.href, requestOptions);

    let data: string | Blob;
    try {
      try {
        if (fileType.startsWith('text')) {
          data = await response.text();
        }
        else {
          data = await response.blob();
        }
      } catch (error) {
        throw new XPKitError('Could not download resource', response.status, error.message);
      }

      if (!response.ok) {
        const error = new XPKitError('Download error', response.status, data.toString());
        throw error;
      }
      return data;
    } catch (error) {
      if (error instanceof XPKitError) {
        const authErrorCodes = [401, 403];
        if ((authErrorCodes.indexOf(error.code) > -1) && (retry)) {
          await this.refreshToken();
          return await this.downloadResource(endpoint, method, body, options, additionalHeaders, fileType, false);
        }
      }
      throw error;
    }
  }
}
