import React from 'react';

import { describe, expect, it } from 'vitest';

import { FOCUS_DEFAULT } from '@/types/focusConfig.type';

import { createFocusRingLayers } from '../createFocusRingLayers';

describe('createFocusRingLayers', () => {
  const defaultConfig = {
    gap: FOCUS_DEFAULT.OUTLINES_GAP,
    innerColor: FOCUS_DEFAULT.FOCUS_INNER,
    innerStrokeWidth: FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH,
    outlineColor: FOCUS_DEFAULT.FOCUS_COLOR,
    outlineStrokeWidth: FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH,
    variant: FOCUS_DEFAULT.VARIANT,
  } as const;

  describe('adaptive mode (closed shapes)', () => {
    it('should create focus rings for circle element', () => {
      const element = React.createElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeTruthy();
      expect(result?.canRender).toBe(true);
      expect(result?.variant).toBe('adaptive');
      expect(result?.outerRing.type).toBe('circle');
      expect(result?.innerRing.type).toBe('circle');

      // Check outer ring props
      expect(result?.outerRing.props.cx).toBe(50);
      expect(result?.outerRing.props.cy).toBe(50);
      expect(result?.outerRing.props.r).toBe(30);
      expect(result?.outerRing.props.stroke).toBe(FOCUS_DEFAULT.FOCUS_COLOR);
      // Now includes originalStrokeWidth (0 in this case)
      expect(result?.outerRing.props.strokeWidth).toBe(
        0 + (FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH) * 2
      );
      expect(result?.outerRing.props.fill).toBe('none');

      // Check inner ring props
      expect(result?.innerRing.props.stroke).toBe(FOCUS_DEFAULT.FOCUS_INNER);
      expect(result?.innerRing.props.strokeWidth).toBe(
        0 + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH * 2
      );
    });

    it('should create focus rings for rect element', () => {
      const element = React.createElement('rect', {
        height: 100,
        width: 150,
        x: 10,
        y: 20,
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeTruthy();
      expect(result?.outerRing.type).toBe('rect');
      expect(result?.outerRing.props.x).toBe(10);
      expect(result?.outerRing.props.y).toBe(20);
      expect(result?.outerRing.props.width).toBe(150);
      expect(result?.outerRing.props.height).toBe(100);
    });

    it('should create focus rings for rect element with rounded corners', () => {
      const element = React.createElement('rect', {
        height: 100,
        rx: 5,
        ry: 10,
        width: 150,
        x: 10,
        y: 20,
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeTruthy();
      expect(result?.outerRing.props.rx).toBe(5);
      expect(result?.outerRing.props.ry).toBe(10);
    });

    it('should create focus rings for ellipse element', () => {
      const element = React.createElement('ellipse', {
        cx: 100,
        cy: 80,
        rx: 60,
        ry: 40,
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeTruthy();
      expect(result?.outerRing.type).toBe('ellipse');
      expect(result?.outerRing.props.cx).toBe(100);
      expect(result?.outerRing.props.cy).toBe(80);
      expect(result?.outerRing.props.rx).toBe(60);
      expect(result?.outerRing.props.ry).toBe(40);
    });

    it('should create focus rings for path element', () => {
      const element = React.createElement('path', {
        d: 'M 10 10 L 90 90 L 10 90 Z',
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeTruthy();
      expect(result?.outerRing.type).toBe('path');
      expect(result?.outerRing.props.d).toBe('M 10 10 L 90 90 L 10 90 Z');
    });

    it('should create focus rings for polygon element', () => {
      const element = React.createElement('polygon', {
        points: '10,10 90,10 50,90',
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeTruthy();
      expect(result?.outerRing.type).toBe('polygon');
      expect(result?.outerRing.props.points).toBe('10,10 90,10 50,90');
    });

    it('should use miter stroke-linejoin for closed shapes', () => {
      const element = React.createElement('rect', {
        height: 100,
        width: 150,
        x: 10,
        y: 20,
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result?.outerRing.props.strokeLinejoin).toBe('miter');
      expect(result?.outerRing.props.strokeMiterlimit).toBe('10');
      expect(result?.outerRing.props.strokeLinecap).toBeUndefined();
    });

    it('should account for original strokeWidth in closed shapes', () => {
      const originalStrokeWidth = 5;
      const element = React.createElement('circle', {
        cx: 50,
        cy: 50,
        r: 30,
        strokeWidth: originalStrokeWidth,
      });
      const result = createFocusRingLayers(element, defaultConfig);

      // For closed shapes, stroke-width now includes the original width
      // This prevents the original stroke from covering the focus rings
      const expectedOuterWidth =
        originalStrokeWidth +
        (FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH) * 2;
      const expectedInnerWidth = originalStrokeWidth + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH * 2;

      expect(result?.outerRing.props.strokeWidth).toBe(expectedOuterWidth);
      expect(result?.innerRing.props.strokeWidth).toBe(expectedInnerWidth);
    });

    it('should treat path with fill="none" as an open line', () => {
      const element = React.createElement('path', {
        d: 'M 10,10 Q 50,30 90,10',
        fill: 'none',
        strokeLinecap: 'round',
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeTruthy();
      expect(result?.outerRing.type).toBe('path');
      // Should use round stroke-linecap (like line/polyline)
      expect(result?.outerRing.props.strokeLinecap).toBe('round');
      expect(result?.outerRing.props.strokeLinejoin).toBe('round');
      expect(result?.outerRing.props.strokeMiterlimit).toBeUndefined();
    });

    it('should treat path with fill (closed shape) with miter stroke-linejoin', () => {
      const element = React.createElement('path', {
        d: 'M 10 10 L 90 90 L 10 90 Z',
        fill: 'blue',
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeTruthy();
      expect(result?.outerRing.type).toBe('path');
      // Should use miter stroke-linejoin (like circle/rect)
      expect(result?.outerRing.props.strokeLinejoin).toBe('miter');
      expect(result?.outerRing.props.strokeMiterlimit).toBe('10');
      expect(result?.outerRing.props.strokeLinecap).toBeUndefined();
    });
  });

  describe('adaptive mode (open lines)', () => {
    it('should create focus rings for line element', () => {
      const element = React.createElement('line', {
        x1: 10,
        x2: 90,
        y1: 20,
        y2: 80,
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeTruthy();
      expect(result?.outerRing.type).toBe('line');
      expect(result?.outerRing.props.x1).toBe(10);
      expect(result?.outerRing.props.y1).toBe(20);
      expect(result?.outerRing.props.x2).toBe(90);
      expect(result?.outerRing.props.y2).toBe(80);
    });

    it('should create focus rings for polyline element', () => {
      const element = React.createElement('polyline', {
        points: '10,10 50,50 90,10',
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeTruthy();
      expect(result?.outerRing.type).toBe('polyline');
      expect(result?.outerRing.props.points).toBe('10,10 50,50 90,10');
    });

    it('should account for original strokeWidth in open lines (halo technique)', () => {
      const originalStrokeWidth = 4;
      const element = React.createElement('line', {
        strokeWidth: originalStrokeWidth,
        x1: 10,
        x2: 90,
        y1: 20,
        y2: 80,
      });
      const result = createFocusRingLayers(element, defaultConfig);

      // For all shapes (open and closed), stroke-width includes the original width
      const expectedOuterWidth =
        originalStrokeWidth +
        (FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH) * 2;
      const expectedInnerWidth = originalStrokeWidth + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH * 2;

      expect(result?.outerRing.props.strokeWidth).toBe(expectedOuterWidth);
      expect(result?.innerRing.props.strokeWidth).toBe(expectedInnerWidth);
    });

    it('should use round stroke-linejoin and stroke-linecap for open lines', () => {
      const element = React.createElement('line', {
        x1: 10,
        x2: 90,
        y1: 20,
        y2: 80,
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result?.outerRing.props.strokeLinejoin).toBe('round');
      expect(result?.outerRing.props.strokeLinecap).toBe('round');
      expect(result?.outerRing.props.strokeMiterlimit).toBeUndefined();
    });

    it('should preserve custom strokeLinejoin for open lines', () => {
      const element = React.createElement('polyline', {
        points: '10,10 50,50 90,10',
        strokeLinejoin: 'bevel',
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result?.outerRing.props.strokeLinejoin).toBe('bevel');
    });

    it('should preserve custom strokeLinecap for open lines', () => {
      const element = React.createElement('line', {
        strokeLinecap: 'square',
        x1: 10,
        x2: 90,
        y1: 20,
        y2: 80,
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result?.outerRing.props.strokeLinecap).toBe('square');
    });
  });

  describe('bounding-box mode', () => {
    it('should return placeholder for bounding-box variant', () => {
      const element = React.createElement('circle', { cx: 50, cy: 50, r: 30 });
      const config = { ...defaultConfig, variant: 'bounding-box' as const };
      const result = createFocusRingLayers(element, config);

      expect(result).toBeTruthy();
      expect(result?.canRender).toBe(true);
      expect(result?.variant).toBe('bounding-box');
      expect(result?.needsDOMCalculation).toBe(true);
      expect(result?.outerRing.type).toBe('rect');
      expect(result?.innerRing.type).toBe('rect');
    });
  });

  describe('unsupported elements', () => {
    it('should return null for unsupported element types', () => {
      const element = React.createElement('text', { x: 10, y: 20 }, 'Hello');
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeNull();
    });

    it('should return null for React components (non-string type)', () => {
      const CustomComponent = () => React.createElement('div');
      const element = React.createElement(CustomComponent);
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result).toBeNull();
    });
  });

  describe('stroke-width parsing', () => {
    it('should handle strokeWidth as number prop', () => {
      const element = React.createElement('circle', {
        cx: 50,
        cy: 50,
        r: 30,
        strokeWidth: 3,
      });
      const result = createFocusRingLayers(element, defaultConfig);

      // strokeWidth should be parsed and included in calculation
      expect(result?.outerRing.props.strokeWidth).toBeGreaterThan(0);
    });

    it('should handle stroke-width as string prop (kebab-case)', () => {
      const element = React.createElement('circle', {
        'cx': 50,
        'cy': 50,
        'r': 30,
        'stroke-width': '5',
      });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result?.outerRing.props.strokeWidth).toBeGreaterThan(0);
    });

    it('should default to 0 when no strokeWidth is provided', () => {
      const element = React.createElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createFocusRingLayers(element, defaultConfig);

      // For closed shapes without original stroke, the calculation should still work
      const expectedWidth =
        (FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH) * 2;
      expect(result?.outerRing.props.strokeWidth).toBe(expectedWidth);
    });
  });

  describe('class names', () => {
    it('should add focus-ring-outer class to outer ring', () => {
      const element = React.createElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result?.outerRing.props.className).toBe('focus-ring-outer');
    });

    it('should add focus-ring-inner class to inner ring', () => {
      const element = React.createElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createFocusRingLayers(element, defaultConfig);

      expect(result?.innerRing.props.className).toBe('focus-ring-inner');
    });
  });

  describe('custom focus config', () => {
    it('should use custom colors', () => {
      const customConfig = {
        ...defaultConfig,
        innerColor: '#FF0000',
        outlineColor: '#00FF00',
      };
      const element = React.createElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createFocusRingLayers(element, customConfig);

      expect(result?.outerRing.props.stroke).toBe('#00FF00');
      expect(result?.innerRing.props.stroke).toBe('#FF0000');
    });

    it('should use custom stroke widths', () => {
      const customConfig = {
        ...defaultConfig,
        innerStrokeWidth: 5,
        outlineStrokeWidth: 3,
      };
      const element = React.createElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createFocusRingLayers(element, customConfig);

      expect(result?.outerRing.props.strokeWidth).toBe((3 + 5) * 2);
      expect(result?.innerRing.props.strokeWidth).toBe(5 * 2);
    });
  });
});
