import { describe, expect, it, vi } from 'vitest';

import { detectElementBounds } from '../detectElementInfo';

describe('detectElementBounds', () => {
  it('detects bounds from DOM element using getBBox', () => {
    const mockElement = {
      getBBox: vi.fn(() => ({
        height: 50,
        width: 100,
        x: 10,
        y: 20,
      })),
      tagName: 'rect',
    } as unknown as SVGElement;

    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      strokeWidth: '2',
    } as CSSStyleDeclaration);

    const result = detectElementBounds(mockElement);

    expect(result).toEqual({
      elementHeight: 50,
      elementPosition: { x: 60, y: 45 },
      elementSize: 100,
      elementStrokeWidth: 2,
      elementWidth: 100,
      isValid: true,
    });

    expect(mockElement.getBBox).toHaveBeenCalled();
  });

  it('returns null for invalid elements with zero dimensions', () => {
    const mockElement = {
      getBBox: vi.fn(() => ({
        height: 0,
        width: 0,
        x: 0,
        y: 0,
      })),
      tagName: 'rect',
    } as unknown as SVGElement;

    const result = detectElementBounds(mockElement);

    expect(result).toBeNull();
  });

  it('handles getBBox errors gracefully', () => {
    const mockElement = {
      getBBox: vi.fn(() => {
        throw new Error('getBBox failed');
      }),
      tagName: 'path',
    } as unknown as SVGElement;

    const result = detectElementBounds(mockElement);

    expect(result).toBeNull();
  });
});
