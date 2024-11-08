/**
 * Custom error class for XPKit
 *
 * @remarks
 * This class extends the Error class and adds a HTTP status code and response property.
 */
export class XPKitError extends Error {
  constructor(message: string, public code: number, public response: string) {
    super(message);
    this.name = 'XPKitError';
  }
}