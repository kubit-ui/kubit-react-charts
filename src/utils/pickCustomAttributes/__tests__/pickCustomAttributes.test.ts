import { pickCustomAttributes } from '../pickCustomAttributes';

describe('pickCustomAttributes', () => {
  it('should return an empty object if no attributes are provided', () => {
    const result = pickCustomAttributes();
    expect(result).toEqual({});
  });

  it('should convert boolean values to strings', () => {
    const attributes = { 'aria-hidden': false, 'data-test': true };
    const result = pickCustomAttributes(attributes);
    expect(result).toEqual({ 'aria-hidden': 'false', 'data-test': 'true' });
  });

  it('should keep string values as strings', () => {
    const attributes = { 'aria-label': 'label', 'data-test': 'value' };
    const result = pickCustomAttributes(attributes);
    expect(result).toEqual({ 'aria-label': 'label', 'data-test': 'value' });
  });

  it('should handle mixed string and boolean values', () => {
    const attributes = { 'aria-hidden': true, 'data-test': 'value' };
    const result = pickCustomAttributes(attributes);
    expect(result).toEqual({ 'aria-hidden': 'true', 'data-test': 'value' });
  });

  it('should handle empty attributes object', () => {
    const attributes = {};
    const result = pickCustomAttributes(attributes);
    expect(result).toEqual({});
  });

  it('should filter out null and undefined values', () => {
    const attributes = {
      'aria-label': 'label',
      'data-null': null,
      'data-test': 'value',
      'data-undefined': undefined,
    };
    const result = pickCustomAttributes(attributes);
    expect(result).toEqual({ 'aria-label': 'label', 'data-test': 'value' });
  });

  it('should exclude non-aria/data/role attributes', () => {
    const attributes = {
      'aria-label': 'label',
      'data-test': 'value',
      'foo': 'bar',
      'role': 'button',
    };
    const result = pickCustomAttributes(attributes);
    expect(result).toEqual({ 'aria-label': 'label', 'data-test': 'value', 'role': 'button' });
  });

  it('should convert non-string values to strings', () => {
    const attributes = {
      'aria-expanded': true,
      'className': 'ignored', // Should be excluded
      'data-active': false,
      'data-count': 42,
    };
    const result = pickCustomAttributes(attributes);
    expect(result).toEqual({
      'aria-expanded': 'true',
      'data-active': 'false',
      'data-count': '42',
    });
  });
});
