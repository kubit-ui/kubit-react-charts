import { createElement } from 'react';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Positions } from '@/types/position.enum';

import { LineChartXAxis } from '../../fragments/lineChartXAxis';
import { LineChartYAxis } from '../../fragments/lineChartYAxis';
import type { IDataPoint } from '../../lineChart.type';
import { getExtraSpacing } from '../getExtraSpacing';

declare global {
  interface SVGElement {
    getBBox: () => { x: number; y: number; width: number; height: number };
  }
}

describe('getExtraSpacing', () => {
  const mockData: IDataPoint[] = [
    { x: '0', y: 10 },
    { x: '1', y: 20 },
    { x: '2', y: 30 },
  ];

  beforeEach(() => {
    SVGElement.prototype.getBBox = vi.fn(() => ({
      x: 0,
      y: 0,
      width: 50,
      height: 20,
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return default spacings when no axis children are provided', () => {
    const result = getExtraSpacing({
      children: null,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result).toEqual({
      xAxisLeftSpacing: 0,
      xAxisTopSpacing: 0,
      xAxisRightSpacing: 0,
      xAxisBottomSpacing: 0,
      yAxisLeftSpacing: 0,
      yAxisTopSpacing: 0,
      yAxisRightSpacing: 0,
      yAxisBottomSpacing: 0,
      lineChartXPosition: Positions.BOTTOM,
      lineChartYPosition: Positions.LEFT,
      xAxisText: 0,
      xBreakAxis: 0,
      xData: [],
      yAxisText: 0,
      yBreakAxis: 0,
      yData: [],
    });
  });

  it('should calculate spacings for X axis at bottom position', () => {
    const xAxisChild = createElement(LineChartXAxis, {
      position: Positions.BOTTOM,
      tickText: {
        fontSize: 12,
        top: 5,
        textAnchor: 'middle' as const,
      },
    });

    const result = getExtraSpacing({
      children: xAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xAxisBottomSpacing).toBe(25);
    expect(result.xAxisTopSpacing).toBe(0);
    expect(result.lineChartXPosition).toBe(Positions.BOTTOM);
    expect(result.xData).toEqual(['0', '1', '2']);
  });

  it('should calculate spacings for X axis at top position', () => {
    const xAxisChild = createElement(LineChartXAxis, {
      position: Positions.TOP,
      tickText: {
        fontSize: 12,
        bottom: 8,
        textAnchor: 'middle' as const,
      },
    });

    const result = getExtraSpacing({
      children: xAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xAxisTopSpacing).toBe(28);
    expect(result.xAxisBottomSpacing).toBe(0);
    expect(result.lineChartXPosition).toBe(Positions.TOP);
  });

  it('should calculate spacings for Y axis at left position', () => {
    const yAxisChild = createElement(LineChartYAxis, {
      position: Positions.LEFT,
      tickText: {
        fontSize: 14,
        left: 10,
      },
    });

    const result = getExtraSpacing({
      children: yAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.yAxisLeftSpacing).toBeGreaterThan(0);
    expect(result.yAxisRightSpacing).toBe(0);
    expect(result.yAxisTopSpacing).toBe(20);
    expect(result.lineChartYPosition).toBe(Positions.LEFT);
    expect(result.yData.length).toBeGreaterThan(0);
  });

  it('should calculate spacings for Y axis at right position', () => {
    const yAxisChild = createElement(LineChartYAxis, {
      position: Positions.RIGHT,
      tickText: {
        fontSize: 14,
        right: 12,
      },
    });

    const result = getExtraSpacing({
      children: yAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.yAxisRightSpacing).toBeGreaterThan(0);
    expect(result.yAxisLeftSpacing).toBe(0);
    expect(result.lineChartYPosition).toBe(Positions.RIGHT);
  });

  it('should handle both X and Y axes together', () => {
    const children = [
      createElement(LineChartXAxis, {
        position: Positions.BOTTOM,
        tickText: {
          fontSize: 12,
          top: 5,
        },
      }),
      createElement(LineChartYAxis, {
        position: Positions.LEFT,
        tickText: {
          fontSize: 14,
          left: 10,
        },
      }),
    ];

    const result = getExtraSpacing({
      children,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xAxisBottomSpacing).toBeGreaterThan(0);
    expect(result.yAxisLeftSpacing).toBeGreaterThan(0);
    expect(result.xData).toEqual(['0', '1', '2']);
    expect(result.yData.length).toBeGreaterThan(0);
  });

  it('should apply valueFormatter to X axis data', () => {
    const valueFormatter = (value: string) => `Label ${value}`;
    const xAxisChild = createElement(LineChartXAxis, {
      position: Positions.BOTTOM,
      tickText: {
        fontSize: 12,
      },
      valueFormatter,
    });

    const result = getExtraSpacing({
      children: xAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xData).toEqual(['0', '1', '2']);
  });

  it('should apply valueFormatter to Y axis data', () => {
    const valueFormatter = (value: string) => `${value}%`;
    const yAxisChild = createElement(LineChartYAxis, {
      position: Positions.LEFT,
      tickText: {
        fontSize: 12,
      },
      valueFormatter,
    });

    const result = getExtraSpacing({
      children: yAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.yData.length).toBeGreaterThan(0);
  });

  it('should use tickValues for X axis when provided', () => {
    const tickValues = {
      custom: {
        values: ['A', 'B', 'C'],
      },
    };

    const xAxisChild = createElement(LineChartXAxis, {
      position: Positions.BOTTOM,
      tickText: {
        fontSize: 12,
      },
      tickValues,
    });

    const result = getExtraSpacing({
      children: xAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xData).toEqual(['A', 'B', 'C']);
  });

  it('should handle text anchor start for X axis', () => {
    const xAxisChild = createElement(LineChartXAxis, {
      position: Positions.BOTTOM,
      tickText: {
        fontSize: 12,
        textAnchor: 'start' as const,
      },
    });

    const result = getExtraSpacing({
      children: xAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xAxisLeftSpacing).toBe(0);
    expect(result.xAxisRightSpacing).toBeGreaterThan(0);
  });

  it('should handle text anchor end for X axis', () => {
    const xAxisChild = createElement(LineChartXAxis, {
      position: Positions.BOTTOM,
      tickText: {
        fontSize: 12,
        textAnchor: 'end' as const,
      },
    });

    const result = getExtraSpacing({
      children: xAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xAxisLeftSpacing).toBeGreaterThan(0);
    expect(result.xAxisRightSpacing).toBe(0);
  });

  it('should handle empty data array', () => {
    const xAxisChild = createElement(LineChartXAxis, {
      position: Positions.BOTTOM,
      tickText: {
        fontSize: 12,
      },
    });

    const result = getExtraSpacing({
      children: xAxisChild,
      data: [],
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xData).toEqual([]);
  });

  it('should handle zero font size', () => {
    const xAxisChild = createElement(LineChartXAxis, {
      position: Positions.BOTTOM,
      tickText: {
        fontSize: 0,
      },
    });

    const result = getExtraSpacing({
      children: xAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xAxisBottomSpacing).toBe(20);
  });

  it('should handle missing tickText properties', () => {
    const xAxisChild = createElement(LineChartXAxis, {
      position: Positions.BOTTOM,
      tickText: undefined,
    });

    const result = getExtraSpacing({
      children: xAxisChild,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xAxisBottomSpacing).toBe(20);
  });

  it('should ignore non-axis children', () => {
    const children = [
      createElement('div', { key: '1' }, 'Not an axis'),
      createElement(LineChartXAxis, {
        position: Positions.BOTTOM,
        tickText: {
          fontSize: 12,
        },
      }),
    ];

    const result = getExtraSpacing({
      children,
      data: mockData,
      xKey: 'x',
      viewBox: '0 0 800 400',
      canvasHeight: 400,
      canvasWidth: 800,
    });

    expect(result.xData).toEqual(['0', '1', '2']);
  });
});
