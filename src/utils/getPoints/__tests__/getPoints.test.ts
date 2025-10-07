import type { TickData } from '@/components/tick/tick.types';

import { getPoints } from '../getPoints';

describe('getPoints', () => {
  it('should correctly calculate positions for string data', () => {
    const tickValues: TickData[] = [
      { position: 0, value: 'A' },
      { position: 50, value: 'B' },
      { position: 100, value: 'C' },
    ];
    const data = ['A', 'B', 'C'];
    const result = getPoints(tickValues, data);
    expect(result).toEqual([0, 50, 100]);
  });

  it('should correctly calculate positions for numeric data', () => {
    const tickValues: TickData[] = [
      { position: 0, value: '0' },
      { position: 50, value: '50' },
      { position: 100, value: '100' },
    ];
    const data = ['25', '75'];
    const result = getPoints(tickValues, data);
    expect(result).toEqual([75, 125]);
  });

  it('should correctly calculate positions for numeric data with extra space', () => {
    const tickValues: TickData[] = [
      { position: 0, value: '0' },
      { position: 50, value: '50' },
      { position: 100, value: '100' },
    ];
    const data = ['25', '75'];
    const result = getPoints(tickValues, data, false);
    expect(result).toEqual([75, 125]);
  });

  it('should return 0 for data not found in tick values', () => {
    const tickValues: TickData[] = [
      { position: 0, value: 'A' },
      { position: 50, value: 'B' },
      { position: 100, value: 'C' },
    ];
    const data = ['D'];
    const result = getPoints(tickValues, data);
    expect(result).toEqual([0]);
  });
});
