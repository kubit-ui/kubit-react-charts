interface TickNumeric {
  max: number;
  step: number;
  min?: number;
  breakAxis?: number;
}

/**
 * Returns the divisor for a given number.
 * The divisor is determined based on the number's divisibility by 2, 3, 4, or 5.
 * If the number is not divisible by any of these, the divisor is set to 1.
 *
 * @param number - The number for which to determine the divisor.
 * @returns The divisor for the given number.
 */
export const getDivisor = (number: number): number => {
  if (number % 3 === 0) {
    return 3;
  } if (number % 4 === 0) {
    return 4;
  } if (number % 5 === 0) {
    return 5;
  } if (number % 2 === 0) {
    return 2;
  }
  return 1;
};

/**
 * Builds the tick values for YAxis of a chart based on the provided data.
 * This is a fallback function that is used just in case no tickValues are provided as prop
 * Users should provide tickValues as prop to avoid using this basic fallback function
 *
 * @param data - An array of string values representing the data points.
 * @returns An object containing the numeric fallback tickValues for the YAxis of the chart.
 */
export const buildTickValues = (data: string[]): { numeric: TickNumeric } => {
  if (data.length === 0) {
    return { numeric: { max: 2, min: 0, step: 1 } };
  }

  const yMin = Math.min(...data.map(d => parseFloat(d)));
  const yMax = Math.max(...data.map(d => parseFloat(d)));

  const yRange = Math.abs(yMax - yMin);
  const step = yRange / 2;

  return {
    numeric: {
      max: yMax,
      min: yMin,
      step,
    },
  };
};
