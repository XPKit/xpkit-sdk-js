/**
 * Determine if the code is running in a browser
 * @returns {boolean} - True if running in a browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

/**
 * Dynamically import fs
 */
export async function loadFs() {
  const fs = await import('fs');
  return fs;
}