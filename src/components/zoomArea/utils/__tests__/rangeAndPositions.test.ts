import {
  calculateHandlerPositions,
  clampRange,
  createDefaultRange,
  isFullRange,
  mouseToDataIndex,
} from '../rangeAndPositions';

describe('rangeAndPositions', () => {
  describe('isFullRange', () => {
    it('should correctly identify full and partial ranges', () => {
      // Full range cases
      expect(isFullRange({ end: 9, start: 0 }, 10)).toBe(true);
      expect(isFullRange({ end: 0, start: 0 }, 1)).toBe(true); // Single element

      // Partial range cases
      expect(isFullRange({ end: 9, start: 1 }, 10)).toBe(false); // Starts after 0
      expect(isFullRange({ end: 8, start: 0 }, 10)).toBe(false); // Ends before last
      expect(isFullRange({ end: 7, start: 2 }, 10)).toBe(false); // Subset
    });
  });

  describe('calculateHandlerPositions', () => {
    it('should calculate positions correctly for various ranges', () => {
      // Full range
      const fullRange = calculateHandlerPositions({ end: 9, start: 0 }, 10, 400);
      expect(fullRange.startX).toBe(0);
      expect(fullRange.endX).toBe(400);

      // Middle range
      const midRange = calculateHandlerPositions({ end: 7, start: 2 }, 10, 400);
      expect(midRange.startX).toBeCloseTo(88.89, 1); // 2/9 * 400
      expect(midRange.endX).toBeCloseTo(311.11, 1); // 7/9 * 400

      // Single element
      const singleRange = calculateHandlerPositions({ end: 0, start: 0 }, 1, 400);
      expect(singleRange.startX).toBe(0);
      expect(singleRange.endX).toBe(0);
    });
  });

  describe('mouseToDataIndex', () => {
    it('should convert mouse positions to data indices with rounding', () => {
      // Normal conversion with rounding
      expect(mouseToDataIndex(200, 400, 10)).toBe(5); // 200/400 * 9 = 4.5 → 5 (rounded)

      // Clamping cases
      expect(mouseToDataIndex(-50, 400, 10)).toBe(0); // Negative position
      expect(mouseToDataIndex(500, 400, 10)).toBe(9); // Beyond width

      // Edge positions
      expect(mouseToDataIndex(0, 400, 10)).toBe(0);
      expect(mouseToDataIndex(400, 400, 10)).toBe(9);

      // Additional rounding tests
      expect(mouseToDataIndex(100, 400, 10)).toBe(2); // 100/400 * 9 = 2.25 → 2
      expect(mouseToDataIndex(150, 400, 10)).toBe(3); // 150/400 * 9 = 3.375 → 3
    });
  });

  describe('clampRange', () => {
    it('should clamp ranges to bounds and enforce minimum distance', () => {
      // Bound clamping
      const clampedStart = clampRange({ end: 5, start: -1 }, 10);
      expect(clampedStart.start).toBe(0);
      expect(clampedStart.end).toBe(5);

      const clampedEnd = clampRange({ end: 15, start: 5 }, 10);
      expect(clampedEnd.start).toBe(5);
      expect(clampedEnd.end).toBe(9);

      // Minimum distance enforcement
      const tooClose = clampRange({ end: 5.05, start: 5 }, 10, 0.1);
      expect(tooClose.end - tooClose.start).toBeCloseTo(0.1, 5);

      // Custom minimum distance
      const customMin = clampRange({ end: 5.1, start: 5 }, 10, 0.5);
      expect(customMin.end - customMin.start).toBeGreaterThanOrEqual(0.5);

      // Valid range unchanged
      const validRange = clampRange({ end: 7, start: 2 }, 10);
      expect(validRange).toEqual({ end: 7, start: 2 });
    });
  });

  describe('createDefaultRange', () => {
    it('should create appropriate default ranges for different dataset sizes', () => {
      expect(createDefaultRange(10)).toEqual({ end: 9, start: 0 });
      expect(createDefaultRange(1)).toEqual({ end: 0, start: 0 }); // Single element
      expect(createDefaultRange(0)).toEqual({ end: 0, start: 0 }); // Empty dataset
      expect(createDefaultRange(1000)).toEqual({ end: 999, start: 0 }); // Large dataset
    });
  });
});
