import { expect, test } from 'vitest';
import { XPKitError } from '../src/errors';


test('additional attributes are available on XPKitError', async () => {
  const error = new XPKitError('message', 400, 'response');
  expect(error.message).toBe('message');
  expect(error.code).toBe(400);
  expect(error.response).toBe('response');
  expect(error.name).toBe('XPKitError');
});
