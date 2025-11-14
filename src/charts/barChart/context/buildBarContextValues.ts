import { BarOrientation } from '@/components/bar/bar.type';
import { type ChartError, ErrorType } from '@/types/errors.type';
import { Positions } from '@/types/position.enum';
import {
  BuildError,
  buildBarDistributionError,
  buildCanvasDimensionsError,
  buildError,
} from '@/utils/buildErrors/buildErrors';
import { getXCoordinates, getYCoordinates } from '@/utils/getCoordinates/getCoordinates';
import { getPoints } from '@/utils/getPoints/getPoints';
import { getXTicks, getYTicks } from '@/utils/getTicks/getTicks';

import {
  AXIS_VALIDATION,
  BAR_CHART_DEFAULTS,
  BAR_CHART_FALLBACK_DATA,
  BREAK_AXIS_DEFAULTS,
  CHART_CANVAS_DEFAULTS,
  SHARED_FALLBACK_DATA,
} from '../../constants/chartDefaults';
import type {
  BarChartChildrenType,
  BarChartContextType,
  BarChartIDataPoint,
} from '../barChart.type';
import { countBarChildren } from '../utils/countBarChildren';
import { getAxisExtraSpacing } from '../utils/getAxisExtraSpacing';

interface BuildContextValue {
  children: BarChartChildrenType;
  data: BarChartIDataPoint[];
  pKey: string;
  ajustedX: number;
  ajustedY: number;
  canvasHeight: number;
  canvasWidth: number;
  gapBetweenBars: number;
  orientation: (typeof BarOrientation)[keyof typeof BarOrientation];
  viewBox: string;
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}

type OmitProps =
  | 'data'
  | 'pKey'
  | 'canvasHeight'
  | 'canvasWidth'
  | 'canvasExtraSpace'
  | 'xBreakAxis'
  | 'yBreakAxis'
  | 'xCursor'
  | 'yCursor'
  | 'barChildrenCount'
  | 'orientation';

/**
 * Builds the context value for the line chart.
 *
 * @param {BuildContextValue} options - The options for building the context value.
 * @returns {LineContextValue} - The built context value.
 */
