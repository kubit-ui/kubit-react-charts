import type { TickValuesAxisProps } from '../lineChart.type';

/**
 * Retrieves the data values from the given TickValuesAxisProps object.
 * @param data - The TickValuesAxisProps object containing the data values.
 * @returns An array of string values representing the data, or undefined if the data is invalid.
 */
export const getDataValues = (data: TickValuesAxisProps): string[] | undefined => {
  if (data.custom) {
    return data.custom?.values as string[];
  }
  if (data.numeric) {
    const { max, min = 0, step } = data.numeric;

    // Verify if the step is larger or equal than the range
    const range = Math.abs(max - min);
    if (step >= range || step <= 0) {
      return [min.toString(), max.toString()];
    }

    const stepper: string[] = [];
    for (let i = min; i <= max; i += step) {
      stepper.push(i.toString());
    }
    return stepper;
  }
  return undefined;
};
