import { getRangeIndices, roundEndIndex, roundStartIndex } from '../indexRounding';

describe('indexRounding utilities', () => {
  describe('roundStartIndex', () => {
    it('should use Math.floor and clamp to bounds', () => {
      expect(roundStartIndex(1.3, 10)).toBe(1);
      expect(roundStartIndex(-0.5, 10)).toBe(0); // clamp negative
      expect(roundStartIndex(11.5, 10)).toBe(10); // clamp above max
    });
  });

  describe('roundEndIndex', () => {
    it('should use Math.ceil and clamp to bounds', () => {
      expect(roundEndIndex(1.3, 10)).toBe(2);
      expect(roundEndIndex(-0.5, 10)).toBe(0); // clamp negative
      expect(roundEndIndex(11.5, 10)).toBe(10); // clamp above max
    });
  });

  describe('getRangeIndices', () => {
    it('should convert fractional range to integer indices', () => {
      const result = getRangeIndices({ end: 3.7, start: 1.3 }, 10);
      expect(result).toEqual({
        endIndex: 4, // Math.ceil(3.7)
        startIndex: 1, // Math.floor(1.3)
      });
    });

    it('should match the exact logic used in useZoomData.filterData', () => {
      const range = { end: 2.7, start: 1.3 };
      const dataLength = 5;

      // Original logic from useZoomData:
      const originalStartIndex = Math.max(0, Math.floor(range.start));
      const originalEndIndex = Math.min(dataLength - 1, Math.ceil(range.end));

      // New utility logic:
      const { endIndex, startIndex } = getRangeIndices(range, dataLength);

      expect(startIndex).toBe(originalStartIndex);
      expect(endIndex).toBe(originalEndIndex);
    });
  });
});
