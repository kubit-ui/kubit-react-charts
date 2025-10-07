import { calculateShapePoints } from '../calculateShapePoints';

describe('calculateShapePoints', () => {
  it('should return the correct shape points for a triangle', () => {
    const centerX = 0;
    const centerY = 0;
    const points = 3;
    const outerRadius = 10;
    const innerRadius = 0;

    const result = calculateShapePoints(centerX, centerY, points, outerRadius, innerRadius);

    expect(result).toBe(
      '6.123233995736766e-16,-10 0,0 8.660254037844387,4.999999999999998 0,0 -8.660254037844386,5.0000000000000036 0,0'
    );
  });

  it('should return the correct shape points for a pentagon', () => {
    const centerX = 0;
    const centerY = 0;
    const points = 5;
    const outerRadius = 10;
    const innerRadius = 0;

    const result = calculateShapePoints(centerX, centerY, points, outerRadius, innerRadius);

    expect(result).toBe(
      '6.123233995736766e-16,-10 0,0 9.510565162951535,-3.090169943749474 0,0 5.877852522924732,8.090169943749475 0,0 -5.87785252292473,8.090169943749475 0,0 -9.510565162951536,-3.0901699437494727 0,0'
    );
  });

  it('should return the correct shape points for a star', () => {
    const centerX = 0;
    const centerY = 0;
    const points = 5;
    const outerRadius = 10;
    const innerRadius = 5;

    const result = calculateShapePoints(centerX, centerY, points, outerRadius, innerRadius);

    expect(result).toBe(
      '6.123233995736766e-16,-10 2.938926261462366,-4.045084971874737 9.510565162951535,-3.090169943749474 4.755282581475767,1.545084971874737 5.877852522924732,8.090169943749475 3.061616997868383e-16,5 -5.87785252292473,8.090169943749475 -4.755282581475767,1.5450849718747375 -9.510565162951536,-3.0901699437494727 -2.9389262614623664,-4.045084971874736'
    );
  });
  it('if outterRadius is equal to innerRadius return a regular shape', () => {
    const centerX = 0;
    const centerY = 0;
    const points = 5;
    const outerRadius = 10;
    const innerRadius = 10;

    const result = calculateShapePoints(centerX, centerY, points, outerRadius, innerRadius);

    expect(result).toBe(
      '6.123233995736766e-16,-10 9.510565162951535,-3.090169943749474 5.877852522924732,8.090169943749475 -5.87785252292473,8.090169943749475 -9.510565162951536,-3.0901699437494727'
    );
  });
});
