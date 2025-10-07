import { act, renderHook } from '@testing-library/react-hooks';

import { useIndicator } from '../useIndicator';

describe('useIndicator', () => {
  it('should return refs with current set to null initially', () => {
    const { result } = renderHook(() => useIndicator(0, false));

    expect(result.current.pathRef.current).toBeNull();
    expect(result.current.indicatorRef.current).toBeNull();
  });

  it('should not update refs if implement is false', () => {
    const { result } = renderHook(() => useIndicator(0, false));

    act(() => {
      result.current.pathRef.current = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      result.current.indicatorRef.current = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
    });

    expect(result.current.pathRef.current).not.toBeNull();
    expect(result.current.indicatorRef.current).not.toBeNull();
  });

  it('should update indicator attributes when xPosition changes', () => {
    const { rerender, result } = renderHook(
      ({ implement, xPosition }) => useIndicator(xPosition, implement),
      { initialProps: { implement: true, xPosition: 0 } }
    );

    act(() => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.getTotalLength = () => 100;
      path.getPointAtLength = length => ({ w: 10, x: length, y: length, z: 10 }) as DOMPoint;

      const indicator = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

      result.current.pathRef.current = path;
      result.current.indicatorRef.current = indicator;
    });

    rerender({ implement: true, xPosition: 50 });

    expect(result.current?.indicatorRef?.current?.getAttribute('transform')).toBe(
      'translate(50, 50)'
    );
  });
});
