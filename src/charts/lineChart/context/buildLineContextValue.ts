import { type ChartError, ErrorType } from '@/types/errors.type';
import { Positions } from '@/types/position.enum';
import { getPoints } from '@/utils/getPoints/getPoints';

import {
  BREAK_AXIS_DEFAULTS,
  CHART_CANVAS_DEFAULTS,
  LINE_CHART_FALLBACK_DATA,
  SHARED_FALLBACK_DATA,
} from '../../constants/chartDefaults';
import type { ChildrenType, IDataPoint, LineChartContextType } from '../lineChart.type';
import { getXCoordinates, getYCoordinates } from '../utils/getCoordinates';
import { getExtraSpacing } from '../utils/getExtraSpacing';
import { getXTicks, getYTicks } from '../utils/getTicks';
import {
  validateCanvasDimensions,
  validateData,
  validateXCoordinates,
  validateXTickValues,
  validateYCoordinates,
  validateYTickValues,
} from '../utils/validations';

interface BuildContextValue {
  children: ChildrenType;
  data: IDataPoint[];
  xKey: string;
  canvasHeight: number;
  canvasWidth: number;
  viewBox: string;
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}

type OmitProps =
  | 'data'
  | 'xKey'
  | 'canvasHeight'
  | 'canvasWidth'
  | 'canvasExtraSpace'
  | 'xBreakAxis'
  | 'yBreakAxis'
  | 'xCursor'
  | 'yCursor';

/**
 * Builds the context value for the line chart.
 *
 * @param {BuildContextValue} options - The options for building the context value.
 * @returns {LineContextValue} - The built context value.
 */
