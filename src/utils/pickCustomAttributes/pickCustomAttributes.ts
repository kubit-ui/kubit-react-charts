/**
 * Filters and extracts only aria-* and data-* attributes from a given object,
 * converting all values to strings for HTML compatibility.
 *
 * This function is useful for extracting accessibility and data attributes
 * from props or configuration objects and ensuring they are properly formatted
 * for HTML rendering.
 *
 * @param attributes - An optional object containing key-value pairs of attributes.
 *   - Keys can be strings representing attribute names.
 *   - Values can be strings, booleans, numbers, or any other type.
 *
 * @returns A new object containing only aria-* and data-* attributes:
 *   - Only includes attributes that start with `aria-` or `data-`.
 *   - All values are converted to strings for HTML compatibility.
 *   - Null and undefined values are excluded.
 *
 * @example
 * ```typescript
 * const props = {
 *   'aria-label': 'Button',
 *   'data-testid': 'my-button',
 *   'onClick': () => {},
 *   'className': 'btn',
 *   'aria-hidden': true
 * };
 *
 * const result = pickCustomAttributes(props);
 * // Result: { 'aria-label': 'Button', 'data-testid': 'my-button', 'aria-hidden': 'true' }
 * ```
 */
export const pickCustomAttributes = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: Record<string, any>
): Record<string, string> => {
  if (!attributes) {
    return {};
  }

  return Object.entries(attributes).reduce(
    (acc, [key, value]) => {
      if (
        (key.startsWith('aria-') || key.startsWith('data-')) &&
        value !== null &&
        value !== undefined
      ) {
        acc[key] = String(value);
      }
      return acc;
    },
    {} as Record<string, string>
  );
};
