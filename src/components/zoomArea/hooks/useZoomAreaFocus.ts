import { useCallback, useState } from 'react';

import type { ZoomAreaElements } from '../zoomArea.type';

/**
 * Return value for the useZoomAreaFocus hook
 */
interface UseZoomAreaFocusReturn {
  /** Handler for focusing on a specific element */
  handleFocus: (target: keyof typeof ZoomAreaElements) => () => void;
  /** Handler for clearing focus */
  handleBlur: () => void;
  /** Utility to check if an element is focused */
  isFocused: (target: keyof typeof ZoomAreaElements) => boolean;
}

/**
 * Custom hook for managing focus state of zoom area elements.
 *
 * Provides centralized focus management for all interactive elements
 * (start handler, end handler, selection area) with proper coordination.
 *
 * @param params - Configuration parameters for the hook
 * @returns Object with focus handlers and utilities
 */
export const useZoomAreaFocus = (): UseZoomAreaFocusReturn => {
  const [focusedElement, setFocusedElement] = useState<keyof typeof ZoomAreaElements | null>(null);

  const handleFocus = useCallback((target: keyof typeof ZoomAreaElements) => {
    return () => setFocusedElement(target);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedElement(null);
  }, []);

  // Helper function to check focus state
  const isFocused = useCallback(
    (target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements]) => {
      return focusedElement === target;
    },
    [focusedElement]
  );

  return {
    handleBlur,
    handleFocus,
    isFocused,
  };
};
