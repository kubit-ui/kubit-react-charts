import { describe, expect, it } from 'vitest';

import { calculateFocusOutline } from '../calculateFocusOutline';

describe('calculateFocusOutline', () => {
  describe('Circle calculations', () => {
    it('should calculate correct dimensions for a circle with default focus config', () => {
      const result = calculateFocusOutline({
        elementHeight: 34,
        elementPosition: { x: 50, y: 50 },
        elementStrokeWidth: 1,
        elementType: 'circle',
        elementWidth: 34, // diameter = 34, radius = 17
      });

      expect(result.type).toBe('circle');
      if (result.type === 'circle') {
        // Element radius: 17, elementStrokeWidth: 1, innerStrokeWidth: 2 (default), outlineStrokeWidth: 2 (default)
        // innerRadius = 17 + 1/2 + 2/2 = 17 + 0.5 + 1 = 18.5
        expect(result.inner.r).toBe(18.5);
        expect(result.inner.cx).toBe(50);
        expect(result.inner.cy).toBe(50);

        // outerRadius = 17 + 1/2 + 2 + 2/2 = 17 + 0.5 + 2 + 1 = 20.5
        expect(result.outer.r).toBe(20.5);
        expect(result.outer.cx).toBe(50);
        expect(result.outer.cy).toBe(50);
      }
    });

    it('should calculate correct dimensions with custom focus config', () => {
      const result = calculateFocusOutline({
        elementHeight: 34,
        elementPosition: { x: 100, y: 200 },
        elementStrokeWidth: 2,
        elementType: 'circle',
        elementWidth: 34,
        innerStrokeWidth: 1,
        outlineStrokeWidth: 3,
      });

      if (result.type === 'circle') {
        // Element radius: 17, elementStrokeWidth: 2, innerStrokeWidth: 1, outlineStrokeWidth: 3
        // innerRadius = 17 + 2/2 + 1/2 = 17 + 1 + 0.5 = 18.5
        expect(result.inner.r).toBe(18.5);

        // outerRadius = 17 + 2/2 + 1 + 3/2 = 17 + 1 + 1 + 1.5 = 20.5
        expect(result.outer.r).toBe(20.5);
      }
    });
  });

  describe('Rectangle calculations', () => {
    it('should calculate correct dimensions for a rectangle with default focus config', () => {
      const result = calculateFocusOutline({
        elementHeight: 40,
        elementPosition: { x: 50, y: 20 }, // center position
        elementStrokeWidth: 1,
        elementType: 'rectangle',
        elementWidth: 100,
      });

      expect(result.type).toBe('rectangle');
      if (result.type === 'rectangle') {
        // New logic: innerWidth = elementWidth + elementStrokeWidth + innerStrokeWidth
        // innerWidth = 100 + 1 + 2 = 103 (default innerStrokeWidth is 2)
        // innerHeight = 40 + 1 + 2 = 43
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
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle zero element stroke width', () => {
      const result = calculateFocusOutline({
        elementHeight: 20,
        elementPosition: { x: 0, y: 0 },
        elementStrokeWidth: 0,
        elementType: 'circle',
        elementWidth: 20,
      });

      // Should not throw and should return valid values
      expect(result.type).toBe('circle');
      if (result.type === 'circle') {
        expect(result.outer.r).toBeGreaterThan(0);
        expect(result.inner.r).toBeGreaterThan(0);
      }
    });

    it('should handle undefined focus config', () => {
      const result = calculateFocusOutline({
        elementHeight: 30,
        elementPosition: { x: 0, y: 0 },
        elementType: 'rectangle',
        elementWidth: 30,
      });

      // Should use default values
      expect(result.type).toBe('rectangle');
      if (result.type === 'rectangle') {
        expect(result.outer.width).toBeGreaterThan(30);
        expect(result.inner.width).toBeGreaterThan(0);
      }
    });
  });
});