export const buildLineContextValue = ({
  addError,
  canvasHeight,
  canvasWidth,
  children,
  data,
  viewBox,
  xKey,
}: BuildContextValue): Omit<LineChartContextType, OmitProps> => {
  let error: Omit<ChartError, 'type'> | undefined = undefined;

  const { error: dataError } = validateData({ data, addError });
  if (dataError) {
    error = dataError;
  }

  const { error: canvasError } = validateCanvasDimensions({
    canvasWidth,
    canvasHeight,
    addError,
  });
  if (canvasError) {
    error = canvasError;
  }

  // Use safe defaults for data processing if there are critical errors
  const safeData =
    data && data.length > 0
      ? data
      : [
          {
            [xKey]: LINE_CHART_FALLBACK_DATA.FALLBACK_X_FIRST,
            y: LINE_CHART_FALLBACK_DATA.FALLBACK_Y_FIRST,
          },
          {
            [xKey]: LINE_CHART_FALLBACK_DATA.FALLBACK_X_SECOND,
            y: LINE_CHART_FALLBACK_DATA.FALLBACK_Y_SECOND,
          },
        ];
  const safeCanvasWidth = canvasWidth > 0 ? canvasWidth : CHART_CANVAS_DEFAULTS.SAFE_WIDTH;
  const safeCanvasHeight = canvasHeight > 0 ? canvasHeight : CHART_CANVAS_DEFAULTS.SAFE_HEIGHT;

  /**
   * Get the extra spacings for the line chart.
   */
  const {
    xAxisLeftSpacing,
    xAxisTopSpacing,
    xAxisRightSpacing,
    xAxisBottomSpacing,
    yAxisLeftSpacing,
    yAxisTopSpacing,
    yAxisRightSpacing,
    yAxisBottomSpacing,
    lineChartXPosition,
    lineChartYPosition,
    xAxisText,
    xBreakAxis,
    xData,
    yAxisText,
    yBreakAxis,
    yData,
  } = getExtraSpacing({
    canvasHeight: safeCanvasHeight,
    canvasWidth: safeCanvasWidth,
    children,
    data: safeData,
    viewBox,
    xKey,
  });

  const xTickValues = getXTicks({
    tickValues: xData,
    maxSpaceAvailable: safeCanvasWidth,
    xAxisLeftSpacing,
    xAxisRightSpacing,
    yAxisLeftSpacing,
    yAxisRightSpacing,
  });

  const { error: xTickError } = validateXTickValues({ xTickValues, addError });
  if (!error && xTickError) {
    error = xTickError;
  }

  /**
   * Calculate the tick values for the Y Axis.
   */
  const yTickValues = getYTicks({
    maxSpaceAvailable: safeCanvasHeight,
    tickValues: yData,
    xAxisTopSpacing,
    xAxisBottomSpacing,
    yAxisTopSpacing,
    yAxisBottomSpacing,
  });

  const { error: yTickError } = validateYTickValues({ yTickValues, addError });
  if (!error && yTickError) {
    error = yTickError;
  }

  const crossXAxis =
    lineChartXPosition !== Positions.TOP && lineChartXPosition !== Positions.BOTTOM;

  const crossYAxis =
    lineChartYPosition !== Positions.LEFT && lineChartYPosition !== Positions.RIGHT;

  /**
   * Calculate the custom breakAxis for the X and Y Axis.
   */
  const customBreakXAxis = crossXAxis
    ? getPoints(yTickValues || [], [String(xBreakAxis)])[0]
    : BREAK_AXIS_DEFAULTS.DEFAULT_BREAK_VALUE;
  const customBreakYAxis = crossYAxis
    ? getPoints(xTickValues || [], [String(yBreakAxis)])[0]
    : BREAK_AXIS_DEFAULTS.DEFAULT_BREAK_VALUE;

  /**
   * Calculate the X coordinates for the line chart.
   */
  const xCoordinates = getXCoordinates({
    canvasHeight: safeCanvasHeight,
    canvasWidth: safeCanvasWidth,
    customBreakAxis: Number(customBreakXAxis),
    lineChartXPosition,
    lineChartYPosition,
    xAxisLeftSpacing,
    xAxisTopSpacing,
    xAxisRightSpacing,
    xAxisBottomSpacing,
    yAxisLeftSpacing,
    yAxisTopSpacing,
    yAxisRightSpacing,
    yAxisBottomSpacing,
  });
  /**
   * Calculate the Y coordinates for the line chart.
   */
  const yCoordinates = getYCoordinates({
    canvasHeight: safeCanvasHeight,
    canvasWidth: safeCanvasWidth,
    customBreakAxis: Number(customBreakYAxis),
    lineChartXPosition,
    lineChartYPosition,
    xAxisLeftSpacing,
    xAxisTopSpacing,
    xAxisRightSpacing,
    xAxisBottomSpacing,
    yAxisLeftSpacing,
    yAxisTopSpacing,
    yAxisRightSpacing,
    yAxisBottomSpacing,
  });

  const { error: xCoordinatesError } = validateXCoordinates({ xCoordinates, addError });
  if (!error && xCoordinatesError) {
    error = xCoordinatesError;
  }

  const { error: yCoordinatesError } = validateYCoordinates({ yCoordinates, addError });
  if (!error && yCoordinatesError) {
    error = yCoordinatesError;
  }

  const baseContext = {
    addError,
    crossXAxis,
    crossYAxis,
    xAxisLeftSpacing,
    xAxisTopSpacing,
    xAxisRightSpacing,
    xAxisBottomSpacing,
    yAxisLeftSpacing,
    yAxisTopSpacing,
    yAxisRightSpacing,
    yAxisBottomSpacing,
    xAxisCoordinates: {
      coordinates: xCoordinates,
      tickValues:
        xTickValues ||
        (error
          ? [
              {
                position: BREAK_AXIS_DEFAULTS.DEFAULT_BREAK_VALUE,
                value: LINE_CHART_FALLBACK_DATA.FALLBACK_X_FIRST,
              },
              { position: safeCanvasWidth, value: LINE_CHART_FALLBACK_DATA.FALLBACK_X_SECOND },
            ]
          : []),
    },
    xAxisText,
    yAxisCoordinates: {
      coordinates: yCoordinates,
      tickValues:
        yTickValues ||
        (error
          ? [
              { position: safeCanvasHeight, value: SHARED_FALLBACK_DATA.FALLBACK_PKEY_FIRST },
              {
                position: BREAK_AXIS_DEFAULTS.DEFAULT_BREAK_VALUE,
                value: SHARED_FALLBACK_DATA.FALLBACK_PKEY_SECOND,
              },
            ]
          : []),
    },
    yAxisText,
  };

  // Add error only if it exists
  if (error) {
    return {
      ...baseContext,
      error: { ...error, type: ErrorType.LINE_CHART_CONTEXT_ERROR },
    };
  }

  return baseContext;
};
