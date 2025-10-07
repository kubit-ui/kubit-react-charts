import type { TickData } from '@/components/tick/tick.types';
import type { ChartError } from '@/types/errors.type';
import { Positions } from '@/types/position.enum';
import { BuildError, buildError } from '@/utils/buildErrors/buildErrors';
import { getXCoordinates, getYCoordinates } from '@/utils/getCoordinates/getCoordinates';
import { getPoints } from '@/utils/getPoints/getPoints';
import { getXTicks, getYTicks } from '@/utils/getTicks/getTicks';

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
  ajustedX,
  ajustedY,
  canvasHeight,
  canvasWidth,
  children,
  data,
  viewBox,
  xKey,
}: BuildContextValue): Omit<LineChartContextType, OmitProps> => {
  let error: ChartError | undefined = undefined;
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
    canvasHeight,
    canvasWidth,
    children,
    data,
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
    maxSpaceAvailable: canvasWidth,
    otherAxisSpace: yAxisSpace,
    securitySpace: securityXSpace,
    tickValues: xData,
  });
  if ((xTickValues ?? []).some(({ position }) => isNaN(position))) {
    error = {
      error: buildError(BuildError.INVALID_X_TICK),
    };
  }
  /**
   * Calculate the tick values for the Y Axis.
   */
  const crossYAxis =
    lineChartYPosition !== Positions.LEFT && lineChartYPosition !== Positions.RIGHT;
  const otherAxisSpace = extraSpaceTopY + extraSpaceBottomY;
  const yTickValues = getYTicks({
    initPos: canvasHeight - extraSpaceBottomY,
    maxSpaceAvailable: canvasHeight,
    otherAxisSpace,
    securitySpace: securityYSpace,
    tickValues: yData,
  });

  /**
   * Calculate the custom breakAxis for the X and Y Axis.
   */
  const customBreakXAxis = crossXAxis ? getPoints(yTickValues || [], [String(xBreakAxis)])[0] : 0;
  const customBreakYAxis = crossYAxis ? getPoints(xTickValues || [], [String(yBreakAxis)])[0] : 0;

  /**
   * Calculate the X coordinates for the line chart.
   */
  const xCoordinates = getXCoordinates({
    canvasHeight,
    canvasWidth,
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
    canvasHeight,
    canvasWidth,
    customBreakAxis: Number(customBreakYAxis),
    extraSpaceBottomY,
    extraSpaceLeftX,
    extraSpaceRightX,
    extraSpaceTopY,
    position: lineChartYPosition as (typeof Positions)[keyof typeof Positions],
    securityYSpace,
  });

  if (error) {
    // return fallback context value with error
    return {
      crossXAxis,
      crossYAxis,
      error,
      extraSpaceBottomY,
      extraSpaceLeftX,
      extraSpaceRightX,
      extraSpaceTopY,
      securityXSpace,
      securityYSpace,
      xAxisCoordinates: {
        coordinates: xCoordinates,
        tickValues: [
          { position: 0, value: '0' },
          { position: canvasWidth, value: '1' },
        ] as TickData[],
      },
      xAxisText,
      yAxisCoordinates: {
        coordinates: yCoordinates,
        tickValues: [
          { position: canvasHeight, value: '0' },
          { position: 0, value: '1' },
        ] as TickData[],
      },
      yAxisText,
    };
  }

  return {
    crossXAxis,
    crossYAxis,
    extraSpaceBottomY,
    extraSpaceLeftX,
    extraSpaceRightX,
    extraSpaceTopY,
    securityXSpace,
    securityYSpace,
    xAxisCoordinates: { coordinates: xCoordinates, tickValues: xTickValues as TickData[] },
    xAxisText,
    yAxisCoordinates: { coordinates: yCoordinates, tickValues: yTickValues as TickData[] },
    yAxisText,
  };
};
