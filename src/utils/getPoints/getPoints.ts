import type { TickData } from '@/components/tick/tick.types';

/**
 * Calculates the positions of data points on the chart based on tick values and data values.
 * @param tickValues - An array of tick data objects.
 * @param data - An array of data values.
 * @param xAxis - Optional parameter indicating whether the points are for the x-axis. Defaults to false.
 * @returns An array of numbers representing the positions of the data points.
 */
export const getPoints = (tickValues: TickData[], data: string[], xAxis?: boolean): number[] => {
  return data.map(dt => {
    // IF NOT A NUMBER, FIND THE POSITION OF THE TICK
    if (isNaN(Number(dt))) {
      const located = tickValues.find(tick => String(tick.value) === String(dt));
      return located ? located.position : 0;
    }
    // FIND THE CLOSEST TICK
    const { index, tick } = tickValues.reduce(
      (prev, curr, tickiIndex) => {
        return Math.abs(Number(curr.value) - Number(dt)) <=
          Math.abs(Number(prev.tick.value) - Number(dt))
          ? { index: tickiIndex, tick: curr }
          : prev;
      },
      { index: 0, tick: tickValues[0] }
    );

    const dtNumber = Number(dt);
    const tickValueNumber = Number(tick.value);
    if (dtNumber !== tickValueNumber) {
      const currentAxisValues = tickValues.map(tickVal => Number(tickVal.value));
      const min = Math.min(...currentAxisValues);
      const max = Math.max(...currentAxisValues);
      if (dtNumber < min) {
        return tickValues.at(0)?.position;
      }
      if (dtNumber > max) {
        return tickValues.at(-1)?.position;
      }

      const diff = Math.abs(tickValueNumber - dtNumber);
      const isGreaterThan = dtNumber > tickValueNumber;
      const closeTick = isGreaterThan ? tickValues[index + 1] : tickValues[index - 1];
      const diffBetweenTicks = Math.abs(Number(closeTick.value) - tickValueNumber);
      const diffPercentaje = (diff * 100) / diffBetweenTicks;
      const posBetweenTicks = Math.abs(tick.position - closeTick.position);
      const ajustedAmount = (posBetweenTicks * diffPercentaje) / 100;
      // This is because the X axis is drawn from left to right and the Y axis from top to bottom.
      if (xAxis) {
        return isGreaterThan ? tick.position + ajustedAmount : tick.position - ajustedAmount;
      }
      return isGreaterThan ? tick.position - ajustedAmount : tick.position + ajustedAmount;
    }

    return tick.position;
  }) as number[];
};
