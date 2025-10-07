import type { ValueFormatter } from '@/types/valueFormatter.type';

import type { ChartTextProps } from '../chartText/chartText.types';
import type { LineProps } from '../line/line.types';

/**
 * Represents the data structure for a single tick mark in a chart or graph.
 *
 * @property {string} value - The label or value associated with the tick mark.
 * @property {number} position - The numerical position of the tick mark along its axis.
 */
export interface TickData {
  value: string;
  position: number;
}

/**
 * Utility functions for working with TickData.
 */
export const TickDataUtils = {
  /**
   * Formats the values of an array of TickData using the provided formatter function.
   *
   * @param {TickData[]} ticks - Array of tick objects to format.
   * @param {ValueFormatter} formatter - Function to format each tick's value.
   * @returns {TickData[]} New array of TickData with formatted values.
   *
   * @example
   * const ticks = [{ value: '100', position: 1 }, { value: '200', position: 2 }];
   * const formatter = (v) => `${v} €`;
   * const formatted = TickDataUtils.formatTicksValues(ticks, formatter);
   * // formatted: [{ value: '100 €', position: 1 }, { value: '200 €', position: 2 }]
   */
  formatTicksValues: (ticks: TickData[], formatter: ValueFormatter): TickData[] => {
    return ticks.map(tick => ({
      ...tick,
      value: formatter(tick.value),
    }));
  },
};

/**
 * Defines the properties for rendering a tick mark and its associated elements in a chart or graph.
 *
 * @property {TickData} tick - The data for the tick mark, including its value and position.
 * @property {boolean} showTickLines - Flag indicating whether the line part of the tick mark should be displayed.
 * @property {LineProps} [tickLine] - Optional properties for the line part of the tick mark. Depends on `showTickLines`.
 * @property {ChartTextProps} [tickText] - Optional properties for the text label part of the tick mark.
 * @property {number} [x] - Optional x-coordinate for the position of the tick mark. Used for horizontal placement.
 * @property {number} [y] - Optional y-coordinate for the position of the tick mark. Used for vertical placement.
 */
export interface TickProps {
  tick: TickData;
  showTickLines: boolean;
  tickLine?: LineProps;
  tickText?: ChartTextProps;
  x?: number;
  y?: number;
}
