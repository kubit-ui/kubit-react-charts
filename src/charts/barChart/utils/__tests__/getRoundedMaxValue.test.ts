import type { BarChartIDataPoint } from '../../barChart.type';
import { getBarKeyRoundMaxValue } from '../getRoundedBarMaxValue';

describe('getBarKeyRoundMaxValue', () => {
  it('should return an array of numeric values excluding the Key field', () => {
    const data: BarChartIDataPoint[] = [
      { x: 'A', y: 10, z: 20 },
      { x: 'B', y: 15, z: 25 },
    ];
    const result = getBarKeyRoundMaxValue(data, 'x');
    expect(result).toEqual([10, 20, 15, 25]);
  });

  it('should handle non-numeric values by ignoring them', () => {
    const data: BarChartIDataPoint[] = [
      { x: 'A', y: 10 },
      { x: 'B', y: 15 },
    ];
    const result = getBarKeyRoundMaxValue(data, 'x');
    expect(result).toEqual([10, 15]);
  });

  it('should return an empty array if the data array is empty', () => {
    const data: BarChartIDataPoint[] = [];
    const result = getBarKeyRoundMaxValue(data, 'x');
    expect(result).toEqual([]);
  });

  it('should return an empty array if no numeric values are present', () => {
    const data: BarChartIDataPoint[] = [
      { x: 'A', y: 'non-numeric' },
      { x: 'B', y: 'non-numeric' },
    ];
    const result = getBarKeyRoundMaxValue(data, 'x');
    expect(result).toEqual([]);
  });

  it('should exclude the Key field from the result', () => {
    const data: BarChartIDataPoint[] = [
      { x: 'A', y: 10, z: 20 },
      { x: 'B', y: 15, z: 25 },
    ];
    const result = getBarKeyRoundMaxValue(data, 'y');
    expect(result).toEqual([20, 25]);
  });
});
