/**
 * Generates a string of class names based on the provided arguments.
 * Each argument can be:
 * - A string, which will be included directly in the output.
 * - An array of strings, where each string will be included in the output.
 * - An object with keys as class names and boolean values indicating whether the class should be included.
 *
 * @param args - A rest parameter that accepts an array of strings, arrays of strings, or objects with string keys and boolean values.
 * @returns A string of class names, separated by spaces.
 */
export const classNames = (...args: (string | string[] | { [key: string]: boolean })[]): string => {
  return args
    .flatMap(arg => {
      if (typeof arg === 'string') {
        return arg;
      } if (Array.isArray(arg)) {
        return arg;
      }
      return Object.entries(arg)
        .filter(([, value]) => value)
        .map(([key]) => key);
    })
    .join(' ');
};
