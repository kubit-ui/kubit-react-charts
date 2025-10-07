export const BuildError = {
  INVALID_X_TICK: 'INVALID_X_TICK',
} as const;

const INVALID_X_TICK_ERROR = '[getXTicks] Invalid X tick values calculated';

export const ErrorsRecord: Record<(typeof BuildError)[keyof typeof BuildError], Error> = {
  INVALID_X_TICK: new Error(INVALID_X_TICK_ERROR),
};

export const buildError = (error: (typeof BuildError)[keyof typeof BuildError]): Error =>
  ErrorsRecord[error];
