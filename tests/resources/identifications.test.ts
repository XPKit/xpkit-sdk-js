import { beforeAll, expect, test, vi } from 'vitest';
import { Identifications } from '../../src/resources/identifications';
import { Api } from '../../src/services/api';
import { XPKitError } from '../../src/errors';
import { client } from './_client';


const expectedMethods = {
  'listBatches': 'getResources',
  'downloadBatch': 'downloadResource',
  'listWalletConfigurations': 'getResources',
  'readWalletConfiguration': 'callResource',
  'createWalletConfiguration': 'callResource',
  'uploadWalletConfigurationFile': 'uploadMultipart',
  'updateWalletConfiguration': 'callResource',
  'deleteWalletConfiguration': 'deleteResource',
  'generateWalletPassFile': 'callResource',
};

const service = new Identifications(client);

beforeAll(async () => {
  const { mockApiMethods } = await vi.hoisted(async () => await import('./_api_setup'));
  vi.mock('../../src/services/api', () => {
    return {
      ...mockApiMethods()
    };
  });
});

test('expected methods are present', async () => {
  Object.keys(expectedMethods).forEach((method) => {
    expect(service).toHaveProperty(method);
  });
});

test('correct API call is made', async () => {
  for (const [method, apiMethod] of Object.entries(expectedMethods)) {
    const apiSpy = vi.spyOn(service.api, apiMethod as keyof Api);
    await service[method]();
    expect(apiSpy).toHaveBeenCalled();
  }
});

test('correct validation is applied for createIdentity', async () => {
  const apiSpy = vi.spyOn(service.api, 'downloadResource');
  const baseUrl = 'emea.xpkit.net';
  service.baseUrl = baseUrl;
  await service.createIdentity('qrcode', 'test-account-id', { 'bg_color': 'red' });
  const endpoint = `https://identifications.${baseUrl}/api/identity/qrcode`;
  expect(apiSpy).toHaveBeenCalledWith(endpoint, 'GET', {}, { 'bg_color': 'red' }, { 'Account-ID': 'test-account-id' }, 'text');

  await service.createIdentity('qrcode', 'test-account-id', { 'bg_color': 'red', 'format': 'png' });
  expect(apiSpy).toHaveBeenCalledWith(endpoint, 'GET', {}, { 'bg_color': 'red', 'format': 'png' }, { 'Account-ID': 'test-account-id' }, 'png');
});

test('correct validation is applied for encodeIdentity', async () => {
  const apiSpy = vi.spyOn(service.api, 'downloadResource');
  const baseUrl = 'emea.xpkit.net';
  service.baseUrl = baseUrl;
  await service.encodeIdentity('qrcode', 'test-account-id', 'valueToEncode', { 'bg_color': 'red' });
  const endpoint = `https://identifications.${baseUrl}/api/identity/encode/qrcode`;
  expect(apiSpy).toHaveBeenCalledWith(endpoint, 'GET', {}, { 'bg_color': 'red', 'data': 'valueToEncode' }, { 'Account-ID': 'test-account-id' }, 'png');
});

test('verifyIdentity handles 404s correctly', async () => {
  let apiSpy = vi.spyOn(service.api, 'downloadResource').mockImplementation(() => { return new Promise<string>((resolve, reject) => { throw new XPKitError('Not found', 404, ''); }); });
  const baseUrl = 'emea.xpkit.net';
  service.baseUrl = baseUrl;
  let result = await service.verifyIdentity('test-account-id', 'valueToCheck');
  expect(result).toBe(false);

  apiSpy = vi.spyOn(service.api, 'downloadResource').mockImplementation(() => { return new Promise<string>((resolve, reject) => resolve('Success')); });
  result = await service.verifyIdentity('test-account-id', 'valueToCheck');
  expect(result).toBe(true);
});

test('correct validation is applied for createBatch', async () => {
  const apiSpy = vi.spyOn(service.api, 'callAsyncRequest');
  const baseUrl = 'emea.xpkit.net';
  service.baseUrl = baseUrl;
  await service.createBatch('qrcode', { name: 'test-batch', amount: 10 });
  const endpoint = `https://identifications.${baseUrl}/api/identity/batch/qrcode`;
  expect(apiSpy).toHaveBeenCalledWith(endpoint, 'POST', { name: 'test-batch', amount: 10 });
});

test('correct validation is applied for deleteBatch', async () => {
  let apiSpy = vi.spyOn(service.api, 'deleteResource').mockResolvedValue(true);
  const baseUrl = 'emea.xpkit.net';
  service.baseUrl = baseUrl;
  let result = await service.deleteBatch('qrcode', 'abc123');
  const endpoint = `https://identifications.${baseUrl}/api/identity/batch/qrcode`;
  expect(apiSpy).toHaveBeenCalledWith(endpoint, { 'batch_id': 'abc123' });
  expect(result).toBe(true);

  apiSpy = vi.spyOn(service.api, 'deleteResource').mockImplementation(() => { return new Promise<boolean>((resolve, reject) => { throw new XPKitError('Unexpected status code for delete', 200, ''); }); });
  result = await service.deleteBatch('qrcode', 'abc123');
  expect(result).toBe(true);
});
