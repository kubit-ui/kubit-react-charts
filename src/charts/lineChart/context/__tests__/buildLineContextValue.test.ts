import type { Mock } from 'vitest';

import { Positions } from '@/types/position.enum';
import { getXCoordinates, getYCoordinates } from '@/utils/getCoordinates/getCoordinates';
import { getPoints } from '@/utils/getPoints/getPoints';
import { getXTicks, getYTicks } from '@/utils/getTicks/getTicks';

import { getExtraSpacing } from '../../utils/getExtraSpacing';
import { buildLineContextValue } from '../buildLineContextValue';

vi.mock('../../utils/getExtraSpacing', () => ({
  getExtraSpacing: vi.fn(),
}));

vi.mock('@/utils/getTicks/getTicks', () => ({
  getXTicks: vi.fn(),
  getYTicks: vi.fn(),
}));

vi.mock('@/utils/getPoints/getPoints', () => ({
  getPoints: vi.fn(),
}));

vi.mock('@/utils/getCoordinates/getCoordinates', () => ({
  getXCoordinates: vi.fn(),
  getYCoordinates: vi.fn(),
}));

describe('buildLineContextValue', () => {
  const mockChildren: React.ReactElement[] = [];
  const mockData = [
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 30 },
  ];
  const mockXKey = 'x';
  const mockCanvasHeight = 500;
  const mockCanvasWidth = 800;
  const mockViewBox = '0 0 800 500';

  beforeEach(() => {
    vi.clearAllMocks();

    (getExtraSpacing as Mock).mockReturnValue({
      extraSpaceBottomY: 10,
      extraSpaceLeftX: 10,
      extraSpaceRightX: 10,
      extraSpaceTopY: 10,
      lineChartXPosition: Positions.BOTTOM,
      lineChartYPosition: Positions.LEFT,
      securityXSpace: 5,
      securityYSpace: 5,
      xAxisText: 'X Axis',
      xBreakAxis: 0,
      xData: [1, 2, 3],
      yAxisText: 'Y Axis',
      yBreakAxis: 0,
      yData: [10, 20, 30],
    });

    (getXTicks as Mock).mockReturnValue([
      { position: 0, value: '1' },
      { position: 400, value: '2' },
      { position: 800, value: '3' },
    ]);
    (getYTicks as Mock).mockReturnValue([
      { position: 500, value: '10' },
      { position: 250, value: '20' },
      { position: 0, value: '30' },
    ]);
    (getPoints as Mock).mockReturnValue([0]);
    (getXCoordinates as Mock).mockReturnValue({ x1: 0, x2: 100, y1: 10, y2: 190 });
    (getYCoordinates as Mock).mockReturnValue({ x1: 10, x2: 390, y1: 0, y2: 50 });
  });

  it('should build the context with right values', () => {
    const result = buildLineContextValue({
      ajustedX: 0,
      ajustedY: 0,
      canvasHeight: mockCanvasHeight,
      canvasWidth: mockCanvasWidth,
      children: mockChildren,
      data: mockData,
      viewBox: mockViewBox,
      xKey: mockXKey,
    });

    expect(result).toEqual({
      crossXAxis: false,
      crossYAxis: false,
      extraSpaceBottomY: 10,
      extraSpaceLeftX: 10,
      extraSpaceRightX: 10,
      extraSpaceTopY: 10,
      securityXSpace: 5,
      securityYSpace: 5,
      xAxisCoordinates: {
        coordinates: { x1: 0, x2: 100, y1: 10, y2: 190 },
        tickValues: [
          { position: 0, value: '1' },
          { position: 400, value: '2' },
          { position: 800, value: '3' },
        ],
      },
      xAxisText: 'X Axis',
      yAxisCoordinates: {
        coordinates: { x1: 10, x2: 390, y1: 0, y2: 50 },
        tickValues: [
          { position: 500, value: '10' },
          { position: 250, value: '20' },
          { position: 0, value: '30' },
        ],
      },
      yAxisText: 'Y Axis',
    });

    expect(getExtraSpacing).toHaveBeenCalledWith({
      ajustedX: 0,
      ajustedY: 0,
      canvasHeight: mockCanvasHeight,
      canvasWidth: mockCanvasWidth,
      children: mockChildren,
      data: mockData,
      viewBox: mockViewBox,
      xKey: mockXKey,
    });

    expect(getXTicks).toHaveBeenCalledWith({
      initPos: 10,
      maxSpaceAvailable: mockCanvasWidth,
      otherAxisSpace: 20,
      securitySpace: 5,
      tickValues: [1, 2, 3],
    });

    expect(getYTicks).toHaveBeenCalledWith({
      initPos: 490,
      maxSpaceAvailable: mockCanvasHeight,
      otherAxisSpace: 20,
      securitySpace: 5,
      tickValues: [10, 20, 30],
    });

    expect(getXCoordinates).toHaveBeenCalled();
    expect(getYCoordinates).toHaveBeenCalled();
  });

  it('should handler the cross axis correctly', () => {
    (getExtraSpacing as Mock).mockReturnValue({
      extraSpaceBottomY: 10,
      extraSpaceLeftX: 10,
      extraSpaceRightX: 10,
      extraSpaceTopY: 10,
      lineChartXPosition: Positions.LEFT,
      lineChartYPosition: Positions.TOP,
      securityXSpace: 5,
      securityYSpace: 5,
      xAxisText: 'X Axis',
      xBreakAxis: 0,
      xData: [1, 2, 3],
      yAxisText: 'Y Axis',
      yBreakAxis: 0,
      yData: [10, 20, 30],
    });

    const result = buildLineContextValue({
      ajustedX: 0,
      ajustedY: 0,
      canvasHeight: mockCanvasHeight,
      canvasWidth: mockCanvasWidth,
      children: mockChildren,
      data: mockData,
      viewBox: mockViewBox,
      xKey: mockXKey,
    });

    expect(result.crossXAxis).toBe(true);
    expect(result.crossYAxis).toBe(true);
  });
});
