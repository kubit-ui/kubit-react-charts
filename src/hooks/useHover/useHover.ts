import { useCallback, useState } from 'react';

import type { MouseHandler, UseHoverReturn } from './useHover.types';

/**
 * A custom hook that manages hover state and provides event handlers for mouse enter and leave events,
 * with optional custom handlers. It returns the hover state and functions to handle mouse enter and leave events,
 * which can be used directly on the target element.
 *
 * @template T - A type parameter that extends either HTMLElement or SVGElement, indicating the type of the target element.
 * @param onMouseEnter - An optional custom mouse enter event handler of type `MouseHandler<T>`. It is called when the element is hovered.
 * @param onMouseLeave - An optional custom mouse leave event handler of type `MouseHandler<T>`. It is called when the element is no longer hovered.
 * @returns An object of type `UseHoverReturn<T>` containing the hover state (`isHovered`), and functions to handle mouse enter (`handleMouseEnter`) and leave (`handleMouseLeave`) events.
 */
export const useHover = <T extends HTMLElement | SVGElement>(
  onMouseEnter?: MouseHandler<T>,
  onMouseLeave?: MouseHandler<T>
): UseHoverReturn<T> => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<T>) => {
      setIsHovered(true);
      onMouseEnter?.(event);
    },
    [onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<T>) => {
      setIsHovered(false);
      onMouseLeave?.(event);
    },
    [onMouseLeave]
  );

  return {
    handleMouseEnter,
    handleMouseLeave,
    isHovered,
  };
};
