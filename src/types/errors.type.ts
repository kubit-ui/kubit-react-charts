export const ErrorType = {
  // Bar Chart Error categories
  BAR_CHART_CONTEXT_ERROR: 'BAR_CHART_CONTEXT_ERROR',
  BAR_CHART_PATH_ERROR: 'BAR_CHART_PATH_ERROR',
  BAR_CHART_SEPARATOR_ERROR: 'BAR_CHART_SEPARATOR_ERROR',
  BAR_CHART_X_AXIS_ERROR: 'BAR_CHART_X_AXIS_ERROR',
  BAR_CHART_Y_AXIS_ERROR: 'BAR_CHART_Y_AXIS_ERROR',
  // Generic Error for backward compatibility
  GENERIC: 'GENERIC',
  // Line Chart Errors categories
  LINE_CHART_CONTEXT_ERROR: 'LINE_CHART_CONTEXT_ERROR',
  LINE_CHART_PATH_ERROR: 'LINE_CHART_PATH_ERROR',
  LINE_CHART_PROJECTION_ERROR: 'LINE_CHART_PROJECTION_ERROR',
  LINE_CHART_SEPARATOR_ERROR: 'LINE_CHART_SEPARATOR_ERROR',
  LINE_CHART_X_AXIS_ERROR: 'LINE_CHART_X_AXIS_ERROR',
  LINE_CHART_Y_AXIS_ERROR: 'LINE_CHART_Y_AXIS_ERROR',
  // Pie Chart Error categories
  PIE_CHART_CONTEXT_ERROR: 'PIE_CHART_CONTEXT_ERROR',
  PIE_CHART_PATH_ERROR: 'PIE_CHART_PATH_ERROR',
  PIE_CHART_SEGMENT_ERROR: 'PIE_CHART_SEGMENT_ERROR',
} as const;

export interface ChartError {
  error?: Error;
  type: keyof typeof ErrorType;
}
export type ChartErrorCollection = {
  [type in (typeof ErrorType)[keyof typeof ErrorType]]?: ChartError | ChartError[];
};

// Utility for array conversion
export const normalizeToArray = (error: ChartError | ChartError[]): ChartError[] => {
  return Array.isArray(error) ? error : [error];
};
