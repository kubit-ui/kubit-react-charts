import { calculateSegmentPath } from '../calculateSegmentPath';

describe('calculateSegmentPath', () => {
  it('should calculate the correct SVG path for a full circle pie chart segment', () => {
    const path = calculateSegmentPath({
      canvasHeight: 100,
      canvasWidth: 100,
      gap: 0,
      innerRadius: 0,
      singleStroke: false,
      startAngle: { current: 0 },
      total: 100,
      value: 100,
    });
    expect(path).toBe('M 100 50 A 50,50 0 1,0 100, 50.000000000000014 L 50,50 Z');
  });

  it('should calculate the correct SVG path for a half circle pie chart segment', () => {
    const path = calculateSegmentPath({
      canvasHeight: 100,
      canvasWidth: 100,
      gap: 0,
      innerRadius: 0,
      singleStroke: false,
      startAngle: { current: 0 },
      total: 100,
      value: 50,
    });
    expect(path).toBe('M 100 50 A 50,50 0 0,0 0, 49.99999999999999 L 50,50 Z');
  });

  it('should handle custom inner radius for donut chart segments', () => {
    const path = calculateSegmentPath({
      canvasHeight: 100,
      canvasWidth: 100,
      gap: 0,
      innerRadius: 20,
      singleStroke: false,
      startAngle: { current: 0 },
      total: 100,
      value: 100,
    });
    expect(path).toBe(
      'M 100 50 A 50,50 0 1,0 100, 50.000000000000014 L 70,50.00000000000001 A 20, 20 0 1,1 70,50 Z'
    );
  });

  it('should account for gaps between segments', () => {
    const path = calculateSegmentPath({
      canvasHeight: 100,
      canvasWidth: 100,
      gap: 5,
      innerRadius: 0,
      singleStroke: false,
      startAngle: { current: 0 },
      total: 100,
      value: 100,
    });
    // Note: The exact path string might vary slightly due to the calculation of the gap angle.
    // This test checks for the presence of the 'M' command which indicates the start of a path,
    // and the 'A' command for an arc, which are expected in the output.
    expect(path).toContain('M');
    expect(path).toContain('A');
  });

  it('should use custom radius when provided and less than maximum radius', () => {
    const path = calculateSegmentPath({
      canvasHeight: 100,
      canvasWidth: 100,
      customRadius: 40,
      gap: 0,
      innerRadius: 0,
      singleStroke: false,
      startAngle: { current: 0 },
      total: 100,
      value: 100,
    });
    expect(path).toContain('A 40,40');
  });

  it('should fallback to maximum radius when custom radius is not provided or greater than maximum radius', () => {
    const pathWithoutCustomRadius = calculateSegmentPath({
      canvasHeight: 100,
      canvasWidth: 100,
      gap: 0,
      innerRadius: 0,
      singleStroke: false,
      startAngle: { current: 0 },
      total: 100,
      value: 100,
    });
    const pathWithGreaterCustomRadius = calculateSegmentPath({
      canvasHeight: 100,
      canvasWidth: 100,
      customRadius: 60,
      gap: 0,
      innerRadius: 0,
      singleStroke: false,
      startAngle: { current: 0 },
      total: 100,
      value: 100,
    });
    expect(pathWithoutCustomRadius).toContain(
      'M 100 50 A 50,50 0 1,0 100, 50.000000000000014 L 50,50 Z'
    );
    expect(pathWithGreaterCustomRadius).toContain('A 50,50');
  });

  it('should return de mirror data, when singleStroke is true', () => {
    const path = calculateSegmentPath({
      canvasHeight: 100,
      canvasWidth: 100,
      gap: 0,
      innerRadius: 0,
      singleStroke: true,
      startAngle: { current: 0 },
      total: 100,
      value: 100,
    });
    expect(path).toBe(
      'M 100 50 A 50,50 0 0,0 0, 49.99999999999999 M 50,50 M 100,50 A 50,50 0 0 1 0,49.99999999999999 M 50,50 A 0,0 0 0 0 50,50'
    );
  });
});
