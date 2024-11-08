import { expect, test, vi } from 'vitest';
import { isBrowser, loadFs } from '../../src/services/utils';
import fs from 'fs';

test('isBrowser determines context correctly', async() => {
  expect(isBrowser()).toBe(false);

  global.window = Object.create({});
  global.window.document = {
    createElement: vi.fn(),
    createTextNode: vi.fn(),
  } as unknown as Document;

  expect(isBrowser()).toBe(true);
});

test('loadFs dynamically imports fs', async() => {
  const res = await loadFs();
  expect(Object.prototype.hasOwnProperty.call(res, 'writeFileSync')).toBe(true);
});
