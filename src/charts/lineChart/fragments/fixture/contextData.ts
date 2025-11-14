import type { TickData } from '@/components/tick/tick.types';

export const CONTEXT = {
  addError: undefined,
  canvasExtraSpace: 0,
  canvasHeight: 500,
  canvasWidth: 500,
  crossXAxis: false,
  crossYAxis: false,
  data: [
    { testKey: 10, xKey: 1 },
    { testKey: 20, xKey: 2 },
    { testKey: 30, xKey: 3 },
  ],
  dataTestId: 'test',
  extraSpaceBottomY: 0,
  extraSpaceLeftX: 0,
  extraSpaceRightX: 0,
  extraSpaceTopY: 0,
  securityXSpace: 0,
  securityYSpace: 0,
  xAxisCoordinates: {
    coordinates: { x1: 0, x2: 100, y1: 0, y2: 0 },
    tickValues: [
      { position: '0', value: '1' },
      { position: '33', value: '2' },
      { position: '66', value: '3' },
    ] as unknown as TickData[],
  },
  xAxisText: 0,
  xCursor: 0,
  xKey: 'xKey',
  yAxisCoordinates: {
    coordinates: { x1: 0, x2: 0, y1: 0, y2: 80 },
    tickValues: [
      { position: '0', value: '10' },
      { position: '30', value: '20' },
      { position: '60', value: '30' },
    ] as unknown as TickData[],
  },
  yAxisText: 0,
  yCursor: 0,
};
