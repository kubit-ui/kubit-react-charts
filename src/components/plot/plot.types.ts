import type { FocusConfig } from '@/types/focusConfig.type';

/**
 * Enum for plot types.
 *
 * This enumeration defines the possible types of plot points that can be represented in a chart.
 * It includes basic geometric shapes such as circles, squares, and triangles.
 *
 * @enum {string}
 */
export const PlotType = {
  /** Represents a circle plot point */
  CIRCLE: 'CIRCLE',
  /** Represents a square plot point */
  SQUARE: 'SQUARE',
  /** Represents a triangle plot point */
  TRIANGLE: 'TRIANGLE',
} as const;

/**
 * Enum for plot sizes.
 *
 * This enumeration defines the different size options available for plot points.
 * Sizes range from extra small to extra large, with specific pixel dimensions.
 *
 * @enum {string}
 */
export const PlotSize = {
  /** Extra large plot point (40x40 pixels) */
  EXTRA_LARGE: 'EXTRA_LARGE',
  /** Extra small plot point (8x8 pixels) */
  EXTRA_SMALL: 'EXTRA_SMALL',
  /** Large plot point (32x32 pixels) */
  LARGE: 'LARGE',
  /** Medium plot point (24x24 pixels) */
  MEDIUM: 'MEDIUM',
  /** Small plot point (16x16 pixels) */
  SMALL: 'SMALL',
} as const;

/**
 * Mapping of PlotSize enum values to their actual pixel dimensions.
 *
 * This constant provides a direct mapping between the enum values and
 * their corresponding numeric size values in pixels.
 *
 * @type {Record<PlotSize, number>}
 */
export const PLOT_SIZE_MAP: Record<(typeof PlotSize)[keyof typeof PlotSize], number> = {
  [PlotSize.EXTRA_LARGE]: 40,
  [PlotSize.EXTRA_SMALL]: 8,
  [PlotSize.LARGE]: 32,
  [PlotSize.MEDIUM]: 24,
  [PlotSize.SMALL]: 16,
};

/**
 * Data associated with a plot point.
 *
 * @interface
 * @template T - The type of the value represented by this plot point. Defaults to string.
 */
export interface PlotData<T = string> {
  /** Index of the data point in its dataset */
  index?: number;
  /** Value represented by this plot point */
  value?: T;
  /** Category or series this plot point belongs to */
  category?: string;
  /** Precise coordinate values (may differ from SVG position) */
  coordinate?: { x: number; y: number };
}

/**
 * Properties for a plot component.
 *
 * This interface outlines the properties that can be set on a plot component within a chart.
 * It supports customization of the plot's appearance such as fill color, size, and position,
 * as well as accessibility features and event handlers for interactivity.
 *
 * @interface
 * @template T - The type of the value represented by this plot point's data. Defaults to string.
 */
export interface PlotProps<T = string> {
  /** Type of the plot point (circle, square, triangle). Defaults to PlotType.CIRCLE. */
  type?: (typeof PlotType)[keyof typeof PlotType];
  /**
   * Size of the plot point.
   * Can be a predefined size from PlotSize enum or a direct numeric value in pixels.
   * Defaults to PlotSize.MEDIUM.
   */
  size?: (typeof PlotSize)[keyof typeof PlotSize] | number;
  /** Fill color of the plot point. */
  fill?: string;
  /** Fill color opacity. Defaults to 1. */
  fillOpacity?: number;
  /** Whether the plot has a hover effect. */
  hasHoverEffect?: boolean;
  /** Position of the plot point on the plane. Required. */
  position: { x: number; y: number };
  /** Identifier for testing. Defaults to 'Plot'. */
  dataTestId?: string;
  /** Stroke color of the plot point. Defaults to 'transparent'. */
  stroke?: string;
  /** Stroke width of the plot point. Defaults to 0. */
  strokeWidth?: number;
  /** Overall opacity of the plot point. Defaults to 1. */
  opacity?: number;
  /** Accessible label for the plot point. */
  label?: string;
  /** Tab index for keyboard navigation. */
  tabIndex?: number;
  /** Unique identifier for the plot point. */
  id?: string;
  /** Additional CSS classes for the plot point. */
  className?: string;
  /**
   * Configuration for the hover effect.
   *
   * - `fill` - Fill color when hovered. Defaults to the plot's original fill color.
   * - `stroke` - Stroke color when hovered. Defaults to the plot's original fill color.
   * - `strokeWidth` - Stroke width when hovered. Defaults to 0.
   * - `opacity` - Overall opacity when hovered. Defaults to 0.3.
   * - `scale` - Scale factor for the hover effect. Defaults to 1.3 (30% larger).
   */
  hoverConfig?: {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    scale?: number;
  };
  /**
   * Configuration for the focus effect.
   */
  focusConfig?: FocusConfig;
  /** Data associated with this plot point. */
  data?: PlotData<T>;

  /**
   * Function executed when clicking on the plot point.
   * Uses the standard React mouse event handler signature.
   */
  onClick?: React.MouseEventHandler<SVGElement>;

  /**
   * Function executed when pressing a key while the plot point has focus.
   * Uses the standard React keyboard event handler signature.
   */
  onKeyDown?: React.KeyboardEventHandler<SVGElement>;

  /**
   * Function executed when focusing the plot point.
   * Uses the standard React focus event handler signature.
   */
  onFocus?: React.FocusEventHandler<SVGElement>;

  /**
   * Function executed when removing focus from the plot point.
   * Uses the standard React focus event handler signature.
   */
  onBlur?: React.FocusEventHandler<SVGElement>;

  /**
   * Function executed when hovering over the plot point.
   * Uses the standard React mouse event handler signature.
   */
  onMouseEnter?: React.MouseEventHandler<SVGElement>;

  /**
   * Function executed when moving the mouse away from the plot point.
   * Uses the standard React mouse event handler signature.
   */
  onMouseLeave?: React.MouseEventHandler<SVGElement>;
}

/**
 * Properties for internal plot shape components.
 * This interface extends PlotProps but overrides the 'size' property to use a numeric value
 * rather than the PlotSize enum.
 *
 * @interface
 * @template T - The type of the value represented by this plot point's data. Defaults to string.
 */
export interface PlotShapeProps<T = string> extends Omit<PlotProps<T>, 'size'> {
  /** The size of the plot shape in pixels */
  size: number;
}
