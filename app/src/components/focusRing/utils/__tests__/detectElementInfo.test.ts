import { createElement } from 'react';

import { describe, expect, it } from 'vitest';

import { detectElementInfo } from '../detectElementInfo';

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
        elementPosition: { x: 50, y: 60 },
        elementRadius: 25,
        elementSize: 50, // diameter (r * 2)
        elementStrokeWidth: 1,
        elementType: 'circle',
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

      expect(result.elementType).toBe('path');
      expect(result.elementStrokeWidth).toBe(2);
      expect(result.elementPosition).toBeUndefined();
    });

    it('handles missing path data', () => {
      const element = createElement('path', {
        strokeWidth: 1,
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('path');
      expect(result.elementStrokeWidth).toBe(1);
      expect(result.elementPosition).toBeUndefined();
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

  describe('unknown elements', () => {
    it('returns unknown for unsupported element types', () => {
      const element = createElement('text', {
        x: 10,
        y: 20,
      });

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('unknown');
    });

    it('returns unknown for React components', () => {
      const CustomComponent = () => null;
      const element = createElement(CustomComponent, {});

      const result = detectElementInfo(element);

      expect(result.elementType).toBe('unknown');
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
});
