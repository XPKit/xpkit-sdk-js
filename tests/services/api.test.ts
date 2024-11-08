import { expect, test, vi, beforeAll, beforeEach } from 'vitest';
import { Api } from '../../src/services/api';
import { load, save } from '../../src/services/storage';
import type { AuthData, AuthResponse } from '../../src/types';

beforeEach(() => {
  global.fetch = vi.fn();
});

beforeAll(async () => {
  vi.mock('../../src/services/storage', () => {
    return {
      load: vi.fn(
        () => {
          return new Promise<AuthData>(
            (resolve, reject) => {
              resolve(
                { client_id: 'client_id', client_secret: 'client_secret', base_url: 'base_url', access_token: 'access_token' }
              );
            }
          );
        }
      ),
      save: vi.fn()
    };
  });
});

test('parseApiResponse returns XPKitResponse', async () => {
  const response = new Response();

  response.json = vi.fn(() => { return new Promise((resolve, reject) => { resolve({ resource: {}, resource_url: '', resource_id: '' }); }); });
  const result = await new Api()._parseApiResponse(response);

  expect(result).toEqual({ resource: {}, resource_url: '', resource_id: '' });
});

test('parseApiResponse throws errors', async () => {
  let response = new Response();
  response.json = vi.fn(
    () => {
      return new Promise(
        (resolve, reject) => {
          reject(
            () => {
              throw new Error('API call failed');
            }
          );
        }
      );
    }
  );

  expect(async () => await new Api()._parseApiResponse(response)).rejects.toThrowError('Could not get resources');

  response = Response.error();
  response.json = vi.fn(() => { return new Promise((resolve, reject) => { resolve({ error: 'Authentication error' }); }); });

  expect(async () => await new Api()._parseApiResponse(response)).rejects.toThrowError('Authentication error');
});

test('getToken returns a token', async () => {
  const apiService = new Api();
  apiService._parseApiResponse = vi.fn();

  const fdSpy = vi.spyOn(FormData.prototype, 'append');
  const fetchSpy = vi.spyOn(global, 'fetch');

  const formData = new FormData();
  formData.append('grant_type', 'client_credentials');
  formData.append('client_id', 'client_id');
  formData.append('client_secret', 'client_secret');

  await apiService.getToken('client_id', 'client_secret', 'base_url');
  expect(fdSpy).toHaveBeenCalledWith('grant_type', 'client_credentials');
  expect(fdSpy).toHaveBeenCalledWith('client_id', 'client_id');
  expect(fdSpy).toHaveBeenCalledWith('client_secret', 'client_secret');
  expect(fetchSpy).toHaveBeenCalledWith(
    'https://auth.base_url/api/token/',
    {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'xpkit-js-sdk',
      }
    }
  );
});

test('exchangeCodeForToken returns a token', async () => {
  const apiService = new Api();
  apiService._parseApiResponse = vi.fn();

  const fdSpy = vi.spyOn(FormData.prototype, 'append');
  const fetchSpy = vi.spyOn(global, 'fetch');

  const formData = new FormData();
  formData.append('grant_type', 'authorization_code');
  formData.append('code', 'abc123');
  formData.append('client_id', 'client_id');
  formData.append('redirect_uri', 'http://example.com/callback');
  formData.append('code_verifier', 'xyz456');

  await apiService.exchangeCodeForToken('abc123', 'client_id', 'http://example.com/callback', 'xyz456', 'base_url');
  expect(fdSpy).toHaveBeenCalledWith('grant_type', 'authorization_code');
  expect(fdSpy).toHaveBeenCalledWith('code', 'abc123');
  expect(fdSpy).toHaveBeenCalledWith('client_id', 'client_id');
  expect(fdSpy).toHaveBeenCalledWith('redirect_uri', 'http://example.com/callback');
  expect(fdSpy).toHaveBeenCalledWith('code_verifier', 'xyz456');
  expect(fetchSpy).toHaveBeenCalledWith(
    'https://auth.base_url/api/token/',
    {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'xpkit-js-sdk',
      }
    }
  );
});

