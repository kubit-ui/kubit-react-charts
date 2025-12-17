import type { Mock } from 'vitest';

import { Positions } from '@/types/position.enum';
import { getPoints } from '@/utils/getPoints/getPoints';

import { getXCoordinates, getYCoordinates } from '../../utils/getCoordinates';
import { getExtraSpacing } from '../../utils/getExtraSpacing';
import { getXTicks, getYTicks } from '../../utils/getTicks';
import { buildLineContextValue } from '../buildLineContextValue';

vi.mock('../../utils/getExtraSpacing', () => ({
  getExtraSpacing: vi.fn(),
}));

vi.mock('../../utils/getTicks', () => ({
  getXTicks: vi.fn(),
  getYTicks: vi.fn(),
}));

vi.mock('@/utils/getPoints/getPoints', () => ({
  getPoints: vi.fn(),
}));

vi.mock('../../utils/getCoordinates', () => ({
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
      xAxisLeftSpacing: 0,
      xAxisTopSpacing: 0,
      xAxisRightSpacing: 10,
      xAxisBottomSpacing: 10,
      yAxisLeftSpacing: 10,
      yAxisTopSpacing: 0,
      yAxisRightSpacing: 0,
      yAxisBottomSpacing: 0,
      lineChartXPosition: Positions.BOTTOM,
      lineChartYPosition: Positions.LEFT,
      xAxisText: 'X Axis',
      xBreakAxis: 0,
      xData: [1, 2, 3],
      yAxisText: 'Y Axis',
      yBreakAxis: 0,
      yData: [10, 20, 30],
    });

    (getXTicks as Mock).mockReturnValue([
      { position: 10, value: 1 },
      { position: 400, value: 2 },
      { position: 790, value: 3 },
    ]);
    (getYTicks as Mock).mockReturnValue([
      { position: 490, value: 10 },
      { position: 245, value: 20 },
      { position: 0, value: 30 },
    ]);
    (getPoints as Mock).mockReturnValue([0]);
    (getXCoordinates as Mock).mockReturnValue({ x1: 10, x2: 800, y1: 490, y2: 490 });
    (getYCoordinates as Mock).mockReturnValue({ x1: 10, x2: 390, y1: 0, y2: 50 });
  });

  it('should build the context with right values', () => {
    const result = buildLineContextValue({
      canvasHeight: mockCanvasHeight,
      canvasWidth: mockCanvasWidth,
      children: mockChildren,
      data: mockData,
      viewBox: mockViewBox,
      xKey: mockXKey,
    });

    expect(result).toEqual({
      addError: undefined,
      crossXAxis: false,
      crossYAxis: false,
      xAxisLeftSpacing: 0,
      xAxisTopSpacing: 0,
      xAxisRightSpacing: 10,
      xAxisBottomSpacing: 10,
      yAxisLeftSpacing: 10,
      yAxisTopSpacing: 0,
      yAxisRightSpacing: 0,
      yAxisBottomSpacing: 0,
      xAxisCoordinates: {
        coordinates: { x1: 10, x2: 800, y1: 490, y2: 490 },
        tickValues: [
          { position: 10, value: 1 },
          { position: 400, value: 2 },
          { position: 790, value: 3 },
        ],
      },
      xAxisText: 'X Axis',
      yAxisCoordinates: {
        coordinates: { x1: 10, x2: 390, y1: 0, y2: 50 },
        tickValues: [
          { position: 490, value: 10 },
          { position: 245, value: 20 },
          { position: 0, value: 30 },
        ],
      },
      yAxisText: 'Y Axis',
    });

    expect(getExtraSpacing).toHaveBeenCalledWith({
      canvasHeight: mockCanvasHeight,
      canvasWidth: mockCanvasWidth,
      children: mockChildren,
      data: mockData,
      viewBox: mockViewBox,
      xKey: mockXKey,
    });

    expect(getXTicks).toHaveBeenCalled();

    expect(getYTicks).toHaveBeenCalled();

    expect(getXCoordinates).toHaveBeenCalled();
    expect(getYCoordinates).toHaveBeenCalled();
  });

  it('should handler the cross axis correctly', () => {
    (getExtraSpacing as Mock).mockReturnValue({
      xAxisLeftSpacing: 0,
      xAxisTopSpacing: 0,
      xAxisRightSpacing: 10,
      xAxisBottomSpacing: 10,
      yAxisLeftSpacing: 10,
      yAxisTopSpacing: 0,
      yAxisRightSpacing: 0,
      yAxisBottomSpacing: 0,
      lineChartXPosition: Positions.LEFT,
      lineChartYPosition: Positions.TOP,
      xAxisText: 'X Axis',
      xBreakAxis: 0,
      xData: [1, 2, 3],
      yAxisText: 'Y Axis',
      yBreakAxis: 0,
      yData: [10, 20, 30],
    });

    const result = buildLineContextValue({
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
