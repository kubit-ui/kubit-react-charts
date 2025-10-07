/**
 * Index rounding utilities for consistent data filtering and accessibility labels.
 *
 * These utilities ensure that both data filtering (useZoomData) and accessibility labels
 * (generateAccessibilityLabels) use exactly the same rounding logic, preventing
 * inconsistencies between what users see and what screen readers announce.
 */

/**
 * Rounds a fractional index to be used as a start index (inclusive lower bound).
 * Uses Math.floor() to include the current data point and everything after it.
 *
 * @param index - Continuous index (can be fractional)
 * @param maxIndex - Maximum valid index (usually data.length - 1)
 * @returns Rounded index clamped to valid bounds
 *
 * @example
 * ```typescript
 * roundStartIndex(1.3, 4); // Math.floor(1.3) = 1, clamped to [0,4] → 1
 * roundStartIndex(-0.5, 4); // Math.floor(-0.5) = -1, clamped to [0,4] → 0
 * ```
 */
export const roundStartIndex = (index: number, maxIndex: number): number => {
  const rounded = Math.floor(index);
  return Math.max(0, Math.min(maxIndex, rounded));
};

/**
 * Rounds a fractional index to be used as an end index (inclusive upper bound).
 * Uses Math.ceil() to include the current data point and everything before it.
 *
 * @param index - Continuous index (can be fractional)
 * @param maxIndex - Maximum valid index (usually data.length - 1)
 * @returns Rounded index clamped to valid bounds
 *
 * @example
 * ```typescript
 * roundEndIndex(2.7, 4); // Math.ceil(2.7) = 3, clamped to [0,4] → 3
 * roundEndIndex(5.2, 4); // Math.ceil(5.2) = 6, clamped to [0,4] → 4
 * ```
 */
export const roundEndIndex = (index: number, maxIndex: number): number => {
  const rounded = Math.ceil(index);
  return Math.max(0, Math.min(maxIndex, rounded));
};

/**
 * Converts a fractional range to integer indices using consistent rounding.
 * This is the core function that both data filtering and accessibility use.
 *
 * @param range - Zoom range with potentially fractional start/end values
 * @param dataLength - Length of the data array
 * @returns Object with rounded startIndex and endIndex
 *
 * @example
 * ```typescript
 * const indices = getRangeIndices({ start: 1.3, end: 3.7 }, 10);
 * // Returns: { startIndex: 1, endIndex: 4 }
 *
 * // This can be used for:
 * // 1. Data filtering: data.slice(startIndex, endIndex + 1)
 * // 2. Accessibility: data[startIndex][xKey] to data[endIndex][xKey]
 * ```
 */
export const getRangeIndices = (
  range: { start: number; end: number },
  dataLength: number
): { startIndex: number; endIndex: number } => {
  const maxIndex = Math.max(0, dataLength - 1);

  return {
    endIndex: roundEndIndex(range.end, maxIndex),
    startIndex: roundStartIndex(range.start, maxIndex),
  };
};
