import { expect, test, vi, beforeEach, beforeAll } from 'vitest';
import { save, load, remove } from '../../src/services/storage';
import { loadFs } from '../../src/services/utils';

const mocks = vi.hoisted(() => {
  return {
    isBrowser: vi.fn(() => true),
    localStorage: {
      setItem: vi.fn(),
      getItem: vi.fn(),
      removeItem: vi.fn(),
    },
    loadFs: vi.fn(() => {
      return {
        writeFileSync: vi.fn(),
        readFileSync: vi.fn(() => { return {}; }),
        unlinkSync: vi.fn()
      };
    })
  };
});

beforeEach(async () => {
  vi.mock('localStorage', () => {
    return {
      setItem: mocks.localStorage.setItem,
      getItem: mocks.localStorage.getItem,
      removeItem: mocks.localStorage.removeItem
    };
  });
  vi.mock('../../src/services/utils', () => {
    return {
      isBrowser: mocks.isBrowser,
      loadFs: mocks.loadFs
    };
  });
});

beforeAll(() => {
  global.localStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    key: vi.fn(),
    length: 0
  };

});

test('setItem is called on save', async() => {
  const spy = vi.spyOn(localStorage, 'setItem');
  await save('testing', { access_token: 'test' });
  expect(spy).toHaveBeenCalledWith('testing', '{"access_token":"test"}');

  mocks.isBrowser.mockImplementation(() => false);
  await save('testing', { access_token: 'test' });
  expect(loadFs).toHaveBeenCalled();
});

test('getItem is called on load', async() => {
  JSON.parse = vi.fn(() => {return {access_token: 'test'};});
  vi.spyOn(localStorage, 'getItem').mockImplementation(() => '{"access_token":"test"}' );

  const lsSpy = vi.spyOn(localStorage, 'getItem');
  const jsonSpy = vi.spyOn(JSON, 'parse');
  const result = await load('testing');
  expect(lsSpy).toHaveBeenCalledWith('testing');
  expect(jsonSpy).toHaveBeenCalledWith('{"access_token":"test"}');
  expect(result).toEqual({access_token: 'test'});

  mocks.isBrowser.mockImplementation(() => false);
  await load('testing');
  expect(loadFs).toHaveBeenCalled();

});

test('empty object is returned on lookup failure', async() => {
  JSON.parse = vi.fn(() => {return {};});
  vi.spyOn(localStorage, 'getItem').mockImplementation(() => null );

  const lsSpy = vi.spyOn(localStorage, 'getItem');
  const jsonSpy = vi.spyOn(JSON, 'parse');

  const resultNotExists = await load('testing');
  expect(lsSpy).toHaveBeenCalledWith('testing');
  expect(jsonSpy).toHaveBeenCalledWith('{}');
  expect(resultNotExists).toEqual({});

  mocks.isBrowser.mockImplementation(() => false);
  await load('testing');
  expect(loadFs).toHaveBeenCalled();
});

test('removeItem is called on remove', async() => {
  const spy = vi.spyOn(localStorage, 'removeItem');
  await remove('testing');
  expect(spy).toHaveBeenCalledWith('testing');

  mocks.isBrowser.mockImplementation(() => false);
  await remove('testing');
  expect(loadFs).toHaveBeenCalled();
});
