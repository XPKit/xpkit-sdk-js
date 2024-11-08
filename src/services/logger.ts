export class Logger {
  static #instance: Logger;
  loggingEnabled: boolean;

  private constructor() { }

  public static get instance(): Logger {
    if (!Logger.#instance) {
      Logger.#instance = new Logger();
    }

    return Logger.#instance;
  }

  /**
   * Log a message to the console if logging is enabled.
   * @param {string} message - Message to log
   */
  public log(message: string) {
    if (this.loggingEnabled) {
      console.log(`[XPKIT]: ${message}`);
    }
  }
}