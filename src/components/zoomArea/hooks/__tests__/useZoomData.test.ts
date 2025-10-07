import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useZoomData } from '../useZoomData';

describe('useZoomData', () => {
  const mockData = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
    { id: 5, value: 50 },
  ];

  it('should handle initialization, range changes, and data filtering', () => {
    const onDataChange = vi.fn();

    // Test initialization with default range
    const { result } = renderHook(() => useZoomData({ data: mockData, onDataChange }));

    expect(result.current.currentRange).toEqual({ end: 4, start: 0 });
    expect(onDataChange).toHaveBeenCalledWith(mockData); // Initial call with full data

    onDataChange.mockClear();

    // Test range change and filtering
    act(() => {
      result.current.handleRangeChange({ end: 3, start: 1 });
    });

    expect(result.current.currentRange).toEqual({ end: 3, start: 1 });
    expect(onDataChange).toHaveBeenCalledWith([
      { id: 2, value: 20 },
      { id: 3, value: 30 },
      { id: 4, value: 40 },
    ]);
  });

  it('should handle initial range, fractional bounds, and edge cases', () => {
    const onDataChange = vi.fn();
    const initialRange = { end: 4, start: 2 };

    // Test with initial range
    const { result } = renderHook(() =>
      useZoomData({
        data: mockData,
        initialRange,
        onDataChange,
      })
    );

    expect(result.current.currentRange).toEqual(initialRange);
    expect(onDataChange).toHaveBeenCalledWith([
      { id: 3, value: 30 },
      { id: 4, value: 40 },
      { id: 5, value: 50 },
    ]);

    onDataChange.mockClear();

    // Test fractional ranges (should floor start and ceil end)
    act(() => {
      result.current.handleRangeChange({ end: 3.7, start: 1.3 });
    });

    expect(onDataChange).toHaveBeenCalledWith([
      { id: 2, value: 20 },
      { id: 3, value: 30 },
      { id: 4, value: 40 },
      { id: 5, value: 50 },
    ]);

    onDataChange.mockClear();

    // Test range exceeding bounds (should clamp)
    act(() => {
      result.current.handleRangeChange({ end: 10, start: -1 });
    });

    expect(onDataChange).toHaveBeenCalledWith(mockData);
  });

  it('should handle special cases and no callback scenarios', () => {
    // Test without onDataChange callback
    const { result } = renderHook(() => useZoomData({ data: mockData }));

    expect(result.current.currentRange).toEqual({ end: 4, start: 0 });

    act(() => {
      result.current.handleRangeChange({ end: 3, start: 1 });
    });

    expect(result.current.currentRange).toEqual({ end: 3, start: 1 });

    // Test empty data
    const onDataChange = vi.fn();
    const { result: emptyResult } = renderHook(() => useZoomData({ data: [], onDataChange }));

    act(() => {
      emptyResult.current.handleRangeChange({ end: 1, start: 0 });
    });

    expect(onDataChange).not.toHaveBeenCalled();

    // Test single item data
    const singleData = [{ id: 1, value: 10 }];
    const { result: singleResult } = renderHook(() =>
      useZoomData({ data: singleData, onDataChange })
    );

    expect(singleResult.current.currentRange).toEqual({ end: 0, start: 0 });
    expect(onDataChange).toHaveBeenCalledWith(singleData);
  });
});
