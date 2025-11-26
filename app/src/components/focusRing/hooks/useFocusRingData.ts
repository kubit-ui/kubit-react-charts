import { type RefObject, useLayoutEffect, useMemo, useState } from 'react';

import { type FocusConfig, getFocusConfig } from '@/types/focusConfig.type';

import { createAdaptiveFocusRings } from '../utils/createAdaptiveFocusRings';
import { createBoundingBoxFocusRings } from '../utils/createBoundingBoxFocusRings';
import { FocusRingLayers } from '../utils/utils.types';

export interface UseFocusRingDataOptions {
  elementRef: RefObject<SVGElement>;
  isFocused: boolean;
  focusConfig?: FocusConfig;
}

export interface FocusRingData {
  resolvedConfig: Required<FocusConfig>;
  layers: FocusRingLayers | null;
}

/**
 * Hook that handles all focus ring data calculation logic.
 * Separated from rendering concerns for better testability and reusability.
 *
 * This hook:
 * - Generates layers for both adaptive and bounding-box variants
 * - Both variants return the same FocusRingLayers structure
 * - Only calculates what's needed based on the variant
 * - Manages all the state and effects related to focus ring data
 *
 * @param options - Configuration options for the hook
 * @returns Focus ring data including resolved config and calculated layers
 */
export function useFocusRingData({
  elementRef,
  focusConfig,
  isFocused,
}: UseFocusRingDataOptions): FocusRingData {
  // Resolve config once at the top
  const resolvedConfig = useMemo(() => getFocusConfig(focusConfig), [focusConfig]);

  const [layers, setLayers] = useState<FocusRingLayers | null>(null);

  // DOM detection and data generation based on variant
  // Using useLayoutEffect to avoid visual delay when elements move
  // This runs synchronously BEFORE browser paint, ensuring focus rings update immediately
  // Detection happens on mount, when isFocused changes, or when focus config changes
  useLayoutEffect(() => {
    // Need a mounted DOM element
    if (!elementRef?.current) {
      return;
    }

    // Only generate layers when focused
    if (!isFocused) {
      setLayers(null);
      return;
    }

    // Strategy 1: Adaptive variant - generate layers from DOM element
    if (resolvedConfig.variant === 'adaptive') {
      const adaptiveLayers = createAdaptiveFocusRings(elementRef.current, resolvedConfig);
      setLayers(adaptiveLayers);
    }

    // Strategy 2: Bounding-box variant - detect bounds and calculate layers
    if (resolvedConfig.variant === 'bounding-box') {
      const boundingBoxLayers = createBoundingBoxFocusRings(elementRef.current, resolvedConfig);
      setLayers(boundingBoxLayers);
    }
  }, [isFocused, resolvedConfig]);

  return {
    layers,
    resolvedConfig,
  };
}
