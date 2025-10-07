import type { IDataPoint } from '../../lineChart.type';
import { getRoundedMaxValue, getYKeyRoundMaxValue } from '../getRoundedMaxValue';

describe('getRoundedMaxValue', () => {
  it('should correctly calculate rounded max value', () => {
    const data = [
      { key: 'A', value: 15 },
      { key: 'B', value: 27 },
      { key: 'C', value: 33 },
    ];
    const result = getRoundedMaxValue(data, 'key');
    expect(result).toEqual(40);
  });

  it('should ignore non-numeric values', () => {
    const data = [
      { key: 'A', other: '10', value: 15 },
      { key: 'B', other: '20', value: 27 },
      { key: 'C', other: '30', value: 33 },
    ];
    const result = getRoundedMaxValue(data, 'key');
    expect(result).toEqual(40);
  });

  it('should correctly calculate rounded max value with multiple numeric values', () => {
    const data = [
      { key: 'A', other: 10, value: 15 },
      { key: 'B', other: 20, value: 27 },
      { key: 'C', other: 30, value: 33 },
    ];
    const result = getRoundedMaxValue(data, 'key');
    expect(result).toEqual(40);
  });
});

describe('getYKeyRoundMaxValue', () => {
  it('should ignore non-numeric values', () => {
    const data: IDataPoint[] = [
      { other: '10', xKey: 'A', yKey: '15' },
      { other: '20', xKey: 'B', yKey: '27' },
      { other: '30', xKey: 'C', yKey: '33' },
    ];
    const result = getYKeyRoundMaxValue(data, 'xKey');
    expect(result).toEqual([]);
  });

  it('should return empty array if no other keys are present', () => {
    const data: IDataPoint[] = [{ xKey: 'A' }, { xKey: 'B' }, { xKey: 'C' }];
    const result = getYKeyRoundMaxValue(data, 'xKey');
    expect(result).toEqual([]);
  });
});
