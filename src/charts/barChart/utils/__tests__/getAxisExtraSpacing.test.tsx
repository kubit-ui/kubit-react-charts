import { BarOrientation } from '@/components/bar/bar.type';
import { Positions } from '@/types/position.enum';

import { BarChartPath } from '../../fragments/barChartPath';
import { BarChartXAxis } from '../../fragments/barChartXAxis';
import { BarChartYAxis } from '../../fragments/barChartYAxis';
import { getAxisExtraSpacing } from '../getAxisExtraSpacing';

declare global {
  interface SVGElement {
    getBBox: () => { x: number; y: number; width: number; height: number };
  }
}

describe('getAxisExtraSpacing', () => {
  const singleConfig = {
    barWidth: 3,
    gap: 1,
    singleConfig: [{ color: 'pink', coverage: 100 }],
  };

  const mockData = [
    { key: 'A', value: 10 },
    { key: 'B', value: 20 },
    { key: 'C', value: 30 },
  ];

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

  const mockChildren = [
    <BarChartPath key="path-1" barConfig={singleConfig} dataIdx={0} dataKey="value" order={1} />,
    <BarChartXAxis
      key="x-axis"
      position={Positions.BOTTOM}
      tickText={{ fontSize: 12, top: 5 }}
      tickValues={{ custom: { values: ['A', 'B', 'C'] } }}
    />,
    <BarChartYAxis key="y-axis" position={Positions.LEFT} tickText={{ fontSize: 10, right: 5 }} />,
  ];

  it('should calculate the extra spacing for a vertical chart', () => {
    const result = getAxisExtraSpacing({
      ajustedX: 1,
      ajustedY: 1,
      canvasHeight: 100,
      canvasWidth: 70,
      children: mockChildren,
      data: mockData,
      gapBetweenBars: 5,
      orientation: BarOrientation.VERTICAL,
      pKey: 'key',
      viewBox: '0 0 100, 80',
    });

    expect(result).toEqual({
      barChartXPosition: Positions.BOTTOM,
      barChartYPosition: Positions.LEFT,
      extraSpaceBottomY: 17,
      extraSpaceLeftX: 105,
      extraSpaceRightX: 0,
      extraSpaceTopY: 0,
      securityXSpace: 100,
      securityYSpace: 10,
      xAxisText: 0,
      xBreakAxis: 0,
      xData: ['A', 'B', 'C'],
      yAxisText: 100,
      yBreakAxis: 0,
      yData: ['10', '20', '30'],
    });
  });

  it('should calculate the extra spacing for horizontal chart', () => {
    const result = getAxisExtraSpacing({
      ajustedX: 1,
      ajustedY: 1,
      canvasHeight: 100,
      canvasWidth: 70,
      children: mockChildren,
      data: mockData,
      gapBetweenBars: 5,
      orientation: BarOrientation.HORIZONTAL,
      pKey: 'key',
      viewBox: '0 0 100, 80',
    });

    expect(result).toEqual({
      barChartXPosition: Positions.BOTTOM,
      barChartYPosition: Positions.LEFT,
      extraSpaceBottomY: 17,
      extraSpaceLeftX: 105,
      extraSpaceRightX: 0,
      extraSpaceTopY: 0,
      securityXSpace: 100,
      securityYSpace: 10,
      xAxisText: 0,
      xBreakAxis: 0,
      xData: ['A', 'B', 'C'],
      yAxisText: 100,
      yBreakAxis: 0,
      yData: ['10', '20', '30'],
    });
  });

  it('should handle children without a valid type', () => {
    const invalidChildren = [<div key="invalid">Elemento no válido</div>, ...mockChildren];

    const result = getAxisExtraSpacing({
      ajustedX: 1,
      ajustedY: 1,
      canvasHeight: 100,
      canvasWidth: 70,
      children: invalidChildren,
      data: mockData,
      gapBetweenBars: 5,
      orientation: BarOrientation.VERTICAL,
      pKey: 'key',
      viewBox: '0 0 100, 80',
    });

    expect(result).toEqual({
      barChartXPosition: Positions.BOTTOM,
      barChartYPosition: Positions.LEFT,
      extraSpaceBottomY: 17,
      extraSpaceLeftX: 105,
      extraSpaceRightX: 0,
      extraSpaceTopY: 0,
      securityXSpace: 100,
      securityYSpace: 10,
      xAxisText: 0,
      xBreakAxis: 0,
      xData: ['A', 'B', 'C'],
      yAxisText: 100,
      yBreakAxis: 0,
      yData: ['10', '20', '30'],
    });
  });

  it('should manage a chart without any children', () => {
    const result = getAxisExtraSpacing({
      ajustedX: 1,
      ajustedY: 1,
      canvasHeight: 100,
      canvasWidth: 70,
      children: [],
      data: mockData,
      gapBetweenBars: 5,
      orientation: BarOrientation.VERTICAL,
      pKey: 'key',
      viewBox: '0 0 100, 80',
    });

    expect(result).toEqual({
      barChartXPosition: Positions.BOTTOM,
      barChartYPosition: Positions.LEFT,
      extraSpaceBottomY: 0,
      extraSpaceLeftX: 0,
      extraSpaceRightX: 0,
      extraSpaceTopY: 0,
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
});
