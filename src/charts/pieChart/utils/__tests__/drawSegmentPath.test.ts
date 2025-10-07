import { drawSegmentPath } from '../drawSegmentPath';
import { RotateDirection } from '../rotationDirection';

describe('drawSegmentPath', () => {
  const center = { x: 0, y: 0 };
  const outerStart = { x: 10, y: 0 };
  const outerEnd = { x: 0, y: 10 };
  const innerStart = { x: 5, y: 0 };
  const innerEnd = { x: 0, y: 5 };
  const radius = 10;
  const innerRadius = 5;
  const largeArcFlag = '1';

  it('should generate a path for clockwise rotation with singleStroke true', () => {
    const result = drawSegmentPath({
      center,
      innerEnd,
      innerRadius,
      innerStart,
      largeArcFlag,
      outerEnd,
      outerStart,
      radius,
      rotateDirection: RotateDirection.CLOCKWISE,
      singleStroke: true,
    });

    expect(result).toBe(
      'M 10,0 A 10,10 0 1 1 0, 10 M 0,5 A 5,5 0 1 0 5,0 M 10,0 A 10,10 0 1 0 0,10 M 0,5 A 5,5 0 1 1 5,0'
    );
  });

  it('should generate a path for clockwise rotation with singleStroke false', () => {
    const result = drawSegmentPath({
      center,
      innerEnd,
      innerRadius,
      innerStart,
      largeArcFlag,
      outerEnd,
      outerStart,
      radius,
      rotateDirection: RotateDirection.CLOCKWISE,
      singleStroke: false,
    });

    expect(result).toBe('M 10,0 A 10,10 0 1 1 0, 10 L 0,5 A 5,5 0 1 0 5,0 Z');
  });

  it('should generate a path for counterclockwise rotation with singleStroke true', () => {
    const result = drawSegmentPath({
      center,
      innerEnd,
      innerRadius,
      innerStart,
      largeArcFlag,
      outerEnd,
      outerStart,
      radius,
      rotateDirection: RotateDirection.COUNTER_CLOCKWISE,
      singleStroke: true,
    });

    expect(result).toBe(
      'M 10 0 A 10,10 0 1,0 0, 10 M 0,5 A 5, 5 0 1,1 5,0 M 10,0 A 10,10 0 1 1 0,10 M 0,5 A 5,5 0 1 0 5,0'
    );
  });

  it('should generate a path for counterclockwise rotation with singleStroke false', () => {
    const result = drawSegmentPath({
      center,
      innerEnd,
      innerRadius,
      innerStart,
      largeArcFlag,
      outerEnd,
      outerStart,
      radius,
      rotateDirection: RotateDirection.COUNTER_CLOCKWISE,
      singleStroke: false,
    });

    expect(result).toBe('M 10 0 A 10,10 0 1,0 0, 10 L 0,5 A 5, 5 0 1,1 5,0 Z');
  });

  it('should handle innerRadius of 0 correctly', () => {
    const result = drawSegmentPath({
      center,
      innerEnd,
      innerRadius: 0,
      innerStart,
      largeArcFlag,
      outerEnd,
      outerStart,
      radius,
      rotateDirection: RotateDirection.CLOCKWISE,
      singleStroke: false,
    });

    expect(result).toBe('M 10,0 A 10,10 0 1 1 0, 10 L 0,0 Z');
  });

  it('should handle missing rotateDirection (default behavior)', () => {
    const result = drawSegmentPath({
      center,
      innerEnd,
      innerRadius,
      innerStart,
      largeArcFlag,
      outerEnd,
      outerStart,
      radius,
      singleStroke: false,
    });

    expect(result).toBe('M 10 0 A 10,10 0 1,0 0, 10 L 0,5 A 5, 5 0 1,1 5,0 Z');
  });
});
