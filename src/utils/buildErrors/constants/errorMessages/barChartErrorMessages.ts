export const BarChartErrorMessages = {
  // Axis & Scale Errors
  BAR_CHART_AXIS_INSUFFICIENT_TICKS: 'Axis requires at least two ticks for proper bar scaling',
  BAR_CHART_AXIS_INVALID_SCALE: 'Invalid axis scale for current bar values',

  // Distribution Errors
  BAR_CHART_DISTRIBUTION_INSUFFICIENT_SPACE:
    'Insufficient space for bar distribution with current configuration',
  BAR_CHART_DISTRIBUTION_INVALID_GAP:
    'Invalid gap between bars - must be >= 0 and allow bar rendering',
  BAR_CHART_DISTRIBUTION_OVERLAP: 'Bar distribution results in overlapping bars',

  // Data Validation Errors
  BAR_CHART_EMPTY_DATA: 'No valid data entries found for bar chart rendering',
  BAR_CHART_INSUFFICIENT_SPACE_HEIGHT:
    'Insufficient height to render bars. Consider reducing bar count or increasing chart height',
  BAR_CHART_INSUFFICIENT_SPACE_WIDTH:
    'Insufficient width to render bars. Consider reducing bar width or increasing chart width',
  BAR_CHART_INVALID_VALUE: 'Bar value must be a valid number for rendering',
  BAR_CHART_NEGATIVE_VALUE: 'Negative values are not supported in this bar configuration',
  BAR_CHART_NO_DATA: 'Data validation failed: no data provided for bar chart rendering',
  BAR_CHART_OVERLAP: 'Bars are overlapping due to insufficient spacing',

  // Separator Errors
  BAR_CHART_SEPARATOR_X_OUT_OF_RANGE: 'Separator X position is outside valid bar range',
  BAR_CHART_SEPARATOR_Y_OUT_OF_RANGE: 'Separator Y position is outside valid bar range',

  // Stack Errors
  BAR_CHART_STACK_INVALID:
    'Invalid stacking configuration - all bars in stack must have consistent configuration',
  BAR_CHART_STACK_MISSING_VALUES: 'Stack is incomplete - all bars in stack must have valid values',
} as const;
