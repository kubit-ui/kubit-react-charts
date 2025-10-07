import { Children, type ReactElement, type ReactNode, isValidElement } from 'react';

import { Positions } from '@/types/position.enum';
import { buildTickValues } from '@/utils/buildTickValues/buildTickValues';

import { textBound } from '../../../utils/textBound/textBound';
import { LineChartXAxis } from '../fragments/lineChartXAxis';
import { LineChartYAxis } from '../fragments/lineChartYAxis';
import type { ChildrenType, IDataPoint, LineChartExtraSpacings } from '../lineChart.type';
import { getDataValues } from './getDataValues';
import { getYKeyRoundMaxValue } from './getRoundedMaxValue';

const handleLineChartXAxis = (
  child: ReactElement,
  data: IDataPoint[],
  xKey: string,
  ajustedX: number,
  viewBox: string,
  canvasHeight: number,
  canvasWidth: number
) => {
  const { position, tickText, tickValues, valueFormatter } = child.props;
  const fontSize = tickText?.fontSize ?? 0;
  const spaceFontSize = fontSize * ajustedX;

  const xData = tickValues ? (getDataValues(tickValues) as string[]) : data.map(d => d[xKey]);

  // Apply the valueFormatter if provided to get the actual rendered text width
  const formattedXData: string[] = valueFormatter ? xData.map(valueFormatter) : xData;

  const securityXSpace = textBound({
    bound: 'width',
    data: formattedXData,
    fontSize,
    svgHeight: `${canvasHeight}`,
    svgWidth: `${canvasWidth}`,
    viewBox,
  });

  const isBottomPosition = position === Positions.BOTTOM;
  const isTopPosition = position === Positions.TOP;

  const extraSpaceBottomY = isBottomPosition ? spaceFontSize + (tickText?.top ?? 0) : 0;
  const extraSpaceTopY = isTopPosition ? spaceFontSize + (tickText?.bottom ?? 0) : 0;
  const lineChartXPosition = (() => position || Positions.BOTTOM)();

  const getBreakAxis = () => {
    if (tickValues?.numeric) {
      return tickValues.numeric.breakAxis ?? 0;
    }
    return tickText?.custom?.breakAxis ?? 0;
  };
  const xBreakAxis = getBreakAxis();

  return {
    extraSpaceBottomY,
    extraSpaceTopY,
    lineChartXPosition,
    securityXSpace,
    xBreakAxis,
    xData,
  };
};

const handleLineChartYAxis = (
  child: ReactElement,
  data: IDataPoint[],
  xKey: string,
  ajustedY: number,
  viewBox: string,
  canvasHeight: number,
  canvasWidth: number
) => {
  const { position, tickText, tickValues, valueFormatter } = child.props;
  const fontSize = tickText?.fontSize ?? '0';
  const spaceFontSize = fontSize * ajustedY;

  const dataValues =
    tickValues ||
    buildTickValues([...new Set(getYKeyRoundMaxValue(data, xKey) as unknown as string[])]);

  const yData = getDataValues(dataValues) as string[];

  // Apply the valueFormatter if provided to get the actual rendered text width
  const formattedYData: string[] = valueFormatter ? yData.map(valueFormatter) : yData;

  const yAxisText = textBound({
    bound: 'width',
    data: formattedYData,
    fontSize: fontSize,
    svgHeight: `${canvasHeight}`,
    svgWidth: `${canvasWidth}`,
    viewBox,
  });
  const securityYSpace = spaceFontSize;

  const isLeftPosition = position === Positions.LEFT;
  const isRightPosition = position === Positions.RIGHT;

  const extraSpaceLeftX = isLeftPosition ? yAxisText + (tickText?.right ?? 0) : 0;
  const extraSpaceRightX = isRightPosition ? yAxisText + (tickText?.left ?? 0) : 0;
  const lineChartYPosition = position || Positions.LEFT;

  const getBreakAxis = () => {
    if (tickValues?.numeric) {
      return tickValues.numeric.breakAxis ?? 0;
    }
    return tickText?.custom?.breakAxis ?? 0;
  };
  const yBreakAxis = getBreakAxis();

  return {
    extraSpaceLeftX,
    extraSpaceRightX,
    lineChartYPosition,
    securityYSpace,
    yAxisText,
    yBreakAxis,
    yData,
  };
};

interface GetExtraSpacing {
  children: ChildrenType;
  data: IDataPoint[];
  xKey: string;
  ajustedX: number;
  ajustedY: number;
  viewBox: string;
  canvasHeight: number;
  canvasWidth: number;
}

/**
 * Calculates the extra spacing required for a line chart.
 * @param {GetExtraSpacing} options - The options for calculating extra spacing.
 * @returns {LineChartExtraSpacings} - The calculated extra spacings for the line chart.
 */
export const getExtraSpacing = ({
  ajustedX,
  ajustedY,
  canvasHeight,
  canvasWidth,
  children,
  data,
  viewBox,
  xKey,
}: GetExtraSpacing): LineChartExtraSpacings => {
  let result = {
    extraSpaceBottomY: 0,
    extraSpaceLeftX: 0,
    extraSpaceRightX: 0,
    extraSpaceTopY: 0,
    lineChartXPosition: Positions.BOTTOM,
    lineChartYPosition: Positions.LEFT,
    securityXSpace: 0,
    securityYSpace: 0,
    xAxisText: 0,
    xBreakAxis: 0,
    xData: [] as string[],
    yAxisText: 0,
    yBreakAxis: 0,
    yData: [] as string[],
  };

  Children.forEach(children, (child: ReactNode) => {
    if (isValidElement(child)) {
      if (child.type === LineChartXAxis) {
        result = {
          ...result,
          ...handleLineChartXAxis(child, data, xKey, ajustedX, viewBox, canvasHeight, canvasWidth),
        };
      } else if (child.type === LineChartYAxis) {
        result = {
          ...result,
          ...handleLineChartYAxis(child, data, xKey, ajustedY, viewBox, canvasHeight, canvasWidth),
        };
      }
    }
  });

  return result;
};
