import type { BarChartIDataPoint } from '@/charts/barChart/barChart.type';
import type { IDataPoint } from '@/charts/lineChart/lineChart.type';
import type { DataItem } from '@/charts/pieChart/pieChart.type';

type ChartDataType = IDataPoint[] | BarChartIDataPoint[] | DataItem;

/**
 * Generates a fingerprint of chart data for use in React.useMemo dependencies
 * @param data - Chart data from LineChart, BarChart, or PieChart
 * @returns JSON string representation of the data
 */
export const getDataFingerprint = (data: ChartDataType): string => {
  // TODO: study and compare performance with other hash libraries or manual methods
  // ! Data might grow a lot in size, that is because this may be reviewed in the future
  return JSON.stringify(data);
};
