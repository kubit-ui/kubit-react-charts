import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { ZoomAreaElements } from '../../zoomArea.type';
import { useDragInteraction } from '../useDragInteraction';

vi.mock('../../utils/rangeAndPositions', () => ({
  clampRange: vi.fn(range => range),
  mouseToDataIndex: vi.fn((mouseX: number, width: number, dataLength: number) => {
    return (mouseX / width) * (dataLength - 1);
  }),
}));

describe('useDragInteraction', () => {
  const mockOnRangeChange = vi.fn();
  const defaultParams = {
    currentRange: { end: 7, start: 2 },
    dataLength: 10,
    interactionConfig: {
      keyboardFastStep: 0.5,
      keyboardStep: 0.1,
      minHandlerDistance: 0.1,
    },
    onRangeChange: mockOnRangeChange,
    width: 400,
  };

  const setupDragTest = () => {
    const listeners: { [key: string]: (event: any) => void } = {};
    vi.spyOn(document, 'addEventListener').mockImplementation((event: string, listener: any) => {
      listeners[event] = listener;
    });
    vi.spyOn(document, 'removeEventListener').mockImplementation((event: string) => {
      delete listeners[event];
    });

    const { result } = renderHook(() => useDragInteraction(defaultParams));

    // Mock SVG element
    (result.current.groupRef as any).current = {
      getBoundingClientRect: () => ({ left: 0, width: 400 }),
    };

    return {
      result,
      triggerEnd: (isTouch = false) => {
        const eventType = isTouch ? 'touchend' : 'mouseup';
        listeners[eventType]?.({});
      },
      triggerMove: (clientX: number, isTouch = false) => {
        const eventType = isTouch ? 'touchmove' : 'mousemove';
        const event = isTouch ? { preventDefault: vi.fn(), touches: [{ clientX }] } : { clientX };
        listeners[eventType]?.(event);
      },
    };
  };

  beforeEach(() => {
    mockOnRangeChange.mockClear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with expected API', () => {
    const { result } = renderHook(() => useDragInteraction(defaultParams));

    expect(result.current.isDragging).toBe(null);
    expect(typeof result.current.handleMouseDown).toBe('function');
    expect(typeof result.current.handleTouchStart).toBe('function');
  });

  it('should handle complete drag lifecycle for mouse and touch', () => {
    const { result, triggerEnd, triggerMove } = setupDragTest();

    // Test mouse drag
    act(() => {
      result.current.handleMouseDown(ZoomAreaElements.START_HANDLER)({} as React.MouseEvent);
    });
    expect(result.current.isDragging).toBe(ZoomAreaElements.START_HANDLER);

    act(() => {
      triggerMove(150);
    });
    expect(mockOnRangeChange).toHaveBeenCalledWith(
      expect.objectContaining({ start: expect.any(Number) })
    );

    act(() => {
      triggerEnd();
    });
    expect(result.current.isDragging).toBe(null);

    // Test touch drag
    mockOnRangeChange.mockClear();

    act(() => {
      result.current.handleTouchStart(ZoomAreaElements.END_HANDLER)({} as React.TouchEvent);
    });
    expect(result.current.isDragging).toBe(ZoomAreaElements.END_HANDLER);

    act(() => {
      triggerMove(350, true);
    });
    expect(mockOnRangeChange).toHaveBeenCalledWith(
      expect.objectContaining({ end: expect.any(Number) })
    );

    act(() => {
      triggerEnd(true);
    });
    expect(result.current.isDragging).toBe(null);
  });

  it('should preserve selection width when dragging selection area', () => {
    const { result, triggerMove } = setupDragTest();

    act(() => {
      result.current.handleMouseDown(ZoomAreaElements.SELECTION_AREA)({} as React.MouseEvent);
    });

    act(() => {
      triggerMove(250);
    });

    const newRange = mockOnRangeChange.mock.calls[0][0];
    const originalWidth = defaultParams.currentRange.end - defaultParams.currentRange.start;
    const newWidth = newRange.end - newRange.start;

    expect(newWidth).toBeCloseTo(originalWidth, 1);
  });

  it('should cleanup event listeners on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const { result, unmount } = renderHook(() => useDragInteraction(defaultParams));

    // Start drag to activate listeners
    act(() => {
      result.current.handleMouseDown(ZoomAreaElements.START_HANDLER)({} as React.MouseEvent);
    });

    removeSpy.mockClear();
    unmount();

    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
  });
});
