import {
  buildProjectionBoundsError,
  buildProjectionXOutOfRangeError,
  buildProjectionYOutOfRangeError,
} from '../charts/buildLineChartErrors';

describe('buildLineChartErrors', () => {
  describe('buildProjectionBoundsError function', () => {
    it('should create dynamic projection bounds error', () => {
      const error = buildProjectionBoundsError(50, 30);

      expect(error.message).toBe(
        'Invalid projection bounds - upper projection (50) must be below lower projection (30)'
      );
    });

    it('should handle edge case with equal values', () => {
      const error = buildProjectionBoundsError(100, 100);

      expect(error.message).toBe(
        'Invalid projection bounds - upper projection (100) must be below lower projection (100)'
      );
    });

    it('should handle negative values', () => {
      const error = buildProjectionBoundsError(-10, -20);

      expect(error.message).toBe(
        'Invalid projection bounds - upper projection (-10) must be below lower projection (-20)'
      );
    });
  });

  describe('buildProjectionXOutOfRangeError function', () => {
    it('should create dynamic upper projection X out of range error', () => {
      const error = buildProjectionXOutOfRangeError(150, true);

      expect(error.message).toBe(
        'Upper projection X coordinate (150) is outside valid range (0-100)'
      );
    });

    it('should create dynamic lower projection X out of range error', () => {
      const error = buildProjectionXOutOfRangeError(-10, false);

      expect(error.message).toBe(
        'Lower projection X coordinate (-10) is outside valid range (0-100)'
      );
    });

    it('should handle zero coordinate for upper projection', () => {
      const error = buildProjectionXOutOfRangeError(0, true);

      expect(error.message).toBe(
        'Upper projection X coordinate (0) is outside valid range (0-100)'
      );
    });

    it('should handle boundary values', () => {
      const error = buildProjectionXOutOfRangeError(101, true);

      expect(error.message).toBe(
        'Upper projection X coordinate (101) is outside valid range (0-100)'
      );
    });
  });

  describe('buildProjectionYOutOfRangeError function', () => {
    it('should create dynamic upper projection Y out of range error', () => {
      const error = buildProjectionYOutOfRangeError(250, 200, true);

      expect(error.message).toBe(
        'Upper projection Y coordinate (250) is outside chart area (0-200)'
      );
    });

    it('should create dynamic lower projection Y out of range error', () => {
      const error = buildProjectionYOutOfRangeError(-5, 100, false);

      expect(error.message).toBe(
        'Lower projection Y coordinate (-5) is outside chart area (0-100)'
      );
    });

    it('should handle zero height chart area', () => {
      const error = buildProjectionYOutOfRangeError(1, 0, true);

      expect(error.message).toBe('Upper projection Y coordinate (1) is outside chart area (0-0)');
    });

    it('should handle large chart areas', () => {
      const error = buildProjectionYOutOfRangeError(1500, 1000, false);

      expect(error.message).toBe(
        'Lower projection Y coordinate (1500) is outside chart area (0-1000)'
      );
    });

    it('should handle decimal coordinates', () => {
      const error = buildProjectionYOutOfRangeError(50.5, 100.7, true);

      expect(error.message).toBe(
        'Upper projection Y coordinate (50.5) is outside chart area (0-100.7)'
      );
    });
  });
});
