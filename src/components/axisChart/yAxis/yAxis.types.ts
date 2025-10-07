import type { ChartTextProps } from '@/components/chartText/chartText.types';
import type { LineProps } from '@/components/line/line.types';
import type { TickData } from '@/components/tick/tick.types';
import type { Positions } from '@/types/position.enum';

/**
 * Props for the `YAxis` component, extending `LineProps` to include additional properties specific to rendering a Y-axis.
 *
 * @param position - Optional. Specifies the position of the Y-axis on the canvas. Can be one of the `Positions` ('left', 'right', 'top', 'bottom').
 * @param tickValues - Optional. An array of `TickData` objects representing the data points to be used for ticks on the Y-axis.
 * @param showTickLines - Optional. A boolean indicating whether tick lines should be displayed.
 * @param tickLine - Optional. `LineProps` for customizing the appearance of tick lines.
 * @param tickText - Optional. Properties for customizing the appearance of tick text, excluding `y`, `x`, `dx`, and `dy` which are managed by the component. Includes optional `left` and `right` properties to adjust the text position.
 * @param canvasWidth - Optional. The width of the canvas on which the Y-axis is rendered. Used for calculating positions.
 * @param canvasHeight - Optional. The height of the canvas on which the Y-axis is rendered. Used for calculating positions.
 * @param extraSpace - Optional. An object specifying additional space around the Y-axis. Can include `left`, `right`, `top`, and `bottom` properties.
 */
export interface YAxisProps extends LineProps {
  position?: (typeof Positions)[keyof typeof Positions];
  tickValues?: TickData[];
  showTickLines?: boolean;
  tickLine?: LineProps;
  tickLineHover?: LineProps;
  tickText?: Omit<ChartTextProps, 'dx' | 'dy'> & {
    left?: number;
    right?: number;
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
