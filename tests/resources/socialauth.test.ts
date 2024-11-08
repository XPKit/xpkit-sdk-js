import { beforeAll, expect, test, vi } from 'vitest';
import { SocialAuth } from '../../src/resources/socialauth';
import { Api } from '../../src/services/api';
import { client } from './_client';


const expectedMethods = {
  'listConfigurations': 'getResources',
  'readConfiguration': 'callResource',
  'createConfiguration': 'callResource',
  'replaceConfiguration': 'callResource',
  'deleteConfiguration': 'deleteResource',
};

const service = new SocialAuth(client);

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
