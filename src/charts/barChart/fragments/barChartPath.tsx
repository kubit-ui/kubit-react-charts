import { useContext, useEffect } from 'react';

import { Bar } from '@/components/bar/bar';
import { BarOrientation } from '@/components/bar/bar.type';
import {
  buildBarNegativeValueError,
  buildBarValueError,
  buildDataKeyNotFoundError,
} from '@/utils/buildErrors/buildErrors';
import { getPoints } from '@/utils/getPoints/getPoints';

import type { BarChartPathProps } from '../barChart.type';
import { BarChartContext } from '../context/barChartContext';

/**
 * Extracts the values for a specific key from the dataset
 * @param data Array of data points
 * @param key Key to extract values from
 * @returns Array of values for the given key
 */

export const BarChartPath: React.FC<BarChartPathProps> = ({
  barConfig,
  dataIdx,
  dataKey,
  order,
  ...props
}): React.ReactElement => {
  const { addError, xAxisCoordinates, yAxisCoordinates, ...context } = useContext(BarChartContext);
  const { coordinates: xACoord, tickValues: xTickValues } = xAxisCoordinates;
  const { coordinates: yACoord, tickValues: yTickValues } = yAxisCoordinates;

  const isVertical = context.orientation === BarOrientation.VERTICAL;
  const xKey = isVertical ? context.pKey : dataKey;
  const yKey = isVertical ? dataKey : context.pKey;

  // Safe data access
  const dataItem = context.data[dataIdx];
  const xData = dataItem?.[xKey];
  const yData = dataItem?.[yKey];

  // Path error validations - only validates the data for this specific bar
  useEffect(() => {
    // Validate dataKey exists in dataset
    if (
      context.data.length > 0 &&
      !Object.prototype.hasOwnProperty.call(context.data[0], dataKey)
    ) {
      addError?.('BAR_CHART_PATH_ERROR', {
        error: buildDataKeyNotFoundError(dataKey),
      });
      return; // Stop validation if dataKey doesn't exist
    }

    // Validate bar value is numeric
    const numericValue = Number(yData);
    if (isNaN(numericValue)) {
      addError?.('BAR_CHART_PATH_ERROR', {
        error: buildBarValueError(yData, dataKey),
      });
      return;
    }

    // Validate negative values
    if (numericValue < 0) {
      addError?.('BAR_CHART_PATH_ERROR', {
        error: buildBarNegativeValueError(numericValue, dataKey),
      });
    }
  }, [addError, context.data, dataKey, yData]);

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
