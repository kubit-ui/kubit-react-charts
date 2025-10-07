import { calculatePoint } from '../calculatePoint';

describe('calculatePoint', () => {
  it('should calculate the correct point on the circumference for a given angle', () => {
    const center = { x: 0, y: 0 };
    const radius = 1;
    // Angle in radians for 90 degrees
    const angle = Math.PI / 2;
    const expectedPoint = { x: 6.123233995736766e-17, y: 1 };

    const result = calculatePoint(center, radius, angle);

    expect(result).toEqual(expectedPoint);
  });

  it('should handle angles greater than 2*PI by wrapping around the circle', () => {
    const center = { x: 0, y: 0 };
    const radius = 1;
    // Angle in radians for 450 degrees, which is equivalent to 90 degrees or PI/2 radians
    const angle = (5 * Math.PI) / 2;
    const expectedPoint = { x: 3.061616997868383e-16, y: 1 };

    const result = calculatePoint(center, radius, angle);

    expect(result).toEqual(expectedPoint);
  });

  it('should correctly calculate a point for a negative angle', () => {
    const center = { x: 0, y: 0 };
    const radius = 1;
    // Angle in radians for -90 degrees, which is equivalent to 270 degrees or 3*PI/2 radians
    const angle = -Math.PI / 2;
    const expectedPoint = { x: 6.123233995736766e-17, y: -1 };

    const result = calculatePoint(center, radius, angle);

    expect(result).toEqual(expectedPoint);
  });

  it('should correctly calculate a point for a circle not centered at the origin', () => {
    const center = { x: 1, y: 1 };
    const radius = 1;
    // Angle in radians for 0 degrees
    const angle = 0;
    const expectedPoint = { x: 2, y: 1 };

    const result = calculatePoint(center, radius, angle);

    expect(result).toEqual(expectedPoint);
  });
});
