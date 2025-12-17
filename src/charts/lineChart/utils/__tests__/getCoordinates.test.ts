import { Positions } from '@/types/position.enum';

import { getXCoordinates, getYCoordinates } from '../getCoordinates';

const baseProps = {
  canvasHeight: 200,
  canvasWidth: 400,
  customBreakAxis: 50,
  xAxisLeftSpacing: 10,
  xAxisTopSpacing: 10,
  xAxisRightSpacing: 10,
  xAxisBottomSpacing: 10,
  yAxisLeftSpacing: 20,
  yAxisTopSpacing: 15,
  yAxisRightSpacing: 15,
  yAxisBottomSpacing: 20,
};

describe('getXCoordinates', () => {
  describe('when lineChartXPosition is TOP', () => {
    it('should return correct coordinates when lineChartYPosition is LEFT', () => {
      const result = getXCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.TOP,
        lineChartYPosition: Positions.LEFT,
      });

      expect(result).toEqual({
        x1: 20,
        x2: 400,
        y1: 15,
        y2: 15,
      });
    });

    it('should return correct coordinates when lineChartYPosition is RIGHT', () => {
      const result = getXCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.TOP,
        lineChartYPosition: Positions.RIGHT,
      });

      expect(result).toEqual({
        x1: 0,
        x2: 385,
        y1: 15,
        y2: 15,
      });
    });
  });

  describe('when lineChartXPosition is CENTER', () => {
    it('should return correct coordinates when lineChartYPosition is LEFT', () => {
      const result = getXCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.CENTER,
        lineChartYPosition: Positions.LEFT,
      });

      expect(result).toEqual({
        x1: 20,
        x2: 400,
        y1: 100,
        y2: 100,
      });
    });

    it('should return correct coordinates when lineChartYPosition is RIGHT', () => {
      const result = getXCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.CENTER,
        lineChartYPosition: Positions.RIGHT,
      });

      expect(result).toEqual({
        x1: 0,
        x2: 385,
        y1: 100,
        y2: 100,
      });
    });
  });

  describe('when lineChartXPosition is CUSTOM', () => {
    it('should return correct coordinates with custom break axis', () => {
      const result = getXCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.CUSTOM,
        lineChartYPosition: Positions.LEFT,
      });

      expect(result).toEqual({
        x1: 20,
        x2: 400,
        y1: 50,
        y2: 50,
      });
    });
  });

  describe('when lineChartXPosition is BOTTOM', () => {
    it('should return correct coordinates when lineChartYPosition is LEFT', () => {
      const result = getXCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.BOTTOM,
        lineChartYPosition: Positions.LEFT,
      });

      expect(result).toEqual({
        x1: 20,
        x2: 400,
        y1: 180,
        y2: 180,
      });
    });

    it('should return correct coordinates when lineChartYPosition is RIGHT', () => {
      const result = getXCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.BOTTOM,
        lineChartYPosition: Positions.RIGHT,
      });

      expect(result).toEqual({
        x1: 0,
        x2: 385,
        y1: 180,
        y2: 180,
      });
    });
  });
});

describe('getYCoordinates', () => {
  describe('when lineChartYPosition is RIGHT', () => {
    it('should return correct coordinates when lineChartXPosition is TOP', () => {
      const result = getYCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.TOP,
        lineChartYPosition: Positions.RIGHT,
      });

      expect(result).toEqual({
        x1: 385,
        x2: 385,
        y1: 15,
        y2: 200,
      });
    });

    it('should return correct coordinates when lineChartXPosition is BOTTOM', () => {
      const result = getYCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.BOTTOM,
        lineChartYPosition: Positions.RIGHT,
      });

      expect(result).toEqual({
        x1: 385,
        x2: 385,
        y1: 0,
        y2: 180,
      });
    });
  });

  describe('when lineChartYPosition is CENTER', () => {
    it('should return correct coordinates when lineChartXPosition is TOP', () => {
      const result = getYCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.TOP,
        lineChartYPosition: Positions.CENTER,
      });

      expect(result).toEqual({
        x1: 200,
        x2: 200,
        y1: 15,
        y2: 200,
      });
    });

    it('should return correct coordinates when lineChartXPosition is BOTTOM', () => {
      const result = getYCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.BOTTOM,
        lineChartYPosition: Positions.CENTER,
      });

      expect(result).toEqual({
        x1: 200,
        x2: 200,
        y1: 0,
        y2: 180,
      });
    });
  });

  describe('when lineChartYPosition is CUSTOM', () => {
    it('should return correct coordinates with custom break axis', () => {
      const result = getYCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.TOP,
        lineChartYPosition: Positions.CUSTOM,
      });

      expect(result).toEqual({
        x1: 50,
        x2: 50,
        y1: 15,
        y2: 200,
      });
    });
  });

  describe('when lineChartYPosition is LEFT', () => {
    it('should return correct coordinates when lineChartXPosition is TOP', () => {
      const result = getYCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.TOP,
        lineChartYPosition: Positions.LEFT,
      });

      expect(result).toEqual({
        x1: 20,
        x2: 20,
        y1: 15,
        y2: 200,
      });
    });

    it('should return correct coordinates when lineChartXPosition is BOTTOM', () => {
      const result = getYCoordinates({
        ...baseProps,
        lineChartXPosition: Positions.BOTTOM,
        lineChartYPosition: Positions.LEFT,
      });

      expect(result).toEqual({
        x1: 20,
        x2: 20,
        y1: 0,
        y2: 180,
      });
    });
  });
});
