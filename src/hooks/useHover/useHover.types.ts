import type { MouseEvent } from 'react';

/**
 * Defines a generic hover event handler function type.
 *
 * This type represents a function that handles hover events for HTML or SVG elements.
 * It takes a MouseEvent specific to the element type (T) as its argument.
 *
 * @template T - A type that extends either HTMLElement or SVGElement, representing the target element of the hover event.
 * @param event - The hover event object associated with the mouse enter or mouse leave action on the element.
 */
export interface MouseHandler<T extends HTMLElement | SVGElement> {
  (event: MouseEvent<T>): void;
}

/**
 * Represents the return type of the `useHover` hook.
 *
 * This interface encapsulates the state and functions returned by the useHover hook,
 * providing a way to manage hover state and handle mouse enter and mouse leave events for HTML or SVG elements.
 *
 * @template T - A type that extends either HTMLElement or SVGElement, representing the target element of the mouse enter or mouse leave events.
 * @property isHovered - A boolean indicating whether the element is currently being hovered.
 * @property handleMouseEnter - A function to be called when the mouse enters the element.
 * @property handleMouseLeave - A function to be called when the mouse leaves the element.
 */
export interface UseHoverReturn<T extends HTMLElement | SVGElement> {
  isHovered: boolean;
  handleMouseEnter: MouseHandler<T>;
  handleMouseLeave: MouseHandler<T>;
}
