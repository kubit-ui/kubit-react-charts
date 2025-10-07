import { TEMPLATE_KEYS, processAccessibilityTemplate } from '../accessibilityTemplateProcessor';

describe('processAccessibilityTemplate', () => {
  const mockData = [
    { month: 'January', profit: 50, sales: 100 },
    { month: 'February', profit: 75, sales: 200 },
    { month: 'March', profit: 60, sales: 150 },
  ];

  it('should replace all template placeholders with actual values', () => {
    const template = 'Point {{index}}: {{dataKey}} = {{yValue}} ({{xValue}})';
    const nodeData = {
      dataKey: 'sales',
      index: 0,
      xKey: 'month',
    };

    const result = processAccessibilityTemplate(template, nodeData, mockData);

    expect(result).toBe('Point 1: sales = 100 (January)');
  });

  it('should handle missing xKey gracefully', () => {
    const template = 'Point {{index}}: {{dataKey}} = {{yValue}}';
    const nodeData = {
      dataKey: 'profit',
      index: 1,
    };

    const result = processAccessibilityTemplate(template, nodeData, mockData);

    expect(result).toBe('Point 2: profit = 75');
  });

  it('should handle missing dataKey gracefully', () => {
    const template = 'Point {{index}} at {{xValue}}';
    const nodeData = {
      index: 2,
      xKey: 'month',
    };

    const result = processAccessibilityTemplate(template, nodeData, mockData);

    expect(result).toBe('Point 3 at March');
  });

  it('should use nodeData.dataValue when dataValue parameter is not provided', () => {
    const template = 'Point {{index}}: {{dataKey}} = {{yValue}}';
    const nodeData = {
      dataKey: 'sales',
      dataValue: mockData,
      index: 0,
    };

    const result = processAccessibilityTemplate(template, nodeData);

    expect(result).toBe('Point 1: sales = 100');
  });

  it('should handle non-array dataValue gracefully', () => {
    const template = 'Point {{index}}: {{dataKey}}';
    const nodeData = {
      dataKey: 'sales',
      index: 0,
    };

    const result = processAccessibilityTemplate(template, nodeData, 'not-an-array');

    expect(result).toBe('Point 1: sales');
  });

  it('should handle undefined values gracefully', () => {
    const template = 'Point {{index}}: {{dataKey}} = {{yValue}} ({{xValue}})';
    const nodeData = {
      dataKey: 'nonexistent',
      index: 0,
      xKey: 'alsoNonexistent',
    };

    const result = processAccessibilityTemplate(template, nodeData, mockData);

    expect(result).toBe('Point 1: nonexistent =  ()');
  });

  it('should replace multiple occurrences of the same placeholder', () => {
    const template = '{{dataKey}} chart: {{dataKey}} value is {{yValue}}';
    const nodeData = {
      dataKey: 'sales',
      index: 1,
    };

    const result = processAccessibilityTemplate(template, nodeData, mockData);

    expect(result).toBe('sales chart: sales value is 200');
  });

  it('should handle empty template', () => {
    const template = '';
    const nodeData = { index: 0 };

    const result = processAccessibilityTemplate(template, nodeData, mockData);

    expect(result).toBe(undefined);
  });

  it('should handle template with no placeholders', () => {
    const template = 'Static accessibility label';
    const nodeData = { index: 0 };

    const result = processAccessibilityTemplate(template, nodeData, mockData);

    expect(result).toBe('Static accessibility label');
  });
});

describe('TEMPLATE_KEYS', () => {
  it('should have the correct template key constants', () => {
    expect(TEMPLATE_KEYS.DATA_KEY).toBe('{{dataKey}}');
    expect(TEMPLATE_KEYS.X_VALUE).toBe('{{xValue}}');
    expect(TEMPLATE_KEYS.Y_VALUE).toBe('{{yValue}}');
    expect(TEMPLATE_KEYS.INDEX).toBe('{{index}}');
  });
});
