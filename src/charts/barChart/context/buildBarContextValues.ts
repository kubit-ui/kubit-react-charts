import { BarOrientation } from '@/components/bar/bar.type';
import type { TickData } from '@/components/tick/tick.types';
import { Positions } from '@/types/position.enum';
import { getXCoordinates, getYCoordinates } from '@/utils/getCoordinates/getCoordinates';
import { getPoints } from '@/utils/getPoints/getPoints';
import { getXTicks, getYTicks } from '@/utils/getTicks/getTicks';

import type {
  BarChartChildrenType,
  BarChartContextType,
  BarChartIDataPoint,
} from '../barChart.type';
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
    canvasHeight,
    canvasWidth,
    children,
    data,
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
    maxSpaceAvailable: canvasWidth,
    otherAxisSpace: yAxisSpace,
    securitySpace: securityXSpace,
    tickValues: xData,
  });
  /**
   * Calculate the tick values for the Y Axis.
   */
  const crossYAxis = barChartYPosition !== Positions.LEFT && barChartYPosition !== Positions.RIGHT;
  const otherAxisSpace = extraSpaceTopY + extraSpaceBottomY;
  const yTickValue = getYTicks({
    initPos: canvasHeight - extraSpaceBottomY,
    maxSpaceAvailable: canvasHeight,
    needAjusted: orientation === BarOrientation.HORIZONTAL,
    otherAxisSpace,
    securitySpace: securityYSpace,
    tickValues: yData,
  });

  /**
   * Calculate the custom breakAxis for the X and Y Axis.
   */
  const customBreakXAxis = crossXAxis ? getPoints(yTickValue || [], [String(xBreakAxis)])[0] : 0;
  const customBreakYAxis = crossYAxis ? getPoints(xTickValue || [], [String(yBreakAxis)])[0] : 0;

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
    position: barChartXPosition,
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
    position: barChartYPosition as unknown as (typeof Positions)[keyof typeof Positions],
    securityYSpace,
  });

  return {
    crossXAxis,
    crossYAxis,
    extraSpaceBottomY,
    extraSpaceLeftX,
    extraSpaceRightX,
    extraSpaceTopY,
    securityXSpace,
    securityYSpace,
    xAxisCoordinates: { coordinates: xCoordinates, tickValues: xTickValue as TickData[] },
    xAxisText,
    yAxisCoordinates: { coordinates: yCoordinates, tickValues: yTickValue as TickData[] },
    yAxisText,
  };
};
