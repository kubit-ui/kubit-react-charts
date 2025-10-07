import { LineChartPath } from './fragments/lineChartPath';
import { LineChartSeparator } from './fragments/lineChartSeparator';
import { LineChartXAxis } from './fragments/lineChartXAxis';
import { LineChartYAxis } from './fragments/lineChartYAxis';
import { LineChartStructure } from './lineChartStructure';

const LineChart = Object.assign(LineChartStructure, {
  Path: LineChartPath,
  Separator: LineChartSeparator,
  XAxis: LineChartXAxis,
  YAxis: LineChartYAxis,
});

export { LineChart };

export * from './lineChart.type';
