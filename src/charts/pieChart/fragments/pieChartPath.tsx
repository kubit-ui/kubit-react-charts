import { type FC, type ReactElement, useContext, useRef } from 'react';

import type { PathProps } from '@/components/path/path.types';
import { parseStringToNumberPx } from '@/utils/parseStringToNumberPx.ts/parseStringToNumberPx';

import { PieChartContext } from '../context/pieChartContext';
import { PieChartSegment } from './pieChartSegment';

/**
 * Renders the path for a pie chart.
 *
 * @component
 * @param {PathProps} props - The props for the PieChartPath component.
 * @param {string} props.dataKey - The key for the data to be rendered.
 * @param {number} props.innerRadius - The inner radius of the pie chart.
 * @param {number} props.gap - The gap between segments in the pie chart.
 * @param {number} props.radius - The radius of the pie chart.
 * @returns {ReactElement} The rendered PieChartPath component.
 */
export const PieChartPath: FC<PathProps> = ({
  dataKey,
  fill,
  gap,
  innerRadius,
  radius,
  ...props
}): ReactElement => {
  const key = String(dataKey);
  const { canvasHeight, canvasWidth, data, dataTestId, halfChart } = useContext(PieChartContext);
  const chartInitAngle = halfChart ? 0 : -Math.PI / 2; // ? 0deg : -90deg
  const startAngle = useRef<number>(chartInitAngle);
  const total = data[key]?.reduce((acc, group) => acc + group.value, 0);
  const singleStroke = data[key]?.length === 1;
  const parsedInnerRadius = innerRadius ? parseStringToNumberPx(innerRadius) : undefined;
  const parsedRadius = radius ? parseStringToNumberPx(radius) : undefined;

  return data[key]?.length ? (
    <g>
      {data[key].map((group, index) => (
        <PieChartSegment
          {...props}
          {...group}
          key={`${index.toString()}`}
          canvasHeight={canvasHeight}
          canvasWidth={canvasWidth}
          color={group.color || fill} // Use group color if available, otherwise use fill prop
          dataTestId={`${dataTestId}path-${index}`}
          gap={gap}
          halfChart={halfChart}
          innerRadius={parsedInnerRadius}
          radius={parsedRadius}
          singleStroke={singleStroke}
          startAngle={startAngle}
          total={total}
        />
      ))}
    </g>
  ) : (
    <></>
  );
};
