import { act, renderHook } from '@testing-library/react';
import type { FocusEvent } from 'react';

import { useFocus } from '../useFocus';

describe('useFocus hook', () => {
  it('should handle focus and blur events correctly', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const { result } = renderHook(() => useFocus(onFocus, onBlur));

    expect(result.current.isFocused).toBe(false);

    act(() => {
      result.current.handleFocus({} as FocusEvent<HTMLElement | SVGElement, Element>);
    });

    expect(onFocus).toHaveBeenCalled();
    expect(result.current.isFocused).toBe(true);

    act(() => {
      result.current.handleBlur({} as FocusEvent<HTMLElement | SVGElement, Element>);
    });

    expect(onBlur).toHaveBeenCalled();
    expect(result.current.isFocused).toBe(false);
  });
});
