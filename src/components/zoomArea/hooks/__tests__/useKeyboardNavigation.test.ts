import { renderHook } from '@testing-library/react-hooks';

import { ZoomAreaElements } from '../../zoomArea.type';
import { useKeyboardNavigation } from '../useKeyboardNavigation';

describe('useKeyboardNavigation', () => {
  const mockOnRangeChange = vi.fn();
  const mockInteractionConfig = {
    keyboardFastStep: 0.5,
    keyboardStep: 0.1,
    minHandlerDistance: 0.1,
  };

  const defaultParams = {
    currentRange: { end: 7, start: 2 },
    dataLength: 10,
    interactionConfig: mockInteractionConfig,
    onRangeChange: mockOnRangeChange,
  };

  beforeEach(() => {
    mockOnRangeChange.mockClear();
  });

  it('should handle arrow key navigation for all elements and directions', () => {
    const { result } = renderHook(() => useKeyboardNavigation(defaultParams));

    // Test ArrowLeft/ArrowDown (decrease) on start handler
    const leftEvent = {
      key: 'ArrowLeft',
      preventDefault: vi.fn(),
      shiftKey: false,
    } as unknown as React.KeyboardEvent;

    result.current.handleKeyDown(ZoomAreaElements.START_HANDLER)(leftEvent);
    expect(leftEvent.preventDefault).toHaveBeenCalled();
    expect(mockOnRangeChange).toHaveBeenCalledWith({
      end: 7,
      start: 1.9, // 2 - 0.1
    });

    mockOnRangeChange.mockClear();

    // Test ArrowRight/ArrowUp (increase) with shift (fast step) on end handler
    const rightEvent = {
      key: 'ArrowRight',
      preventDefault: vi.fn(),
      shiftKey: true,
    } as unknown as React.KeyboardEvent;

    result.current.handleKeyDown(ZoomAreaElements.END_HANDLER)(rightEvent);
    expect(mockOnRangeChange).toHaveBeenCalledWith({
      end: 7.5, // 7 + 0.5 (fast step)
      start: 2,
    });

    mockOnRangeChange.mockClear();

    // Test selection area movement preserves width
    result.current.handleKeyDown(ZoomAreaElements.SELECTION_AREA)(leftEvent);
    const call = mockOnRangeChange.mock.calls[0][0];
    expect(call.end - call.start).toBeCloseTo(5, 1); // Original width maintained
  });

  it('should handle Home and End key navigation for all elements', () => {
    const { result } = renderHook(() => useKeyboardNavigation(defaultParams));

    // Test Home key on start handler - moves to beginning
    const homeEvent = {
      key: 'Home',
      preventDefault: vi.fn(),
      shiftKey: false,
    } as unknown as React.KeyboardEvent;

    result.current.handleKeyDown(ZoomAreaElements.START_HANDLER)(homeEvent);
    expect(homeEvent.preventDefault).toHaveBeenCalled();
    expect(mockOnRangeChange).toHaveBeenCalledWith({
      end: 7,
      start: 0,
    });

    mockOnRangeChange.mockClear();

    // Test End key on end handler - moves to end of data
    const endEvent = {
      key: 'End',
      preventDefault: vi.fn(),
      shiftKey: false,
    } as unknown as React.KeyboardEvent;

    result.current.handleKeyDown(ZoomAreaElements.END_HANDLER)(endEvent);
    expect(endEvent.preventDefault).toHaveBeenCalled();
    expect(mockOnRangeChange).toHaveBeenCalledWith({
      end: 9, // dataLength - 1
      start: 2,
    });

    mockOnRangeChange.mockClear();

    // Test Home key on selection area - moves entire selection to beginning
    result.current.handleKeyDown(ZoomAreaElements.SELECTION_AREA)(homeEvent);
    expect(mockOnRangeChange).toHaveBeenCalledWith({
      end: 5, // maintains selection width: 7-2=5, so 0+5=5
      start: 0,
    });

    mockOnRangeChange.mockClear();

    // Test End key on selection area - moves entire selection to end
    result.current.handleKeyDown(ZoomAreaElements.SELECTION_AREA)(endEvent);
    expect(mockOnRangeChange).toHaveBeenCalledWith({
      end: 9,
      start: 4, // maintains selection width: 9-5=4
    });
  });

  it('should support ArrowUp and ArrowDown for accessibility compliance', () => {
    const { result } = renderHook(() => useKeyboardNavigation(defaultParams));

    // Test ArrowUp (same as ArrowRight - increase)
    const arrowUpEvent = {
      key: 'ArrowUp',
      preventDefault: vi.fn(),
      shiftKey: false,
    } as unknown as React.KeyboardEvent;

    result.current.handleKeyDown(ZoomAreaElements.START_HANDLER)(arrowUpEvent);
    expect(arrowUpEvent.preventDefault).toHaveBeenCalled();
    expect(mockOnRangeChange).toHaveBeenCalledWith({
      end: 7,
      start: 2.1, // 2 + 0.1 (same as ArrowRight)
    });

    mockOnRangeChange.mockClear();

    // Test ArrowDown (same as ArrowLeft - decrease)
    const arrowDownEvent = {
      key: 'ArrowDown',
      preventDefault: vi.fn(),
      shiftKey: false,
    } as unknown as React.KeyboardEvent;

    result.current.handleKeyDown(ZoomAreaElements.END_HANDLER)(arrowDownEvent);
    expect(arrowDownEvent.preventDefault).toHaveBeenCalled();
    expect(mockOnRangeChange).toHaveBeenCalledWith({
      end: 6.9, // 7 - 0.1 (same as ArrowLeft)
      start: 2,
    });
  });

  it('should ignore non-navigation keys', () => {
    const { result } = renderHook(() => useKeyboardNavigation(defaultParams));

    const invalidEvent = {
      key: 'Space',
      preventDefault: vi.fn(),
      shiftKey: false,
    } as unknown as React.KeyboardEvent;

    result.current.handleKeyDown(ZoomAreaElements.START_HANDLER)(invalidEvent);

    expect(invalidEvent.preventDefault).not.toHaveBeenCalled();
    expect(mockOnRangeChange).not.toHaveBeenCalled();
  });
});
