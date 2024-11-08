
import type { ClientOptions, AuthData, XPKitClient } from './types';
import { load, remove, save } from './services/storage';
import { Logger } from './services/logger';
import { setAccessToken } from './auth';

/**
 * Login to XPKit and setup the client.
 * @remarks
 * If access_token is provided in options, it will be used and client_id and client_secret will be ignored.
 *
 * @param {ClientOptions} options - Authentication and logging options
 * @param {boolean} flush - Flag to clear existing auth data (default: false)
 * @returns {Promise<XPKitClient>} - The client object
 *
 * @public
 */
export async function setup(options: ClientOptions, flush: boolean = false): Promise<XPKitClient> {
  const client: XPKitClient = { options: options };
  const logger = Logger.instance;
  logger.loggingEnabled = client.options.logging;
  if (flush) {
    logger.log('Clearing auth data');
    await remove('xpkit.auth');
  }
  if (options.auth.access_token) {
    logger.log('Saving provided access token. Ignoring client_id and client_secret');
    await save('xpkit.auth', {
      access_token: options.auth.access_token,
      expires: Date.now() + 35000 * 1000, // Slightly before the actual expiration
      base_url: client.options.base_url,
      client_id: '',
      client_secret: ''
    });
    return client;
  }

  const authData: AuthData = await load('xpkit.auth');
  if (authData && authData.expires) {
    if (Date.now() > authData.expires) {
      logger.log('Refreshing expired access token');
      await remove('xpkit.auth');
      await setAccessToken(client);
    } else {
      logger.log('Access token is still valid');
    }
  } else {
    logger.log('Requesting access token');
    await setAccessToken(client);
  }
  return client;
}