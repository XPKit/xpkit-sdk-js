import type { AuthData } from '../types';
import { isBrowser, loadFs } from './utils';



/**
 * Save data to local storage.
 * @param {string} key - The key to save the data under
 * @param {AuthData} value - The data to save
 */
export async function save(key: string, value: AuthData): Promise<void> {
  if (isBrowser()) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    const fs = await loadFs();
    fs.writeFileSync(`${key}.json`, JSON.stringify(value));
  }
}

/**
 * Load data from local storage.
 * @param {string} key - The key to load the data from
 * @returns {Promise<AuthData>} - The loaded data
 */
export async function load(key: string): Promise<AuthData> {
  if (isBrowser()) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } else {
    const fs = await loadFs();
    try {
      return JSON.parse((fs.readFileSync(`${key}.json`)).toString() || '{}');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error(err);
      }
      return {};
    }
  }
}

/**
 * Remove data from local storage.
 * @param {string} key - The key to remove the data from
 */
export async function remove(key: string): Promise<void> {
  if (isBrowser()) {
    localStorage.removeItem(key);
  } else {
    const fs = await loadFs();
    fs.unlinkSync(`${key}.json`);
  }
}