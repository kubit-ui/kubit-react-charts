/**
 * Defines the configuration options for a canvas element.
 *
 * @property {number} width - The width of the canvas in pixels.
 * @property {number} height - The height of the canvas in pixels.
 * @property {number} [extraSpace=0] - Optional additional space around the canvas. Defaults to 0.
 */
export interface CanvasConfig {
  width: number | string;
  height: number | string;
  extraSpace?: number | string;
}

/**
 * Provides default configuration for a canvas element.
 *
 * This configuration sets the canvas width to 100 pixels, height to 80 pixels,
 * and includes no additional extra space around the canvas by default.
 */
export const DefaultCanvasConfig: CanvasConfig = {
  extraSpace: 0,
  height: 80,
  width: 100,
};
