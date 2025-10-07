/**
 * Configuration for the focus effect.
 *
 * - `outlineColor` - Color of the outer outline when focused. Defaults to #0078D7.
 * - `outlineStrokeWidth` - Stroke width of the outer outline. Defaults to 2.
 * - `innerStrokeColor` - Color of the inner outline when focused. Defaults to #FFFFFF.
 * - `innerStrokeWidth` - Stroke width of the inner outline. Defaults to 2.
 * - `gap` - Gap between the inner and outer outline. Defaults to 0.
 */
export interface FocusConfig {
  outlineColor?: string;
  outlineStrokeWidth?: number;
  innerColor?: string;
  innerStrokeWidth?: number;
  gap?: number;
}

export const FOCUS_DEFAULT = {
  /** Focus ring color */
  FOCUS_COLOR: '#0078D4',
  /** Focus ring inner border */
  FOCUS_INNER: '#ffffff',
  /** Focus ring inner stroke width */
  INNER_FOCUS_STROKE_WIDTH: 2,
  /** Focus ring outer stroke width */
  OUTER_FOCUS_STROKE_WIDTH: 2,
  /** Gap between element and outlines */
  OUTLINES_GAP: 0,
} as const;
