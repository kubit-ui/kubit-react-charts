import { CustomBackgroundChartStructure } from './customBackgroundChartStructure';
import { CustomBackgroundChartPlot } from './fragments/customBackgroundChartPlot';

const CustomBackgroundChart = Object.assign(CustomBackgroundChartStructure, {
  Plot: CustomBackgroundChartPlot,
});

export { CustomBackgroundChart };

export * from './customBackgroundChart.type';
