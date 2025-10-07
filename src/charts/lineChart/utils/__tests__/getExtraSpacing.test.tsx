import { Positions } from '@/types/position.enum';

import { LineChartXAxis } from '../../fragments/lineChartXAxis';
import { LineChartYAxis } from '../../fragments/lineChartYAxis';
import { getExtraSpacing } from '../getExtraSpacing';

declare global {
  interface SVGElement {
    getBBox: () => { x: number; y: number; width: number; height: number };
  }
}
describe('getExtraSpacing', () => {
  beforeEach(() => {
    SVGElement.prototype.getBBox = vi.fn(() => ({
      height: 50,
      width: 100,
      x: 0,
      y: 0,
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  const mockData = [
    { x: '10', y: '20' },
    { x: '30', y: '40' },
  ];

  const mockViewBox = '0 0 100 100';
  const mockCanvasHeight = 500;
  const mockCanvasWidth = 500;

  it('should return default spacing when no children are passed', () => {
    const result = getExtraSpacing({
      ajustedX: 1,
      ajustedY: 1,
      canvasHeight: mockCanvasHeight,
      canvasWidth: mockCanvasWidth,
      children: [],
      data: mockData,
      viewBox: mockViewBox,
      xKey: 'x',
    });

    expect(result).toEqual({
      extraSpaceBottomY: 0,
      extraSpaceLeftX: 0,
      extraSpaceRightX: 0,
      extraSpaceTopY: 0,
      lineChartXPosition: Positions.BOTTOM,
      lineChartYPosition: Positions.LEFT,
      securityXSpace: 0,
      securityYSpace: 0,
      xAxisText: 0,
      xBreakAxis: 0,
      xData: [],
      yAxisText: 0,
      yBreakAxis: 0,
      yData: [],
    });
  });

  it('should calculate spacing when LineChartXAxis is passed', () => {
    const mockXAxis = (
      <LineChartXAxis
        position={Positions.BOTTOM}
        tickText={{ fontSize: 12, top: 5 }}
        tickValues={{ numeric: { max: 50, min: 0, step: 10 } }}
      />
    );

    const result = getExtraSpacing({
      ajustedX: 1,
      ajustedY: 1,
      canvasHeight: mockCanvasHeight,
      canvasWidth: mockCanvasWidth,
      children: [mockXAxis],
      data: mockData,
      viewBox: mockViewBox,
      xKey: 'x',
    });

    expect(result.lineChartXPosition).toBe(Positions.BOTTOM);
    expect(result.extraSpaceBottomY).toBeGreaterThan(0);
    expect(result.xData).toEqual(['0', '10', '20', '30', '40', '50']);
  });

  it('should calculate spacing when LineChartYAxis is passed', () => {
    const mockYAxis = (
      <LineChartYAxis
        position={Positions.LEFT}
        tickText={{ fontSize: 12, right: 5 }}
        tickValues={{ numeric: { max: 50, min: 0, step: 10 } }}
      />
    );

    const result = getExtraSpacing({
      ajustedX: 1,
      ajustedY: 1,
      canvasHeight: mockCanvasHeight,
      canvasWidth: mockCanvasWidth,
      children: [mockYAxis],
      data: mockData,
      viewBox: mockViewBox,
      xKey: 'y',
    });

    expect(result.lineChartYPosition).toBe(Positions.LEFT);
    expect(result.extraSpaceLeftX).toBeGreaterThan(0);
    expect(result.yData).toEqual(['0', '10', '20', '30', '40', '50']);
  });

  it('should calculate spacing when both LineChartXAxis and LineChartYAxis are passed', () => {
    const mockXAxis = (
      <LineChartXAxis
        position={Positions.BOTTOM}
        tickText={{ fontSize: 12, top: 5 }}
        tickValues={{ numeric: { max: 50, min: 0, step: 10 } }}
      />
    );

    const mockYAxis = (
      <LineChartYAxis
        position={Positions.LEFT}
        tickText={{ fontSize: 12, right: 5 }}
        tickValues={{ numeric: { max: 50, min: 0, step: 10 } }}
      />
    );

    const result = getExtraSpacing({
      ajustedX: 1,
      ajustedY: 1,
      canvasHeight: mockCanvasHeight,
      canvasWidth: mockCanvasWidth,
      children: [mockXAxis, mockYAxis],
      data: mockData,
      viewBox: mockViewBox,
      xKey: 'x',
    });

    expect(result.lineChartXPosition).toBe(Positions.BOTTOM);
    expect(result.lineChartYPosition).toBe(Positions.LEFT);
    expect(result.extraSpaceBottomY).toBeGreaterThan(0);
    expect(result.extraSpaceLeftX).toBeGreaterThan(0);
    expect(result.xData).toEqual(['0', '10', '20', '30', '40', '50']);
    expect(result.yData).toEqual(['0', '10', '20', '30', '40', '50']);
  });

  it('should handle empty data gracefully', () => {
    const mockXAxis = (
      <LineChartXAxis
        position={Positions.BOTTOM}
        tickText={{ fontSize: 12, top: 5 }}
        tickValues={{ numeric: { max: 50, min: 0, step: 10 } }}
      />
    );

    const result = getExtraSpacing({
      ajustedX: 1,
      ajustedY: 1,
      canvasHeight: mockCanvasHeight,
      canvasWidth: mockCanvasWidth,
      children: [mockXAxis],
      data: [],
      viewBox: mockViewBox,
      xKey: 'x',
    });

    expect(result.xData).toEqual(['0', '10', '20', '30', '40', '50']);
  });
});
