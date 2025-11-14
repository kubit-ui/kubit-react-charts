export const LineChartErrorMessages = {
  // Context Error Messages
  LINE_CHART_INVALID_CANVAS:
    'Canvas dimensions validation failed: both width and height must be > 0',
  LINE_CHART_NO_DATA: 'Data validation failed: no data provided for chart rendering',

  // Path Error Messages
  LINE_CHART_PATH_ALL_VALUES_NULL: 'Path data cannot be generated - all Y values are null or undefined',
  LINE_CHART_PATH_INSUFFICIENT_POINTS: 'Unable to calculate curved path with insufficient points (minimum 2 required)',
  LINE_CHART_PATH_INVALID_DATAKEY: 'DataKey must be a valid string',

  // Projection Error Messages
  LINE_CHART_PROJECTION_INVALID_BOUNDS:
    'Invalid projection bounds - upper projection must be below lower projection',
  LINE_CHART_PROJECTION_LOWER_X_OUT_OF_RANGE:
    'Lower projection X coordinate is outside valid range (0-100)',
  LINE_CHART_PROJECTION_LOWER_Y_OUT_OF_RANGE: 'Lower projection Y coordinate is outside chart area',
  LINE_CHART_PROJECTION_UPPER_X_OUT_OF_RANGE:
    'Upper projection X coordinate is outside valid range (0-100)',
  LINE_CHART_PROJECTION_UPPER_Y_OUT_OF_RANGE: 'Upper projection Y coordinate is outside chart area',

  // Separator Error Messages
  LINE_CHART_SEPARATOR_INVALID_COORDINATES:
    'Invalid separator position - coordinates overlap, cannot render separator',
  LINE_CHART_SEPARATOR_INVALID_X_BREAK_AXIS: 'Invalid xBreakAxis value: cannot be parsed as number',
  LINE_CHART_SEPARATOR_INVALID_Y_BREAK_AXIS: 'Invalid yBreakAxis value: cannot be parsed as number',
  LINE_CHART_SEPARATOR_X_OUT_OF_RANGE: 'xBreakAxis value is outside data range',
  LINE_CHART_SEPARATOR_Y_OUT_OF_RANGE: 'yBreakAxis value is outside data range',
  LINE_CHART_SINGLE_POINT:
    'Data validation failed: single data point provided, minimum 2 required for line chart',

  // Axis Error Messages
  LINE_CHART_X_AXIS_IDENTICAL_VALUES:
    'X-axis range validation failed: minimum and maximum values are identical, cannot render chart line',
  LINE_CHART_X_AXIS_INSUFFICIENT_TICKS:
    'X-axis tick calculation: insufficient data points (1/2 minimum required)',
  LINE_CHART_X_AXIS_ZERO_LENGTH:
    'X-axis geometry validation failed: start and end X coordinates are identical (x1=x2), axis has zero length',
  LINE_CHART_Y_AXIS_IDENTICAL_VALUES:
    'Y-axis range validation failed: minimum and maximum values are identical, cannot render chart line',
  LINE_CHART_Y_AXIS_INSUFFICIENT_TICKS:
    'Y-axis tick calculation: insufficient data points (1/2 minimum required)',
  LINE_CHART_Y_AXIS_ZERO_LENGTH:
    'Y-axis geometry validation failed: start and end Y coordinates are identical (y1=y2), axis has zero length',
} as const;
