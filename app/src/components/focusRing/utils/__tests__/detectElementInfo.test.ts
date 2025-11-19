import { createElement } from 'react';

import { describe, expect, it } from 'vitest';

import { detectElementBounds, detectElementInfo, detectWithFallback } from '../detectElementInfo';

describe('detectElementInfo', () => {
  describe('rect elements', () => {
    it('detects rectangle properties correctly', () => {
      const element = createElement('rect', {
        height: 50,
        strokeWidth: 2,
        width: 100,
        x: 10,
        y: 20,
      });

      const result = detectElementInfo(element);

      expect(result).toEqual({
        elementHeight: 50,
        elementPosition: { x: 60, y: 45 }, // center: (10 + 100/2, 20 + 50/2)
        elementSize: 100, // max(width, height)
        elementStrokeWidth: 2,
        elementType: 'rectangle',
        elementWidth: 100,
        isValid: true,
        originalElementType: 'rect',
      });
    });

    it('handles string numeric props', () => {
      const element = createElement('rect', {
        height: '50',
        strokeWidth: '3',
        width: '100',
        x: '10',
        y: '20',
      });

      const result = detectElementInfo(element);

      expect(result.elementPosition).toEqual({ x: 60, y: 45 });
      expect(result.elementStrokeWidth).toBe(3);
    });

    it('handles missing optional props with defaults', () => {
      const element = createElement('rect', {
        height: 30,
        width: 50,
      });

      const result = detectElementInfo(element);

      expect(result.elementPosition).toEqual({ x: 25, y: 15 }); // x=0, y=0 defaults
      expect(result.elementStrokeWidth).toBe(0); // strokeWidth default
    });

    it('returns unknown for invalid dimensions', () => {
      const element = createElement('rect', {
        height: 50,
        width: 0, // Invalid width
        x: 10,
        y: 10,
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('unknown');
    });
  });

  describe('circle elements', () => {
    it('detects circle properties correctly', () => {
      const element = createElement('circle', {
        cx: 50,
        cy: 60,
        r: 25,
        strokeWidth: 1,
      });

      const result = detectElementInfo(element);

      expect(result).toEqual({
        elementHeight: 50,
        elementPosition: { x: 50, y: 60 },
        elementRadius: 25,
        elementSize: 50, // diameter (r * 2)
        elementStrokeWidth: 1,
        elementType: 'circle',
        elementWidth: 50,
        isValid: true,
        originalElementType: 'circle',
      });
    });

    it('handles missing center coordinates with defaults', () => {
      const element = createElement('circle', {
        r: 20,
      });

      const result = detectElementInfo(element);

      expect(result.elementPosition).toEqual({ x: 0, y: 0 });
      expect(result.elementSize).toBe(40);
    });

    it('returns unknown for invalid radius', () => {
      const element = createElement('circle', {
        cx: 50,
        cy: 50,
        r: 0, // Invalid radius
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('unknown');
    });
  });

  describe('ellipse elements', () => {
    it('detects ellipse properties correctly', () => {
      const element = createElement('ellipse', {
        cx: 100,
        cy: 80,
        rx: 40,
        ry: 30,
        strokeWidth: 2,
      });

      const result = detectElementInfo(element);

      expect(result).toEqual({
        elementHeight: 60, // ry * 2
        elementPosition: { x: 100, y: 80 },
        elementSize: 80, // max(rx * 2, ry * 2) = max(80, 60) = 80
        elementStrokeWidth: 2,
        elementType: 'ellipse',
        elementWidth: 80, // rx * 2
        isValid: true,
        originalElementType: 'ellipse',
      });
    });

    it('returns unknown for invalid radii', () => {
      const element = createElement('ellipse', {
        cx: 50,
        cy: 50,
        rx: 20,
        ry: 0, // Invalid ry
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('unknown');
    });
  });

  describe('path elements', () => {
    it('detects simple path bounds', () => {
      const element = createElement('path', {
        d: 'M10,10 L50,50 L90,10 Z', // Triangle
        strokeWidth: 1,
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('rectangle');
      expect(result.elementPosition).toEqual({ x: 50, y: 30 }); // center of bounds
      expect(result.elementWidth).toBe(80); // 90 - 10
      expect(result.elementHeight).toBe(40); // 50 - 10
      expect(result.elementStrokeWidth).toBe(1);
    });

    it('handles invalid path data', () => {
      const element = createElement('path', {
        d: 'invalid path',
        strokeWidth: 2,
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('unknown');
      expect(result.elementStrokeWidth).toBe(2);
      expect(result.isValid).toBe(false);
      expect(result.originalElementType).toBe('path');
    });

    it('handles missing path data', () => {
      const element = createElement('path', {
        strokeWidth: 1,
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('unknown');
      expect(result.elementStrokeWidth).toBe(1);
      expect(result.isValid).toBe(false);
      expect(result.originalElementType).toBe('path');
    });
  });

  describe('polygon elements', () => {
    it('detects polygon bounds from points', () => {
      const element = createElement('polygon', {
        points: '10,10 50,30 90,10 70,50',
        strokeWidth: 2,
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('rectangle');
      expect(result.elementPosition).toEqual({ x: 50, y: 30 }); // center
      expect(result.elementWidth).toBe(80); // 90 - 10
      expect(result.elementHeight).toBe(40); // 50 - 10
      expect(result.elementStrokeWidth).toBe(2);
    });

    it('handles comma-separated points format', () => {
      const element = createElement('polygon', {
        points: '0,0 100,0 100,100 0,100',
      });

      const result = detectElementInfo(element);

      expect(result.elementPosition).toEqual({ x: 50, y: 50 });
      expect(result.elementWidth).toBe(100);
      expect(result.elementHeight).toBe(100);
    });

    it('handles space-separated points format', () => {
      const element = createElement('polygon', {
        points: '0 0 100 0 100 100 0 100',
      });

      const result = detectElementInfo(element);

      expect(result.elementPosition).toEqual({ x: 50, y: 50 });
      expect(result.elementWidth).toBe(100);
      expect(result.elementHeight).toBe(100);
    });

    it('handles invalid points', () => {
      const element = createElement('polygon', {
        points: 'invalid',
        strokeWidth: 1,
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('unknown');
      expect(result.elementStrokeWidth).toBe(1);
    });
  });

  describe('line elements', () => {
    it('detects horizontal line properties', () => {
      const element = createElement('line', {
        strokeWidth: 3,
        x1: 10,
        x2: 90,
        y1: 50,
        y2: 50,
      });

      const result = detectElementInfo(element);

      expect(result).toEqual({
        elementHeight: 3, // Uses strokeWidth for height
        elementPosition: { x: 50, y: 51.5 }, // center
        elementSize: 80, // max(width, height)
        elementStrokeWidth: 3,
        elementType: 'rectangle',
        elementWidth: 80, // 90 - 10
        isValid: true,
        originalElementType: 'line',
      });
    });

    it('detects vertical line properties', () => {
      const element = createElement('line', {
        strokeWidth: 2,
        x1: 30,
        x2: 30,
        y1: 10,
        y2: 70,
      });

      const result = detectElementInfo(element);

      expect(result.elementWidth).toBe(2); // Uses strokeWidth for width
      expect(result.elementHeight).toBe(60); // 70 - 10
      expect(result.elementPosition).toEqual({ x: 31, y: 40 });
    });

    it('detects diagonal line properties', () => {
      const element = createElement('line', {
        strokeWidth: 1,
        x1: 0,
        x2: 100,
        y1: 0,
        y2: 100,
      });

      const result = detectElementInfo(element);

      expect(result.elementWidth).toBe(100);
      expect(result.elementHeight).toBe(100);
      expect(result.elementPosition).toEqual({ x: 50, y: 50 });
    });
  });

  describe('text elements', () => {
    it('estimates text dimensions correctly', () => {
      const element = createElement('text', {
        children: 'Hello World',
        fontSize: 16,
        x: 10,
        y: 20,
      });

      const result = detectElementInfo(element);

      expect(result).toEqual({
        elementHeight: 19.2, // fontSize * 1.2
        elementPosition: { x: 62.8, y: 10.4 }, // estimated center
        elementSize: 105.6, // max(width, height)
        elementStrokeWidth: 0,
        elementType: 'rectangle',
        elementWidth: 105.6, // text length * fontSize * 0.6
        isValid: true,
        originalElementType: 'text',
      });
    });

    it('handles font-size kebab case', () => {
      const element = createElement('text', {
        'children': 'Test',
        'font-size': 20,
        'x': 0,
        'y': 0,
      });

      const result = detectElementInfo(element);

      expect(result.elementHeight).toBe(24); // 20 * 1.2
      expect(result.elementWidth).toBe(48); // 4 * 20 * 0.6
    });

    it('uses default font size when not specified', () => {
      const element = createElement('text', {
        children: 'A',
        x: 0,
        y: 0,
      });

      const result = detectElementInfo(element);

      expect(result.elementHeight).toBe(19.2); // 16 * 1.2 (default fontSize)
      expect(result.elementWidth).toBe(9.6); // 1 * 16 * 0.6
    });
  });

  describe('enhanced path analysis', () => {
    it('analyzes complex path with multiple commands', () => {
      const element = createElement('path', {
        d: 'M10,10 L50,10 L50,50 L10,50 Z', // Rectangle path
        strokeWidth: 2,
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('rectangle');
      expect(result.elementPosition).toEqual({ x: 30, y: 30 });
      expect(result.elementWidth).toBe(40);
      expect(result.elementHeight).toBe(40);
      expect(result.elementStrokeWidth).toBe(2);
    });

    it('handles path with horizontal and vertical lines', () => {
      const element = createElement('path', {
        d: 'M0,0 H100 V50 H0 Z',
        strokeWidth: 1,
      });

      const result = detectElementInfo(element);

      expect(result.elementPosition).toEqual({ x: 50, y: 25 });
      expect(result.elementWidth).toBe(100);
      expect(result.elementHeight).toBe(50);
    });

    it('handles path with cubic bezier curves', () => {
      const element = createElement('path', {
        d: 'M10,10 C20,5 40,5 50,10 C60,15 80,15 90,10',
        strokeWidth: 1,
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('rectangle');
      expect(result.elementStrokeWidth).toBe(1);
      // Should include control points in bounding box calculation
      expect(result.elementWidth).toBeGreaterThan(0);
      expect(result.elementHeight).toBeGreaterThan(0);
    });

    it('caches path analysis results', () => {
      const pathData = 'M0,0 L100,100';
      const element1 = createElement('path', { d: pathData });
      const element2 = createElement('path', { d: pathData });

      const result1 = detectElementInfo(element1);
      const result2 = detectElementInfo(element2);

      // Results should be identical (from cache)
      expect(result1).toEqual(result2);
    });
  });

  describe('validation and edge cases', () => {
    it('marks valid detections with isValid flag', () => {
      const element = createElement('rect', {
        height: 50,
        width: 50,
        x: 10,
        y: 10,
      });

      const result = detectElementInfo(element);

      expect(result.isValid).toBe(true);
      expect(result.originalElementType).toBe('rect');
    });

    it('marks invalid detections with isValid flag', () => {
      const element = createElement('rect', {
        height: 0, // Invalid
        width: 50,
      });

      const result = detectElementInfo(element);

      expect(result.isValid).toBe(false);
      expect(result.originalElementType).toBe('rect');
    });

    it('handles null/undefined element gracefully', () => {
      const result = detectElementInfo(null as any);

      expect(result.elementType).toBe('unknown');
      expect(result.isValid).toBe(false);
    });

    it('validates numeric props with fallbacks', () => {
      const element = createElement('rect', {
        height: 'invalid',
        width: null,
        x: undefined,
        y: '',
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('unknown'); // Invalid dimensions
      expect(result.originalElementType).toBe('rect');
    });
  });

  describe('unknown elements', () => {
    it('returns unknown for React components', () => {
      const CustomComponent = () => null;
      const element = createElement(CustomComponent, {});

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('unknown');
      expect(result.isValid).toBe(false);
      expect(result.originalElementType).toBe('unknown');
    });
  });

  describe('stroke width handling', () => {
    it('handles stroke-width kebab case attribute', () => {
      const element = createElement('rect', {
        'height': 50,
        'stroke-width': 3,
        'width': 50,
      });

      const result = detectElementInfo(element);

      expect(result.elementStrokeWidth).toBe(3);
    });

    it('prefers strokeWidth over stroke-width', () => {
      const element = createElement('rect', {
        'height': 50,
        'stroke-width': 3, // Should be ignored
        'strokeWidth': 5,
        'width': 50,
      });

      const result = detectElementInfo(element);

      expect(result.elementStrokeWidth).toBe(5);
    });

    it('defaults to 0 when no stroke width specified', () => {
      const element = createElement('rect', {
        height: 50,
        width: 50,
      });

      const result = detectElementInfo(element);

      expect(result.elementStrokeWidth).toBe(0);
    });
  });

  describe('detectElementBounds (DOM fallback)', () => {
    it('detects bounds from DOM element', () => {
      // Mock SVG element with getBBox method
      const mockElement = {
        getBBox: () => ({
          height: 50,
          width: 100,
          x: 10,
          y: 20,
        }),
      } as unknown as SVGElement;

      // Mock computed style
      Object.defineProperty(window, 'getComputedStyle', {
        value: () => ({
          strokeWidth: '2',
        }),
      });

      const result = detectElementBounds(mockElement);

      expect(result).toEqual({
        elementHeight: 50,
        elementPosition: { x: 60, y: 45 }, // center of bbox
        elementSize: 100, // max(width, height)
        elementStrokeWidth: 2,
        elementType: 'rectangle',
        elementWidth: 100,
        isValid: true,
      });
    });

    it('returns null for invalid bbox', () => {
      const mockElement = {
        getBBox: () => ({
          height: 0, // Invalid
          width: 100,
          x: 10,
          y: 20,
        }),
      } as unknown as SVGElement;

      const result = detectElementBounds(mockElement);

      expect(result).toBe(null);
    });

    it('handles getBBox errors gracefully', () => {
      const mockElement = {
        getBBox: () => {
          throw new Error('Not rendered');
        },
      } as unknown as SVGElement;

      const result = detectElementBounds(mockElement);

      expect(result).toBe(null);
    });
  });

  describe('detectWithFallback', () => {
    it('uses props detection when valid', () => {
      const element = createElement('rect', {
        height: 50,
        width: 100,
        x: 0,
        y: 0,
      });

      const result = detectWithFallback(element);

      expect(result).not.toBeNull();
      expect(result?.isValid).toBe(true);
      expect(result?.elementType).toBe('rectangle');
      expect(result?.originalElementType).toBe('rect');
    });

    it('falls back to DOM detection when props detection fails', () => {
      const element = createElement('rect', {
        // Missing required props
      });

      const mockDomElement = {
        getBBox: () => ({
          height: 30,
          width: 40,
          x: 5,
          y: 10,
        }),
      } as unknown as SVGElement;

      Object.defineProperty(window, 'getComputedStyle', {
        value: () => ({ strokeWidth: '1' }),
      });

      const result = detectWithFallback(element, mockDomElement);

      expect(result).not.toBeNull();
      expect(result?.isValid).toBe(true);
      expect(result?.elementType).toBe('rectangle');
      expect(result?.originalElementType).toBe('rect');
      expect(result?.elementWidth).toBe(40);
      expect(result?.elementHeight).toBe(30);
    });

    it('returns null when no valid information can be detected', () => {
      const element = createElement('rect', {
        // Missing required props
      });

      const result = detectWithFallback(element);

      expect(result).toBeNull();
    });
  });
});
