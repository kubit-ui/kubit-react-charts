import type { FocusEvent } from 'react';

/**
 * Defines a generic focus event handler function type.
 *
 * This type represents a function that handles focus events for HTML or SVG elements.
 * It takes a FocusEvent specific to the element type (T) as its argument.
 *
 * @template T - A type that extends either HTMLElement or SVGElement, representing the target element of the focus event.
 * @param event - The focus event object associated with the focus or blur action on the element.
 */
export interface FocusHandler<T extends HTMLElement | SVGElement> {
  (event: FocusEvent<T>): void;
}

/**
 * Defines the return type of the useFocus hook.
 *
 * This interface encapsulates the state and functions returned by the useFocus hook,
 * providing a way to manage focus state and handle focus and blur events for HTML or SVG elements.
 *
 * @template T - A type that extends either HTMLElement or SVGElement, representing the target element of the focus or blur events.
 * @property isFocused - A boolean indicating whether the element is currently focused.
 * @property handleFocus - A function to be called when the element gains focus. It conforms to the FocusHandler type.
 * @property handleBlur - A function to be called when the element loses focus. It also conforms to the FocusHandler type.
 */
export interface UseFocusReturn<T extends HTMLElement | SVGElement> {
  isFocused: boolean;
  handleFocus: FocusHandler<T>;
  handleBlur: FocusHandler<T>;
}
