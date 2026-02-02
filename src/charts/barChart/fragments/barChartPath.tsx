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
  focusConfig,
  onBlur,
  onFocus,
  order,
  tabIndex,
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

  // Extract values for stable dependencies
  const firstDataItem = context.data[0];
  const hasDataKey = firstDataItem
    ? Object.prototype.hasOwnProperty.call(firstDataItem, dataKey)
    : false;
  const hasData = context.data.length > 0;
  const numericYData = Number(yData);

  // Path error validations - only validates the data for this specific bar
  useEffect(() => {
    // Validate dataKey exists in dataset
    if (hasData && !hasDataKey) {
      addError?.('BAR_CHART_PATH_ERROR', {
        error: buildDataKeyNotFoundError(dataKey),
      });
      return; // Stop validation if dataKey doesn't exist
    }

    // Validate bar value is numeric
    if (isNaN(numericYData)) {
      addError?.('BAR_CHART_PATH_ERROR', {
        error: buildBarValueError(yData, dataKey),
      });
      return;
    }

    // Validate negative values
    if (numericYData < 0) {
      addError?.('BAR_CHART_PATH_ERROR', {
        error: buildBarNegativeValueError(numericYData, dataKey),
      });
    }
  }, [dataKey, hasData, hasDataKey, numericYData, yData]);

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
      dataKey={dataKey}
      extraSpacing={context.gapBetweenBars}
      focusConfig={focusConfig}
      order={order}
      orientation={context.orientation}
      tabIndex={tabIndex}
      xData={xData}
      xKey={xKey}
      yData={yData}
      yKey={yKey}
      onBlur={onBlur}
      onFocus={onFocus}
      {...points}
      {...props}
    />
  );
};
