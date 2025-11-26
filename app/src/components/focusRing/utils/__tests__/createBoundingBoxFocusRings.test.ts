import { describe, expect, it } from 'vitest';

import { calculateBoundingBoxFocusRings } from '../createBoundingBoxFocusRings';

describe('calculateBoundingBoxFocusRings', () => {
  describe('Rectangle calculations', () => {
    it('should calculate correct dimensions for a rectangle with default focus config', () => {
      const result = calculateBoundingBoxFocusRings(
        {
          elementHeight: 40,
          elementPosition: { x: 50, y: 20 }, // center position
          elementStrokeWidth: 1,
          elementWidth: 100,
        },
        {
          gap: 0,
          innerStrokeWidth: 2,
          outlineStrokeWidth: 2,
        }
      );

      // innerWidth = elementWidth + elementStrokeWidth + innerStrokeWidth + gap * 2
      // innerWidth = 100 + 1 + 2 + 0 = 103
      // innerHeight = 40 + 1 + 2 + 0 = 43
      expect(result.inner.width).toBe(103);
      expect(result.inner.height).toBe(43);
      expect(result.inner.x).toBe(50 - 103 / 2); // -1.5
      expect(result.inner.y).toBe(20 - 43 / 2); // -1.5

      // outerWidth = innerWidth + innerStrokeWidth + outlineStrokeWidth
      // outerWidth = 103 + 2 + 2 = 107
      // outerHeight = 43 + 2 + 2 = 47
      expect(result.outer.width).toBe(107);
      expect(result.outer.height).toBe(47);
      expect(result.outer.x).toBe(50 - 107 / 2); // -3.5
      expect(result.outer.y).toBe(20 - 47 / 2); // -3.5
    });

    it('should calculate correct dimensions with custom stroke widths', () => {
      const result = calculateBoundingBoxFocusRings(
        {
          elementHeight: 40,
          elementPosition: { x: 50, y: 20 },
          elementStrokeWidth: 2,
          elementWidth: 100,
        },
        {
          gap: 0,
          innerStrokeWidth: 1,
          outlineStrokeWidth: 3,
        }
      );

      // innerWidth = 100 + 2 + 1 + 0 = 103
      // innerHeight = 40 + 2 + 1 + 0 = 43
      expect(result.inner.width).toBe(103);
      expect(result.inner.height).toBe(43);

      // outerWidth = 103 + 1 + 3 = 107
      // outerHeight = 43 + 1 + 3 = 47
      expect(result.outer.width).toBe(107);
      expect(result.outer.height).toBe(47);
    });

    it('should calculate correct dimensions with gap', () => {
      const result = calculateBoundingBoxFocusRings(
        {
          elementHeight: 40,
          elementPosition: { x: 50, y: 20 },
          elementStrokeWidth: 1,
          elementWidth: 100,
        },
        {
          gap: 4,
          innerStrokeWidth: 2,
          outlineStrokeWidth: 2,
        }
      );

      // innerWidth = 100 + 1 + 2 + 4*2 = 111
      // innerHeight = 40 + 1 + 2 + 4*2 = 51
      expect(result.inner.width).toBe(111);
      expect(result.inner.height).toBe(51);

      // outerWidth = 111 + 2 + 2 = 115
      // outerHeight = 51 + 2 + 2 = 55
      expect(result.outer.width).toBe(115);
      expect(result.outer.height).toBe(55);
    });
  });

  describe('Edge cases', () => {
    it('should handle zero element stroke width', () => {
      const result = calculateBoundingBoxFocusRings(
        {
          elementHeight: 20,
          elementPosition: { x: 0, y: 0 },
          elementStrokeWidth: 0,
          elementWidth: 20,
        },
        {
          gap: 0,
          innerStrokeWidth: 2,
          outlineStrokeWidth: 2,
        }
      );

      // Should not throw and should return valid values
      expect(result.outer.width).toBeGreaterThan(20);
      expect(result.inner.width).toBeGreaterThan(20);
    });

    it('should handle small dimensions', () => {
      const result = calculateBoundingBoxFocusRings(
        {
          elementHeight: 10,
          elementPosition: { x: 5, y: 5 },
          elementStrokeWidth: 0,
          elementWidth: 10,
        },
        {
          gap: 0,
          innerStrokeWidth: 2,
          outlineStrokeWidth: 2,
        }
      );

      // Should produce valid dimensions
      expect(result.inner.width).toBeGreaterThan(0);
      expect(result.outer.width).toBeGreaterThan(result.inner.width);
    });
  });
});
