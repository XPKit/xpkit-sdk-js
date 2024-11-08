import { beforeAll, expect, test, vi } from 'vitest';
import { Souvenirs } from '../../src/resources/souvenirs';
import { Api } from '../../src/services/api';
import { client } from './_client';


const expectedMethods = {
  'listSouvenirs': 'getResources',
  'readSouvenir': 'callResource',
  'createSouvenir': 'callResource',
  'replaceSouvenir': 'callResource',
  'updateSouvenir': 'callResource',
  'deleteSouvenir': 'deleteResource',
  'duplicateSouvenirs': 'callAsyncRequest',
};

const service = new Souvenirs(client);

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
