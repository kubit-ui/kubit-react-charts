import { getProjection } from '../getProjection';

describe('getProjection', () => {
  it('should return an empty shapePath when points are empty and no projections are provided', () => {
    const result = getProjection({
      points: [],
      svgHeight: 100,
    });
    expect(result).toEqual({ shapePath: '' });
  });

  it('should generate a straight line path when points are provided and curved is false', () => {
    const result = getProjection({
      points: [
        [0, 0],
        [10, 10],
        [20, 20],
      ],
      svgHeight: 100,
    });
    expect(result.shapePath).toBe('M 0 0 L 10 10 L 20 20 L 20 20 L 10 10 L 0 0');
  });

  it('should generate a curved path when points are provided and curved is true', () => {
    const result = getProjection({
      curved: true,
      points: [
        [0, 0],
        [10, 10],
        [20, 20],
      ],
      svgHeight: 100,
    });
    expect(result.shapePath).toContain('M 0 0');
    expect(result.shapePath).toContain('C');
  });

  it('should generate upper and lower projections when provided', () => {
    const result = getProjection({
      lowerProjection: { x: -10, y: -10 },
      points: [
        [0, 0],
        [10, 10],
        [20, 20],
      ],
      svgHeight: 100,
      upperProjection: { x: 10, y: 10 },
    });
    expect(result.upPath).toContain('M 0 0');
    expect(result.downPath).toContain('M 0 0');
  });

  it('should handle projections correctly when curved is true', () => {
    const result = getProjection({
      curved: true,
      lowerProjection: { x: -10, y: -10 },
      points: [
        [0, 0],
        [10, 10],
        [20, 20],
      ],
      svgHeight: 100,
      upperProjection: { x: 10, y: 10 },
    });
    expect(result.upPath).toContain('C');
    expect(result.downPath).toContain('C');
  });
});
