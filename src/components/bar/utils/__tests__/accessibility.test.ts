import { describe, expect, it } from 'vitest';

import { buildAriaLabel } from '../accessibility';

describe('buildAriaLabel', () => {
  const baseParams = {
    dataKey: 'sales',
    xKey: 'year',
    yKey: 'amount',
    xData: '2000',
    yData: '500',
    coverage: 100,
    index: 0,
  };

  it('should return undefined when ariaLabel is not defined', () => {
    const result = buildAriaLabel({
      ...baseParams,
      ariaLabel: undefined,
    });
    expect(result).toBeUndefined();
  });

  it('should replace {{dataKey}}, {{xKey}}, {{yKey}}, {{xData}}, {{yData}}, {{coverage}} and {{index}} template', () => {
    const result = buildAriaLabel({
      ...baseParams,
      ariaLabel:
        'dataKey: {{dataKey}} - xKey: {{xKey}} - yKey: {{yKey}} - xData: {{xData}} - yData: {{yData}} - coverage: {{coverage}} - index: {{index}}',
    });
    expect(result).toBe(
      'dataKey: sales - xKey: year - yKey: amount - xData: 2000 - yData: 500 - coverage: 100 - index: 0'
    );
  });
});
