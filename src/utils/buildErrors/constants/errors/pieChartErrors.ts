import { PieChartErrorMessages } from '../errorMessages/pieChartErrorMessages';

export const PieChartErrors = {
  // Data Validation Errors
  PIE_CHART_EMPTY_DATA: 'PIE_CHART_EMPTY_DATA',
  // Radius Errors
  PIE_CHART_INNER_RADIUS_OUT_OF_RANGE: 'PIE_CHART_INNER_RADIUS_OUT_OF_RANGE',
  // Canvas & Context Errors
  PIE_CHART_INVALID_CANVAS_DIMENSIONS: 'PIE_CHART_INVALID_CANVAS_DIMENSIONS',
  // Data Validation Errors
  PIE_CHART_INVALID_DATA_KEY: 'PIE_CHART_INVALID_DATA_KEY',
  // Radius Errors
  PIE_CHART_INVALID_INNER_RADIUS: 'PIE_CHART_INVALID_INNER_RADIUS',
  PIE_CHART_INVALID_RADIUS: 'PIE_CHART_INVALID_RADIUS',
  // Segment Errors
  PIE_CHART_INVALID_SEGMENT_VALUE: 'PIE_CHART_INVALID_SEGMENT_VALUE',
  // Data Validation Errors
  PIE_CHART_INVALID_TOTAL: 'PIE_CHART_INVALID_TOTAL',
  // Segment Errors
  PIE_CHART_MISSING_SEGMENT_NAME: 'PIE_CHART_MISSING_SEGMENT_NAME',
  PIE_CHART_NEGATIVE_SEGMENT_VALUE: 'PIE_CHART_NEGATIVE_SEGMENT_VALUE',
} as const;

export const PieChartErrorsRecord = Object.entries(PieChartErrorMessages).reduce(
  (acc, [key, message]) => {
    acc[key as keyof typeof PieChartErrorMessages] = new Error(message);
    return acc;
  },
  {} as Record<keyof typeof PieChartErrorMessages, Error>
);
