import type { CanvasConfig } from '@/types/canvas.type';
import type { FocusConfig } from '@/types/focusConfig.type';

/**
 * Represents a single data point for the ZoomArea component.
 */
export interface IZoomAreaDataPoint {
  [key: string]: string | number;
}

/**
 * Range selection for zoom functionality.
 */
export interface ZoomRange {
  /** Start index or value */
  start: number;
  /** End index or value */
  end: number;
}

/**
 * Target enumeration for zoom area elements
 */
export const ZoomAreaElements = {
  END_HANDLER: 'END_HANDLER',
  SELECTION_AREA: 'SELECTION_AREA',
  START_HANDLER: 'START_HANDLER',
} as const;

/**
 * Configuration for a single line in the ZoomArea.
 */
export interface ZoomAreaLineConfig {
  /** Data key for y-axis values */
  yKey: string;
  /** Line stroke color */
  stroke?: string;
  /** Line stroke width */
  strokeWidth?: string | number;
  /** Fill color for area under the line */
  fill?: string;
  /** Fill opacity */
  fillOpacity?: number;
  /** Whether the line should be curved (smooth) */
  curved?: boolean;
  /** Optional identifier for this line */
  dataKey?: string;
}

/**
 * Configuration for custom handlers appearance and behavior.
 */
export interface ZoomAreaHandlerConfig {
  /** Handler circle stroke color */
  stroke?: string;
  /** Handler circle stroke width */
  strokeWidth?: string | number;
  /** Handler circle fill color */
  fill?: string;
  /** Handler circle radius */
  radius?: number;
  /** Vertical guide line stroke color */
  verticalLineStroke?: string;
  /** Vertical guide line stroke width */
  verticalLineStrokeWidth?: number;
  /** Handler icon fill color */
  iconColor?: string;
}

/**
 * Configuration for selection area appearance and behavior.
 */
export interface ZoomAreaSelectionConfig {
  /** Selection area fill color */
  fill?: string;
  /** Selection area fill opacity */
  fillOpacity?: number;
  /** Selection area stroke color */
  stroke?: string;
  /** Selection area stroke width */
  strokeWidth?: string | number;
  /** Hide overlay when selection covers full range (default: true) */
  hideOverlayOnFullRange?: boolean;
}

/**
 * Configuration for interaction behavior in ZoomArea
 */
export interface ZoomAreaInteractionConfig {
  /** Minimum distance between start and end handlers (default: 1) */
  minHandlerDistance?: number;
  /** Default keyboard movement step for precise control (default: 1) */
  keyboardStep?: number;
  /** Shift + arrow key movement step for fast navigation (default: 2) */
  keyboardFastStep?: number;
}

/**
 * Configuration for accessibility label templates
 */
export interface ScreenReaderConfig {
  /** Template for start handler label. Use {{startValue}} for dynamic value */
  startHandler?: string;
  /** Template for end handler label. Use {{endValue}} for dynamic value */
  endHandler?: string;
  /** Template for selection area label. Use {{startValue}} and {{endValue}} for dynamic values */
  selectionArea?: string;
}

/**
 * Props for the ZoomArea component.
 */
export interface ZoomAreaProps {
  /** Chart width - supports string (percentage, rem) or number (pixels) */
  width?: string | number;
  /** Chart height - supports string (percentage, rem) or number (pixels) (default: 2.5rem = 40px) */
  height?: string | number;
  /** Data points for the chart */
  data: IZoomAreaDataPoint[];
  /** Key for x-axis values */
  xKey: string;
  /** Configuration for lines to display */
  lines: ZoomAreaLineConfig[];
  /** Canvas configuration for dimensions and spacing */
  canvasConfig?: CanvasConfig;
  /** Background color for the chart area */
  backgroundColor?: string;
  /** Custom handler configuration */
  handlerConfig?: ZoomAreaHandlerConfig;
  /** Custom selection area configuration */
  selectionConfig?: ZoomAreaSelectionConfig;
  /** Custom focus configuration applied to all focusable elements */
  focusConfig?: FocusConfig;
  /** Configuration for interaction behavior (keyboard navigation, handler distances) */
  interactionConfig?: ZoomAreaInteractionConfig;
  /** Configuration for accessibility label templates */
  screenReaderTextConfig?: ScreenReaderConfig;
  /** Initial zoom range */
  initialRange?: ZoomRange;
  /** Callback when filtered data changes based on zoom selection */
  onDataChange?: (filteredData: IZoomAreaDataPoint[]) => void;
  /** CSS class names */
  classNames?: string;
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** ARIA hidden attribute */
  ariaHidden?: boolean;
  /** Chart caption for accessibility */
  caption?: string;
  /** Chart role for accessibility */
  role?: string;
  /** Standard SVG element event handlers */
  onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onDoubleClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<SVGElement>) => void;
  onBlur?: (event: React.FocusEvent<SVGElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
}
