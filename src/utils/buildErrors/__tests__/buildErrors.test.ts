import { BuildError, ErrorsRecord, buildError } from '../buildErrors';

describe('buildErrors', () => {
  describe('buildError function', () => {
    it('should return the same Error instance from record', () => {
      const error = buildError(BuildError.INVALID_X_TICK);

      expect(error).toBe(ErrorsRecord[BuildError.INVALID_X_TICK]);
    });
  });
});
