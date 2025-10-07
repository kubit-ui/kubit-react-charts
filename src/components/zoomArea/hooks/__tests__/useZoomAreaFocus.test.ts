import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { ZoomAreaElements } from '../../zoomArea.type';
import { useZoomAreaFocus } from '../useZoomAreaFocus';

describe('useZoomAreaFocus', () => {
  it('should handle focus management for all elements', () => {
    const { result } = renderHook(() => useZoomAreaFocus());

    // Initial state - no elements focused
    expect(result.current.isFocused(ZoomAreaElements.START_HANDLER)).toBe(false);
    expect(result.current.isFocused(ZoomAreaElements.END_HANDLER)).toBe(false);
    expect(result.current.isFocused(ZoomAreaElements.SELECTION_AREA)).toBe(false);

    // Focus on start handler
    act(() => {
      result.current.handleFocus(ZoomAreaElements.START_HANDLER)();
    });

    expect(result.current.isFocused(ZoomAreaElements.START_HANDLER)).toBe(true);
    expect(result.current.isFocused(ZoomAreaElements.END_HANDLER)).toBe(false);
    expect(result.current.isFocused(ZoomAreaElements.SELECTION_AREA)).toBe(false);

    // Switch to end handler
    act(() => {
      result.current.handleFocus(ZoomAreaElements.END_HANDLER)();
    });

    expect(result.current.isFocused(ZoomAreaElements.START_HANDLER)).toBe(false);
    expect(result.current.isFocused(ZoomAreaElements.END_HANDLER)).toBe(true);
    expect(result.current.isFocused(ZoomAreaElements.SELECTION_AREA)).toBe(false);

    // Switch to selection area
    act(() => {
      result.current.handleFocus(ZoomAreaElements.SELECTION_AREA)();
    });

    expect(result.current.isFocused(ZoomAreaElements.START_HANDLER)).toBe(false);
    expect(result.current.isFocused(ZoomAreaElements.END_HANDLER)).toBe(false);
    expect(result.current.isFocused(ZoomAreaElements.SELECTION_AREA)).toBe(true);
  });

  it('should handle blur operations and edge cases', () => {
    const { result } = renderHook(() => useZoomAreaFocus());

    // Focus on an element first
    act(() => {
      result.current.handleFocus(ZoomAreaElements.START_HANDLER)();
    });

    expect(result.current.isFocused(ZoomAreaElements.START_HANDLER)).toBe(true);

    // Clear focus with handleBlur
    act(() => {
      result.current.handleBlur();
    });

    expect(result.current.isFocused(ZoomAreaElements.START_HANDLER)).toBe(false);
    expect(result.current.isFocused(ZoomAreaElements.END_HANDLER)).toBe(false);
    expect(result.current.isFocused(ZoomAreaElements.SELECTION_AREA)).toBe(false);

    // Multiple blur calls should not cause issues
    act(() => {
      result.current.handleBlur();
      result.current.handleBlur();
    });

    expect(result.current.isFocused(ZoomAreaElements.START_HANDLER)).toBe(false);
  });

  it('should maintain stable function references and handle different targets', () => {
    const { rerender, result } = renderHook(() => useZoomAreaFocus());

    // Test stable function references across rerenders
    const firstHandleFocus = result.current.handleFocus;
    const firstHandleBlur = result.current.handleBlur;

    rerender();

    expect(result.current.handleFocus).toBe(firstHandleFocus);
    expect(result.current.handleBlur).toBe(firstHandleBlur);

    // Test that different targets return different function instances
    const startHandlerFocus = result.current.handleFocus(ZoomAreaElements.START_HANDLER);
    const endHandlerFocus = result.current.handleFocus(ZoomAreaElements.END_HANDLER);

    expect(startHandlerFocus).not.toBe(endHandlerFocus);
    expect(typeof startHandlerFocus).toBe('function');
    expect(typeof endHandlerFocus).toBe('function');
  });
});
