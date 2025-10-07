import { Positions } from '@/types/position.enum';

/**
 * Calculates the x-coordinate for the tick text based on the position, x-coordinate, and font size.
 *
 * @param position - The position of the tick text.
 * @param x - The x-coordinate of the tick text.
 * @param fontSize - The font size of the tick text.
 * @returns The calculated x-coordinate for the tick text.
 */
export const getTickTextXCoordinate = (
  position: (typeof Positions)[keyof typeof Positions],
  x: number,
  fontSize: number
): number => {
  if (position === Positions.RIGHT) {
    return x + fontSize;
  }
  return x - fontSize;
};

/**
 * Calculates the y-coordinate for the tick text based on the position, y-coordinate, font size, and security space.
 *
 * @param position - The position of the tick text.
 * @param y - The y-coordinate of the tick text.
 * @param fontSize - The font size of the tick text.
 * @param securitySpace - The security space between the tick text and the chart.
 * @returns The calculated y-coordinate for the tick text.
 */
export const getTickTextYCoordinate = (
  position: (typeof Positions)[keyof typeof Positions],
  y: number,
  fontSize: number,
  securitySpace: number
): number => {
  if (position === Positions.TOP) {
    return fontSize;
  }
  return y + fontSize + securitySpace;
};
