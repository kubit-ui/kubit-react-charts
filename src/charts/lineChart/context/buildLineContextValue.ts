import { type ChartError, ErrorType } from '@/types/errors.type';
import { Positions } from '@/types/position.enum';
import {
  BuildError,
  buildCanvasDimensionsError,
  buildError,
} from '@/utils/buildErrors/buildErrors';
import { getXCoordinates, getYCoordinates } from '@/utils/getCoordinates/getCoordinates';
import { getPoints } from '@/utils/getPoints/getPoints';
import { getXTicks, getYTicks } from '@/utils/getTicks/getTicks';

import {
  AXIS_VALIDATION,
  BREAK_AXIS_DEFAULTS,
  CHART_CANVAS_DEFAULTS,
  LINE_CHART_FALLBACK_DATA,
  SHARED_FALLBACK_DATA,
} from '../../constants/chartDefaults';
import type { ChildrenType, IDataPoint, LineChartContextType } from '../lineChart.type';
import { getExtraSpacing } from '../utils/getExtraSpacing';

interface BuildContextValue {
  children: ChildrenType;
  data: IDataPoint[];
  xKey: string;
  ajustedX: number;
  ajustedY: number;
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
  ajustedX,
  ajustedY,
  canvasHeight,
  canvasWidth,
  children,
  data,
  viewBox,
  xKey,
}: BuildContextValue): Omit<LineChartContextType, OmitProps> => {
  let error: Omit<ChartError, 'type'> | undefined = undefined;

  // 1. Validate data exists
  if (!data || data.length === 0) {
    const dataError = {
      error: buildError(BuildError.LINE_CHART_NO_DATA),
    };
    addError?.('LINE_CHART_CONTEXT_ERROR', dataError);
    error = dataError;
  }

  if (data && data.length === 1) {
    const singlePointError = {
      error: buildError(BuildError.LINE_CHART_SINGLE_POINT),
    };
    addError?.('LINE_CHART_CONTEXT_ERROR', singlePointError);
    error = singlePointError;
  }

  // 2. Validate canvas dimensions
  if (canvasWidth <= 0 || canvasHeight <= 0) {
    const canvasError = {
      error: buildCanvasDimensionsError(canvasWidth, canvasHeight),
    };
    addError?.('LINE_CHART_CONTEXT_ERROR', canvasError);
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
    extraSpaceBottomY,
    extraSpaceLeftX,
    extraSpaceRightX,
    extraSpaceTopY,
    lineChartXPosition,
    lineChartYPosition,
    securityXSpace,
    securityYSpace,
    xAxisText,
    xBreakAxis,
    xData,
    yAxisText,
    yBreakAxis,
    yData,
  } = getExtraSpacing({
    ajustedX,
    ajustedY,
    canvasHeight: safeCanvasHeight,
    canvasWidth: safeCanvasWidth,
    children,
    data: safeData,
    viewBox,
    xKey,
  });

  /**
   * Calculate the tick values for the X Axis.
   */
  const crossXAxis =
    lineChartXPosition !== Positions.TOP && lineChartXPosition !== Positions.BOTTOM;
  const yAxisSpace = extraSpaceLeftX + extraSpaceRightX;
  const xTickValues = getXTicks({
    initPos: extraSpaceLeftX,
    maxSpaceAvailable: safeCanvasWidth,
    otherAxisSpace: yAxisSpace,
    securitySpace: securityXSpace,
    tickValues: xData,
  });
  if ((xTickValues ?? []).some(({ position }) => isNaN(position))) {
    const xTickError = {
      error: buildError(BuildError.INVALID_X_TICK),
    };
    addError?.('LINE_CHART_CONTEXT_ERROR', xTickError);
    error = xTickError;
  }

  // Validate X-axis tick values
  if (xTickValues) {
    const hasInsufficientTicks = xTickValues.length < AXIS_VALIDATION.MIN_TICK_COUNT;
    const hasIdenticalValues =
      xTickValues.length >= AXIS_VALIDATION.MIN_TICK_COUNT &&
      new Set(xTickValues.map(tick => tick.value)).size === AXIS_VALIDATION.UNIQUE_VALUE_THRESHOLD;

    if (hasInsufficientTicks) {
      const xAxisError = {
        error: buildError(BuildError.LINE_CHART_X_AXIS_INSUFFICIENT_TICKS),
      };
      addError?.('LINE_CHART_X_AXIS_ERROR', xAxisError);
      if (!error) {
        error = xAxisError;
      }
    }

    if (hasIdenticalValues) {
      const xAxisError = {
        error: buildError(BuildError.LINE_CHART_X_AXIS_IDENTICAL_VALUES),
      };
      addError?.('LINE_CHART_X_AXIS_ERROR', xAxisError);
      if (!error) {
        error = xAxisError;
      }
    }
  }
  /**
   * Calculate the tick values for the Y Axis.
   */
  const crossYAxis =
    lineChartYPosition !== Positions.LEFT && lineChartYPosition !== Positions.RIGHT;
  const otherAxisSpace = extraSpaceTopY + extraSpaceBottomY;
  const yTickValues = getYTicks({
    initPos: safeCanvasHeight - extraSpaceBottomY,
    maxSpaceAvailable: safeCanvasHeight,
    otherAxisSpace,
    securitySpace: securityYSpace,
    tickValues: yData,
  });

  // Validate Y-axis tick values
  if (yTickValues) {
    const hasInsufficientTicks = yTickValues.length < AXIS_VALIDATION.MIN_TICK_COUNT;
    const hasIdenticalValues =
      yTickValues.length >= AXIS_VALIDATION.MIN_TICK_COUNT &&
      new Set(yTickValues.map(tick => tick.value)).size === AXIS_VALIDATION.UNIQUE_VALUE_THRESHOLD;

    if (hasInsufficientTicks) {
      const yAxisError = {
        error: buildError(BuildError.LINE_CHART_Y_AXIS_INSUFFICIENT_TICKS),
      };
      addError?.('LINE_CHART_Y_AXIS_ERROR', yAxisError);
      if (!error) {
        error = yAxisError;
      }
    }

    if (hasIdenticalValues) {
      const yAxisError = {
        error: buildError(BuildError.LINE_CHART_Y_AXIS_IDENTICAL_VALUES),
      };
      addError?.('LINE_CHART_Y_AXIS_ERROR', yAxisError);
      if (!error) {
        error = yAxisError;
      }
    }
  }

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
    extraSpaceBottomY,
    extraSpaceLeftX,
    extraSpaceRightX,
    extraSpaceTopY,
    position: lineChartXPosition,
    securityYSpace,
  });
  /**
   * Calculate the Y coordinates for the line chart.
   */
  const yCoordinates = getYCoordinates({
    canvasHeight: safeCanvasHeight,
    canvasWidth: safeCanvasWidth,
    customBreakAxis: Number(customBreakYAxis),
    extraSpaceBottomY,
    extraSpaceLeftX,
    extraSpaceRightX,
    extraSpaceTopY,
    position: lineChartYPosition as (typeof Positions)[keyof typeof Positions],
    securityYSpace,
  });

  // Validate axis coordinates for zero-length axes
  if (xCoordinates.x1 === xCoordinates.x2) {
    const xAxisError = {
      error: buildError(BuildError.LINE_CHART_X_AXIS_ZERO_LENGTH),
    };
    addError?.('LINE_CHART_X_AXIS_ERROR', xAxisError);
    if (!error) {
      error = xAxisError;
    }
  }

  if (yCoordinates.y1 === yCoordinates.y2) {
    const yAxisError = {
      error: buildError(BuildError.LINE_CHART_Y_AXIS_ZERO_LENGTH),
    };
    addError?.('LINE_CHART_Y_AXIS_ERROR', yAxisError);
    if (!error) {
      error = yAxisError;
    }
  }

  const baseContext = {
    addError,
    crossXAxis,
    crossYAxis,
    extraSpaceBottomY,
    extraSpaceLeftX,
    extraSpaceRightX,
    extraSpaceTopY,
    securityXSpace,
    securityYSpace,
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
