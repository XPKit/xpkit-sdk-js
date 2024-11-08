import { beforeAll, expect, test, vi } from 'vitest';
import { Profiles } from '../../src/resources/profiles';
import { Api } from '../../src/services/api';
import { client } from './_client';


const expectedMethods = {
  'listProfiles': 'getResources',
  'readProfile': 'callResource',
  'createProfile': 'callResource',
  'replaceProfile': 'callResource',
  'updateProfile': 'callResource',
  'deleteProfile': 'deleteResource',
  'createOrUpdateProfile': 'callResource',
  'mergeProfiles': 'callAsyncRequest',
  'createBulkProfiles': 'callAsyncRequest',
};

const service = new Profiles(client);

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
