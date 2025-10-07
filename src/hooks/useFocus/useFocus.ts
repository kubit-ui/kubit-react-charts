import { type FocusEvent, useCallback, useState } from 'react';

import type { FocusHandler, UseFocusReturn } from './useFocus.types';

/**
 * Custom React hook to manage focus state and handle focus/blur events for an element.
 *
 * This hook provides a way to manage the focus state of an element and handle its focus and blur events
 * with optional custom handlers. It returns the focus state and functions to handle focus and blur events,
 * which can be used directly on the target element.
 *
 * @template T - A type parameter that extends either HTMLElement or SVGElement, indicating the type of the target element.
 * @param onFocus - An optional custom focus event handler of type `FocusHandler<T>`. It is called when the element gains focus.
 * @param onBlur - An optional custom blur event handler of type `FocusHandler<T>`. It is called when the element loses focus.
 * @returns An object of type `UseFocusReturn<T>` containing the focus state (`isFocused`), and functions to handle focus (`handleFocus`) and blur (`handleBlur`) events.
 */
export const useFocus = <T extends HTMLElement | SVGElement>(
  onFocus?: FocusHandler<T>,
  onBlur?: FocusHandler<T>
): UseFocusReturn<T> => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(
    (event: FocusEvent<T>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<T>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  return { handleBlur, handleFocus, isFocused };
};
