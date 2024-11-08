export type ClientOptions = {
  auth: {
    client_id: string,
    client_secret: string,
    access_token?: string
  },
  base_url: string,
  logging: boolean
};

export type XPKitClient = {
  options: ClientOptions,
};

export type AuthData = {
  access_token?: string,
  client_id?: string,
  client_secret?: string,
  expires?: number,
  base_url?: string,
  code_verifier?: string,
  state?: string,
};

export type UserSsoProviderOptions = 'apple' | 'facebook' | 'google' | 'linkedin' | 'microsoft' | 'xpkit';

export type UserSsoUrls = {
  [K in UserSsoProviderOptions]?: string
};