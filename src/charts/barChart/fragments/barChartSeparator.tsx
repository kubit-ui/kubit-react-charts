import { type FC, type ReactElement, useContext } from 'react';

import { getPoints } from '@/utils/getPoints/getPoints';

import type { BarChartSeparatorProps } from '../barChart.type';
import { BarChartContext } from '../context/barChartContext';

export const BarChartSeparator: FC<BarChartSeparatorProps> = ({
  areaSeparator,
  dataTestId,
  rightSeparator,
  topSeparator,
  xBreakAxis,
  yBreakAxis,
}): ReactElement => {
  const { crossXAxis, crossYAxis, xAxisCoordinates, yAxisCoordinates } =
    useContext(BarChartContext);

  if (!topSeparator && !rightSeparator && !areaSeparator) {
    return <></>;
  }

  const customXEnd = xBreakAxis && getPoints(xAxisCoordinates.tickValues, [xBreakAxis], true)[0];
  const customYEnd = yBreakAxis && getPoints(yAxisCoordinates.tickValues, [yBreakAxis])[0];
  const autoXEnd = crossYAxis ? yAxisCoordinates.coordinates.x1 : xAxisCoordinates.coordinates.x2;
  const autoYEnd = crossXAxis ? xAxisCoordinates.coordinates.y1 : yAxisCoordinates.coordinates.y1;

  const xStart = xAxisCoordinates.coordinates.x1;
  const xEnd = customXEnd ?? autoXEnd;
  const yStart = yAxisCoordinates.coordinates.y2;
  const yEnd = customYEnd ?? autoYEnd;

  const squarePath = `M${xStart} ${yStart} H ${xEnd} V ${yEnd} H ${xStart} Z`;
  const lineTop = `M${xStart} ${yEnd} H ${xEnd}`;
  const lineRight = `M${xEnd} ${yStart} V ${yEnd}`;

  return (
    <g>
      <path d={squarePath} data-testid={`${dataTestId}Area`} {...areaSeparator} />
      <path d={lineTop} data-testid={`${dataTestId}Top`} {...topSeparator} />
      <path d={lineRight} data-testid={`${dataTestId}Right`} {...rightSeparator} />
    </g>
  );
};
