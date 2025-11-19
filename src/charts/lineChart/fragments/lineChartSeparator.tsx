import { type FC, type ReactElement, useContext, useEffect } from 'react';

import {
  BuildError,
  buildError,
  buildSeparatorXBreakAxisError,
  buildSeparatorXOutOfRangeError,
  buildSeparatorYBreakAxisError,
  buildSeparatorYOutOfRangeError,
} from '@/utils/buildErrors/buildErrors';
import { getPoints } from '@/utils/getPoints/getPoints';

import { LineChartContext } from '../context/lineChartContext';
import type { LineChartSeparatorProps } from '../lineChart.type';

export const LineChartSeparator: FC<LineChartSeparatorProps> = ({
  areaSeparator,
  dataTestId,
  rightSeparator,
  topSeparator,
  xBreakAxis,
  yBreakAxis,
}): ReactElement => {
  const { addError, crossXAxis, crossYAxis, xAxisCoordinates, yAxisCoordinates } =
    useContext(LineChartContext);

  // Extract tick values for stable dependencies
  const xTickValues = xAxisCoordinates.tickValues;
  const yTickValues = yAxisCoordinates.tickValues;

  // Pre-calculate numeric values for dependencies
  const xBreakNumeric =
    xBreakAxis !== undefined
      ? typeof xBreakAxis === 'string'
        ? parseFloat(xBreakAxis)
        : xBreakAxis
      : undefined;
  const yBreakNumeric =
    yBreakAxis !== undefined
      ? typeof yBreakAxis === 'string'
        ? parseFloat(yBreakAxis)
        : yBreakAxis
      : undefined;

  // Separator error validations
  useEffect(() => {
    // xBreakAxis validation
    if (xBreakAxis !== undefined) {
      const xValues = xTickValues.map(tick => tick.value);

      if (xBreakNumeric === undefined || isNaN(xBreakNumeric)) {
        addError?.('LINE_CHART_SEPARATOR_ERROR', {
          error: buildSeparatorXBreakAxisError(xBreakAxis),
        });
      } else {
        const minX = Math.min(...xValues.map(v => (typeof v === 'string' ? parseFloat(v) : v)));
        const maxX = Math.max(...xValues.map(v => (typeof v === 'string' ? parseFloat(v) : v)));

        if (xBreakNumeric < minX || xBreakNumeric > maxX) {
          addError?.('LINE_CHART_SEPARATOR_ERROR', {
            error: buildSeparatorXOutOfRangeError(xBreakNumeric, minX, maxX),
          });
        }
      }
    }

    // yBreakAxis validation
    if (yBreakAxis !== undefined) {
      const yValues = yTickValues.map(tick => tick.value);

      if (yBreakNumeric === undefined || isNaN(yBreakNumeric)) {
        addError?.('LINE_CHART_SEPARATOR_ERROR', {
          error: buildSeparatorYBreakAxisError(yBreakAxis),
        });
      } else {
        const minY = Math.min(...yValues.map(v => (typeof v === 'string' ? parseFloat(v) : v)));
        const maxY = Math.max(...yValues.map(v => (typeof v === 'string' ? parseFloat(v) : v)));

        if (yBreakNumeric < minY || yBreakNumeric > maxY) {
          addError?.('LINE_CHART_SEPARATOR_ERROR', {
            error: buildSeparatorYOutOfRangeError(yBreakNumeric, minY, maxY),
          });
        }
      }
    }
  }, [xBreakAxis, xBreakNumeric, xTickValues, yBreakAxis, yBreakNumeric, yTickValues]);

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

  // Separator positioning validation
  useEffect(() => {
    if (xStart === xEnd && yStart === yEnd) {
      addError?.('LINE_CHART_SEPARATOR_ERROR', {
        error: buildError(BuildError.LINE_CHART_SEPARATOR_INVALID_COORDINATES),
      });
    }
  }, [xStart, xEnd, yStart, yEnd]);

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
