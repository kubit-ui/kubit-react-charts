import { act, renderHook } from '@testing-library/react';

import { useHover } from '../useHover';

describe('useHover', () => {
  it('should update xCursor and yCursor on mousemove', () => {
    const { result } = renderHook(() => useHover({ canvasHeight: 100, canvasWidth: 100 }));

    act(() => {
      const svgElement = document.createElement('svg') as unknown as SVGSVGElement;
      svgElement.getBoundingClientRect = () => ({
        bottom: 0,
        height: 50,
        left: 0,
        right: 0,
        toJSON: vi.fn(),
        top: 0,
        width: 50,
        x: 0,
        y: 0,
      });

      result.current.svgRef(svgElement);

      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 25,
        clientY: 25,
      });

      svgElement.dispatchEvent(mouseMoveEvent);
    });

    expect(result.current.xCursor).toBe(50);
    expect(result.current.yCursor).toBe(50);
  });

  it('should reset xCursor and yCursor on mouseleave', () => {
    const { result } = renderHook(() => useHover({ canvasHeight: 100, canvasWidth: 100 }));

    act(() => {
      const svgElement = document.createElement('svg') as unknown as SVGSVGElement;
      svgElement.getBoundingClientRect = () => ({
        bottom: 0,
        height: 50,
        left: 0,
        right: 0,
        toJSON: vi.fn(),
        top: 0,
        width: 50,
        x: 0,
        y: 0,
      });

      result.current.svgRef(svgElement);

      const mouseLeaveEvent = new MouseEvent('mouseleave');

      svgElement.dispatchEvent(mouseLeaveEvent);
    });

    expect(result.current.xCursor).toBe(-Infinity);
    expect(result.current.yCursor).toBe(-Infinity);
  });
});
