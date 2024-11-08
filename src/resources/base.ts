import { Api } from '../services/api';
import { Logger } from '../services/logger';
import type { XPKitClient } from '../types';

export class BaseResource {
  logger: Logger;
  api: Api;
  baseUrl: string;
  client: XPKitClient;

  constructor(client: XPKitClient) {
    this.logger = Logger.instance;
    this.api = new Api();
    if (!client) {
      throw new Error('Client is required');
    }
    this.client = client;
    this.baseUrl = client.options.base_url;
  }
}