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

  describe('Element support', () => {
    it('should create focus rings for supported elements and reject unsupported', () => {
      // Supported elements (test representative samples)
      const circle = createMockSVGElement('circle', { cx: 50, cy: 50, r: 30 });
      const rect = createMockSVGElement('rect', { height: 100, width: 150, x: 10, y: 20 });
      const path = createMockSVGElement('path', { d: 'M 10 10 L 90 90 Z' });

      [circle, rect, path].forEach(element => {
        const result = createAdaptiveFocusRings(element, defaultConfig);
        expect(result).toBeTruthy();
        expect(result?.variant).toBe('adaptive');
        expect(result?.outerRing.type).toBe(element.tagName.toLowerCase());
      });

      // Unsupported elements
      ['text', 'image', 'g'].forEach(type => {
        const element = createMockSVGElement(type, { x: 10, y: 20 });
        expect(createAdaptiveFocusRings(element, defaultConfig)).toBeNull();
      });
    });
  });

  describe('Stroke-width calculation', () => {
    it('should calculate correct stroke widths with and without original stroke', () => {
      // Without original stroke
      const element = createMockSVGElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      const expectedOuter =
        (FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH + FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH) * 2;
      const expectedInner = FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH * 2;

      expect(result?.outerRing.props.strokeWidth).toBe(expectedOuter);
      expect(result?.innerRing.props.strokeWidth).toBe(expectedInner);

      // With original stroke (as string)
      const elementWithStroke = createMockSVGElement('rect', {
        'height': 100,
        'stroke-width': '5',
        'width': 150,
        'x': 10,
        'y': 20,
      });
      const resultWithStroke = createAdaptiveFocusRings(elementWithStroke, defaultConfig);

      expect(resultWithStroke?.outerRing.props.strokeWidth).toBe(5 + expectedOuter);
      expect(resultWithStroke?.innerRing.props.strokeWidth).toBe(5 + expectedInner);
    });

    it('should use custom stroke widths from config', () => {
      const customConfig = { ...defaultConfig, innerStrokeWidth: 5, outlineStrokeWidth: 3 };
      const element = createMockSVGElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createAdaptiveFocusRings(element, customConfig);

      expect(result?.outerRing.props.strokeWidth).toBe((3 + 5) * 2);
      expect(result?.innerRing.props.strokeWidth).toBe(5 * 2);
    });
  });

  describe('Stroke styles', () => {
    it('should use miter for closed shapes', () => {
      const closed = createMockSVGElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createAdaptiveFocusRings(closed, defaultConfig);

      expect(result?.outerRing.props.strokeLinejoin).toBe('miter');
      expect(result?.outerRing.props.strokeMiterlimit).toBe('10');
      expect(result?.outerRing.props.strokeLinecap).toBeUndefined();
    });

    it('should use round for open lines and preserve custom styles', () => {
      // Default round
      const line = createMockSVGElement('line', { x1: 10, x2: 90, y1: 20, y2: 80 });
      const result = createAdaptiveFocusRings(line, defaultConfig);

      expect(result?.outerRing.props.strokeLinejoin).toBe('round');
      expect(result?.outerRing.props.strokeLinecap).toBe('round');
      expect(result?.outerRing.props.strokeMiterlimit).toBeUndefined();

      // Custom linecap
      const customLine = createMockSVGElement('line', {
        'stroke-linecap': 'square',
        'x1': 10,
        'x2': 90,
        'y1': 20,
        'y2': 80,
      });
      const customResult = createAdaptiveFocusRings(customLine, defaultConfig);

      expect(customResult?.outerRing.props.strokeLinecap).toBe('square');
    });

    it('should detect path with fill="none" as open line', () => {
      const openPath = createMockSVGElement('path', { d: 'M 10,10 Q 50,30 90,10', fill: 'none' });
      const result = createAdaptiveFocusRings(openPath, defaultConfig);

      expect(result?.outerRing.props.strokeLinejoin).toBe('round');
      expect(result?.outerRing.props.strokeLinecap).toBe('round');
    });
  });

  describe('Props and attributes', () => {
    it('should set correct colors, fill, and classNames', () => {
      const element = createMockSVGElement('circle', { cx: 50, cy: 50, r: 30 });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      expect(result?.outerRing.props.fill).toBe('none');
      expect(result?.outerRing.props.stroke).toBe(FOCUS_DEFAULT.FOCUS_COLOR);
      expect(result?.outerRing.props.className).toBe('focus-ring-outer');

      expect(result?.innerRing.props.fill).toBe('none');
      expect(result?.innerRing.props.stroke).toBe(FOCUS_DEFAULT.FOCUS_INNER);
      expect(result?.innerRing.props.className).toBe('focus-ring-inner');
    });

    it('should preserve geometric attributes', () => {
      const element = createMockSVGElement('rect', {
        height: 100,
        rx: 5,
        ry: 10,
        width: 150,
        x: 10,
        y: 20,
      });
      const result = createAdaptiveFocusRings(element, defaultConfig);

      expect(result?.outerRing.props.x).toBe('10');
      expect(result?.outerRing.props.y).toBe('20');
      expect(result?.outerRing.props.width).toBe('150');
      expect(result?.outerRing.props.height).toBe('100');
      expect(result?.outerRing.props.rx).toBe('5');
      expect(result?.outerRing.props.ry).toBe('10');
    });
  });
});
