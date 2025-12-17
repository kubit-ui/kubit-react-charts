import { describe, expect, it } from 'vitest';

import { Positions } from '@/types/position.enum';

import {
  getXAxisLeftTextSpacing,
  getXAxisRightTextSpacing,
  getYAxisLeftTextSpacing,
  getYAxisRightTextSpacing,
  getYAxisTextXCoordinate,
} from '../tickTextPosition';

describe('getYAxisTextXCoordinate', () => {
  describe('with useAxisAsOrigin = true', () => {
    it('should position text at axis with no offsets', () => {
      const result = getYAxisTextXCoordinate({
        tickText: { useAxisAsOrigin: true },
        yAxisPosition: Positions.LEFT,
        textWidth: 50,
        yAxisX1: 100,
      });

      expect(result).toBe(100);
    });

    it('should apply right offset', () => {
      const result = getYAxisTextXCoordinate({
        tickText: { useAxisAsOrigin: true, right: 10 },
        yAxisPosition: Positions.LEFT,
        textWidth: 50,
        yAxisX1: 100,
      });

      expect(result).toBe(110);
    });

    it('should apply left offset', () => {
      const result = getYAxisTextXCoordinate({
        tickText: { useAxisAsOrigin: true, left: 15 },
        yAxisPosition: Positions.LEFT,
        textWidth: 50,
        yAxisX1: 100,
      });

      expect(result).toBe(85);
    });

    it('should combine left and right offsets', () => {
      const result = getYAxisTextXCoordinate({
        tickText: { useAxisAsOrigin: true, right: 10, left: 5 },
        yAxisPosition: Positions.LEFT,
        textWidth: 50,
        yAxisX1: 100,
      });

      expect(result).toBe(105);
    });
  });

  describe('with useAxisAsOrigin = false', () => {
    it('should calculate position with textAnchor middle and LEFT position', () => {
      const result = getYAxisTextXCoordinate({
        tickText: { textAnchor: 'middle' },
        yAxisPosition: Positions.LEFT,
        textWidth: 50,
        yAxisX1: 100,
      });

      // ajustedTextSpace('middle', 50, 0) = 25
      // getTickTextXCoordinate(LEFT, 100, 25) = 100 - 25 = 75
      expect(result).toBe(75);
    });

    it('should calculate position with textAnchor middle, left offset and LEFT position', () => {
      const result = getYAxisTextXCoordinate({
        tickText: { textAnchor: 'middle', left: 10 },
        yAxisPosition: Positions.LEFT,
        textWidth: 50,
        yAxisX1: 100,
      });

      expect(result).toBe(65);
    });

    it('should calculate position with textAnchor middle, right offset and RIGHT position', () => {
      const result = getYAxisTextXCoordinate({
        tickText: { textAnchor: 'middle', right: 10 },
        yAxisPosition: Positions.RIGHT,
        textWidth: 50,
        yAxisX1: 100,
      });

      expect(result).toBe(135);
    });

    it('should calculate position with textAnchor start and LEFT position', () => {
      const result = getYAxisTextXCoordinate({
        tickText: { textAnchor: 'start' },
        yAxisPosition: Positions.LEFT,
        textWidth: 50,
        yAxisX1: 100,
      });

      expect(result).toBe(100);
    });

    it('should calculate position with textAnchor end and LEFT position', () => {
      const result = getYAxisTextXCoordinate({
        tickText: { textAnchor: 'end' },
        yAxisPosition: Positions.LEFT,
        textWidth: 50,
        yAxisX1: 100,
      });

      expect(result).toBe(50);
    });

    it('should default to middle textAnchor', () => {
      const result = getYAxisTextXCoordinate({
        tickText: {},
        yAxisPosition: Positions.LEFT,
        textWidth: 50,
        yAxisX1: 100,
      });

      expect(result).toBe(75);
    });
  });
});

