import type { BarChartTickValuesAxisProps } from '../../barChart.type';
import { getBarDataValues } from '../getBarDataValue';

describe('getBarDataValues', () => {
  it('should return custom values if data.custom is defined', () => {
    const data: BarChartTickValuesAxisProps = {
      custom: {
        values: ['A', 'B', 'C'],
      },
    };

    const result = getBarDataValues(data);
    expect(result).toEqual(['A', 'B', 'C']);
  });

  it('should generate numeric values if data.numeric is defined', () => {
    const data: BarChartTickValuesAxisProps = {
      numeric: {
        max: 10,
        min: 0,
        step: 2,
      },
    };

    const result = getBarDataValues(data);
    expect(result).toEqual(['0', '2', '4', '6', '8', '10']);
  });

  it('should handle numeric values with a default min of 0', () => {
    const data: BarChartTickValuesAxisProps = {
      numeric: {
        max: 5,
        step: 1,
      },
    };

    const result = getBarDataValues(data);
    expect(result).toEqual(['0', '1', '2', '3', '4', '5']);
  });

  it('should return undefined if data has neither custom nor numeric', () => {
    const data: BarChartTickValuesAxisProps = {};

    const result = getBarDataValues(data);
    expect(result).toBeUndefined();
  });

  it('should handle a case where step is greater than the range (min to max)', () => {
    const data: BarChartTickValuesAxisProps = {
      numeric: {
        max: 5,
        min: 0,
        step: 10,
      },
    };

    const result = getBarDataValues(data);
    expect(result).toEqual(['0']);
  });
});
