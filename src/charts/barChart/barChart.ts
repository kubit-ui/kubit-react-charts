import { BarChartStructure } from './barChartStructure';
import { BarChartPath } from './fragments/barChartPath';
import { BarChartSeparator } from './fragments/barChartSeparator';
import { BarChartXAxis } from './fragments/barChartXAxis';
import { BarChartYAxis } from './fragments/barChartYAxis';

const BarChart = Object.assign(BarChartStructure, {
  Path: BarChartPath,
  Separator: BarChartSeparator,
  XAxis: BarChartXAxis,
  YAxis: BarChartYAxis,
});

export { BarChart };

export * from './barChart.type';
