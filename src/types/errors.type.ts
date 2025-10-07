export const ErrorType = {
  GENERIC: 'GENERIC',
} as const;

export interface ChartError {
  error?: Error;
}

export type ChartErrorCollection = {
  [type in (typeof ErrorType)[keyof typeof ErrorType]]?: ChartError;
};
