import { TickDataUtils } from '../tick.types';

describe('TickDataUtils', () => {
  describe('formatTicksValues', () => {
    it('should format tick values using the provided formatter', () => {
      const ticks = [
        { position: 1, value: '100' },
        { position: 2, value: '200' },
      ];
      const formatter = (v: string) => `${v} €`;

      const result = TickDataUtils.formatTicksValues(ticks, formatter);

      expect(result).toEqual([
        { position: 1, value: '100 €' },
        { position: 2, value: '200 €' },
      ]);
    });

    it('should handle an empty array', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ticks: any[] = [];
      const formatter = (v: string) => `${v} €`;

      const result = TickDataUtils.formatTicksValues(ticks, formatter);

      expect(result).toEqual([]);
    });

    it('should not mutate the original array', () => {
      const ticks = [
        { position: 1, value: '100' },
        { position: 2, value: '200' },
      ];
      const formatter = (v: string) => v;

      const original = [...ticks];
      TickDataUtils.formatTicksValues(ticks, formatter);

      expect(ticks).toEqual(original);
    });

    it('should work with an identity formatter', () => {
      const ticks = [
        { position: 1, value: '100' },
        { position: 2, value: '200' },
      ];
      const formatter = (v: string) => v;

      const result = TickDataUtils.formatTicksValues(ticks, formatter);

      expect(result).toEqual([
        { position: 1, value: '100' },
        { position: 2, value: '200' },
      ]);
    });
  });
});
