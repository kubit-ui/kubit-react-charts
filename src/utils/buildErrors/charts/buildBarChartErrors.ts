/**
 * Creates a dynamic error for when a dataKey is not found in the dataset
 */
export const buildBarDataKeyNotFoundError = (dataKey: string): Error =>
  new Error(`DataKey "${dataKey}" not found in dataset`);

/**
 * Creates a dynamic error for invalid bar value
 */
export const buildBarValueError = (value: unknown, dataKey: string): Error =>
  new Error(`Invalid value "${value}" for bar with dataKey "${dataKey}". Must be a valid number.`);

/**
 * Creates a dynamic error for negative bar value when not allowed
 */
export const buildBarNegativeValueError = (value: number, dataKey: string): Error =>
  new Error(
    `Negative value ${value} not allowed for bar with dataKey "${dataKey}" in current configuration`
  );

/**
 * Creates a dynamic error for invalid bar distribution
 */
export const buildBarDistributionError = (dataKey: string, reason: string): Error =>
  new Error(`Invalid bar distribution for "${dataKey}": ${reason}`);
