import { expect, test, vi } from 'vitest';
import { Logger } from '../../src/services/logger';


test('logger is a singleton', () => {
  expect(Logger.instance).toEqual(Logger.instance);
});

test('logging enabled is set', () => {
  const logger = Logger.instance;
  expect(logger.loggingEnabled).toEqual(undefined);

  logger.loggingEnabled = true;
  expect(logger.loggingEnabled).toEqual(true);
});

test('logger outputs depending on loggingEnabled setting', () => {
  const logger = Logger.instance;
  logger.loggingEnabled = false;

  const spy = vi.spyOn(console, 'log');

  logger.loggingEnabled = false;
  logger.log('Hello World');
  expect(spy).not.toHaveBeenCalled();

  logger.loggingEnabled = true;
  logger.log('Hello World');
  expect(spy).toHaveBeenCalledWith('[XPKIT]: Hello World');
  expect(spy).toHaveBeenCalledTimes(1);
});

