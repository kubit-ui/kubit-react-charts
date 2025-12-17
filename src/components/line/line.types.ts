import type { HTMLAttributes } from 'react';

/**
 * Props for the `Line` component, defining the visual appearance and behavior of a line element.
 *
 * @param x1 - The x-coordinate of the start point of the line. Can be a number or a string representing a percentage.
 * @param y1 - The y-coordinate of the start point of the line. Can be a number or a string representing a percentage.
 * @param x2 - The x-coordinate of the end point of the line. Can be a number or a string representing a percentage.
 * @param y2 - The y-coordinate of the end point of the line. Can be a number or a string representing a percentage.
 * @param stroke - The color of the line. Can be any valid CSS color string.
 * @param strokeWidth - The thickness of the line. Can be a number or a string representing a percentage.
 * @param strokeOpacity - The opacity of the line's stroke. A number between 0 (completely transparent) and 1 (completely opaque).
 * @param strokeLinecap - The shape to be used at the end of the line. Can be 'butt', 'round', or 'square'.
 * @param strokeLinejoin - The shape to be used at the corners of the line. Can be 'miter', 'round', or 'bevel'.
 * @param strokeDasharray - The pattern of dashes and gaps used to paint the stroke of the line.
 * @param strokeDashoffset - The distance into the dash pattern to start the dash.
 * @param opacity - The overall opacity of the line. A number between 0 (completely transparent) and 1 (completely opaque).
 * @param transform - A string representing the transformation to apply to the line.
 * @param style - CSS properties to apply to the line.
 * @param className - The CSS class name to apply to the line.
 * @param tabIndex - The tab index of the line, indicating if it is focusable.
 * @param ariaLabel - The accessible label for the line, used by screen readers.
 * @param dataTestId - An identifier used for testing purposes.
 */
export interface LineProps {
  x1?: number | string;
  y1?: number | string;
  x2?: number | string;
  y2?: number | string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeOpacity?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  strokeDasharray?: string;
  strokeDashoffset?: number;
  opacity?: number;
  transform?: string;
  style?: React.CSSProperties;
  className?: string;
  tabIndex?: number;
  ariaLabel?: string;
  role?: HTMLAttributes<SVGElement>['role'];
  dataTestId?: string;
}
