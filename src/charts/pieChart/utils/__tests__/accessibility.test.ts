import { describe, expect, it } from 'vitest';

import { buildAriaLabel } from '../accessibility';

describe('buildAriaLabel', () => {
  const baseParams = {
    dataKey: 'sales',
    index: 0,
    groupName: 'Product A',
    groupValue: 150,
  };

  it('should return undefined when ariaLabel is not defined', () => {
    const result = buildAriaLabel({
      ...baseParams,
      ariaLabel: undefined,
    });
    expect(result).toBeUndefined();
  });

  it('should replace {{dataKey}}, {{index}}, {{groupName}} and {{groupValue}} template', () => {
    const result = buildAriaLabel({
      ...baseParams,
      ariaLabel:
        'dataKey: {{dataKey}} - index: {{index}} - groupName: {{groupName}} - groupValue: {{groupValue}}',
    });
    expect(result).toBe('dataKey: sales - index: 0 - groupName: Product A - groupValue: 150');
  });
});
