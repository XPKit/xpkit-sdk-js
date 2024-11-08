import { expect, test, vi, beforeEach } from 'vitest';
import type { AuthData, AuthResponse, ClientOptions, XPKitClient, UserSsoUrls } from '../src/types';
import { save, remove } from '../src/services/storage';
import { Auth } from '../src/resources/auth';
import { setAccessToken, generateLoginUrls, exchangeCodeForToken } from '../src/auth';
import { Api } from '../src/services/api';
import pkceChallenge from 'pkce-challenge';


const mocks = vi.hoisted(() => {
  return {
    load: vi.fn(
      () => {
        return new Promise<AuthData>(
          (resolve, reject) => {
            resolve(
              { code_verifier: 'code_verifier', state: 'state' }
            );
          }
        );
      }
    ),
    remove: vi.fn(),
    save: vi.fn(),
  };
});


beforeEach(async () => {
  vi.mock('../src/services/storage', () => {
    return {
      load: mocks.load,
      remove: mocks.remove,
      save: mocks.save
    };
  });
  vi.mock(import('pkce-challenge'), async (importOriginal) => {
    const actual = await importOriginal();
    const mocked = {};
    for (const key of Object.keys(actual)) {
      if (typeof actual[key] === 'function') {
        if (actual[key].name === 'pkceChallenge') {
          mocked[key] = vi.fn(() => { return { code_verifier: 'code_verifier', code_challenge: 'code_challenge' }; });
        } else {
          mocked[key] = vi.fn(actual[key]);
        }
      } else {
        mocked[key] = actual[key];
      }
    }
    return mocked;
  });
});

test('setAccessToken saves token locally', async () => {
  const authData: AuthResponse = {
    token_type: 'Bearer',
    scope: 'profiles:read',
    expires_in: 36000,
    access_token: 'access_token',
  };

  const options: ClientOptions = {
    base_url: 'https://example.com',
    auth: {
      client_id: 'client_id',
      client_secret: 'client_secret'
    },
    logging: false
  };
  const client: XPKitClient = { options: options };


  const requestTokenSpy = vi.spyOn(Auth.prototype, 'requestToken').mockImplementation(() => { return new Promise<AuthResponse>((resolve, reject) => { resolve(authData); }); });

  await setAccessToken(client);
  expect(requestTokenSpy).toHaveBeenCalledWith('client_id', 'client_secret', 'https://example.com');
  expect(save).toHaveBeenCalledWith('xpkit.auth', {
    access_token: 'access_token',
    expires: expect.any(Number),
    base_url: 'https://example.com',
    client_id: 'client_id',
    client_secret: 'client_secret'
  });
});

test('setAccessToken throws error on failure', async () => {
  const options: ClientOptions = {
    base_url: 'https://example.com',
    auth: {
      client_id: 'client_id',
      client_secret: 'client_secret'
    },
    logging: false
  };
  const client: XPKitClient = { options: options };


  vi.spyOn(Auth.prototype, 'requestToken').mockImplementation(() => { return new Promise<AuthResponse>((resolve, reject) => { reject('Unknown'); }); });

  expect(async () => await setAccessToken(client)).rejects.toThrowError('Failed to get access token from XPKit. Unknown');
});

test('generateLoginUrls generates correct login URLs', async () => {
  const clientOptions: ClientOptions = {
    base_url: 'example.com',
    auth: {
      client_id: 'abc123',
      client_secret: ''
    },
    logging: false
  };

  const result = await generateLoginUrls(clientOptions, ['google', 'xpkit'], 'http://testing.com/callback');
  expect(save).toHaveBeenCalledWith('xpkit.sso', { code_verifier: 'code_verifier', state: expect.any(String) });
  expect(pkceChallenge).toHaveBeenCalled();
  expect(result).toMatchObject<UserSsoUrls>({});
  expect(Object.keys(result).includes('google')).toBe(true);
  expect(Object.keys(result).includes('xpkit')).toBe(true);
});

test('exchangeCodeForToken throws error on invalid state', async () => {
  const clientOptions: ClientOptions = {
    base_url: 'example.com',
    auth: {
      client_id: 'abc123',
      client_secret: ''
    },
    logging: false
  };

  expect(
    async () => await exchangeCodeForToken(clientOptions, 'code-123', 'stateMismatch', 'http://testing.com/callback')
  ).rejects.toThrowError('Invalid state or code');
});

test('exchangeCodeForToken sets blank vars on storage error', async () => {
  const clientOptions: ClientOptions = {
    base_url: 'example.com',
    auth: {
      client_id: 'abc123',
      client_secret: ''
    },
    logging: false
  };

  mocks.load.mockImplementation(
    () => {
      return new Promise<AuthData>(
        (resolve, reject) => {
          resolve(
            { code_verifier: 'code_verifier' }
          );
        }
      );
    }
  );

  const apiSpy = vi.spyOn(Api.prototype, 'exchangeCodeForToken').mockResolvedValue({
    token_type: 'Bearer',
    scope: 'profiles:read',
    expires_in: 36000,
    access_token: 'access_token',
  });

  await exchangeCodeForToken(clientOptions, 'code-123', '', 'http://testing.com/callback');
  expect(apiSpy).toHaveBeenCalledWith('code-123', 'abc123', 'http://testing.com/callback', 'code_verifier', 'example.com');
  expect(remove).toHaveBeenCalledWith('xpkit.sso');
});

test('exchangeCodeForToken makes correct API request', async () => {
  const clientOptions: ClientOptions = {
    base_url: 'example.com',
    auth: {
      client_id: 'abc123',
      client_secret: ''
    },
    logging: false
  };

  const apiSpy = vi.spyOn(Api.prototype, 'exchangeCodeForToken').mockResolvedValue({
    token_type: 'Bearer',
    scope: 'profiles:read',
    expires_in: 36000,
    access_token: 'access_token',
  });

  await exchangeCodeForToken(clientOptions, 'code-123', 'state', 'http://testing.com/callback');
  expect(apiSpy).toHaveBeenCalledWith('code-123', 'abc123', 'http://testing.com/callback', 'code_verifier', 'example.com');
  expect(remove).toHaveBeenCalledWith('xpkit.sso');
});