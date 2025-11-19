import {
  buildEmptyDataArrayError,
  buildInnerRadiusOutOfRangeError,
  buildInvalidGroupError,
  buildInvalidInnerRadiusError,
  buildInvalidRadiusError,
  buildInvalidTotalError,
  buildPieDataKeyNotFoundError,
  buildSegmentNegativeValueError,
  buildSegmentValueError,
} from '../charts/buildPieChartErrors';

describe('buildPieChartErrors', () => {
  describe('buildPieDataKeyNotFoundError function', () => {
    it('should create dynamic error for missing dataKey', () => {
      const error = buildPieDataKeyNotFoundError('revenue');

      expect(error.message).toBe('DataKey "revenue" not found in PieChart dataset');
    });

    it('should handle empty string dataKey', () => {
      const error = buildPieDataKeyNotFoundError('');

      expect(error.message).toBe('DataKey "" not found in PieChart dataset');
    });

    it('should handle special characters in dataKey', () => {
      const error = buildPieDataKeyNotFoundError('user-count_2024');

      expect(error.message).toBe('DataKey "user-count_2024" not found in PieChart dataset');
    });
  });

  describe('buildEmptyDataArrayError function', () => {
    it('should create dynamic error for empty data array', () => {
      const error = buildEmptyDataArrayError('sales');

      expect(error.message).toBe('Data array for key "sales" is empty');
    });

    it('should handle dataKey with spaces', () => {
      const error = buildEmptyDataArrayError('monthly sales');

      expect(error.message).toBe('Data array for key "monthly sales" is empty');
    });
  });

  describe('buildInvalidTotalError function', () => {
    it('should create dynamic error for zero total', () => {
      const error = buildInvalidTotalError('revenue', 0);

      expect(error.message).toBe('Invalid total value for "revenue": 0 (must be > 0)');
    });

    it('should create dynamic error for NaN total', () => {
      const error = buildInvalidTotalError('sales', NaN);

      expect(error.message).toBe('Invalid total value for "sales": NaN (must be > 0)');
    });

    it('should create dynamic error for negative total', () => {
      const error = buildInvalidTotalError('profit', -100);

      expect(error.message).toBe('Invalid total value for "profit": -100 (must be > 0)');
    });
  });

  describe('buildSegmentValueError function', () => {
    it('should create dynamic error for invalid string value', () => {
      const error = buildSegmentValueError('invalid', 'Product A');

      expect(error.message).toBe(
        'Invalid segment value for "Product A": "invalid" is not a valid number'
      );
    });

    it('should create dynamic error for null value', () => {
      const error = buildSegmentValueError(null, 'Product B');

      expect(error.message).toBe(
        'Invalid segment value for "Product B": "null" is not a valid number'
      );
    });

    it('should create dynamic error for undefined value', () => {
      const error = buildSegmentValueError(undefined, 'Product C');

      expect(error.message).toBe(
        'Invalid segment value for "Product C": "undefined" is not a valid number'
      );
    });

    it('should create dynamic error for object value', () => {
      const error = buildSegmentValueError({ value: 100 }, 'Product D');

      expect(error.message).toBe(
        'Invalid segment value for "Product D": "[object Object]" is not a valid number'
      );
    });
  });

  describe('buildSegmentNegativeValueError function', () => {
    it('should create dynamic error for negative value', () => {
      const error = buildSegmentNegativeValueError(-50, 'Category A');

      expect(error.message).toBe(
        'Negative segment value for "Category A": -50 (values must be >= 0)'
      );
    });

    it('should handle decimal negative values', () => {
      const error = buildSegmentNegativeValueError(-123.45, 'Category B');

      expect(error.message).toBe(
        'Negative segment value for "Category B": -123.45 (values must be >= 0)'
      );
    });

    it('should handle very small negative values', () => {
      const error = buildSegmentNegativeValueError(-0.001, 'Category C');

      expect(error.message).toBe(
        'Negative segment value for "Category C": -0.001 (values must be >= 0)'
      );
    });
  });

  describe('buildInvalidGroupError function', () => {
    it('should create dynamic error for missing name property', () => {
      const error = buildInvalidGroupError('categories', 0, 'name');

      expect(error.message).toBe(
        'Invalid group at index 0 in "categories": missing required property "name"'
      );
    });

    it('should create dynamic error for missing value property', () => {
      const error = buildInvalidGroupError('sales', 1, 'value');

      expect(error.message).toBe(
        'Invalid group at index 1 in "sales": missing required property "value"'
      );
    });

    it('should handle different indices', () => {
      const error = buildInvalidGroupError('products', 5, 'name');

      expect(error.message).toBe(
        'Invalid group at index 5 in "products": missing required property "name"'
      );
    });
  });

  describe('buildInvalidRadiusError function', () => {
    it('should create dynamic error for string radius', () => {
      const error = buildInvalidRadiusError('100px');

      expect(error.message).toBe('Invalid radius value: "100px" (must be a positive number)');
    });

    it('should create dynamic error for zero radius', () => {
      const error = buildInvalidRadiusError(0);

      expect(error.message).toBe('Invalid radius value: "0" (must be a positive number)');
    });

    it('should create dynamic error for negative radius', () => {
      const error = buildInvalidRadiusError(-50);

      expect(error.message).toBe('Invalid radius value: "-50" (must be a positive number)');
    });

    it('should create dynamic error for NaN radius', () => {
      const error = buildInvalidRadiusError(NaN);

      expect(error.message).toBe('Invalid radius value: "NaN" (must be a positive number)');
    });
  });

  describe('buildInvalidInnerRadiusError function', () => {
    it('should create dynamic error for string innerRadius', () => {
      const error = buildInvalidInnerRadiusError('50px');

      expect(error.message).toBe(
        'Invalid innerRadius value: "50px" (must be a positive number or zero)'
      );
    });

    it('should create dynamic error for negative innerRadius', () => {
      const error = buildInvalidInnerRadiusError(-20);

      expect(error.message).toBe(
        'Invalid innerRadius value: "-20" (must be a positive number or zero)'
      );
    });

    it('should create dynamic error for NaN innerRadius', () => {
      const error = buildInvalidInnerRadiusError(NaN);

      expect(error.message).toBe(
        'Invalid innerRadius value: "NaN" (must be a positive number or zero)'
      );
    });
  });

  describe('buildInnerRadiusOutOfRangeError function', () => {
    it('should create dynamic error when innerRadius equals radius', () => {
      const error = buildInnerRadiusOutOfRangeError(100, 100);

      expect(error.message).toBe(
        'innerRadius (100) must be less than radius (100) for donut chart rendering'
      );
    });

    it('should create dynamic error when innerRadius exceeds radius', () => {
      const error = buildInnerRadiusOutOfRangeError(150, 100);

      expect(error.message).toBe(
        'innerRadius (150) must be less than radius (100) for donut chart rendering'
      );
    });

    it('should handle decimal values', () => {
      const error = buildInnerRadiusOutOfRangeError(75.5, 75);

      expect(error.message).toBe(
        'innerRadius (75.5) must be less than radius (75) for donut chart rendering'
      );
    });
  });
});
