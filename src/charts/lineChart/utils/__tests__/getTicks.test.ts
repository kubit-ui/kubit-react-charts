import { getXTicks, getYTicks } from '../getTicks';

describe('getXTicks', () => {
  const baseProps = {
    maxSpaceAvailable: 400,
    xAxisLeftSpacing: 10,
    xAxisRightSpacing: 10,
    yAxisLeftSpacing: 20,
    yAxisRightSpacing: 15,
  };

  describe('when calculating X-axis tick positions', () => {
    it('should return correct positions for multiple tick values', () => {
      const tickValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

      const result = getXTicks({
        ...baseProps,
        tickValues,
      });

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({
        position: 20,
        value: 'Jan',
      });
      expect(result[1]).toEqual({
        position: 111.25,
        value: 'Feb',
      });
      expect(result[2]).toEqual({
        position: 202.5,
        value: 'Mar',
      });
      expect(result[3]).toEqual({
        position: 293.75,
        value: 'Apr',
      });
      expect(result[4]).toEqual({
        position: 385,
        value: 'May',
      });
    });

    it('should handle two tick values', () => {
      const tickValues = ['Start', 'End'];

      const result = getXTicks({
        ...baseProps,
        tickValues,
      });

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        position: 20,
        value: 'Start',
      });
      expect(result[1]).toEqual({
        position: 385,
        value: 'End',
      });
    });

    it('should handle single tick value', () => {
      const tickValues = ['Single'];

      const result = getXTicks({
        ...baseProps,
        tickValues,
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        position: 20,
        value: 'Single',
      });
    });

    it('should use yAxisLeftSpacing when greater than xAxisLeftSpacing', () => {
      const tickValues = ['A', 'B'];

      const result = getXTicks({
        ...baseProps,
        yAxisLeftSpacing: 30,
        tickValues,
      });

      expect(result[0].position).toBe(30);
    });

    it('should use xAxisLeftSpacing when greater than yAxisLeftSpacing', () => {
      const tickValues = ['A', 'B'];

      const result = getXTicks({
        ...baseProps,
        xAxisLeftSpacing: 25,
        yAxisLeftSpacing: 15,
        tickValues,
      });

      expect(result[0].position).toBe(25);
    });

    it('should use yAxisRightSpacing when greater than xAxisRightSpacing', () => {
      const tickValues = ['A', 'B'];

      const result = getXTicks({
        ...baseProps,
        yAxisRightSpacing: 25,
        tickValues,
      });

      expect(result[1].position).toBe(375);
    });

    it('should use xAxisRightSpacing when greater than yAxisRightSpacing', () => {
      const tickValues = ['A', 'B'];

      const result = getXTicks({
        ...baseProps,
        xAxisRightSpacing: 30,
        yAxisRightSpacing: 10,
        tickValues,
      });

      expect(result[1].position).toBe(370);
    });
  });
});

describe('getYTicks', () => {
  const baseProps = {
    maxSpaceAvailable: 200,
    xAxisTopSpacing: 10,
    xAxisBottomSpacing: 10,
    yAxisTopSpacing: 15,
    yAxisBottomSpacing: 20,
  };

  describe('when calculating Y-axis tick positions', () => {
    it('should return correct positions for multiple tick values', () => {
      const tickValues = ['0', '25', '50', '75', '100'];

      const result = getYTicks({
        ...baseProps,
        tickValues,
      });

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({
        position: 180,
        value: '0',
      });
      expect(result[1]).toEqual({
        position: 138.75,
        value: '25',
      });
      expect(result[2]).toEqual({
        position: 97.5,
        value: '50',
      });
      expect(result[3]).toEqual({
        position: 56.25,
        value: '75',
      });
      expect(result[4]).toEqual({
        position: 15,
        value: '100',
      });
    });

    it('should handle two tick values', () => {
      const tickValues = ['Min', 'Max'];

      const result = getYTicks({
        ...baseProps,
        tickValues,
      });

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        position: 180,
        value: 'Min',
      });
      expect(result[1]).toEqual({
        position: 15,
        value: 'Max',
      });
    });

    it('should handle single tick value', () => {
      const tickValues = ['Single'];

      const result = getYTicks({
        ...baseProps,
        tickValues,
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        position: 180,
        value: 'Single',
      });
    });

    it('should use yAxisTopSpacing when greater than xAxisTopSpacing', () => {
      const tickValues = ['A', 'B'];

      const result = getYTicks({
        ...baseProps,
        yAxisTopSpacing: 25,
        tickValues,
      });

      expect(result[1].position).toBe(25);
    });

    it('should use xAxisTopSpacing when greater than yAxisTopSpacing', () => {
      const tickValues = ['A', 'B'];

      const result = getYTicks({
        ...baseProps,
        xAxisTopSpacing: 30,
        yAxisTopSpacing: 10,
        tickValues,
      });

      expect(result[1].position).toBe(30);
    });

    it('should use yAxisBottomSpacing when greater than xAxisBottomSpacing', () => {
      const tickValues = ['A', 'B'];

      const result = getYTicks({
        ...baseProps,
        yAxisBottomSpacing: 30,
        tickValues,
      });

      expect(result[0].position).toBe(170);
    });

    it('should use xAxisBottomSpacing when greater than yAxisBottomSpacing', () => {
      const tickValues = ['A', 'B'];

      const result = getYTicks({
        ...baseProps,
        xAxisBottomSpacing: 25,
        yAxisBottomSpacing: 15,
        tickValues,
      });

      expect(result[0].position).toBe(175);
    });
  });
});
