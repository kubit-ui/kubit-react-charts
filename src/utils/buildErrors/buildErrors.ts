import { BarChartErrors, BarChartErrorsRecord } from './constants/errors/barChartErrors';
import { LineChartErrors, LineChartErrorsRecord } from './constants/errors/lineChartErrors';

export const BuildError = {
  INVALID_X_TICK: 'INVALID_X_TICK',
  ...BarChartErrors,
  ...LineChartErrors,
} as const;

const INVALID_X_TICK_ERROR = '[getXTicks] Invalid X tick values calculated';

export const ErrorsRecord: Record<(typeof BuildError)[keyof typeof BuildError], Error> = {
  ...BarChartErrorsRecord,
  ...LineChartErrorsRecord,
  INVALID_X_TICK: new Error(INVALID_X_TICK_ERROR),
};

export const buildError = (error: (typeof BuildError)[keyof typeof BuildError]): Error =>
  ErrorsRecord[error];

/**
 * Creates a dynamic error for when a dataKey is not found in the dataset
 */
export const buildDataKeyNotFoundError = (dataKey: string): Error =>
  new Error(`DataKey "${dataKey}" not found in dataset`);

/**
 * Creates a dynamic canvas dimensions error with specific width and height values
 */
export const buildCanvasDimensionsError = (width: number, height: number): Error =>
  new Error(
    `Canvas dimensions validation failed: width=${width}, height=${height} (both must be > 0)`
  );

/**
 * Creates a dynamic separator X break axis parsing error
 */
export const buildSeparatorXBreakAxisError = (value: string | number): Error =>
  new Error(`Invalid xBreakAxis value: '${value}' cannot be parsed as number`);

/**
 * Creates a dynamic separator Y break axis parsing error
 */
export const buildSeparatorYBreakAxisError = (value: string | number): Error =>
  new Error(`Invalid yBreakAxis value: '${value}' cannot be parsed as number`);

/**
 * Creates a dynamic separator X out of range error
 */
export const buildSeparatorXOutOfRangeError = (value: number, min: number, max: number): Error =>
  new Error(`xBreakAxis value ${value} is outside data range (${min} - ${max})`);

/**
 * Creates a dynamic separator Y out of range error
 */
export const buildSeparatorYOutOfRangeError = (value: number, min: number, max: number): Error =>
  new Error(`yBreakAxis value ${value} is outside data range (${min} - ${max})`);

// Re-export bar chart error builders
export {
  buildBarValueError,
  buildBarNegativeValueError,
  buildBarDataKeyNotFoundError,
  buildBarDistributionError,
} from './charts/buildBarChartErrors';
