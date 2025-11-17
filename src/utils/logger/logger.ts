/**
 * Logger utility for @kubit/web-ui-charts
 * 
 * Provides a centralized logging system that:
 * - Respects NODE_ENV (disabled in production builds)
 * - Supports different log levels
 * - Can be configured/disabled by consumers
 * - Will be stripped out in production builds via terser
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enabled: boolean;
  minLevel: LogLevel;
  prefix: string;
}

/**
 * Detect if we're in a production build
 * Uses globalThis to be compatible with different environments (browser, Node, SSR)
 */
const isProduction = (): boolean => {
  // Check if globalThis.process exists (Node/SSR environments)
  if (typeof globalThis !== 'undefined' && 'process' in globalThis) {
    const proc = (globalThis as any).process;
    return proc?.env?.NODE_ENV === 'production';
  }
  // In browser or other environments, assume development unless explicitly set
  return false;
};

const DEFAULT_CONFIG: LoggerConfig = {
  enabled: !isProduction(),
  minLevel: 'info',
  prefix: '[Kubit Charts]',
};

let config: LoggerConfig = { ...DEFAULT_CONFIG };

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  error: 3,
  info: 1,
  warn: 2,
};

/**
 * Configure the logger behavior
 * @param newConfig - Partial configuration to merge with current settings
 * 
 * @example
 * ```ts
 * // Disable all logging
 * configureLogger({ enabled: false });
 * 
 * // Enable debug logs in development
 * configureLogger({ minLevel: 'debug' });
 * ```
 */
export const configureLogger = (newConfig: Partial<LoggerConfig>): void => {
  config = { ...config, ...newConfig };
};

/**
 * Reset logger to default configuration
 */
export const resetLogger = (): void => {
  config = { ...DEFAULT_CONFIG };
};

/**
 * Check if a log level should be output based on configuration
 */
const shouldLog = (level: LogLevel): boolean => {
  if (!config.enabled) {
    return false;
  }
  return LOG_LEVELS[level] >= LOG_LEVELS[config.minLevel];
};

/**
 * Format log message with prefix
 */
const formatMessage = (message: string): string => {
  return `${config.prefix} ${message}`;
};

/**
 * Log debug messages (development only)
 * Useful for detailed debugging information
 * 
 * @example
 * ```ts
 * logger.debug('Chart dimensions calculated', { width: 400, height: 300 });
 * ```
 */
const debug = (message: string, ...args: unknown[]): void => {
  if (shouldLog('debug')) {
    // eslint-disable-next-line no-console
    console.debug(formatMessage(message), ...args);
  }
};

/**
 * Log informational messages
 * 
 * @example
 * ```ts
 * logger.info('Chart rendered successfully');
 * ```
 */
const info = (message: string, ...args: unknown[]): void => {
  if (shouldLog('info')) {
    // eslint-disable-next-line no-console
    console.info(formatMessage(message), ...args);
  }
};

/**
 * Log warning messages
 * Use for non-breaking issues that developers should be aware of
 * 
 * @example
 * ```ts
 * logger.warn('Invalid gradient angle, falling back to default', angle);
 * ```
 */
const warn = (message: string, ...args: unknown[]): void => {
  if (shouldLog('warn')) {
    // eslint-disable-next-line no-console
    console.warn(formatMessage(message), ...args);
  }
};

/**
 * Log error messages
 * Use for errors that don't prevent execution but indicate problems
 * 
 * @example
 * ```ts
 * logger.error('Failed to calculate text bounds, using fallback', error);
 * ```
 */
const error = (message: string, ...args: unknown[]): void => {
  if (shouldLog('error')) {
    // eslint-disable-next-line no-console
    console.error(formatMessage(message), ...args);
  }
};

/**
 * Main logger object
 * Export as singleton to ensure consistent configuration
 */
export const logger = {
  debug,
  error,
  info,
  warn,
};
