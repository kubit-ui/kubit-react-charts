import { getPathData } from '../getPathData';

describe('getPathData', () => {
  it('should return empty string if points array is empty', () => {
    const result = getPathData({
      curved: false,
      extendToBottom: false,
      points: [],
      svgHeight: 500,
    });
    expect(result).toEqual('');
  });

  it('should correctly generate path data for straight line', () => {
    const points = [
      [0, 0],
      [100, 100],
      [200, 200],
    ] as [number, number][];
    const result = getPathData({ curved: false, extendToBottom: false, points, svgHeight: 500 });
    expect(result).toEqual('M 0 0 L 100 100 L 200 200');
  });

  it('should correctly generate path data for curved line', () => {
    const points = [
      [0, 0],
      [100, 100],
      [200, 200],
    ] as [number, number][];
    const result = getPathData({ curved: true, extendToBottom: false, points, svgHeight: 500 });
    expect(result).toEqual('M 0 0 C 30 0, 70 100, 100 100 C 130 100, 170 200, 200 200');
  });

  it('should correctly generate path data for straight line extended to bottom', () => {
    const points = [
      [0, 0],
      [100, 100],
      [200, 200],
    ] as [number, number][];
    const result = getPathData({ curved: false, extendToBottom: true, points, svgHeight: 500 });
    expect(result).toEqual('M 0 0 L 100 100 L 200 200 L 200 500 L 0 500 Z');
  });

  it('should correctly generate path data for curved line extended to bottom', () => {
    const points = [
      [0, 0],
      [100, 100],
      [200, 200],
    ] as [number, number][];
    const result = getPathData({ curved: true, extendToBottom: true, points, svgHeight: 500 });
    expect(result).toEqual(
      'M 0 0 C 30 0, 70 100, 100 100 C 130 100, 170 200, 200 200 L 200 500 L 0 500 Z'
    );
  });
});
