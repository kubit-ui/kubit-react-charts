import {
  BuildError,
  ErrorsRecord,
  buildCanvasDimensionsError,
  buildError,
  buildSeparatorXBreakAxisError,
  buildSeparatorXOutOfRangeError,
  buildSeparatorYBreakAxisError,
  buildSeparatorYOutOfRangeError,
} from '../buildErrors';

describe('buildErrors', () => {
  describe('buildError function', () => {
    it('should return the same Error instance from record', () => {
      const error = buildError(BuildError.INVALID_X_TICK);

      expect(error).toBe(ErrorsRecord[BuildError.INVALID_X_TICK]);
    });

    it('should return correct error for LINE_CHART_NO_DATA', () => {
      const error = buildError(BuildError.LINE_CHART_NO_DATA);

      expect(error).toBe(ErrorsRecord[BuildError.LINE_CHART_NO_DATA]);
      expect(error.message).toBe('Data validation failed: no data provided for chart rendering');
    });

    it('should return correct error for LINE_CHART_SINGLE_POINT', () => {
      const error = buildError(BuildError.LINE_CHART_SINGLE_POINT);

      expect(error).toBe(ErrorsRecord[BuildError.LINE_CHART_SINGLE_POINT]);
      expect(error.message).toBe(
        'Data validation failed: single data point provided, minimum 2 required for line chart'
      );
    });

    it('should return correct error for LINE_CHART_INVALID_CANVAS', () => {
      const error = buildError(BuildError.LINE_CHART_INVALID_CANVAS);

      expect(error).toBe(ErrorsRecord[BuildError.LINE_CHART_INVALID_CANVAS]);
      expect(error.message).toBe(
        'Canvas dimensions validation failed: both width and height must be > 0'
      );
    });
  });

  describe('buildCanvasDimensionsError function', () => {
    it('should create dynamic canvas error with specific dimensions', () => {
      const error = buildCanvasDimensionsError(0, 100);

      expect(error.message).toBe(
        'Canvas dimensions validation failed: width=0, height=100 (both must be > 0)'
      );
    });

    it('should create dynamic canvas error with negative dimensions', () => {
      const error = buildCanvasDimensionsError(-50, -25);

      expect(error.message).toBe(
        'Canvas dimensions validation failed: width=-50, height=-25 (both must be > 0)'
      );
    });

    it('should create dynamic canvas error with zero dimensions', () => {
      const error = buildCanvasDimensionsError(0, 0);

      expect(error.message).toBe(
        'Canvas dimensions validation failed: width=0, height=0 (both must be > 0)'
      );
    });

    it('should create dynamic canvas error with decimal dimensions', () => {
      const error = buildCanvasDimensionsError(100.5, 200.7);

      expect(error.message).toBe(
        'Canvas dimensions validation failed: width=100.5, height=200.7 (both must be > 0)'
      );
    });
  });

  describe('buildSeparatorXBreakAxisError function', () => {
    it('should create dynamic separator X break axis error with string value', () => {
      const error = buildSeparatorXBreakAxisError('invalid');

      expect(error.message).toBe("Invalid xBreakAxis value: 'invalid' cannot be parsed as number");
    });

    it('should create dynamic separator X break axis error with number value', () => {
      const error = buildSeparatorXBreakAxisError(NaN);

      expect(error.message).toBe("Invalid xBreakAxis value: 'NaN' cannot be parsed as number");
    });

    it('should create dynamic separator X break axis error with undefined', () => {
      const error = buildSeparatorXBreakAxisError(undefined as unknown as string);

      expect(error.message).toBe(
        "Invalid xBreakAxis value: 'undefined' cannot be parsed as number"
      );
    });

    it('should create dynamic separator X break axis error with object', () => {
      const error = buildSeparatorXBreakAxisError({} as unknown as string);

      expect(error.message).toBe(
        "Invalid xBreakAxis value: '[object Object]' cannot be parsed as number"
      );
    });
  });

  describe('buildSeparatorYBreakAxisError function', () => {
    it('should create dynamic separator Y break axis error', () => {
      const error = buildSeparatorYBreakAxisError('invalid');

      expect(error.message).toBe("Invalid yBreakAxis value: 'invalid' cannot be parsed as number");
    });

    it('should create dynamic separator Y break axis error with NaN', () => {
      const error = buildSeparatorYBreakAxisError(NaN);

      expect(error.message).toBe("Invalid yBreakAxis value: 'NaN' cannot be parsed as number");
    });

    it('should create dynamic separator Y break axis error with null', () => {
      const error = buildSeparatorYBreakAxisError(null as unknown as string);

      expect(error.message).toBe("Invalid yBreakAxis value: 'null' cannot be parsed as number");
    });
  });

  describe('buildSeparatorXOutOfRangeError function', () => {
    it('should create dynamic separator X out of range error', () => {
      const error = buildSeparatorXOutOfRangeError(150, 0, 100);

      expect(error.message).toBe('xBreakAxis value 150 is outside data range (0 - 100)');
    });

    it('should create dynamic separator X out of range error with negative values', () => {
      const error = buildSeparatorXOutOfRangeError(-10, -50, 50);

      expect(error.message).toBe('xBreakAxis value -10 is outside data range (-50 - 50)');
    });

    it('should create dynamic separator X out of range error with decimal values', () => {
      const error = buildSeparatorXOutOfRangeError(25.5, 0.1, 20.9);

      expect(error.message).toBe('xBreakAxis value 25.5 is outside data range (0.1 - 20.9)');
    });
  });

  describe('buildSeparatorYOutOfRangeError function', () => {
    it('should create dynamic separator Y out of range error', () => {
      const error = buildSeparatorYOutOfRangeError(200, 50, 150);

      expect(error.message).toBe('yBreakAxis value 200 is outside data range (50 - 150)');
    });

    it('should create dynamic separator Y out of range error with zero range', () => {
      const error = buildSeparatorYOutOfRangeError(10, 0, 0);

      expect(error.message).toBe('yBreakAxis value 10 is outside data range (0 - 0)');
    });

    it('should create dynamic separator Y out of range error with large values', () => {
      const error = buildSeparatorYOutOfRangeError(10000, 1000, 5000);

      expect(error.message).toBe('yBreakAxis value 10000 is outside data range (1000 - 5000)');
    });
  });
});
