import { Children, type ReactElement, type ReactNode, isValidElement } from 'react';

import { Positions } from '@/types/position.enum';
import { buildTickValues } from '@/utils/buildTickValues/buildTickValues';

import { textBound } from '../../../utils/textBound/textBound';
import { LineChartXAxis } from '../fragments/lineChartXAxis';
import { LineChartYAxis } from '../fragments/lineChartYAxis';
import type { ChildrenType, IDataPoint, LineChartExtraSpacings } from '../lineChart.type';
import { getDataValues } from './getDataValues';
import { getYKeyRoundMaxValue } from './getRoundedMaxValue';
import {
  getXAxisLeftTextSpacing,
  getXAxisRightTextSpacing,
  getYAxisLeftTextSpacing,
  getYAxisRightTextSpacing,
} from './tickTextPosition';

const getBreakAxis = ({ tickValues, tickText }: { tickValues?: any; tickText?: any }) => {
  if (tickValues?.numeric) {
    return tickValues.numeric.breakAxis ?? 0;
  }
  return tickText?.custom?.breakAxis ?? 0;
};

const handleLineChartXAxis = (
  child: ReactElement,
  data: IDataPoint[],
  xKey: string,
  viewBox: string,
  canvasHeight: number,
  canvasWidth: number
) => {
  const { position = Positions.BOTTOM, tickText, tickValues, valueFormatter } = child.props as any;
  const fontSize = tickText?.fontSize ?? 0;

  const xData = tickValues ? (getDataValues(tickValues) as string[]) : data.map(d => d[xKey]);

  // Apply the valueFormatter if provided to get the actual rendered text width
  const formattedXData: string[] = valueFormatter ? xData.map(valueFormatter) : xData;

  const textWidth = textBound({
    bound: 'width',
    data: formattedXData,
    fontSize,
    svgHeight: `${canvasHeight}`,
    svgWidth: `${canvasWidth}`,
    viewBox,
  });
  const textHeight = textBound({
    bound: 'height',
    data: formattedXData,
    fontSize,
    svgHeight: `${canvasHeight}`,
    svgWidth: `${canvasWidth}`,
    viewBox,
  });

  const xAxisBottomSpacing = position === Positions.BOTTOM ? textHeight + (tickText?.top ?? 0) : 0;
  const xAxisTopSpacing = position === Positions.TOP ? textHeight + (tickText?.bottom ?? 0) : 0;

  const xBreakAxis = getBreakAxis({ tickValues, tickText });

  return {
    xAxisLeftSpacing: getXAxisLeftTextSpacing({
      textWidth,
      tickText,
    }),
    xAxisTopSpacing,
    xAxisRightSpacing: getXAxisRightTextSpacing({
      textWidth,
      tickText,
    }),
    xAxisBottomSpacing,
    lineChartXPosition: position,
    xBreakAxis,
    xData,
  };
};

const handleLineChartYAxis = (
  child: ReactElement,
  data: IDataPoint[],
  xKey: string,
  viewBox: string,
  canvasHeight: number,
  canvasWidth: number
) => {
  const { position = Positions.LEFT, tickText, tickValues, valueFormatter } = child.props as any;
  const fontSize = tickText?.fontSize ?? 0;

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
  const textHeight = textBound({
    bound: 'height',
    data: formattedYData,
    fontSize,
    svgHeight: `${canvasHeight}`,
    svgWidth: `${canvasWidth}`,
    viewBox,
  });

  return {
    yAxisLeftSpacing: getYAxisLeftTextSpacing({
      tickText,
      textWidth: yAxisText,
      yAxisPosition: position,
    }),
    yAxisTopSpacing: textHeight,
    yAxisRightSpacing: getYAxisRightTextSpacing({
      tickText,
      textWidth: yAxisText,
      yAxisPosition: position,
    }),
    yAxisBottomSpacing: 0,
    lineChartYPosition: position,
    yAxisText,
    yBreakAxis: getBreakAxis({ tickValues, tickText }),
    yData,
  };
};

interface GetExtraSpacing {
  children: ChildrenType;
  data: IDataPoint[];
  xKey: string;
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
  canvasHeight,
  canvasWidth,
  children,
  data,
  viewBox,
  xKey,
}: GetExtraSpacing): LineChartExtraSpacings => {
  let result: LineChartExtraSpacings = {
    xAxisLeftSpacing: 0,
    xAxisTopSpacing: 0,
    xAxisRightSpacing: 0,
    xAxisBottomSpacing: 0,
    yAxisLeftSpacing: 0,
    yAxisTopSpacing: 0,
    yAxisRightSpacing: 0,
    yAxisBottomSpacing: 0,
    lineChartXPosition: Positions.BOTTOM,
    lineChartYPosition: Positions.LEFT,
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
          ...handleLineChartXAxis(child, data, xKey, viewBox, canvasHeight, canvasWidth),
        };
      } else if (child.type === LineChartYAxis) {
        result = {
          ...result,
          ...handleLineChartYAxis(child, data, xKey, viewBox, canvasHeight, canvasWidth),
        };
      }
    }
  });

  return result;
};