test('refreshToken saves token in storage', async () => {
  const apiService = new Api();

  const authData: AuthResponse = {
    token_type: 'Bearer',
    scope: 'profiles:read',
    expires_in: 36000,
    access_token: 'access_token',
  };

  apiService.getToken = vi.fn(() => { return new Promise<AuthResponse>((resolve, reject) => { resolve(authData); }); });

  await apiService.refreshToken();
  expect(load).toHaveBeenCalledWith('xpkit.auth');
  expect(save).toHaveBeenCalled();

});

test('uploadMultipart uploads both text and blobs', async () => {
  const obj = { hello: 'world' };
  const file = new File([JSON.stringify(obj, null, 2)], 'blob.json');
  const resource = {
    'text_field': 'Hello World',
    'blob_field': file,
  };

  const apiService = new Api();
  apiService._parseApiResponse = vi.fn();

  const formData = new FormData();
  formData.append('text_field', 'Hello World');
  formData.append('blob_field', file, 'blob.json');

  await apiService.uploadMultipart('https://api.example.com', resource);
  expect(fetch).toHaveBeenCalledWith(
    'https://api.example.com',
    {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'xpkit-js-sdk',
        'Authorization': 'Bearer access_token'
      }
    }
  );
});

test('getResources filters correctly', async () => {
  const apiService = new Api();
  apiService._parseApiResponse = vi.fn();

  const fetchSpy = vi.spyOn(global, 'fetch');
  const url = 'https://api.example.com';
  const options = { 'filter': 'value', 'number__gte': 10, 'x__query': 'fts' };

  await apiService.getResources(url, options);
  expect(fetchSpy).toHaveBeenCalledWith(
    'https://api.example.com/?filter=value&number__gte=10&x__query=fts',
    {
      method: 'GET',
      headers: {
        'User-Agent': 'xpkit-js-sdk',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer access_token'
      }
    }
  );
});

test('getResource uses correct method', async () => {
  const apiService = new Api();
  apiService._parseApiResponse = vi.fn();

  const fetchSpy = vi.spyOn(global, 'fetch');
  const url = 'https://api.example.com';

  await apiService._getResource(url, 'POST', { 'resource': 'data' }, { 'X-NewHeader': '123' });
  expect(fetchSpy).toHaveBeenCalledWith(
    'https://api.example.com/',
    {
      method: 'POST',
      headers: {
        'User-Agent': 'xpkit-js-sdk',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer access_token',
        'X-NewHeader': '123'
      },
      body: '{"resource":"data"}'
    }
  );
});

test('callResource proxies call to _getResponse', async () => {
  const apiService = new Api();
  apiService._parseApiResponse = vi.fn();
  apiService._getResource = vi.fn();

  const getResourceSpy = vi.spyOn(apiService, '_getResource');
  const url = 'https://api.example.com';

  await apiService.callResource(url, 'POST', { 'resource': 'data' }, { 'X-NewHeader': '123' });
  expect(getResourceSpy).toHaveBeenCalledWith(
    'https://api.example.com',
    'POST',
    { 'resource': 'data' },
    { 'X-NewHeader': '123' },
    true
  );
});

test('callAsyncRequest proxies call to _getResponse', async () => {
  const apiService = new Api();
  apiService._parseApiResponse = vi.fn();
  apiService._getResource = vi.fn();

  const getResourceSpy = vi.spyOn(apiService, '_getResource');
  const url = 'https://api.example.com';

  await apiService.callAsyncRequest(url, 'POST', { 'resource': 'data' }, { 'X-NewHeader': '123' });
  expect(getResourceSpy).toHaveBeenCalledWith(
    'https://api.example.com',
    'POST',
    { 'resource': 'data' },
    { 'X-NewHeader': '123' },
    true
  );
});

test('callAsyncRequests proxies call to _getResponse', async () => {
  const apiService = new Api();
  apiService._parseApiResponse = vi.fn();
  apiService._getResource = vi.fn();

  const getResourceSpy = vi.spyOn(apiService, '_getResource');
  const url = 'https://api.example.com';

  await apiService.callAsyncRequests(url, 'POST', { 'resource': 'data' }, { 'X-NewHeader': '123' });
  expect(getResourceSpy).toHaveBeenCalledWith(
    'https://api.example.com',
    'POST',
    { 'resource': 'data' },
    { 'X-NewHeader': '123' },
    true
  );
});

