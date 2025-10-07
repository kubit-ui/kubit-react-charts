import { act, renderHook } from '@testing-library/react-hooks';
import type { MouseEvent } from 'react';

import { useHover } from '../useHover';

describe('useHover', () => {
  it('should handle mouseEnter and mouseLeave events correctly', () => {
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    const { result } = renderHook(() => useHover(onMouseEnter, onMouseLeave));

    expect(result.current.isHovered).toBe(false);

    const mockMouseEvent = {
      bubbles: true,
      cancelable: true,
      isDefaultPrevented: vi.fn(),
      isPropagationStopped: vi.fn(),
      nativeEvent: new window.MouseEvent('mouseenter'),
      persist: vi.fn(),
      view: window,
    } as unknown as MouseEvent<HTMLElement>;

    act(() => {
      result.current.handleMouseEnter(mockMouseEvent);
    });

    expect(onMouseEnter).toHaveBeenCalled();
    expect(result.current.isHovered).toBe(true);

    const mockMouseLeaveEvent = {
      bubbles: true,
      cancelable: true,
      isDefaultPrevented: vi.fn(),
      isPropagationStopped: vi.fn(),
      nativeEvent: new window.MouseEvent('mouseleave'),
      persist: vi.fn(),
      view: window,
    } as unknown as MouseEvent<HTMLElement>;

    act(() => {
      result.current.handleMouseLeave(mockMouseLeaveEvent);
    });

    expect(onMouseLeave).toHaveBeenCalled();
    expect(result.current.isHovered).toBe(false);
  });
});
