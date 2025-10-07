import { RotateDirection, rotationDirection } from '../rotationDirection';

describe('rotationDirection', () => {
  it('should calculate correctly the angles in closewise direction', () => {
    const props = {
      angleEquivalent: 90,
      direction: RotateDirection.CLOCKWISE,
      gapAngle: 10,
      startAngle: 0,
    };

    const result = rotationDirection(props);

    expect(result).toEqual({
      carryAngle: 90, // startAngle + angleEquivalent
      finalAngle: 85, // startAngle + angleEquivalent - gapAngle / 2
      initialAngle: 5, // startAngle + gapAngle / 2
    });
  });

  it('should calculate correctly the angles in counter closewise direction', () => {
    const props = {
      angleEquivalent: 90,
      direction: RotateDirection.COUNTER_CLOCKWISE,
      gapAngle: 10,
      startAngle: 180,
    };

    const result = rotationDirection(props);

    expect(result).toEqual({
      carryAngle: 90, // startAngle - angleEquivalent
      finalAngle: 95, // startAngle - angleEquivalent + gapAngle / 2
      initialAngle: 175, // startAngle - gapAngle / 2
    });
  });

  it('should handler correctly a gapAngle equal 0', () => {
    const props = {
      angleEquivalent: 45,
      direction: RotateDirection.CLOCKWISE,
      gapAngle: 0,
      startAngle: 90,
    };

    const result = rotationDirection(props);

    expect(result).toEqual({
      carryAngle: 135, // startAngle + angleEquivalent
      finalAngle: 135, // startAngle + angleEquivalent - gapAngle / 2
      initialAngle: 90, // startAngle + gapAngle / 2
    });
  });

  it('should handler a angle equivalent equal 0 correctly', () => {
    const props = {
      angleEquivalent: 0,
      direction: RotateDirection.COUNTER_CLOCKWISE,
      gapAngle: 10,
      startAngle: 90,
    };

    const result = rotationDirection(props);

    expect(result).toEqual({
      carryAngle: 90, // startAngle - angleEquivalent
      finalAngle: 95, // startAngle - angleEquivalent + gapAngle / 2
      initialAngle: 85, // startAngle - gapAngle / 2
    });
  });

  it('should handler a negative start angle', () => {
    const props = {
      angleEquivalent: 45,
      direction: RotateDirection.CLOCKWISE,
      gapAngle: 10,
      startAngle: -90,
    };

    const result = rotationDirection(props);

    expect(result).toEqual({
      carryAngle: -45, // startAngle + angleEquivalent
      finalAngle: -50, // startAngle + angleEquivalent - gapAngle / 2
      initialAngle: -85, // startAngle + gapAngle / 2
    });
  });
});
