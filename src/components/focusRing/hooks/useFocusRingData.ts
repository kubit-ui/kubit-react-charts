import { type RefObject, useEffect, useMemo, useState } from 'react';

import { type FocusConfig, getFocusConfig } from '@/types/focusConfig.type';

import {
  SVG_GEOMETRIC_ATTRIBUTES,
  createAdaptiveFocusRings,
} from '../utils/createAdaptiveFocusRings';
import { createBoundingBoxFocusRings } from '../utils/createBoundingBoxFocusRings';
import type { FocusRingLayers } from '../utils/utils.types';

export interface UseFocusRingDataOptions {
  elementRef: RefObject<SVGGraphicsElement>;
  isFocused: boolean;
  focusConfig?: FocusConfig;
}

export interface FocusRingData {
  resolvedConfig: Required<FocusConfig>;
  layers: FocusRingLayers | undefined;
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

  const [layers, setLayers] = useState<FocusRingLayers | undefined>(undefined);

  // Calculation happens when isFocused changes or when focus config changes
  // MutationObserver watches for geometric attribute changes
  // to automatically regenerate layers when the element moves or resizes
  useEffect(() => {
    if (!elementRef?.current || !isFocused) {
      setLayers(undefined);
      return undefined;
    }

    const element = elementRef.current;

    // Function to calculate focus ring layers from current DOM state
    const calculateRings = () => {
      // Strategy 1: Adaptive variant - generate layers from DOM element
      if (resolvedConfig.variant === 'adaptive') {
        const adaptiveLayers = createAdaptiveFocusRings(element, resolvedConfig);
        setLayers(adaptiveLayers);
      }

      // Strategy 2: Bounding-box variant - detect bounds and calculate layers
      if (resolvedConfig.variant === 'bounding-box') {
        const boundingBoxLayers = createBoundingBoxFocusRings(element, resolvedConfig);
        setLayers(boundingBoxLayers);
      }
    };

    // Calculate layers initially
    calculateRings();

    // Set up MutationObserver to detect changes in geometric attributes
    // This ensures focus ring updates automatically when the element moves or resizes
    const observer = new MutationObserver(mutations => {
      const hasGeometricChanges = mutations.some(
        mutation =>
          mutation.type === 'attributes' &&
          SVG_GEOMETRIC_ATTRIBUTES.includes(mutation.attributeName ?? '')
      );

      if (hasGeometricChanges) {
        // Recalculate focus rings on relevant attribute changes
        calculateRings();
      }
    });

    // Observe only geometric attributes that affect position and size
    observer.observe(element, {
      attributeFilter: [...SVG_GEOMETRIC_ATTRIBUTES],
      attributes: true,
    });

    return () => observer.disconnect();
  }, [isFocused, resolvedConfig]);

  return {
    layers,
    resolvedConfig,
  };
}
