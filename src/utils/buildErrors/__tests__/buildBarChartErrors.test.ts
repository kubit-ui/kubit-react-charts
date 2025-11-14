import {
  buildBarDataKeyNotFoundError,
  buildBarDistributionError,
  buildBarNegativeValueError,
  buildBarValueError,
} from '../charts/buildBarChartErrors';

describe('buildBarChartErrors', () => {
  describe('buildBarDataKeyNotFoundError function', () => {
    it('should create dynamic error for missing dataKey', () => {
      const error = buildBarDataKeyNotFoundError('revenue');

      expect(error.message).toBe('DataKey "revenue" not found in dataset');
    });

    it('should handle empty string dataKey', () => {
      const error = buildBarDataKeyNotFoundError('');

      expect(error.message).toBe('DataKey "" not found in dataset');
    });

    it('should handle special characters in dataKey', () => {
      const error = buildBarDataKeyNotFoundError('user-count_2024');

      expect(error.message).toBe('DataKey "user-count_2024" not found in dataset');
    });
  });

  describe('buildBarValueError function', () => {
    it('should create dynamic error for invalid string value', () => {
      const error = buildBarValueError('invalid', 'sales');

      expect(error.message).toBe(
        'Invalid value "invalid" for bar with dataKey "sales". Must be a valid number.'
      );
    });

    it('should create dynamic error for null value', () => {
      const error = buildBarValueError(null, 'profit');

      expect(error.message).toBe(
        'Invalid value "null" for bar with dataKey "profit". Must be a valid number.'
      );
    });

    it('should create dynamic error for undefined value', () => {
      const error = buildBarValueError(undefined, 'count');

      expect(error.message).toBe(
        'Invalid value "undefined" for bar with dataKey "count". Must be a valid number.'
      );
    });

    it('should create dynamic error for object value', () => {
      const error = buildBarValueError({ value: 100 }, 'data');

      expect(error.message).toBe(
        'Invalid value "[object Object]" for bar with dataKey "data". Must be a valid number.'
      );
    });

    it('should create dynamic error for array value', () => {
      const error = buildBarValueError([1, 2, 3], 'items');

      expect(error.message).toBe(
        'Invalid value "1,2,3" for bar with dataKey "items". Must be a valid number.'
      );
    });

    it('should create dynamic error for NaN value', () => {
      const error = buildBarValueError(NaN, 'score');

      expect(error.message).toBe(
        'Invalid value "NaN" for bar with dataKey "score". Must be a valid number.'
      );
    });
  });

  describe('buildBarNegativeValueError function', () => {
    it('should create dynamic error for negative value', () => {
      const error = buildBarNegativeValueError(-50, 'height');

      expect(error.message).toBe(
        'Negative value -50 not allowed for bar with dataKey "height" in current configuration'
      );
    });

    it('should create dynamic error for zero value', () => {
      const error = buildBarNegativeValueError(0, 'width');

      expect(error.message).toBe(
        'Negative value 0 not allowed for bar with dataKey "width" in current configuration'
      );
    });

    it('should handle decimal negative values', () => {
      const error = buildBarNegativeValueError(-123.45, 'temperature');

      expect(error.message).toBe(
        'Negative value -123.45 not allowed for bar with dataKey "temperature" in current configuration'
      );
    });

    it('should handle very small negative values', () => {
      const error = buildBarNegativeValueError(-0.001, 'precision');

      expect(error.message).toBe(
        'Negative value -0.001 not allowed for bar with dataKey "precision" in current configuration'
      );
    });
  });

  describe('buildBarDistributionError function', () => {
    it('should create dynamic error for distribution issue', () => {
      const error = buildBarDistributionError('category', 'sum exceeds 100%');

      expect(error.message).toBe('Invalid bar distribution for "category": sum exceeds 100%');
    });

    it('should create dynamic error for empty distribution', () => {
      const error = buildBarDistributionError('groups', 'no valid data points found');

      expect(error.message).toBe(
        'Invalid bar distribution for "groups": no valid data points found'
      );
    });

    it('should create dynamic error for spacing issues', () => {
      const error = buildBarDistributionError('bars', 'insufficient space for all bars');

      expect(error.message).toBe(
        'Invalid bar distribution for "bars": insufficient space for all bars'
      );
    });

    it('should create dynamic error for overflow', () => {
      const error = buildBarDistributionError(
        'segments',
        'total width exceeds available chart area'
      );

      expect(error.message).toBe(
        'Invalid bar distribution for "segments": total width exceeds available chart area'
      );
    });

    it('should handle empty reason', () => {
      const error = buildBarDistributionError('data', '');

      expect(error.message).toBe('Invalid bar distribution for "data": ');
    });
  });
});
