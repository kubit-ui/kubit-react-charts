import { type FC, type ReactElement, useContext, useEffect, useRef } from 'react';

import type { PathProps } from '@/components/path/path.types';
import {
  buildEmptyDataArrayError,
  buildInvalidTotalError,
  buildPieDataKeyNotFoundError,
} from '@/utils/buildErrors/buildErrors';
import { parseStringToNumberPx } from '@/utils/parseStringToNumberPx.ts/parseStringToNumberPx';

import { PieChartContext } from '../context/pieChartContext';
import { buildAriaLabel } from '../utils/accessibility';
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
  ariaLabel: deprecatedAriaLabel,
  ['aria-label']: ariaLabel,
  dataKey,
  fill,
  gap,
  innerRadius,
  radius,
  ...props
}): ReactElement => {
  const key = String(dataKey);
  const { addError, canvasHeight, canvasWidth, data, dataTestId, halfChart } =
    useContext(PieChartContext);
  const chartInitAngle = halfChart ? 0 : -Math.PI / 2; // ? 0deg : -90deg
  const startAngle = useRef<number>(chartInitAngle);

  // Extract data for this key to optimize useEffect dependencies
  const dataArray = data[key];
  const hasDataKey = Object.prototype.hasOwnProperty.call(data, key);

  // Path error validations
  useEffect(() => {
    // Validate dataKey exists in dataset
    if (!hasDataKey) {
      addError?.('PIE_CHART_PATH_ERROR', {
        error: buildPieDataKeyNotFoundError(key),
      });
      return;
    }

    // Validate data array exists and is not empty
    if (!dataArray || dataArray.length === 0) {
      addError?.('PIE_CHART_PATH_ERROR', {
        error: buildEmptyDataArrayError(key),
      });
      return;
    }

    // Calculate total and validate
    const calculatedTotal = dataArray.reduce((acc, group) => acc + group.value, 0);
    if (calculatedTotal <= 0 || isNaN(calculatedTotal)) {
      addError?.('PIE_CHART_PATH_ERROR', {
        error: buildInvalidTotalError(key, calculatedTotal),
      });
    }
  }, [dataArray, hasDataKey, key]);

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
          ariaLabel={buildAriaLabel({
            ariaLabel: ariaLabel || deprecatedAriaLabel,
            dataKey: key,
            index: index,
            groupName: group.name,
            groupValue: group.value,
          })}
          canvasHeight={canvasHeight}
          canvasWidth={canvasWidth}
          color={group.color || fill} // Use group color if available, otherwise use fill prop
          dataKey={key}
          dataTestId={`${dataTestId}path-${index}`}
          gap={gap}
          halfChart={halfChart}
          index={index}
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
