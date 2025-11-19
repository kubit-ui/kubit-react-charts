export const PieChartErrorMessages = {
  // Data Validation Errors
  PIE_CHART_EMPTY_DATA: 'PieChart data is empty or undefined',
  // Radius Errors
  PIE_CHART_INNER_RADIUS_OUT_OF_RANGE: 'Inner radius must be less than radius',
  // Canvas & Context Errors
  PIE_CHART_INVALID_CANVAS_DIMENSIONS: 'Invalid canvas dimensions for PieChart',
  // Data Validation Errors
  PIE_CHART_INVALID_DATA_KEY: 'Invalid or missing dataKey in PieChart data',
  // Radius Errors
  PIE_CHART_INVALID_INNER_RADIUS: 'Invalid innerRadius value',
  PIE_CHART_INVALID_RADIUS: 'Invalid radius value',
  // Segment Errors
  PIE_CHART_INVALID_SEGMENT_VALUE: 'Invalid segment value (non-numeric)',
  // Data Validation Errors
  PIE_CHART_INVALID_TOTAL: 'PieChart total value is zero or invalid',
  // Segment Errors
  PIE_CHART_MISSING_SEGMENT_NAME: 'Segment is missing required name property',
  PIE_CHART_NEGATIVE_SEGMENT_VALUE: 'Segment value cannot be negative',
} as const;
