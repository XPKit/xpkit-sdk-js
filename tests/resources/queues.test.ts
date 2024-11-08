import { beforeAll, expect, test, vi } from 'vitest';
import { Queues } from '../../src/resources/queues';
import { Api } from '../../src/services/api';
import { client } from './_client';


const expectedMethods = {
  'listQueues': 'getResources',
  'readQueue': 'callResource',
  'createQueue': 'callResource',
  'replaceQueue': 'callResource',
  'updateQueue': 'callResource',
  'deleteQueue': 'deleteResource',
  'listQueueItems': 'getResources',
  'readQueueItem': 'callResource',
  'createQueueItem': 'callResource',
  'replaceQueueItem': 'callResource',
  'updateQueueItem': 'callResource',
  'deleteQueueItem': 'deleteResource',
  'readQueueGroupStats': 'callSummary',
};


const service = new Queues(client);

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
