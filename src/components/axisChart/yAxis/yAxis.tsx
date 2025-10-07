import type { FC } from 'react';

import { Line } from '@/components/line/line';
import { Tick } from '@/components/tick/tick';
import { Positions } from '@/types/position.enum';
import { isNear } from '@/utils/cursorNear/isNear';
import { pickCustomAttributes } from '@/utils/pickCustomAttributes/pickCustomAttributes';

import { filterLineProps } from '../utils/filterLineProps/filterLineProps';
import type { YAxisProps } from './yAxis.types';

/**
 * Renders a Y-axis for a chart, including tick marks and labels.
 * This component renders a `<g>` SVG element containing a `<Line>` component for the axis line and multiple `<Tick>` components for the tick marks and labels.
 */
export const YAxis: FC<YAxisProps> = ({
  canvasWidth,
  cursor = 0,
  extraSpace = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  position = Positions.LEFT,
  showTickLines = true,
  tickLine,
  tickLineHover,
  tickText,
  tickValues = [],
  ...props
}) => {
  // Extract custom attributes for the g element
  const customAttributes = pickCustomAttributes(props);

  return (
    <g {...customAttributes}>
      <Line {...filterLineProps(props)} />
      {tickValues &&
        tickValues.length > 0 &&
        tickValues.map((tick, index) => {
          const overrideTickLine = isNear(cursor, tick.position) && tickLineHover;
          const tickLineProps = overrideTickLine ? { ...tickLine, ...tickLineHover } : tickLine;
          const rotate =
            tickText?.transform === 'rotate'
              ? `rotate(-30, ${tickText.x}, ${tick.position})`
              : undefined;
          return (
            <Tick
              key={`${index.toString()}`}
              showTickLines={showTickLines}
              tick={tick}
              tickLine={{
                ...tickLineProps,
                y1: tick.position,
                y2: tick.position,
              }}
              tickText={{ ...tickText, transform: rotate, y: tick.position }}
            />
          );
        })}
    </g>
  );
};
