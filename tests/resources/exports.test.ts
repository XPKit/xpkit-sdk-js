import { beforeAll, expect, test, vi } from 'vitest';
import { Exports } from '../../src/resources/exports';
import { Api } from '../../src/services/api';
import { client } from './_client';


const expectedMethods = {
  'listExports': 'getResources',
  'readExport': 'callResource',
  'triggerExport': 'callAsyncRequests',
  'downloadExport': 'downloadResource',
};

const service = new Exports(client);

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
