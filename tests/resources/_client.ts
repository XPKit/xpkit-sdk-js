import { ClientOptions, XPKitClient } from '../../src/types';


const options: ClientOptions = {
  base_url: 'https://example.com',
  auth: {
    client_id: 'client_id',
    client_secret: 'client_secret'
  },
  logging: false
};
export const client: XPKitClient = { options: options };