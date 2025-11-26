import { describe, expect, it } from 'vitest';

import { FOCUS_DEFAULT } from '@/types/focusConfig.type';

import { createAdaptiveFocusRings } from '../createAdaptiveFocusRings';

/**
 * Helper to create a mock SVGElement for testing.
 * In a real browser, this would be document.createElementNS('http://www.w3.org/2000/svg', tagName)
 */
function createMockSVGElement(
  tagName: string,
  attributes: Record<string, string | number>
): SVGElement {
  // Convert attributes object to array format for element.attributes
  const attributesArray = Object.entries(attributes).map(([name, value]) => ({
    name,
    value: value.toString(),
  }));

  const element = {
    // Mock element.attributes to simulate real DOM behavior
    attributes: attributesArray,
    getAttribute: (name: string) => {
      const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
      return attributes[name]?.toString() || attributes[kebabName]?.toString() || null;
    },
    tagName: tagName.toUpperCase(),
  } as unknown as SVGElement;

  return element;
}

describe('createAdaptiveFocusRings', () => {
  const defaultConfig = {
    gap: FOCUS_DEFAULT.OUTLINES_GAP,
    innerColor: FOCUS_DEFAULT.FOCUS_INNER,
    innerStrokeWidth: FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH,
    outlineColor: FOCUS_DEFAULT.FOCUS_COLOR,
    outlineStrokeWidth: FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH,
    variant: FOCUS_DEFAULT.VARIANT,
  } as const;

  describe('Supported SVG elements', () => {
    it('should create focus rings for all supported element types', () => {
      const elements: Array<{ type: string; attrs: Record<string, string | number> }> = [
        { attrs: { cx: 50, cy: 50, r: 30 }, type: 'circle' },
        { attrs: { height: 100, width: 150, x: 10, y: 20 }, type: 'rect' },
        { attrs: { cx: 100, cy: 80, rx: 60, ry: 40 }, type: 'ellipse' },
        { attrs: { d: 'M 10 10 L 90 90 Z' }, type: 'path' },
        { attrs: { points: '10,10 90,10 50,90' }, type: 'polygon' },
        { attrs: { points: '10,10 50,50 90,10' }, type: 'polyline' },
        { attrs: { x1: 10, x2: 90, y1: 20, y2: 80 }, type: 'line' },
      ];

      elements.forEach(({ attrs, type }) => {
        const element = createMockSVGElement(type, attrs);
        const result = createAdaptiveFocusRings(element, defaultConfig);

        expect(result, `${type} should be supported`).toBeTruthy();
        expect(result?.variant).toBe('adaptive');
        expect(result?.outerRing.type).toBe(type);
        expect(result?.innerRing.type).toBe(type);
      });
    });

    it('should return null for unsupported element types', () => {
      const unsupportedElements = ['text', 'image', 'g', 'svg'];

      unsupportedElements.forEach(type => {
        const element = createMockSVGElement(type, { x: 10, y: 20 });
        const result = createAdaptiveFocusRings(element, defaultConfig);

        expect(result, `${type} should not be supported`).toBeNull();
      });
    });
  });

  describe('Stroke-width calculation', () => {
    it('should calculate correct stroke widths without original stroke', () => {
      const element = createMockSVGElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      const expectedOuterWidth =
        (FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH) * 2;
      const expectedInnerWidth = FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH * 2;

      expect(result?.outerRing.props.strokeWidth).toBe(expectedOuterWidth);
      expect(result?.innerRing.props.strokeWidth).toBe(expectedInnerWidth);
    });

    it('should account for original strokeWidth in all shapes', () => {
      const originalStrokeWidth = 5;
      const element = createMockSVGElement('circle', {
        'cx': 50,
        'cy': 50,
        'r': 30,
        'stroke-width': originalStrokeWidth,
      });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      const expectedOuterWidth =
        originalStrokeWidth +
        (FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH) * 2;
      const expectedInnerWidth = originalStrokeWidth + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH * 2;

      expect(result?.outerRing.props.strokeWidth).toBe(expectedOuterWidth);
      expect(result?.innerRing.props.strokeWidth).toBe(expectedInnerWidth);
    });

    it('should parse strokeWidth from string attribute', () => {
      const element = createMockSVGElement('rect', {
        'height': 100,
        'stroke-width': '3',
        'width': 150,
        'x': 10,
        'y': 20,
      });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      expect(result?.outerRing.props.strokeWidth).toBe(
        3 + (FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH) * 2
      );
    });
  });

  describe('Open vs Closed shapes', () => {
    it('should use miter stroke for closed shapes', () => {
      const closedShapes = ['circle', 'rect', 'ellipse', 'polygon'];

      closedShapes.forEach(type => {
        const element = createMockSVGElement(type, { cx: 50, cy: 50, r: 30 });
        const result = createAdaptiveFocusRings(element, defaultConfig);

        expect(result?.outerRing.props.strokeLinejoin, `${type}`).toBe('miter');
        expect(result?.outerRing.props.strokeMiterlimit, `${type}`).toBe('10');
        expect(result?.outerRing.props.strokeLinecap, `${type}`).toBeUndefined();
      });
    });

    it('should use round stroke for open lines', () => {
      const openLines = ['line', 'polyline'];

      openLines.forEach(type => {
        const element = createMockSVGElement(type, { x1: 10, x2: 90, y1: 20, y2: 80 });
        const result = createAdaptiveFocusRings(element, defaultConfig);

        expect(result?.outerRing.props.strokeLinejoin, `${type}`).toBe('round');
        expect(result?.outerRing.props.strokeLinecap, `${type}`).toBe('round');
        expect(result?.outerRing.props.strokeMiterlimit, `${type}`).toBeUndefined();
      });
    });

    it('should detect path with fill="none" as open line', () => {
      const element = createMockSVGElement('path', {
        d: 'M 10,10 Q 50,30 90,10',
        fill: 'none',
      });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      expect(result?.outerRing.props.strokeLinejoin).toBe('round');
      expect(result?.outerRing.props.strokeLinecap).toBe('round');
      expect(result?.outerRing.props.strokeMiterlimit).toBeUndefined();
    });

    it('should detect path with fill as closed shape', () => {
      const element = createMockSVGElement('path', {
        d: 'M 10 10 L 90 90 Z',
        fill: 'blue',
      });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      expect(result?.outerRing.props.strokeLinejoin).toBe('miter');
      expect(result?.outerRing.props.strokeMiterlimit).toBe('10');
      expect(result?.outerRing.props.strokeLinecap).toBeUndefined();
    });

    it('should preserve custom strokeLinecap for open lines', () => {
      const element = createMockSVGElement('line', {
        'stroke-linecap': 'square',
        'x1': 10,
        'x2': 90,
        'y1': 20,
        'y2': 80,
      });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      expect(result?.outerRing.props.strokeLinecap).toBe('square');
    });

    it('should preserve custom strokeLinejoin for open lines', () => {
      const element = createMockSVGElement('polyline', {
        'points': '10,10 50,50 90,10',
        'stroke-linejoin': 'bevel',
      });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      expect(result?.outerRing.props.strokeLinejoin).toBe('bevel');
    });
  });

  describe('Props and styling', () => {
    it('should set correct fill, stroke, and className', () => {
      const element = createMockSVGElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      // Outer ring
      expect(result?.outerRing.props.fill).toBe('none');
      expect(result?.outerRing.props.stroke).toBe(FOCUS_DEFAULT.FOCUS_COLOR);
      expect(result?.outerRing.props.className).toBe('focus-ring-outer');

      // Inner ring
      expect(result?.innerRing.props.fill).toBe('none');
      expect(result?.innerRing.props.stroke).toBe(FOCUS_DEFAULT.FOCUS_INNER);
      expect(result?.innerRing.props.className).toBe('focus-ring-inner');
    });

    it('should preserve geometric attributes from source element', () => {
      const element = createMockSVGElement('rect', {
        height: 100,
        rx: 5,
        ry: 10,
        width: 150,
        x: 10,
        y: 20,
      });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      // Check that geometric attributes are preserved
      expect(result?.outerRing.props.x).toBe('10');
      expect(result?.outerRing.props.y).toBe('20');
      expect(result?.outerRing.props.width).toBe('150');
      expect(result?.outerRing.props.height).toBe('100');
      expect(result?.outerRing.props.rx).toBe('5');
      expect(result?.outerRing.props.ry).toBe('10');
    });
  });

  describe('Custom configuration', () => {
    it('should use custom colors', () => {
      const customConfig = {
        ...defaultConfig,
        innerColor: '#FF0000',
        outlineColor: '#00FF00',
      };
      const element = createMockSVGElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createAdaptiveFocusRings(element, customConfig);

      expect(result?.outerRing.props.stroke).toBe('#00FF00');
      expect(result?.innerRing.props.stroke).toBe('#FF0000');
    });

    it('should use custom stroke widths', () => {
      const customConfig = {
        ...defaultConfig,
        innerStrokeWidth: 5,
        outlineStrokeWidth: 3,
      };
      const element = createMockSVGElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createAdaptiveFocusRings(element, customConfig);

      expect(result?.outerRing.props.strokeWidth).toBe((3 + 5) * 2);
      expect(result?.innerRing.props.strokeWidth).toBe(5 * 2);
    });
  });
});
