import type { ZoomAreaSelectionConfig } from '../zoomArea.type';

/**
 * Default configuration for ZoomArea selection area
 */
const DEFAULT_SELECTION_CONFIG = {
  /** Selection area background color */
  FILL: '#0078d4',
  /** Selection area fill opacity */
  FILL_OPACITY: 0.5,
  /** Hide overlay when full range is selected */
  HIDE_OVERLAY_ON_FULL_RANGE: true,
  /** Selection area border color */
  STROKE: '#0078d4',
  /** Selection area border width */
  STROKE_WIDTH: 0,
} as const;

/**
 * Utility function to get resolved selection configuration.
 * Merges user-provided config with sensible defaults.
 *
 * @param config - Optional user configuration
 * @returns Complete selection configuration with defaults applied
 */
export const getSelectionConfig = (
  config?: ZoomAreaSelectionConfig
): Required<ZoomAreaSelectionConfig> => ({
  fill: config?.fill ?? DEFAULT_SELECTION_CONFIG.FILL,
  fillOpacity: config?.fillOpacity ?? DEFAULT_SELECTION_CONFIG.FILL_OPACITY,
  hideOverlayOnFullRange:
    config?.hideOverlayOnFullRange ?? DEFAULT_SELECTION_CONFIG.HIDE_OVERLAY_ON_FULL_RANGE,
  stroke: config?.stroke ?? DEFAULT_SELECTION_CONFIG.STROKE,
  strokeWidth: config?.strokeWidth ?? DEFAULT_SELECTION_CONFIG.STROKE_WIDTH,
});
