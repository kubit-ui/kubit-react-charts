/**
 * Props for rendering a focus ring element
 */
export interface FocusRingElementProps {
  /** SVG element type (e.g., 'circle', 'rect', 'path') */
  type: string;
  /** Props to pass to React.createElement */
  props: Record<string, unknown>;
}

/**
 * Result of creating focus ring layers
 */
export interface FocusRingLayers {
  /** Outer focus ring element props (blue) */
  outerRing: FocusRingElementProps;
  /** Inner focus ring element props (white) */
  innerRing: FocusRingElementProps;
  /** Variant used for rendering */
  variant: 'adaptive' | 'bounding-box';
}

/**
 * Element bounds information from DOM detection
 */
export interface ElementBounds {
  /** Element width in pixels */
  elementWidth: number;
  /** Element height in pixels */
  elementHeight: number;
  /** Position of the element center */
  elementPosition: { x: number; y: number };
  /** Stroke width of the element */
  elementStrokeWidth: number;
}

/**
 * Dimensions for rectangle focus outlines
 */
export interface RectangleFocusOutline {
  outer: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  inner: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
