import { useContext } from 'react';

import { Bar } from '@/components/bar/bar';
import { BarOrientation } from '@/components/bar/bar.type';
import { getPoints } from '@/utils/getPoints/getPoints';

import type { BarChartPathProps } from '../barChart.type';
import { BarChartContext } from '../context/barChartContext';

export const BarChartPath: React.FC<BarChartPathProps> = ({
  barConfig,
  dataIdx,
  dataKey,
  order,
  ...props
}): React.ReactElement => {
  const { xAxisCoordinates, yAxisCoordinates, ...context } = useContext(BarChartContext);
  const { coordinates: xACoord, tickValues: xTickValues } = xAxisCoordinates;
  const { coordinates: yACoord, tickValues: yTickValues } = yAxisCoordinates;

  const isVertical = context.orientation === BarOrientation.VERTICAL;
  const xKey = isVertical ? context.pKey : dataKey;
  const yKey = isVertical ? dataKey : context.pKey;

  const xData = context.data[dataIdx][xKey];
  const yData = context.data[dataIdx][yKey];
  const xPoint = getPoints(xTickValues, [String(xData)], true)[0];
  const yPoint = getPoints(yTickValues, [String(yData)])[0];

  const points = isVertical
    ? {
        x1: xPoint,
        x2: xPoint,
        y1: xACoord.y1,
        y2: yPoint,
      }
    : {
        x1: yACoord.x1,
        x2: xPoint,
        y1: yPoint,
        y2: yPoint,
      };

  return (
    <Bar
      barConfig={barConfig}
      currentBars={context.barChildrenCount}
      extraSpacing={context.gapBetweenBars}
      order={order}
      orientation={context.orientation}
      {...points}
      {...props}
    />
  );
};
