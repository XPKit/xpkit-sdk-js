import type { XPKitClient, UserSsoProviderOptions, UserSsoUrls, AuthResponse, ClientOptions } from './types';
import { save, load, remove } from './services/storage';
import { Auth } from './resources/auth';
import { Logger } from './services/logger';
import pkceChallenge from 'pkce-challenge';
import { Api } from './services/api';

/**
 * Save an access token to local storage.
 * @param {XPKitClient} client - XPKit client containing authentication and logging options
 *
 * @throws Error
 * Throws Error if the access token cannot be retrieved from XPKit
 */
export async function setAccessToken(client: XPKitClient): Promise<void> {
  const logger = Logger.instance;
  const accessToken = await new Auth(client).requestToken(client.options.auth.client_id, client.options.auth.client_secret, client.options.base_url).catch((err) => {
    throw new Error(`Failed to get access token from XPKit. ${err}`);
  });
  if (accessToken) {
    logger.log('Saving access token');
    await save('xpkit.auth', {
      access_token: accessToken.access_token,
      expires: Date.now() + 35000 * 1000, // Slightly before the actual expiration
      base_url: client.options.base_url,
      client_id: client.options.auth.client_id,
      client_secret: client.options.auth.client_secret
    });
  }
};

/**
 * Generate login URL for the chosen SSO provider
 * @param {ClientOptions} clientOptions - XPKit client options.
 * @param {UserSsoProviderOptions} providers - The SSO providers to use.
 * @param {string} redirectUrl - The URL to redirect to after login.
 * @returns {Promise<UserSsoUrls>} - The generated login URLs.
 */
export async function generateLoginUrls(clientOptions: ClientOptions, providers: UserSsoProviderOptions[], redirectUrl: string): Promise<UserSsoUrls> {
  const { code_verifier, code_challenge } = await pkceChallenge();
  const state = crypto.randomUUID();

  await save('xpkit.sso', {
    code_verifier: code_verifier,
    state: state
  });

  const urls: UserSsoUrls = {};

  for (const provider of providers) {
    urls[provider] = `https://auth.${clientOptions.base_url}/authorize/?response_type=code&provider=${provider}&client_id=${clientOptions.auth.client_id}&state=${state}&code_challenge=${code_challenge}&code_challenge_method=S256&redirect_uri=${redirectUrl}`;
  }

  return urls;
}

/**
 * Exchange authorization code for an access token
 * @param {ClientOptions} clientOptions - XPKit client options.
 * @param {string} code - The code to exchange.
 * @param {string} state - The state to validate.
 * @param {string} redirectUrl - The URL to redirect to after login.
 * @returns {Promise<AuthResponse>} - The response containing the access token.
 */
export async function exchangeCodeForToken(clientOptions: ClientOptions, code: string, state: string, redirectUrl: string): Promise<AuthResponse> {
  const authData = await load('xpkit.sso');
  const codeVerifier = authData.code_verifier ?? '';
  const savedState = authData.state ?? '';

  if (state !== savedState || code === '') {
    throw new Error('Invalid state or code');
  }

  const api = new Api();
  const logger = Logger.instance;
  logger.log(`Calling exchangeCodeForToken at https://auth.${clientOptions.base_url}/api/token`);
  const response = await api.exchangeCodeForToken(code, clientOptions.auth.client_id, redirectUrl, codeVerifier, clientOptions.base_url);
  await remove('xpkit.sso');
  return response;
};