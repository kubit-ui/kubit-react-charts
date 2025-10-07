/**
 * Defines the structure for a gradient stop used in creating SVG gradients.
 * A gradient stop specifies a color and its position within the gradient.
 *
 * @property {string} color - The CSS color value of the gradient stop. This can be any valid CSS color format (e.g., hex, rgb, rgba, hsl).
 * @property {string} offset - The position of the color stop within the gradient, expressed as a percentage (e.g., '50%') or a length (e.g., '100px').
 */
export interface GradientStop {
  color: string;
  offset: string;
}
