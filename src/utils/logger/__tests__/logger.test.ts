import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { configureLogger, logger, resetLogger } from '../logger';

describe('logger utility', () => {
  let consoleDebugSpy: ReturnType<typeof vi.spyOn>;
  let consoleInfoSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on console methods
    consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {
      // No-op
    });
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {
      // No-op
    });
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
      // No-op
    });
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      // No-op
    });

    // Reset logger to default config before each test
    resetLogger();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('log levels', () => {
    it('should log debug messages when enabled', () => {
      configureLogger({ enabled: true, minLevel: 'debug' });
      logger.debug('Debug message', { data: 'test' });

      expect(consoleDebugSpy).toHaveBeenCalledWith('[Kubit Charts] Debug message', {
        data: 'test',
      });
    });

    it('should log info messages', () => {
      configureLogger({ enabled: true });
      logger.info('Info message');

      expect(consoleInfoSpy).toHaveBeenCalledWith('[Kubit Charts] Info message');
    });

    it('should log warn messages', () => {
      configureLogger({ enabled: true });
      logger.warn('Warning message', 'extra data');

      expect(consoleWarnSpy).toHaveBeenCalledWith('[Kubit Charts] Warning message', 'extra data');
    });

    it('should log error messages', () => {
      configureLogger({ enabled: true });
      logger.error('Error message');

      expect(consoleErrorSpy).toHaveBeenCalledWith('[Kubit Charts] Error message');
    });
  });

  describe('log level filtering', () => {
    it('should not log debug when minLevel is info', () => {
      configureLogger({ enabled: true, minLevel: 'info' });
      logger.debug('Debug message');

      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });

    it('should not log info when minLevel is warn', () => {
      configureLogger({ enabled: true, minLevel: 'warn' });
      logger.info('Info message');

      expect(consoleInfoSpy).not.toHaveBeenCalled();
    });

    it('should log error even when minLevel is error', () => {
      configureLogger({ enabled: true, minLevel: 'error' });
      logger.error('Error message');

      expect(consoleErrorSpy).toHaveBeenCalledWith('[Kubit Charts] Error message');
    });
  });

  describe('enabled/disabled state', () => {
    it('should not log anything when disabled', () => {
      configureLogger({ enabled: false });

      logger.debug('Debug');
      logger.info('Info');
      logger.warn('Warn');
      logger.error('Error');

      expect(consoleDebugSpy).not.toHaveBeenCalled();
      expect(consoleInfoSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should log when explicitly enabled', () => {
      configureLogger({ enabled: true });
      logger.info('Test message');

      expect(consoleInfoSpy).toHaveBeenCalled();
    });
  });

  describe('configuration', () => {
    it('should allow custom prefix', () => {
      configureLogger({ enabled: true, prefix: '[Custom]' });
      logger.info('Test');

      expect(consoleInfoSpy).toHaveBeenCalledWith('[Custom] Test');
    });

    it('should merge partial configuration', () => {
      configureLogger({ minLevel: 'warn' });
      configureLogger({ enabled: true }); // Should not reset minLevel

      logger.info('Info'); // Should not log
      logger.warn('Warn'); // Should log

      expect(consoleInfoSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it('should reset to default configuration', () => {
      configureLogger({ enabled: false, minLevel: 'error', prefix: '[Custom]' });
      resetLogger();

      // After reset, should use default config
      logger.info('Test');

      // Default is enabled in test environment
      expect(consoleInfoSpy).toHaveBeenCalledWith('[Kubit Charts] Test');
    });
  });

  describe('multiple arguments', () => {
    it('should pass multiple arguments to console', () => {
      configureLogger({ enabled: true });
      const data1 = { x: 1 };
      const data2 = { y: 2 };

      logger.info('Message', data1, data2);

      expect(consoleInfoSpy).toHaveBeenCalledWith('[Kubit Charts] Message', data1, data2);
    });
  });
});
