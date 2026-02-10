import { renderHook } from '@testing-library/react-hooks';

import { beforeEach, describe, expect, vi } from 'vitest';

import { getCanvasDimensions } from '@/utils/getCanvasDimensions/getCanvasDimensions';

import { useResponsiveCanvas } from '../useResponsiveCanvas';

vi.mock('@/utils/getCanvasDimensions/getCanvasDimensions', () => ({
  getCanvasDimensions: vi.fn(() => ({ parsedCanvasHeight: 300, parsedCanvasWidth: 400 })),
}));

vi.mock('@/utils/parseStringToNumberPx.ts/parseStringToNumberPx', () => ({
  parseStringToNumberPx: vi.fn(value => {
    if (typeof value === 'number') {
      return value;
    }
    if (value === '100%') {
      return 400;
    }
    if (value === '2.5rem') {
      return 40;
    }
    return parseInt(value) || 0;
  }),
}));

vi.mock('@/components/svgContainer/utils/buildViewBox/buildViewBox', () => ({
  buildViewBox: vi.fn((width, height) => `0 0 ${width} ${height}`),
}));

const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
let resizeObserverCallback: (() => void) | null = null;
(global as any).ResizeObserver = class {
  constructor(callback: () => void) {
    resizeObserverCallback = callback;
  }
  observe = mockObserve;
  disconnect = mockDisconnect;
};

global.document.querySelector = vi.fn(() => ({
  getBoundingClientRect: () => ({ height: 300, width: 400 }),
}));

describe('useResponsiveCanvas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getCanvasDimensions).mockReturnValue({
      parsedCanvasHeight: 300,
      parsedCanvasWidth: 400,
    });
  });

  it('should handle basic dimensions and viewBox generation', () => {
    const { result } = renderHook(() =>
      useResponsiveCanvas({
        dataTestId: 'test-chart',
        height: 300,
        width: 400,
      })
    );

    expect(result.current.parsedCanvas).toEqual({ height: 300, width: 400 });
    expect(result.current.viewBox).toBe('0 0 400 300');
    expect(mockObserve).toHaveBeenCalled();
  });

  it('should handle string dimensions and canvasConfig', () => {
    vi.mocked(getCanvasDimensions).mockReturnValue({
      parsedCanvasHeight: 40,
      parsedCanvasWidth: 600,
    });

    const { result } = renderHook(() =>
      useResponsiveCanvas({
        canvasConfig: { extraSpace: 20, height: 300, width: 400 },
        dataTestId: 'test-chart',
        extraSpace: 10,
        height: '2.5rem',
        width: '100%',
      })
    );

    expect(result.current.parsedCanvas).toEqual({ height: 40, width: 600 });
    expect(result.current.viewBox).toBe('0 0 600 40');
  });

  it('should handle dimension updates and memoization', () => {
    const { rerender, result } = renderHook(
      ({ width }) => useResponsiveCanvas({ dataTestId: 'test-chart', height: 300, width }),
      { initialProps: { width: 400 } }
    );

    const firstCanvas = result.current.parsedCanvas;
    rerender({ width: 400 }); // Same dimensions
    expect(result.current.parsedCanvas).toBe(firstCanvas); // Should be memoized

    vi.mocked(getCanvasDimensions).mockReturnValue({
      parsedCanvasHeight: 300,
      parsedCanvasWidth: 800,
    });
    rerender({ width: 800 }); // Different dimensions
    expect(result.current.parsedCanvas).not.toBe(firstCanvas);
    expect(result.current.parsedCanvas.width).toBe(800);
  });

  it('should not trigger re-render when ResizeObserver fires with same dimensions', () => {
    const { result } = renderHook(() =>
      useResponsiveCanvas({
        dataTestId: 'test-chart',
        height: 300,
        width: 400,
      })
    );

    const firstCanvas = result.current.parsedCanvas;

    // Simulate ResizeObserver firing (e.g., on resolution change)
    // getCanvasDimensions still returns the same values (fixed numeric canvasConfig)
    if (resizeObserverCallback) {
      resizeObserverCallback();
    }

    // parsedCanvas reference should remain the same — no unnecessary re-render
    expect(result.current.parsedCanvas).toBe(firstCanvas);
  });

  it('should update parsedCanvas when ResizeObserver fires with different dimensions', () => {
    const { result } = renderHook(() =>
      useResponsiveCanvas({
        dataTestId: 'test-chart',
        height: 300,
        width: 400,
      })
    );

    const firstCanvas = result.current.parsedCanvas;

    // Simulate dimensions actually changing (e.g., percentage-based canvasConfig)
    vi.mocked(getCanvasDimensions).mockReturnValue({
      parsedCanvasHeight: 500,
      parsedCanvasWidth: 600,
    });

    if (resizeObserverCallback) {
      resizeObserverCallback();
    }

    expect(result.current.parsedCanvas).not.toBe(firstCanvas);
    expect(result.current.parsedCanvas).toEqual({ height: 500, width: 600 });
  });

  it('should handle edge cases and cleanup', () => {
    // Test invalid dimensions
    const { result, unmount } = renderHook(() =>
      useResponsiveCanvas({
        dataTestId: 'test-chart',
        height: 'invalid',
        width: 'invalid',
      })
    );

    expect(result.current.parsedCanvas).toBeDefined();
    expect(typeof result.current.parsedCanvas.width).toBe('number');
    expect(typeof result.current.parsedCanvas.height).toBe('number');

    // Test cleanup
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
