import { describe, it, expect, vi } from 'vitest';
import logger from '../logger';

describe('logger', () => {
  const prefix = '[Foxford Tools] ';

  it('should log info messages with the correct prefix', () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    const message = 'This is an info message';

    logger.info(message);

    expect(consoleLogSpy).toHaveBeenCalledWith(prefix + message);
    consoleLogSpy.mockRestore();
  });

  it('should log warning messages with the correct prefix', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn');
    const message = 'This is a warning message';

    logger.warn(message);

    expect(consoleWarnSpy).toHaveBeenCalledWith(prefix + message);
    consoleWarnSpy.mockRestore();
  });

  it('should log error messages with the correct prefix', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    const message = 'This is an error message';

    logger.error(message);

    expect(consoleErrorSpy).toHaveBeenCalledWith(prefix + message);
    consoleErrorSpy.mockRestore();
  });
});
