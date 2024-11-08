import { beforeAll, expect, test, vi } from 'vitest';
import { Users } from '../../src/resources/users';
import { Api } from '../../src/services/api';
import { client } from './_client';
import type { AuthData } from '../../src/types';


const expectedMethods = {
  'readUser': 'callResource',
  'updateUser': 'callResource',
  'inviteUserToAccount': 'callResource',
};

const service = new Users(client);

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
