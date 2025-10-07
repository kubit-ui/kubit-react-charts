import { Path } from '@/components/path/path';

import type { PieChartSegmentProps } from '../pieChart.type';
import { calculateSegmentPath } from '../utils/calculateSegmentPath';

/**
 * Renders a segment of a pie chart.
 *
 * @param total - The total value of the pie chart.
 * @param startAngle - The starting angle of the segment.
 * @param canvasWidth - The width of the canvas.
 * @param canvasHeight - The height of the canvas.
 * @param innerRadius - The inner radius of the segment.
 * @param gap - The gap between segments.
 * @param radius - The radius of the segment.
 * @param value - The value of the segment.
 * @param color - The color of the segment (default: 'blue').
 * @param props - Additional props to pass to the Path component.
 * @returns A React element representing the pie chart segment.
 */
export const PieChartSegment: React.FC<PieChartSegmentProps> = ({
  canvasHeight,
  canvasWidth,
  color = 'blue',
  gap,
  halfChart,
  innerRadius,
  radius,
  singleStroke,
  startAngle,
  total,
  value,
  ...props
}): React.ReactElement => {
  const pathData = calculateSegmentPath({
    canvasHeight,
    canvasWidth,
    customRadius: radius,
    gap: gap as number,
    halfChart,
    innerRadius: innerRadius as number,
    singleStroke,
    startAngle,
    total,
    value,
  });

  return (
    <Path
      {...props}
      d={pathData}
      dataValue={value}
      fill={color} // Default color to blue if not specified
    />
  );
};
