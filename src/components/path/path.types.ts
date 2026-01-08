import type { AriaAttributes } from 'react';

import type { ShadowSvgConfig } from '@/utils/shadowSvg/shadowSvg.types';

import type { NodeProps } from '../node/node.types';

interface IDataPoint {
  [key: string]: any;
}

export interface StyleProps {
  fill?: string;
  fillOpacity?: number | string;
  fillRule?: 'nonzero' | 'evenodd';
  opacity?: number | string;
  orientation?: number | string;
  rotate?: number | string;
  stroke?: string;
  strokeDasharray?: string | number;
  strokeDashoffset?: string | number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  strokeMiterlimit?: number | string;
  strokeOpacity?: number | string;
  strokeWidth?: number | string;
  transform?: string;
  visibility?: number | string;
}

/**
 * Shared interface for custom data-* attributes.
 */
export interface DataAttributes {
  [key: `data-${string}`]: string | number | boolean | undefined;
}

export interface NodePathProps
  extends Omit<NodeProps, 'position' | 'data' | 'ariaLabel'>,
    AriaAttributes,
    DataAttributes {}
export type DataValueType = string | number | IDataPoint[];

/**
 * Defines the properties for a Path component in an SVG.
 *
 * This interface outlines the various properties that can be set on a Path component within an SVG, allowing for
 * detailed customization of appearance and behavior. Properties include standard SVG attributes like `fill`, `stroke`,
 * and `d` (path data), as well as React-specific event handlers such as `onClick` and `onMouseOver`. Additional
 * properties support accessibility, styling, and interaction enhancements.
 */
export interface PathProps extends StyleProps, AriaAttributes, DataAttributes {
  d?: string;
  dFill?: string;
  classNames?: string;
  gradient?: string;
  shadowSvgConfig?: ShadowSvgConfig;
  focusConfig?: StyleProps;
  hoverConfig?: StyleProps;
  dataValue?: string | number | IDataPoint[];
  title?: string;
  role?: string;
  /**
   * @deprecated Use 'aria-label' instead.
   */
  ariaLabel?: string;
  ariaHidden?: boolean;
  tabIndex?: number;
  dataTestId?: string;
  dataKey?: string;
  xKey?: string;
  curved?: boolean;
  gap?: number;
  innerRadius?: number | string;
  radius?: number | string;
  // nodes
  points?: [number, number][]; // [x, y]
  nodeConfig?: NodePathProps;
  // functions
  onClick?: (dataValue?: DataValueType) => void;
  onDoubleClick?: (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    dataValue?: DataValueType
  ) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<SVGPathElement>) => void;
  onBlur?: (event: React.FocusEvent<SVGPathElement>) => void;
  onKeyDown?: (dataValue?: DataValueType) => void;
}