describe('getYAxisLeftTextSpacing', () => {
  it('should return 0 when position is not LEFT', () => {
    const result = getYAxisLeftTextSpacing({
      tickText: { useAxisAsOrigin: true, left: 10 },
      textWidth: 50,
      yAxisPosition: Positions.RIGHT,
    });

    expect(result).toBe(0);
  });

  describe('with useAxisAsOrigin = true and position LEFT', () => {
    it('should return 0 with textAnchor start', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'start' },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(0);
    });

    it('should return textWidth with textAnchor end', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'end' },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(50);
    });

    it('should return half textWidth with textAnchor middle', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'middle' },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(25);
    });

    it('should add left offset to spacing', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'end', left: 10 },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(60);
    });

    it('should subtract right offset from spacing', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'end', right: 10 },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(40);
    });

    it('should not return negative spacing', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'start', right: 20 },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(0);
    });

    it('should combine left and right offsets', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'middle', left: 15, right: 5 },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(35);
    });
  });

  describe('with useAxisAsOrigin = false', () => {
    it('should return 0 with textAnchor start', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { textAnchor: 'start' },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(0);
    });

    it('should return textWidth with textAnchor middle', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { textAnchor: 'middle' },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(50);
    });

    it('should return double textWidth with textAnchor end', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { textAnchor: 'end' },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(100);
    });

    it('should add left offset with textAnchor middle', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { textAnchor: 'middle', left: 10 },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(60);
    });

    it('should add left offset with textAnchor end', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { textAnchor: 'end', left: 15 },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(115);
    });

    it('should use default calculation when textAnchor is undefined', () => {
      const result = getYAxisLeftTextSpacing({
        tickText: { left: 10 },
        textWidth: 50,
        yAxisPosition: Positions.LEFT,
      });

      expect(result).toBe(35);
    });
  });
});

describe('getYAxisRightTextSpacing', () => {
  it('should return 0 when position is not RIGHT', () => {
    const result = getYAxisRightTextSpacing({
      tickText: { useAxisAsOrigin: true, right: 10 },
      textWidth: 50,
      yAxisPosition: Positions.LEFT,
    });

    expect(result).toBe(0);
  });

  describe('with useAxisAsOrigin = true and position RIGHT', () => {
    it('should return textWidth with textAnchor start', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'start' },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(50);
    });

    it('should return 0 with textAnchor end', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'end' },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(0);
    });

    it('should return half textWidth with textAnchor middle', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'middle' },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(25);
    });

    it('should add right offset to spacing', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'start', right: 10 },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(60);
    });

    it('should subtract left offset from spacing', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'start', left: 10 },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(40);
    });

    it('should not return negative spacing', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'end', left: 20 },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(0);
    });

    it('should combine left and right offsets', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { useAxisAsOrigin: true, textAnchor: 'middle', right: 15, left: 5 },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(35);
    });
  });

  describe('with useAxisAsOrigin = false', () => {
    it('should return textWidth with textAnchor start', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { textAnchor: 'start' },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(50);
    });

    it('should return textWidth with textAnchor middle', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { textAnchor: 'middle' },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(50);
    });

    it('should return textWidth with textAnchor end', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { textAnchor: 'end' },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(50);
    });

    it('should add right offset with textAnchor middle', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { textAnchor: 'middle', right: 10 },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(60);
    });

    it('should add right offset with textAnchor end', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { textAnchor: 'end', right: 15 },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(65);
    });

    it('should use default calculation when textAnchor is undefined', () => {
      const result = getYAxisRightTextSpacing({
        tickText: { right: 10 },
        textWidth: 50,
        yAxisPosition: Positions.RIGHT,
      });

      expect(result).toBe(85);
    });
  });
});

describe('getXAxisLeftTextSpacing', () => {
  it('should return 0 with textAnchor start', () => {
    expect(getXAxisLeftTextSpacing({ textWidth: 100, tickText: { textAnchor: 'start' } })).toBe(0);
  });

  it('should return half textWidth with textAnchor middle', () => {
    expect(getXAxisLeftTextSpacing({ textWidth: 100, tickText: { textAnchor: 'middle' } })).toBe(
      50
    );
  });

  it('should return textWidth with textAnchor end', () => {
    expect(getXAxisLeftTextSpacing({ textWidth: 100, tickText: { textAnchor: 'end' } })).toBe(100);
  });

  it('should default to start when textAnchor is undefined', () => {
    expect(getXAxisLeftTextSpacing({ textWidth: 100 })).toBe(0);
  });
});

describe('getXAxisRightTextSpacing', () => {
  it('should return 0 with textAnchor end', () => {
    expect(getXAxisRightTextSpacing({ textWidth: 100, tickText: { textAnchor: 'end' } })).toBe(0);
  });

  it('should return half textWidth with textAnchor middle', () => {
    expect(getXAxisRightTextSpacing({ textWidth: 100, tickText: { textAnchor: 'middle' } })).toBe(
      50
    );
  });

  it('should return textWidth with textAnchor start', () => {
    expect(getXAxisRightTextSpacing({ textWidth: 100, tickText: { textAnchor: 'start' } })).toBe(
      100
    );
  });

  it('should default to start when textAnchor is undefined', () => {
    expect(getXAxisRightTextSpacing({ textWidth: 100 })).toBe(100);
  });
});