test('deleteResource handles response codes appropriately', async () => {
  const apiService = new Api();
  apiService._parseApiResponse = vi.fn();
  global.fetch = vi.fn(() => { return new Promise<Response>((resolve, reject) => { resolve(new Response(null, { status: 204 })); }); });

  const fetchSpy = vi.spyOn(global, 'fetch');
  const url = 'https://api.example.com';

  const result = await apiService.deleteResource(url, { 'resource': 'data' }, { 'X-NewHeader': '123' });
  expect(result).toBe(true);
  expect(fetchSpy).toHaveBeenCalledWith(
    'https://api.example.com/',
    {
      method: 'DELETE',
      headers: {
        'User-Agent': 'xpkit-js-sdk',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer access_token',
        'X-NewHeader': '123'
      },
      body: '{"resource":"data"}'
    }
  );

  global.fetch = vi.fn(() => { return new Promise<Response>((resolve, reject) => { resolve(new Response(null, { status: 500 })); }); });
  expect(async () => await apiService.deleteResource(url, { 'resource': 'data' }, { 'X-NewHeader': '123' })).rejects.toThrowError('Unexpected API response');
});

test('downloadResource downloads multiple file types', async () => {
  const apiService = new Api();
  apiService._parseApiResponse = vi.fn();
  const url = 'https://api.example.com';

  const resp = new Response(null, { status: 200 });
  resp.text = vi.fn(() => { return new Promise<string>((resolve, reject) => { resolve('Hello World'); }); });
  resp.blob = vi.fn(() => { return new Promise<Blob>((resolve, reject) => { resolve(new Blob(['Hello World'])); }); });
  global.fetch = vi.fn(() => { return new Promise<Response>((resolve, reject) => { resolve(resp); }); });

  const responseTextSpy = vi.spyOn(resp, 'text');
  const responseBlobSpy = vi.spyOn(resp, 'blob');
  const fetchSpy = vi.spyOn(global, 'fetch');

  await apiService.downloadResource(url, 'GET', { 'resource': 'data' }, { 'key': 'value' }, { 'X-NewHeader': '123' }, 'text/text');
  expect(fetchSpy).toHaveBeenCalledWith(
    'https://api.example.com/?key=value',
    {
      method: 'GET',
      headers: {
        'User-Agent': 'xpkit-js-sdk',
        'Authorization': 'Bearer access_token',
        'X-NewHeader': '123'
      },
      body: '{"resource":"data"}'
    }
  );
  expect(responseTextSpy).toHaveBeenCalledOnce();
  expect(responseBlobSpy).toHaveBeenCalledTimes(0);

  await apiService.downloadResource(url, 'GET', { 'resource': 'data' }, { 'key': 'value' }, { 'X-NewHeader': '123' }, 'image/png');
  expect(fetchSpy).toHaveBeenCalledWith(
    'https://api.example.com/?key=value',
    {
      method: 'GET',
      headers: {
        'User-Agent': 'xpkit-js-sdk',
        'Authorization': 'Bearer access_token',
        'X-NewHeader': '123'
      },
      body: '{"resource":"data"}'
    }
  );
  expect(responseTextSpy).toHaveBeenCalledOnce();
  expect(responseBlobSpy).toHaveBeenCalledOnce();

  resp.text = vi.fn(() => { return new Promise<string>((resolve, reject) => { reject(() => { throw ('Error!'); }); }); });

  await expect(async () => await apiService.downloadResource(url, 'GET', { 'resource': 'data' }, { 'key': 'value' }, { 'X-NewHeader': '123' }, 'text/text')).rejects.toThrowError('Could not download resource');

  global.fetch = vi.fn(() => { return new Promise<Response>((resolve, reject) => { resolve(new Response(null, { status: 500 })); }); });

  await expect(async () => await apiService.downloadResource(url, 'GET', { 'resource': 'data' }, { 'key': 'value' }, { 'X-NewHeader': '123' }, 'text/text')).rejects.toThrowError('Download error');
});