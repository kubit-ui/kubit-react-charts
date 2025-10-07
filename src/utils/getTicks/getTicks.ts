import type { TickData } from '@/components/tick/tick.types';

interface GetTickProps {
  tickValues: string[];
  maxSpaceAvailable: number;
  securitySpace: number;
  otherAxisSpace: number;
  initPos: number;
  needAjusted?: boolean;
}

/**
 * Calculates the tick positions and values for the x-axis of a line chart.
 *
 * @param tickValues - The values to be displayed as ticks on the x-axis.
 * @param maxSpaceAvailable - The maximum space available for the x-axis.
 * @param securitySpace - The space reserved for security purposes.
 * @param crossAxis - The cross axis of the chart.
 * @param otherAxisSpace - The space occupied by the other axis.
 * @param initPos - The initial position of the x-axis.
 * @returns An array of objects containing the tick values and their corresponding positions.
 */
export const getXTicks = ({
  initPos,
  maxSpaceAvailable,
  otherAxisSpace,
  securitySpace,
  tickValues,
}: GetTickProps): TickData[] | undefined => {
  const ticksNumber = tickValues.length - 1;
  const maxSpace = maxSpaceAvailable - otherAxisSpace - securitySpace;
  const stepValue = maxSpace / ticksNumber;
  const ticks = tickValues.map((value, idx) => {
    const currentStep = idx * stepValue;
    return {
      position: initPos + currentStep + securitySpace / 2,
      value,
    };
  });

  return ticks;
};

/**
 * Calculates the tick positions and values for the y-axis of a line chart.
 *
 * @param tickValues - The values to be displayed as ticks on the y-axis.
 * @param maxSpaceAvailable - The maximum space available for the y-axis.
 * @param securitySpace - The space reserved for security purposes.
 * @param crossAxis - The cross axis of the chart.
 * @param otherAxisSpace - The space occupied by the other axis.
 * @param initPos - The initial position of the y-axis.
 * @returns An array of objects containing the tick values and their corresponding positions.
 */
export const getYTicks = ({
  initPos,
  maxSpaceAvailable,
  needAjusted,
  otherAxisSpace,
  securitySpace,
  tickValues,
}: GetTickProps): TickData[] | undefined => {
  const ticksNumber = tickValues.length - 1;
  const maxSpace = maxSpaceAvailable - otherAxisSpace - securitySpace;
  const stepValue = maxSpace / ticksNumber;
  const additionalSpace = needAjusted ? securitySpace / 2 : 0;
  const ticks = tickValues.map((value, idx) => {
    const currentStep = idx * stepValue;
    return {
      position: initPos - currentStep - additionalSpace,
      value,
    };
  });

  return ticks;
};
