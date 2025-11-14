import type { BarChartTickValuesAxisProps } from '../barChart.type';

/**
 * Retrieves the data values from the given BarTickValuesAxisProps object.
 * @param data - The BarTickValuesAxisProps object containing the data values.
 * @returns An array of string values representing the data, or undefined if the data is invalid.
 */
export const getBarDataValues = (data: BarChartTickValuesAxisProps): string[] | undefined => {
  if (data.custom) {
    return data.custom?.values as string[];
  }
  if (data.numeric) {
    const { max, min = 0, step } = data.numeric;
    // Verify if the step is larger or equal than the range
    const range = Math.abs(max - min);
    if (step >= range || step <= 0) {
      return [min.toString()];
    }
    const stepper: string[] = [];
    for (let i = min; i <= max; i += step) {
      stepper.push(i.toString());
    }
    return stepper;
  }
  return undefined;
};
