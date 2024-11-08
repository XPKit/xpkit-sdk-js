import { expect, test, vi, beforeEach } from 'vitest';
import { setup } from '../src/setup';
import type { AuthData, AuthResponse, ClientOptions, XPKitClient } from '../src/types';
import { save, remove } from '../src/services/storage';
import { Logger } from '../src/services/logger';
import { setAccessToken } from '../src/auth';


const mocks = vi.hoisted(() => {
  return {
    load: vi.fn(
      () => {
        return new Promise<AuthData>(
          (resolve, reject) => {
            resolve(
              { client_id: 'client_id', client_secret: 'client_secret', base_url: 'base_url', access_token: 'access_token', expires: 8000000000000 }
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
  vi.mock('../src/auth', () => {
    return {
      setAccessToken: vi.fn(),
    };
  });
});

test('setup flushes when requested', async () => {
  const options: ClientOptions = {
    base_url: 'https://example.com',
    auth: {
      client_id: 'client_id',
      client_secret: 'client_secret'
    },
    logging: false
  };

  const authData: AuthResponse = {
    token_type: 'Bearer',
    scope: 'profiles:read',
    expires_in: 36000,
    access_token: 'access_token',
  };

  await setup(options, true);
  expect(remove).toHaveBeenCalledWith('xpkit.auth');

});

test('setup sets logging option correctly', async () => {
  const options: ClientOptions = {
    base_url: 'https://example.com',
    auth: {
      client_id: 'client_id',
      client_secret: 'client_secret'
    },
    logging: true
  };
  await setup(options, false);
  const logger = Logger.instance;
  expect(logger.loggingEnabled).toBe(true);

  options['logging'] = false;
  await setup(options, false);
  expect(logger.loggingEnabled).toBe(false);
});

test('setup sets access token when provided explicitly', async () => {
  const options: ClientOptions = {
    base_url: 'https://example.com',
    auth: {
      client_id: 'client_id',
      client_secret: 'client_secret',
      access_token: 'access_token'
    },
    logging: false
  };
  await setup(options, false);
  expect(save).toHaveBeenCalledWith('xpkit.auth', {
    access_token: 'access_token',
    expires: expect.any(Number),
    base_url: 'https://example.com',
    client_id: '',
    client_secret: ''
  });
});

test('token is removed upon expiry', async () => {
  const options: ClientOptions = {
    base_url: 'https://example.com',
    auth: {
      client_id: 'client_id',
      client_secret: 'client_secret'
    },
    logging: false
  };
  const client: XPKitClient = { options: options };

  mocks.load.mockImplementation(
    () => {
      return new Promise<AuthData>(
        (resolve, reject) => {
          resolve(
            { client_id: 'client_id', client_secret: 'client_secret', base_url: 'base_url', access_token: 'access_token', expires: 10 }
          );
        }
      );
    }
  );

  await setup(options, false);
  expect(remove).toHaveBeenCalledWith('xpkit.auth');
  expect(setAccessToken).toHaveBeenCalledWith(client);

});


test('setup recovers from corrupt local data', async () => {
  const options: ClientOptions = {
    base_url: 'https://example.com',
    auth: {
      client_id: 'client_id',
      client_secret: 'client_secret'
    },
    logging: false
  };
  const client: XPKitClient = { options: options };

  mocks.load.mockImplementation(
    () => {
      return new Promise<AuthData>(
        (resolve, reject) => {
          resolve(
            { client_id: 'client_id', client_secret: 'client_secret', base_url: 'base_url', access_token: 'access_token', expires: 0 }
          );
        }
      );
    }
  );

  await setup(options, false);
  expect(setAccessToken).toHaveBeenCalledWith(client);

});
