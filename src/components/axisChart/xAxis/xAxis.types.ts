import type { ChartTextProps } from '@/components/chartText/chartText.types';
import type { LineProps } from '@/components/line/line.types';
import type { TickData } from '@/components/tick/tick.types';
import type { Positions } from '@/types/position.enum';

/**
 * Defines the properties for the XAxis component.
 *
 * @property {Positions} [position] - Specifies the position of the X-axis on the chart. Can be 'TOP' or 'BOTTOM'.
 * @property {TickData[]} [tickValues] - An array of tick values to be displayed on the X-axis. Each tick is represented by a `TickData` object.
 * @property {boolean} [showTickLines=true] - Determines whether tick lines should be displayed.
 * @property {LineProps} [tickLine] - Custom properties for styling the tick lines.
 * @property {Omit<ChartTextProps, 'y' | 'x' | 'dx' | 'dy'> & { top?: number; bottom?: number; }} [tickText] - Custom properties for styling the tick text, excluding position properties ('y', 'x', 'dx', 'dy') which are managed by the component. Additional properties `top` and `bottom` can be used to adjust the vertical position of the tick text.
 * @property {number} [canvasWidth] - The width of the canvas on which the X-axis is rendered. This is used to calculate positioning and scaling.
 * @property {number} [canvasHeight] - The height of the canvas on which the X-axis is rendered. This is used to calculate positioning and scaling.
 * @property {{ left?: number; right?: number; top?: number; bottom?: number; }} [extraSpace] - Optional extra spacing around the X-axis to adjust its position within the canvas. Each property specifies the amount of space to add on each side.
 *
 * Extends `LineProps` for basic line styling properties.
 */
export interface XAxisProps extends LineProps {
  position?: (typeof Positions)[keyof typeof Positions];
  tickValues?: TickData[];
  showTickLines?: boolean;
  tickLine?: LineProps;
  tickLineHover?: LineProps;
  tickText?: Omit<ChartTextProps, 'dx' | 'dy' | 'transform'> & {
    top?: number;
    bottom?: number;
    transform?: 'rotate';
  };

  canvasWidth?: number;
  canvasHeight?: number;

  extraSpace?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };

  cursor?: number;
}
