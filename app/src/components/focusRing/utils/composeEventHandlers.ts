import type { FocusEvent } from 'react';

/**
 * Utility to compose multiple event handlers into a single handler.
 * This allows us to preserve existing event handlers while adding our own.
 *
 * @param originalHandler Original event handler (may be undefined)
 * @param newHandler New event handler to add
 * @returns A single event handler that calls both handlers in order
 */
export const composeEventHandlers = <T extends HTMLElement | SVGElement>(
  originalHandler?: (event: FocusEvent<T>) => void,
  newHandler?: (event: FocusEvent<T>) => void
): ((event: FocusEvent<T>) => void) => {
  return (event: FocusEvent<T>) => {
    if (originalHandler) {
      originalHandler(event);
    }
    if (newHandler) {
      newHandler(event);
    }
  };
};
