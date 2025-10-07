/**
 * A function type for formatting chart values.
 * Takes a value of type T and returns a formatted string.
 * @template T - The type of the input value to be formatted
 */
export type ValueFormatter<T = string> = (value: T) => string;
