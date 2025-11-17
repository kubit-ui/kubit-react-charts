import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  createSVGElement,
  isBrowser,
  isServer,
  safeDocument,
  safeExecute,
  safeExecuteWithFallback,
  safeGetComputedStyle,
  safeQuerySelector,
  safeWindow,
} from '../ssr';

describe('SSR utilities', () => {
  describe('environment detection', () => {
    it('should detect browser environment', () => {
      expect(isBrowser()).toBe(true); // In test environment
      expect(isServer()).toBe(false);
    });

    it('should return window in browser', () => {
      expect(safeWindow()).toBe(window);
    });

    it('should return document in browser', () => {
      expect(safeDocument()).toBe(document);
    });
  });

  describe('safeExecute', () => {
    it('should execute callback in browser environment', () => {
      const result = safeExecute(() => 42);
      expect(result).toBe(42);
    });

    it('should handle errors gracefully', () => {
      const result = safeExecute(() => {
        throw new Error('Test error');
      });
      expect(result).toBeUndefined();
    });

    it('should execute complex operations', () => {
      const result = safeExecute(() => window.innerWidth > 0);
      expect(typeof result).toBe('boolean');
    });
  });

  describe('safeExecuteWithFallback', () => {
    it('should return callback result in browser', () => {
      const result = safeExecuteWithFallback(() => 100, 0);
      expect(result).toBe(100);
    });

    it('should return fallback on error', () => {
      const result = safeExecuteWithFallback(() => {
        throw new Error('Test error');
      }, 999);
      expect(result).toBe(999);
    });

    it('should work with complex types', () => {
      const fallback = { height: 0, width: 0 };
      const result = safeExecuteWithFallback(() => ({ height: 200, width: 100 }), fallback);
      expect(result).toEqual({ height: 200, width: 100 });
    });
  });

  describe('createSVGElement', () => {
    it('should create SVG element in browser', () => {
      const svg = createSVGElement('svg');
      expect(svg).toBeDefined();
      expect(svg?.tagName.toLowerCase()).toBe('svg');
    });

    it('should create text element', () => {
      const text = createSVGElement('text');
      expect(text).toBeDefined();
      expect(text?.tagName.toLowerCase()).toBe('text');
    });

    it('should create rect element', () => {
      const rect = createSVGElement('rect');
      expect(rect).toBeDefined();
      expect(rect?.tagName.toLowerCase()).toBe('rect');
    });
  });

  describe('safeGetComputedStyle', () => {
    it('should get computed style for element', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      const style = safeGetComputedStyle(div);
      expect(style).toBeDefined();
      expect(style).toBeInstanceOf(CSSStyleDeclaration);

      div.remove();
    });

    it('should work with document.documentElement', () => {
      const style = safeGetComputedStyle(document.documentElement);
      expect(style).toBeDefined();
    });
  });

  describe('safeQuerySelector', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('should find element by selector', () => {
      const div = document.createElement('div');
      div.id = 'test-element';
      document.body.appendChild(div);

      const found = safeQuerySelector('#test-element');
      expect(found).toBe(div);
    });

    it('should return null if element not found', () => {
      const found = safeQuerySelector('#non-existent');
      expect(found).toBeNull();
    });

    it('should work with type parameter', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('data-testid', 'test-svg');
      document.body.appendChild(svg);

      const found = safeQuerySelector<SVGSVGElement>('[data-testid="test-svg"]');
      expect(found).toBe(svg);
      expect(found?.tagName.toLowerCase()).toBe('svg');
    });
  });

  describe('SSR simulation', () => {
    let originalWindow: typeof window;
    let originalDocument: typeof document;

    beforeEach(() => {
      originalWindow = global.window;
      originalDocument = global.document;
    });

    afterEach(() => {
      global.window = originalWindow;
      global.document = originalDocument;
    });

    it('should handle missing window in SSR', () => {
      // Simulate SSR environment
      delete (global as any).window;
      delete (global as any).document;

      expect(isBrowser()).toBe(false);
      expect(isServer()).toBe(true);
      expect(safeWindow()).toBeUndefined();
      expect(safeDocument()).toBeUndefined();
    });

    it('should return fallback in SSR', () => {
      delete (global as any).window;
      delete (global as any).document;

      const result = safeExecuteWithFallback(() => window.innerWidth, 800);
      expect(result).toBe(800);
    });

    it('should return undefined for createSVGElement in SSR', () => {
      delete (global as any).window;
      delete (global as any).document;

      const svg = createSVGElement('svg');
      expect(svg).toBeUndefined();
    });
  });
});