export const buildBarContextValue = ({
  addError,
  ajustedX,
  ajustedY,
  canvasHeight,
  canvasWidth,
  children,
  data,
  gapBetweenBars,
  orientation,
  pKey,
  viewBox,
}: BuildContextValue): Omit<BarChartContextType, OmitProps> => {
  let error: Omit<ChartError, 'type'> | undefined = undefined;

  // 1. Validate data exists
  if (!data || data.length === 0) {
    const dataError = {
      error: buildError(BuildError.BAR_CHART_NO_DATA),
    };
    addError?.('BAR_CHART_CONTEXT_ERROR', dataError);
    error = dataError;
  }

  // 2. Validate canvas dimensions
  if (canvasWidth <= 0 || canvasHeight <= 0) {
    const canvasError = {
      error: buildCanvasDimensionsError(canvasWidth, canvasHeight),
    };
    addError?.('BAR_CHART_CONTEXT_ERROR', canvasError);
    error = canvasError;
  }

  // 3. Validate bar spacing and distribution
  const barChildrenCount = countBarChildren(children);
  const defaultBarWidth = BAR_CHART_DEFAULTS.BAR_WIDTH; // Default width used in BarChartPath
  const requiredSpace = barChildrenCount * defaultBarWidth;
  const totalGapSpace = (barChildrenCount - 1) * gapBetweenBars;
  const availableSpace = orientation === BarOrientation.VERTICAL ? canvasWidth : canvasHeight;

  if (requiredSpace + totalGapSpace > availableSpace) {
    const distributionError = {
      error: buildBarDistributionError(
        'all',
        `Insufficient space: requires ${requiredSpace + totalGapSpace}px but only ${availableSpace}px available`
      ),
    };
    addError?.('BAR_CHART_CONTEXT_ERROR', distributionError);
    error = distributionError;
  }

  // Use safe defaults for data processing if there are critical errors
  const safeData =
    data && data.length > 0
      ? data
      : [
          {
            [BAR_CHART_FALLBACK_DATA.FALLBACK_SECONDARY_KEY]:
              BAR_CHART_FALLBACK_DATA.DEFAULT_X_VALUE,
            [pKey]: SHARED_FALLBACK_DATA.FALLBACK_PKEY_FIRST,
          },
          {
            [BAR_CHART_FALLBACK_DATA.FALLBACK_SECONDARY_KEY]:
              BAR_CHART_FALLBACK_DATA.DEFAULT_X_VALUE,
            [pKey]: SHARED_FALLBACK_DATA.FALLBACK_PKEY_SECOND,
          },
        ];
  const safeCanvasWidth = canvasWidth > 0 ? canvasWidth : CHART_CANVAS_DEFAULTS.SAFE_WIDTH;
  const safeCanvasHeight = canvasHeight > 0 ? canvasHeight : CHART_CANVAS_DEFAULTS.SAFE_HEIGHT;

  /**
   * Get the extra spacings for the line chart.
   */
  const {
    barChartXPosition,
    barChartYPosition,
    extraSpaceBottomY,
    extraSpaceLeftX,
    extraSpaceRightX,
    extraSpaceTopY,
    securityXSpace,
    securityYSpace,
    xAxisText,
    xBreakAxis,
    xData,
    yAxisText,
    yBreakAxis,
    yData,
  } = getAxisExtraSpacing({
    ajustedX,
    ajustedY,
    canvasHeight: safeCanvasHeight,
    canvasWidth: safeCanvasWidth,
    children,
    data: safeData,
    gapBetweenBars,
    orientation,
    pKey,
    viewBox,
  });

  /**
   * Calculate the tick values for the X Axis.
   */
  const crossXAxis = barChartXPosition !== Positions.TOP && barChartXPosition !== Positions.BOTTOM;
  const yAxisSpace = extraSpaceLeftX + extraSpaceRightX;
  const xTickValue = getXTicks({
    initPos: extraSpaceLeftX,
    maxSpaceAvailable: safeCanvasWidth,
    otherAxisSpace: yAxisSpace,
    securitySpace: securityXSpace,
    tickValues: xData,
  });
  if ((xTickValue ?? []).some(({ position }) => isNaN(position))) {
    const xTickError = {
      error: buildError(BuildError.INVALID_X_TICK),
    };
    addError?.('BAR_CHART_CONTEXT_ERROR', xTickError);
    error = xTickError;
  }

  // Validate X-axis tick values
  if (xTickValue) {
    const hasInsufficientTicks = xTickValue.length < AXIS_VALIDATION.MIN_TICK_COUNT;
    const hasIdenticalValues =
      xTickValue.length >= AXIS_VALIDATION.MIN_TICK_COUNT &&
      new Set(xTickValue.map(tick => tick.value)).size === AXIS_VALIDATION.UNIQUE_VALUE_THRESHOLD;

    if (hasInsufficientTicks) {
      const xAxisError = {
        error: buildError(BuildError.LINE_CHART_X_AXIS_INSUFFICIENT_TICKS),
      };
      addError?.('BAR_CHART_X_AXIS_ERROR', xAxisError);
      if (!error) {
        error = xAxisError;
      }
    }

    if (hasIdenticalValues) {
      const xAxisError = {
        error: buildError(BuildError.LINE_CHART_X_AXIS_IDENTICAL_VALUES),
      };
      addError?.('BAR_CHART_X_AXIS_ERROR', xAxisError);
      if (!error) {
        error = xAxisError;
      }
    }
  }
  /**
   * Calculate the tick values for the Y Axis.
   */
  const crossYAxis = barChartYPosition !== Positions.LEFT && barChartYPosition !== Positions.RIGHT;
  const otherAxisSpace = extraSpaceTopY + extraSpaceBottomY;
  const yTickValue = getYTicks({
    initPos: safeCanvasHeight - extraSpaceBottomY,
    maxSpaceAvailable: safeCanvasHeight,
    needAjusted: orientation === BarOrientation.HORIZONTAL,
    otherAxisSpace,
    securitySpace: securityYSpace,
    tickValues: yData,
  });

  // Validate Y-axis tick values
  if (yTickValue) {
    const hasInsufficientTicks = yTickValue.length < AXIS_VALIDATION.MIN_TICK_COUNT;
    const hasIdenticalValues =
      yTickValue.length >= AXIS_VALIDATION.MIN_TICK_COUNT &&
      new Set(yTickValue.map(tick => tick.value)).size === AXIS_VALIDATION.UNIQUE_VALUE_THRESHOLD;

    if (hasInsufficientTicks) {
      const yAxisError = {
        error: buildError(BuildError.LINE_CHART_Y_AXIS_INSUFFICIENT_TICKS),
      };
      addError?.('BAR_CHART_Y_AXIS_ERROR', yAxisError);
      if (!error) {
        error = yAxisError;
      }
    }

    if (hasIdenticalValues) {
      const yAxisError = {
        error: buildError(BuildError.LINE_CHART_Y_AXIS_IDENTICAL_VALUES),
      };
      addError?.('BAR_CHART_Y_AXIS_ERROR', yAxisError);
      if (!error) {
        error = yAxisError;
      }
    }
  }

  /**
   * Calculate the custom breakAxis for the X and Y Axis.
   */
  const customBreakXAxis = crossXAxis
    ? getPoints(yTickValue || [], [String(xBreakAxis)])[0]
    : BREAK_AXIS_DEFAULTS.DEFAULT_BREAK_VALUE;
  const customBreakYAxis = crossYAxis
    ? getPoints(xTickValue || [], [String(yBreakAxis)])[0]
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
    position: barChartXPosition,
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
    position: barChartYPosition as unknown as (typeof Positions)[keyof typeof Positions],
    securityYSpace,
  });

  // Validate axis coordinates for zero-length axes
  if (xCoordinates.x1 === xCoordinates.x2) {
    const xAxisError = {
      error: buildError(BuildError.LINE_CHART_X_AXIS_ZERO_LENGTH),
    };
    addError?.('BAR_CHART_X_AXIS_ERROR', xAxisError);
    if (!error) {
      error = xAxisError;
    }
  }

  if (yCoordinates.y1 === yCoordinates.y2) {
    const yAxisError = {
      error: buildError(BuildError.LINE_CHART_Y_AXIS_ZERO_LENGTH),
    };
    addError?.('BAR_CHART_Y_AXIS_ERROR', yAxisError);
    if (!error) {
      error = yAxisError;
    }
  }

  const baseContext = {
    addError,
    crossXAxis,
    crossYAxis,
    data: safeData,
    extraSpaceBottomY,
    extraSpaceLeftX,
    extraSpaceRightX,
    extraSpaceTopY,
    securityXSpace,
    securityYSpace,
    xAxisCoordinates: {
      coordinates: xCoordinates,
      tickValues:
        xTickValue ||
        (error
          ? [
              {
                position: BREAK_AXIS_DEFAULTS.DEFAULT_BREAK_VALUE,
                value: SHARED_FALLBACK_DATA.FALLBACK_PKEY_FIRST,
              },
              { position: safeCanvasWidth, value: SHARED_FALLBACK_DATA.FALLBACK_PKEY_SECOND },
            ]
          : []),
    },
    xAxisText,
    yAxisCoordinates: {
      coordinates: yCoordinates,
      tickValues:
        yTickValue ||
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
      error: { ...error, type: ErrorType.BAR_CHART_CONTEXT_ERROR },
    };
  }

  return baseContext;
};
