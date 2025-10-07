/**
 * Enum for node types.
 *
 * This enumeration defines the possible types of nodes that can be represented in a graphical interface or data structure.
 * It includes basic geometric shapes such as circles, squares, and triangles, allowing for simple categorization and differentiation
 * of node types in various applications.
 *
 * @enum {string}
 */
export const NodeType = {
  Circle: 'circle', // Represents a circle node.
  Hexagon: 'hexagon', // Represents a hexagon node.
  Pentagon: 'pentagon', // Represents a pentagon node.
  Square: 'square', // Represents a square node.
  Star: 'star', // Represents a star node.
  Straight: 'straight', // Represents a straight node.
  Triangle: 'triangle', // Represents a triangle node.
} as const;

/**
 * Properties for a node component.
 *
 * This interface outlines the properties that can be set on a node component within a graphical interface or data structure.
 * It supports customization of the node's type, fill color, size, and position. Additionally, a data test ID can be specified
 * for testing purposes. The `type` property is optional and defaults to undefined, allowing for nodes to be type-agnostic
 * if desired.
 *
 * @interface
 */
export interface NodeProps {
  type?: (typeof NodeType)[keyof typeof NodeType]; // Optional. The type of the node, as defined by the NodeType enum.
  size?: number; // Optional. The size of the node.
  fill?: string; // Optional. The fill color of the node.
  fillOpacity?: number; // Optional. The opacity fill color of the node.
  hasHalo?: boolean; // Optional. Whether the node has a halo effect.
  position?: { x: number; y: number }; // Optional. The position of the node, specified as an object with x and y coordinates.
  dataTestId?: string; // Optional. A data attribute used for testing.
  stroke?: string; // Optional. The stroke color of the node.
  strokeWidth?: number | string; // Optional. The stroke width of the node.
  opacity?: number; // Optional. The opacity of the node.
  tabIndex?: number; // Optional. The tab index for keyboard navigation.
  id?: string; // Optional. The unique identifier of the node.
  className?: string; // Optional. Additional CSS class names for the node.
  ariaLabel?: string; // Optional. Accessibility label for screen readers.
  haloConfig?: {
    fill?: string;
    fillOpacity?: number;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
  }; // Optional. Configuration for the halo effect
  data?: {
    index?: number;
    dataValue?: any;
    dataKey?: string;
    xKey?: string;
    nodePosition?: { x: number; y: number };
  };
  // TODO - Enrich events with data, stop using extra parameters for callbacks
  onClick?: (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    data?: {
      index?: number;
      dataValue?: any;
      dataKey?: string;
      xKey?: string;
      nodePosition?: { x: number; y: number };
    },
    autoClick?: boolean
  ) => void;
  onDoubleClick?: (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    data?: { index?: number; dataValue?: any; dataKey?: string; xKey?: string }
  ) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<SVGPathElement>,
    data?: { index?: number; dataValue?: any; dataKey?: string; xKey?: string }
  ) => void;
  onFocus?: (
    event: React.FocusEvent<SVGPathElement>,
    data?: { index?: number; dataValue?: any; dataKey?: string; xKey?: string }
  ) => void;
  onBlur?: (event: React.FocusEvent<SVGPathElement>) => void;
  onMouseEnter?: (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    data?: { index?: number; dataValue?: any; dataKey?: string; xKey?: string }
  ) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
}
