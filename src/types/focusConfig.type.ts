/**
 * Configuration for the focus effect.
 *
 * **Important**: All numeric values (stroke widths and gap) are relative to the SVG viewBox coordinate system,
 * not pixel values. This means the same values may appear different in size depending on the chart's viewBox dimensions.
 * For example, a value of 2 in a chart with viewBox 200x200 will appear larger than the same value in a chart with viewBox 100x80.
 *
 * - `outlineColor` - Color of the outer outline when focused. Defaults to #0078D7.
 * - `outlineStrokeWidth` - Stroke width of the outer outline (viewBox-relative). Defaults to 2.
 * - `innerColor` - Color of the inner outline when focused. Defaults to #FFFFFF.
 * - `innerStrokeWidth` - Stroke width of the inner outline (viewBox-relative). Defaults to 2.
 * - `gap` - Gap between the element and the focus rings (viewBox-relative). Defaults to 0.
 *   Note: Only applies when variant is 'bounding-box'. Ignored in 'adaptive' mode.
 * - `variant` - Focus ring rendering mode. Defaults to 'adaptive'.
 *   - 'adaptive': Ring follows the exact shape of the element (circle → circular ring, path → path ring)
 *   - 'bounding-box': Ring is always rectangular, wrapping the element's bounding box
 */
export interface FocusConfig {
  outlineColor?: string;
  /** Stroke width in viewBox coordinate units (not pixels) */
  outlineStrokeWidth?: number;
  innerColor?: string;
  /** Stroke width in viewBox coordinate units (not pixels) */
  innerStrokeWidth?: number;
  /** Gap in viewBox coordinate units (not pixels). Only applicable when variant is 'bounding-box' */
  gap?: number;
  variant?: 'adaptive' | 'bounding-box';
}

export const FOCUS_DEFAULT = {
  /** Focus ring color */
  FOCUS_COLOR: '#0078D4',
  /** Focus ring inner border */
  FOCUS_INNER: '#ffffff',
  /** Focus ring inner stroke width (viewBox-relative units) */
  INNER_FOCUS_STROKE_WIDTH: 2,
  /** Focus ring outer stroke width (viewBox-relative units) */
  OUTER_FOCUS_STROKE_WIDTH: 2,
  /** Gap between element and outlines in viewBox-relative units (only applies in bounding-box variant) */
  OUTLINES_GAP: 0,
  /** Focus ring rendering variant */
  VARIANT: 'adaptive' as const,
} as const;

/**
 * Helper function to get complete focus config with defaults applied
 */
export const getFocusConfig = (focusConfig?: FocusConfig): Required<FocusConfig> => ({
  gap: focusConfig?.gap ?? FOCUS_DEFAULT.OUTLINES_GAP,
  innerColor: focusConfig?.innerColor ?? FOCUS_DEFAULT.FOCUS_INNER,
  innerStrokeWidth: focusConfig?.innerStrokeWidth ?? FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH,
  outlineColor: focusConfig?.outlineColor ?? FOCUS_DEFAULT.FOCUS_COLOR,
  outlineStrokeWidth: focusConfig?.outlineStrokeWidth ?? FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH,
  variant: focusConfig?.variant ?? FOCUS_DEFAULT.VARIANT,
});
