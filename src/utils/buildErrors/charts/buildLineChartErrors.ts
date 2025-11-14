/**
 * Creates a dynamic projection bounds error with specific upper and lower values
 */
export const buildProjectionBoundsError = (upperY: number, lowerY: number): Error =>
  new Error(
    `Invalid projection bounds - upper projection (${upperY}) must be below lower projection (${lowerY})`
  );

/**
 * Creates a dynamic projection X coordinate out of range error
 */
export const buildProjectionXOutOfRangeError = (coordinate: number, isUpper: boolean): Error =>
  new Error(
    `${isUpper ? 'Upper' : 'Lower'} projection X coordinate (${coordinate}) is outside valid range (0-100)`
  );

/**
 * Creates a dynamic projection Y coordinate out of range error
 */
export const buildProjectionYOutOfRangeError = (
  coordinate: number,
  svgHeight: number,
  isUpper: boolean
): Error =>
  new Error(
    `${isUpper ? 'Upper' : 'Lower'} projection Y coordinate (${coordinate}) is outside chart area (0-${svgHeight})`
  );
