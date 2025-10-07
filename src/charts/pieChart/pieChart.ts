import { PieChartForeign } from './fragments/pieChartForeign';
import { PieChartPath } from './fragments/pieChartPath';
import { PieChartStructure } from './pieChartStructure';

const PieChart = Object.assign(PieChartStructure, {
  Foreign: PieChartForeign,
  Path: PieChartPath,
});

export { PieChart };

export * from './pieChart.type';
