import type { FC } from 'react';

import { ChartText } from '@/components/chartText/chartText';
import { Line } from '@/components/line/line';

import type { TickProps } from './tick.types';

/**
 * Functional component for rendering a tick mark in a chart or graph.
 *
 * This component renders a tick mark based on the provided properties. It can optionally render a line and/or text
 * label associated with the tick mark. The position of the tick mark can be customized using the `x` and `y` properties.
 *
 * @param {TickProps} props - The properties for the tick mark, including data, visibility flags, and optional styling props.
 * @param {TickData} props.tick - The data for the tick mark, including its value and position.
 * @param {boolean} props.showTickLines - Flag indicating whether the line part of the tick mark should be displayed.
 * @param {LineProps} [props.tickLine] - Optional properties for the line part of the tick mark.
 * @param {ChartTextProps} [props.tickText] - Optional properties for the text label part of the tick mark.
 * @param {number} [props.x] - Optional x-coordinate for the position of the tick mark. Used for horizontal placement.
 * @param {number} [props.y] - Optional y-coordinate for the position of the tick mark. Used for vertical placement.
 * @returns A React functional component that renders the tick mark and its associated elements.
 */
export const Tick: FC<TickProps> = ({ showTickLines, tick, tickLine, tickText }) => (
  <g>
    {showTickLines && <Line {...tickLine} />}
    {tickText && <ChartText {...tickText}>{tick.value}</ChartText>}
  </g>
);
