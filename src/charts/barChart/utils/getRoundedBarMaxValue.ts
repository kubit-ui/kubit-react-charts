import type { BarChartIDataPoint } from '../barChart.type';

/**
 * Returns an array of rounded maximum values for each yKey in the given data.
 * @param data - The array of data points.
 * @param xKey - The xKey used for filtering the data.
 * @returns An array of rounded maximum values.
 */
export const getBarKeyRoundMaxValue = (data: BarChartIDataPoint[], Key: string): number[] => {
  return data.flatMap(point =>
    Object.keys(point)
      .filter(k => k !== Key && typeof point[k] === 'number')
      .map(k => Number(point[k]))
  );
};
