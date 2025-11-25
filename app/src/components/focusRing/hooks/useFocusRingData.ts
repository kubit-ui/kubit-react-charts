import { type RefObject, useLayoutEffect, useMemo, useState } from 'react';

import type { FocusConfig } from '@/types/focusConfig.type';
import {
  calculateFocusOutline,
  getFocusConfig,
} from '@/utils/calculateFocusOutline/calculateFocusOutline';

import { createFocusRingLayers } from '../utils/createFocusRingLayers';
import { type ElementInfo, detectElementBounds } from '../utils/detectElementInfo';

export interface UseFocusRingDataOptions {
  elementRef: RefObject<SVGElement>;
  isFocused: boolean;
  focusConfig?: FocusConfig;
}

export interface FocusRingData {
  resolvedConfig: Required<FocusConfig>;
  domDetectedInfo: ElementInfo | null;
  adaptiveLayers: ReturnType<typeof createFocusRingLayers> | null;
  focusOutline: ReturnType<typeof calculateFocusOutline> | null;
}

/**
 * Hook that handles all focus ring data calculation logic.
 * Separated from rendering concerns for better testability and reusability.
 *
 * This hook:
 * - Detects element bounds from DOM on mount and when focus state changes
 * - Generates adaptive layers when using adaptive variant
 * - Calculates bounding-box outline when using bounding-box variant
 * - Manages all the state and effects related to focus ring data
 *
 * @param options - Configuration options for the hook
 * @returns Focus ring data including resolved config, DOM info, and calculated layers/outline
 */
export function useFocusRingData({
  elementRef,
  focusConfig,
  isFocused,
}: UseFocusRingDataOptions): FocusRingData {
  // Resolve config once at the top
  const resolvedConfig = useMemo(() => getFocusConfig(focusConfig), [focusConfig]);

  const [domDetectedInfo, setDomDetectedInfo] = useState<ElementInfo | null>(null);
  const [adaptiveLayers, setAdaptiveLayers] = useState<ReturnType<
    typeof createFocusRingLayers
  > | null>(null);

  // DOM detection and adaptive layers generation
  // Using useLayoutEffect to avoid visual delay when elements move
  // This runs synchronously BEFORE browser paint, ensuring focus rings update immediately
  // Detection happens on mount, when isFocused changes, or when focus config changes
  useLayoutEffect(() => {
    // Need a mounted DOM element
    if (!elementRef?.current) {
      return;
    }

    // Always detect from DOM for accurate measurements
    const domInfo = detectElementBounds(elementRef.current);
    if (domInfo?.isValid) {
      setDomDetectedInfo(domInfo);
    }

    // Generate adaptive layers ONLY if needed
    if (resolvedConfig.variant === 'adaptive' && isFocused) {
      const layers = createFocusRingLayers(elementRef.current, resolvedConfig);
      setAdaptiveLayers(layers);
    } else {
      setAdaptiveLayers(null);
    }
  }, [elementRef, isFocused, resolvedConfig]);

  // Calculate focus outline ONLY for bounding-box variant
  // Skip calculation for adaptive mode to avoid unnecessary work
  const focusOutline = useMemo(() => {
    // Early return if not using bounding-box mode
    if (resolvedConfig.variant !== 'bounding-box') {
      return null;
    }

    if (!domDetectedInfo?.isValid) {
      return null;
    }

    return calculateFocusOutline({
      elementHeight: domDetectedInfo.elementHeight || domDetectedInfo.elementSize || 24,
      elementPosition: domDetectedInfo.elementPosition || { x: 0, y: 0 },
      elementStrokeWidth: domDetectedInfo.elementStrokeWidth ?? 0,
      elementType: 'rectangle',
      elementWidth: domDetectedInfo.elementWidth || domDetectedInfo.elementSize || 24,
      gap: resolvedConfig.gap,
      innerStrokeWidth: resolvedConfig.innerStrokeWidth,
      outlineStrokeWidth: resolvedConfig.outlineStrokeWidth,
    });
  }, [domDetectedInfo, resolvedConfig]);

  return {
    adaptiveLayers,
    domDetectedInfo,
    focusOutline,
    resolvedConfig,
  };
}
