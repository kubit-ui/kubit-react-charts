/**
 * Shared default configuration constants for chart components.
 *
 * These constants provide standardized default values that are common across
 * different chart types, as well as type-specific constants with clear naming.
 */

/**
 * Default canvas dimensions used as fallback when invalid dimensions are provided
 */
export const CHART_CANVAS_DEFAULTS = {
  /** Default canvas height when invalid height is provided */
  SAFE_HEIGHT: 100,
  /** Default canvas width when invalid width is provided */
  SAFE_WIDTH: 100,
} as const;

/**
 * Axis validation constants for tick values and positioning
 */
export const AXIS_VALIDATION = {
  /** Minimum number of tick values required for a valid axis */
  MIN_TICK_COUNT: 2,
  /** Number used to detect when all tick values are identical */
  UNIQUE_VALUE_THRESHOLD: 1,
} as const;

/**
 * Default spacing and positioning values
 */
export const CHART_SPACING_DEFAULTS = {
  /** Default spacing value when no spacing is specified */
  DEFAULT_SPACE: 0,
} as const;

/**
 * Break axis default values
 */
export const BREAK_AXIS_DEFAULTS = {
  /** Default value when no custom break axis is specified */
  DEFAULT_BREAK_VALUE: 0,
} as const;

/**
 * Shared fallback data points used across different chart types
 */
export const SHARED_FALLBACK_DATA = {
  /** First fallback primary key value (used for axis labels) */
  FALLBACK_PKEY_FIRST: '0',
  /** Second fallback primary key value (used for axis labels) */
  FALLBACK_PKEY_SECOND: '1',
} as const;

/**
 * Bar Chart specific default configuration values
 */
export const BAR_CHART_DEFAULTS = {
  /** Default width for bar elements when not specified */
  BAR_WIDTH: 20,
} as const;

/**
 * Bar Chart specific fallback data points used when bar chart data is invalid or empty
 */
export const BAR_CHART_FALLBACK_DATA = {
  /** Default x value for fallback data points */
  DEFAULT_X_VALUE: 0,
  /** Generic secondary key for fallback data when dataKey is needed */
  FALLBACK_SECONDARY_KEY: 'fallbackData',
} as const;

/**
 * Line Chart specific fallback data points used when line chart data is invalid or empty
 */
export const LINE_CHART_FALLBACK_DATA = {
  /** First X value for line chart fallback data */
  FALLBACK_X_FIRST: '0',
  /** Second X value for line chart fallback data */
  FALLBACK_X_SECOND: '1',
  /** First Y value for line chart fallback data */
  FALLBACK_Y_FIRST: 0,
  /** Second Y value for line chart fallback data */
  FALLBACK_Y_SECOND: 1,
} as const;

/**
 * Pie Chart specific default configuration values
 */
export const PIE_CHART_DEFAULTS = {
  /** Default radius percentage when not specified */
  DEFAULT_RADIUS_PERCENTAGE: 50,
  /** Minimum number of segments required for a valid pie chart */
  MIN_SEGMENTS: 1,
} as const;

/**
 * Pie Chart specific fallback data points used when pie chart data is invalid or empty
 */
export const PIE_CHART_FALLBACK_DATA = {
  /** Generic data key for fallback data */
  FALLBACK_DATA_KEY: 'fallbackSegments',
  /** Default segment name for fallback data */
  FALLBACK_SEGMENT_NAME: 'fallback',
  /** Default segment value for fallback data */
  FALLBACK_SEGMENT_VALUE: 100,
} as const;
