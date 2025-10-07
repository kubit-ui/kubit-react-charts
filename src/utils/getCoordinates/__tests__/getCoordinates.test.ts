import { Positions } from '@/types/position.enum';

import { getXCoordinates, getYCoordinates } from '../getCoordinates';

const baseProps = {
  canvasHeight: 80,
  canvasWidth: 100,
  customBreakAxis: 20,
  extraSpaceBottomY: 0,
  extraSpaceLeftX: 0,
  extraSpaceRightX: 0,
  extraSpaceTopY: 0,
  securityYSpace: 0,
};

describe('getXCoordinates', () => {
  it('should return the correct values when the position is TOP', () => {
    const result = getXCoordinates({ ...baseProps, position: Positions.TOP });

    expect(result).toEqual({
      x1: 0,
      x2: 100,
      y1: 0,
      y2: 0,
    });
  });

  it('should return the correct values when the position is CENTER', () => {
    const result = getXCoordinates({ ...baseProps, position: Positions.CENTER });

    expect(result).toEqual({
      x1: 0,
      x2: 100,
      y1: 40,
      y2: 40,
    });
  });

  it('should return the correct values when the position is CUSTOM', () => {
    const result = getXCoordinates({ ...baseProps, position: Positions.CUSTOM });

    expect(result).toEqual({
      x1: 0,
      x2: 100,
      y1: 20,
      y2: 20,
    });
  });

  it('should return the correct values when the position is BOTTOM', () => {
    const result = getXCoordinates({ ...baseProps, position: Positions.BOTTOM });

    expect(result).toEqual({
      x1: 0,
      x2: 100,
      y1: 80,
      y2: 80,
    });
  });
});

describe('getYCoordinates', () => {
  it('should return the correct values when the position is RIGTH', () => {
    const result = getYCoordinates({ ...baseProps, position: Positions.RIGHT });

    expect(result).toEqual({
      x1: 100,
      x2: 100,
      y1: 0,
      y2: 80,
    });
  });

  it('should return the correct values when the position is CENTER', () => {
    const result = getYCoordinates({ ...baseProps, position: Positions.CENTER });

    expect(result).toEqual({
      x1: 50,
      x2: 50,
      y1: 0,
      y2: 80,
    });
  });

  it('should return the correct values when the position is CUSTOM', () => {
    const result = getYCoordinates({ ...baseProps, position: Positions.CUSTOM });

    expect(result).toEqual({
      x1: 20,
      x2: 20,
      y1: 0,
      y2: 80,
    });
  });

  it('should return the correct values when the position is LEFT', () => {
    const result = getYCoordinates({ ...baseProps, position: Positions.LEFT });

    expect(result).toEqual({
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 80,
    });
  });
});
