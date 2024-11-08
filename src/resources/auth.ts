import { BaseResource } from './base';
import type { AuthResponse } from '../types';

export class Auth extends BaseResource {

  /**
   * Request a token
   * @param {string} clientId - The client ID
   * @param {string} clientSecret - The client secret
   * @param {string} baseUrl - The base URL
   * @returns {Promise<AuthResponse>} - The authentication response
   *
   * @public
   */
  async requestToken(clientId: string, clientSecret: string, baseUrl: string): Promise<AuthResponse> {
    return await this.api.getToken(clientId, clientSecret, baseUrl);
  }

}