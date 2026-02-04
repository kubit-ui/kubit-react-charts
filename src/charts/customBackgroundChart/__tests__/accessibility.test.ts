import { buildAriaLabel, formatValue } from '../utils/accessibility';

describe('accessibility utils', () => {
  describe('buildAriaLabel', () => {
    const baseParams = {
      dataKey: 'madrid',
      name: 'Madrid',
      formattedValue: '3,223,000',
      x: 970,
      y: 245,
    };

    it('uses default template and replaces all placeholders', () => {
      const result = buildAriaLabel(baseParams);
      expect(result).toBe('Madrid, 3,223,000');
    });

    it('replaces multiple placeholders in custom template', () => {
      const result = buildAriaLabel({
        ...baseParams,
        ariaLabel: '{{name}} at ({{x}}, {{y}}): {{value}}',
      });
      expect(result).toBe('Madrid at (970, 245): 3,223,000');
    });

    it('falls back to dataKey when name is not provided', () => {
      const result = buildAriaLabel({
        ...baseParams,
        name: undefined,
      });
      expect(result).toBe('madrid, 3,223,000');
    });
  });

  describe('formatValue', () => {
    it('formats numbers with locale separators', () => {
      expect(formatValue(1234567)).toBe('1,234,567');
    });

    it('returns strings as-is', () => {
      expect(formatValue('hello')).toBe('hello');
    });

    it('stringifies objects', () => {
      expect(formatValue({ a: 1 })).toBe('{"a":1}');
    });
  });
});
