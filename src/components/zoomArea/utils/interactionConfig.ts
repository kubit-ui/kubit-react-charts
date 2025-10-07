import type { ZoomAreaInteractionConfig } from '../zoomArea.type';

/**
 * Default configuration for ZoomArea interactions
 */
const DEFAULT_INTERACTION_CONFIG = {
  /** Fast keyboard movement step (Shift + arrows) */
  KEYBOARD_FAST_STEP: 2,
  /** Default keyboard movement step (arrows without modifiers) */
  KEYBOARD_STEP: 1,
  /** Minimum distance between start and end handlers */
  MIN_HANDLER_DISTANCE: 1,
} as const;

/**
 * Utility function to get resolved interaction configuration.
 * Merges user-provided config with sensible defaults.
 *
 * @param config - Optional user configuration
 * @returns Complete interaction configuration with defaults applied
 */
export const getInteractionConfig = (
  config?: ZoomAreaInteractionConfig
): Required<ZoomAreaInteractionConfig> => ({
  keyboardFastStep: config?.keyboardFastStep ?? DEFAULT_INTERACTION_CONFIG.KEYBOARD_FAST_STEP,
  keyboardStep: config?.keyboardStep ?? DEFAULT_INTERACTION_CONFIG.KEYBOARD_STEP,
  minHandlerDistance: config?.minHandlerDistance ?? DEFAULT_INTERACTION_CONFIG.MIN_HANDLER_DISTANCE,
});
