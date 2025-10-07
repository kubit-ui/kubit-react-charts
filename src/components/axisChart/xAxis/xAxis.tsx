import type { FC } from 'react';

import { Line } from '@/components/line/line';
import { Tick } from '@/components/tick/tick';
import { DefaultCanvasConfig } from '@/types/canvas.type';
import { Positions } from '@/types/position.enum';
import { isNear } from '@/utils/cursorNear/isNear';
import { pickCustomAttributes } from '@/utils/pickCustomAttributes/pickCustomAttributes';

import { filterLineProps } from '../utils/filterLineProps/filterLineProps';
import type { XAxisProps } from './xAxis.types';

/**
 * Renders the X-axis of a chart, including tick marks and labels.
 *
 * This component dynamically calculates the position of each tick mark based on the provided `tickValues` and adjusts their positions to fit within the specified `canvasWidth`, taking into account any `extraSpace` margins.
 *
 * The component renders a `<g>` SVG element containing a `<Line>` component for the axis line and multiple `<Tick>` components for the tick marks and labels, adjusted for the canvas size and extra space.
 */
export const XAxis: FC<XAxisProps> = ({
  canvasHeight = DefaultCanvasConfig.height,
  canvasWidth = DefaultCanvasConfig.width,
  cursor = 0,
  extraSpace = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  position = Positions.BOTTOM,
  showTickLines = false,
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
              ? `rotate(-30, ${tick.position}, ${tickText.y})`
              : undefined;
          return (
            <Tick
              key={`${index.toString()}`}
              showTickLines={showTickLines}
              tick={tick}
              tickLine={{
                ...tickLineProps,
                x1: tick.position,
                x2: tick.position,
              }}
              tickText={{
                ...tickText,
                transform: rotate,
                x: tick.position,
              }}
            />
          );
        })}
    </g>
  );
};
