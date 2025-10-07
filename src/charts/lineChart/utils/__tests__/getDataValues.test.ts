import { getDataValues } from '../getDataValues';

describe('getDataValues', () => {
  it('should return custom values if provided', () => {
    const data = {
      custom: {
        values: ['1', '2', '3'],
      },
    };
    const result = getDataValues(data);
    expect(result).toEqual(['1', '2', '3']);
  });

  it('should return numeric values if custom values are not provided', () => {
    const data = {
      numeric: {
        max: 5,
        min: 1,
        step: 1,
      },
    };
    const result = getDataValues(data);
    expect(result).toEqual(['1', '2', '3', '4', '5']);
  });

  it('should return undefined if neither custom nor numeric values are provided', () => {
    const data = {};
    const result = getDataValues(data);
    expect(result).toBeUndefined();
  });
});
