import type { ZoomRange } from '../zoomArea.type';

/**
 * Range operations and position calculation utilities for ZoomArea
 */

/**
 * Calculates handler positions based on current range
 *
 * @param currentRange - The current zoom range
 * @param dataLength - Total length of the dataset
 * @param width - Canvas width for scaling
 * @returns Object with startX and endX positions
 */
export const calculateHandlerPositions = (
  currentRange: ZoomRange,
  dataLength: number,
  width: number
): { startX: number; endX: number } => {
  const startX = (currentRange.start / Math.max(1, dataLength - 1)) * width;
  const endX = (currentRange.end / Math.max(1, dataLength - 1)) * width;
  return { endX, startX };
};

/**
 * Converts mouse position to continuous data index
 *
 * @param mouseX - Mouse X coordinate relative to the chart
 * @param width - Canvas width
 * @param dataLength - Total length of the dataset
 * @returns Data index
 */
export const mouseToDataIndex = (mouseX: number, width: number, dataLength: number): number => {
  const relativeX = Math.max(0, Math.min(width, mouseX));
  const normalizedPosition = relativeX / width;
  return Math.round(normalizedPosition * (dataLength - 1));
};

/**
 * Clamps a range to valid bounds
 *
 * @param range - The range to clamp
 * @param dataLength - Total length of the dataset
 * @param minDistance - Minimum distance between start and end (default: 0.1)
 * @returns Clamped range within valid bounds
 */
export const clampRange = (
  range: ZoomRange,
  dataLength: number,
  minDistance: number = 0.1
): ZoomRange => {
  const clampedStart = Math.max(0, Math.min(range.start, dataLength - 1 - minDistance));
  const clampedEnd = Math.min(dataLength - 1, Math.max(range.end, clampedStart + minDistance));

  return {
    end: clampedEnd,
    start: clampedStart,
  };
};

/**
 * Creates a default range for the given data length
 *
 * @param dataLength - Total length of the dataset
 * @returns Default range covering the full dataset
 */
export const createDefaultRange = (dataLength: number): ZoomRange => ({
  end: Math.max(0, dataLength - 1),
  start: 0,
});

/**
 * Determines if the current range covers the full dataset.
 * According to design specs: overlay is "only visible when a range is defined".
 * A range is considered "defined" when it doesn't cover the complete dataset.
 *
 * @param range - The current zoom range
 * @param dataLength - Total length of the dataset
 * @returns true if the range covers the full dataset (no selection defined)
 *
 * @example
 * ```typescript
 * // Dataset with 10 elements [0-9]
 * isFullRange({ start: 0, end: 9 }, 10); // true - covers full dataset
 * isFullRange({ start: 1, end: 8 }, 10); // false - partial selection
 * isFullRange({ start: 0, end: 7 }, 10); // false - partial selection
 * ```
 */
export const isFullRange = (range: ZoomRange, dataLength: number): boolean => {
  return range.start === 0 && range.end === dataLength - 1;
};
