import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { FOCUS_DEFAULT } from '@/types/focusConfig.type';

import {
  calculateBoundingBoxFocusRings,
  createBoundingBoxFocusRings,
} from '../createBoundingBoxFocusRings';

describe('createBoundingBoxFocusRings', () => {
  // Helper to create a mock SVG element with getBBox
  const createMockElement = (
    tagName: string,
    bbox: { x: number; y: number; width: number; height: number },
    strokeWidth = '1'
  ): SVGGraphicsElement => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);

    element.getBBox = vi.fn(() => bbox);

    // Mock getComputedStyle to return strokeWidth
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      strokeWidth,
    } as CSSStyleDeclaration);

    return element as SVGGraphicsElement;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('calculateBoundingBoxFocusRings (Pure Math Function)', () => {
    it('should calculate correct dimensions with gap and centering', () => {
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

      // Inner: 100 + 1 + 2 + 4*2 = 111
      expect(result.inner.width).toBe(111);
      expect(result.inner.height).toBe(51);

      // Outer: 111 + 2 + 2 = 115
      expect(result.outer.width).toBe(115);
      expect(result.outer.height).toBe(55);

      // Verify both rings are centered
      const innerCenterX = result.inner.x + result.inner.width / 2;
      const innerCenterY = result.inner.y + result.inner.height / 2;
      expect(innerCenterX).toBeCloseTo(50, 10);
      expect(innerCenterY).toBeCloseTo(20, 10);

      const outerCenterX = result.outer.x + result.outer.width / 2;
      const outerCenterY = result.outer.y + result.outer.height / 2;
      expect(outerCenterX).toBeCloseTo(50, 10);
      expect(outerCenterY).toBeCloseTo(20, 10);
    });

    it('should handle zero element stroke width', () => {
      const result = calculateBoundingBoxFocusRings(
        {
          elementHeight: 40,
          elementPosition: { x: 50, y: 20 },
          elementStrokeWidth: 0,
          elementWidth: 100,
        },
        {
          gap: 0,
          innerStrokeWidth: 2,
          outlineStrokeWidth: 2,
        }
      );

      expect(result.inner.width).toBe(102);
      expect(result.inner.height).toBe(42);
      expect(result.outer.width).toBe(106);
      expect(result.outer.height).toBe(46);
    });
  });

  describe('createBoundingBoxFocusRings (Main Function)', () => {
    const defaultConfig = {
      gap: FOCUS_DEFAULT.OUTLINES_GAP,
      innerColor: FOCUS_DEFAULT.FOCUS_INNER,
      innerStrokeWidth: FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH,
      outlineColor: FOCUS_DEFAULT.FOCUS_COLOR,
      outlineStrokeWidth: FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH,
      variant: FOCUS_DEFAULT.VARIANT,
    } as const;

    describe('DOM Detection', () => {
      it('should detect bounds and calculate center position from bbox', () => {
        // bbox: x=10, y=20, width=100, height=50 => center: x=60, y=45
        const element = createMockElement('rect', { height: 50, width: 100, x: 10, y: 20 }, '3');

        const result = createBoundingBoxFocusRings(element, defaultConfig);

        expect(result).not.toBeNull();
        expect(element.getBBox).toHaveBeenCalled();

        // Verify inner ring is centered at bbox center
        const innerCenterX =
          (result?.innerRing.props.x as number) + (result?.innerRing.props.width as number) / 2;
        const innerCenterY =
          (result?.innerRing.props.y as number) + (result?.innerRing.props.height as number) / 2;

        expect(innerCenterX).toBeCloseTo(60, 1);
        expect(innerCenterY).toBeCloseTo(45, 1);
      });

      it('should return null for invalid dimensions', () => {
        const zeroWidth = createMockElement('rect', { height: 50, width: 0, x: 10, y: 20 });
        const zeroHeight = createMockElement('rect', { height: 0, width: 100, x: 10, y: 20 });

        expect(createBoundingBoxFocusRings(zeroWidth, defaultConfig)).toBeUndefined();
        expect(createBoundingBoxFocusRings(zeroHeight, defaultConfig)).toBeUndefined();
      });

      it('should return null on DOM errors', () => {
        const element = createMockElement('rect', { height: 50, width: 100, x: 10, y: 20 });

        element.getBBox = vi.fn(() => {
          throw new Error('getBBox failed');
        });

        expect(createBoundingBoxFocusRings(element, defaultConfig)).toBeUndefined();
      });
    });

    describe('FocusRingLayers structure', () => {
      it('should return correct structure with proper properties', () => {
        const element = createMockElement('circle', { height: 60, width: 60, x: 50, y: 50 });

        const result = createBoundingBoxFocusRings(element, defaultConfig);

        expect(result).toMatchObject({
          innerRing: {
            props: {
              className: 'focus-ring-inner',
              fill: 'none',
              height: expect.any(Number),
              stroke: FOCUS_DEFAULT.FOCUS_INNER,
              strokeWidth: FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH,
              width: expect.any(Number),
              x: expect.any(Number),
              y: expect.any(Number),
            },
            type: 'rect',
          },
          outerRing: {
            props: {
              className: 'focus-ring-outer',
              fill: 'none',
              height: expect.any(Number),
              stroke: FOCUS_DEFAULT.FOCUS_COLOR,
              strokeWidth: FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH,
              width: expect.any(Number),
              x: expect.any(Number),
              y: expect.any(Number),
            },
            type: 'rect',
          },
        });

        // Bounding-box variant always produces rectangular focus rings
        expect(result?.outerRing.type).toBe('rect');
        expect(result?.innerRing.type).toBe('rect');
      });
    });

    describe('Custom configuration', () => {
      it('should apply custom colors, stroke widths, and gap', () => {
        const customConfig = {
          ...defaultConfig,
          gap: 4,
          innerColor: '#00FF00',
          innerStrokeWidth: 5,
          outlineColor: '#FF0000',
          outlineStrokeWidth: 3,
        };

        const element1 = createMockElement('rect', { height: 50, width: 100, x: 10, y: 20 });
        const element2 = createMockElement('rect', { height: 50, width: 100, x: 10, y: 20 });

        const resultCustom = createBoundingBoxFocusRings(element1, customConfig);
        const resultDefault = createBoundingBoxFocusRings(element2, defaultConfig);

        // Check colors
        expect(resultCustom?.outerRing.props.stroke).toBe('#FF0000');
        expect(resultCustom?.innerRing.props.stroke).toBe('#00FF00');

        // Check stroke widths
        expect(resultCustom?.outerRing.props.strokeWidth).toBe(3);
        expect(resultCustom?.innerRing.props.strokeWidth).toBe(5);

        // Check gap effect (custom should be larger)
        expect(resultCustom?.innerRing.props.width).toBeGreaterThan(
          resultDefault?.innerRing.props.width as number
        );
        expect(resultCustom?.innerRing.props.height).toBeGreaterThan(
          resultDefault?.innerRing.props.height as number
        );
      });
    });

    describe('Integration with calculateBoundingBoxFocusRings', () => {
      it('should produce consistent results with direct calculation', () => {
        const element = createMockElement('rect', { height: 50, width: 100, x: 10, y: 20 }, '1');

        const result = createBoundingBoxFocusRings(element, defaultConfig);

        // Manually calculate what the result should be
        const expectedBounds = {
          elementHeight: 50,
          elementPosition: { x: 60, y: 45 }, // center of bbox
          elementStrokeWidth: 1,
          elementWidth: 100,
        };

        const expectedDimensions = calculateBoundingBoxFocusRings(expectedBounds, {
          gap: FOCUS_DEFAULT.OUTLINES_GAP,
          innerStrokeWidth: FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH,
          outlineStrokeWidth: FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH,
        });

        expect(result?.innerRing.props.width).toBe(expectedDimensions.inner.width);
        expect(result?.innerRing.props.height).toBe(expectedDimensions.inner.height);
        expect(result?.outerRing.props.width).toBe(expectedDimensions.outer.width);
        expect(result?.outerRing.props.height).toBe(expectedDimensions.outer.height);
      });
    });
  });
});
