import { useContext, useEffect } from 'react';

import { Path } from '@/components/path/path';
import {
  buildInnerRadiusOutOfRangeError,
  buildInvalidGroupError,
  buildInvalidInnerRadiusError,
  buildInvalidRadiusError,
  buildSegmentNegativeValueError,
  buildSegmentValueError,
} from '@/utils/buildErrors/buildErrors';

import { PieChartContext } from '../context/pieChartContext';
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
  dataKey,
  gap,
  halfChart,
  index,
  innerRadius,
  name,
  radius,
  singleStroke,
  startAngle,
  total,
  value,
  ...props
}): React.ReactElement => {
  const { addError } = useContext(PieChartContext);

  // Convert values to primitives for stable dependencies
  const numericValue = Number(value);
  const numericRadius = radius !== undefined ? Number(radius) : undefined;
  const numericInnerRadius = innerRadius !== undefined ? Number(innerRadius) : undefined;
  const trimmedName = name?.trim() || '';

  // Segment error validations
  useEffect(() => {
    // Validate segment has non-empty name property
    if (!trimmedName) {
      addError?.('PIE_CHART_SEGMENT_ERROR', {
        error: buildInvalidGroupError(dataKey || 'unknown', index || 0, 'name'),
      });
    }

    // Validate segment value is numeric
    if (isNaN(numericValue)) {
      addError?.('PIE_CHART_SEGMENT_ERROR', {
        error: buildSegmentValueError(value, trimmedName || `segment-${index}`),
      });
      return;
    }

    // Validate non-negative values
    if (numericValue < 0) {
      addError?.('PIE_CHART_SEGMENT_ERROR', {
        error: buildSegmentNegativeValueError(numericValue, trimmedName || `segment-${index}`),
      });
    }

    // Validate radius if provided
    if (numericRadius !== undefined) {
      if (isNaN(numericRadius) || numericRadius <= 0) {
        addError?.('PIE_CHART_SEGMENT_ERROR', {
          error: buildInvalidRadiusError(radius),
        });
      }
    }

    // Validate innerRadius if provided
    if (numericInnerRadius !== undefined) {
      if (isNaN(numericInnerRadius) || numericInnerRadius < 0) {
        addError?.('PIE_CHART_SEGMENT_ERROR', {
          error: buildInvalidInnerRadiusError(innerRadius),
        });
      }

      // Validate innerRadius < radius
      if (numericRadius !== undefined) {
        if (!isNaN(numericRadius) && !isNaN(numericInnerRadius)) {
          if (numericInnerRadius >= numericRadius) {
            addError?.('PIE_CHART_SEGMENT_ERROR', {
              error: buildInnerRadiusOutOfRangeError(numericInnerRadius, numericRadius),
            });
          }
        }
      }
    }
  }, [dataKey, index, numericInnerRadius, numericRadius, numericValue, trimmedName]);

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
