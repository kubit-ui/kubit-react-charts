/**
 * Creates a dynamic error for when a segment value is not numeric
 */
export const buildSegmentValueError = (value: unknown, groupName: string): Error =>
  new Error(`Invalid segment value for "${groupName}": "${value}" is not a valid number`);

/**
 * Creates a dynamic error for when a segment value is negative
 */
export const buildSegmentNegativeValueError = (value: number, groupName: string): Error =>
  new Error(`Negative segment value for "${groupName}": ${value} (values must be >= 0)`);

/**
 * Creates a dynamic error for when a dataKey is not found in the dataset
 */
export const buildPieDataKeyNotFoundError = (dataKey: string): Error =>
  new Error(`DataKey "${dataKey}" not found in PieChart dataset`);

/**
 * Creates a dynamic error for when the data array is empty
 */
export const buildEmptyDataArrayError = (dataKey: string): Error =>
  new Error(`Data array for key "${dataKey}" is empty`);

/**
 * Creates a dynamic error for when total value is zero or invalid
 */
export const buildInvalidTotalError = (dataKey: string, total: number): Error =>
  new Error(`Invalid total value for "${dataKey}": ${total} (must be > 0)`);

/**
 * Creates a dynamic error for when a group is missing required properties
 */
export const buildInvalidGroupError = (
  dataKey: string,
  index: number,
  missingProp: string
): Error =>
  new Error(
    `Invalid group at index ${index} in "${dataKey}": missing required property "${missingProp}"`
  );

/**
 * Creates a dynamic error for invalid radius value
 */
export const buildInvalidRadiusError = (radius: unknown): Error =>
  new Error(`Invalid radius value: "${radius}" (must be a positive number)`);

/**
 * Creates a dynamic error for invalid innerRadius value
 */
export const buildInvalidInnerRadiusError = (innerRadius: unknown): Error =>
  new Error(`Invalid innerRadius value: "${innerRadius}" (must be a positive number or zero)`);

/**
 * Creates a dynamic error for when innerRadius is greater than or equal to radius
 */
export const buildInnerRadiusOutOfRangeError = (innerRadius: number, radius: number): Error =>
  new Error(
    `innerRadius (${innerRadius}) must be less than radius (${radius}) for donut chart rendering`
  );
