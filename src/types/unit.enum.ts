/**
 * Enumeration representing units of measurement that need some transformation to pixels (px).
 *
 * @enum {string}
 * @property {string} PERCENTAGE - Represents a percentage unit ('%').
 * @property {string} REM - Represents a rem unit ('rem')
 */
export const Unit = {
  PERCENTAGE: '%',
  REM: 'rem',
} as const;
