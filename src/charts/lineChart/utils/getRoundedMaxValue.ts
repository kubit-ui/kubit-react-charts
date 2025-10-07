import type { IDataPoint } from '../lineChart.type';

/**
 * Extracts the maximum value from the data points that do not correspond to the provided key.
 * The maximum value is rounded up to the nearest multiple of 10.
 * @param data - The data points.
 * @param key - The key to exclude in the data.
 * @returns The rounded maximum value.
 */
export const getRoundedMaxValue = (data: IDataPoint[], key: string): number => {
  const values = data.flatMap(point =>
    Object.keys(point)
      .filter(k => k !== key && typeof point[k] === 'number')
      .map(k => point[k])
  );

  const maxNumber = Math.max(...values);
  return Math.ceil(maxNumber / 10) * 10;
};

/**
 * Returns an array of rounded maximum values for each yKey in the given data.
 * @param data - The array of data points.
 * @param xKey - The xKey used for filtering the data.
 * @returns An array of rounded maximum values.
 */
export const getYKeyRoundMaxValue = (data: IDataPoint[], xKey: string): number[] => {
  return data.flatMap(point =>
    Object.keys(point)
      .filter(k => k !== xKey && typeof point[k] === 'number')
      .map(k => point[k])
  );
};
