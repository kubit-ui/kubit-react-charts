/**
 * Type definition for the `height` property of the `SvgContainerProps`.
 * It restricts the value to either a `string` or `number`, but never 'auto' as a string value.
 */
type Height = string extends 'auto' ? never : string | number;

/**
 * Defines the properties accepted by the `SvgContainer` component.
 *
 * This interface specifies the types and optional properties for rendering an SVG container,
 * including dimensions, accessibility attributes, and child elements.
 */
export interface SvgContainerProps {
  width: string | number;
  children: React.ReactNode;
  className?: string;
  role?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  height: Height;
  tabIndex?: number;
  caption?: string;
  viewBox?: string;
  dataTestId?: string;
  radius?: string;
  overflow?: string;
  imageSrc?: string;
  backgroundColor?: string;
  onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onDoubleClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<SVGElement>) => void;
  onBlur?: (event: React.FocusEvent<SVGElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
}
