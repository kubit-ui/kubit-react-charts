import { Positions } from '@/types/position.enum';

type GetCoordinates = (params: {
  lineChartXPosition: (typeof Positions)[keyof typeof Positions];
  lineChartYPosition: (typeof Positions)[keyof typeof Positions];
  canvasHeight: number;
  canvasWidth: number;
  customBreakAxis: number;
  xAxisLeftSpacing: number;
  xAxisTopSpacing: number;
  xAxisRightSpacing: number;
  xAxisBottomSpacing: number;
  yAxisLeftSpacing: number;
  yAxisTopSpacing: number;
  yAxisRightSpacing: number;
  yAxisBottomSpacing: number;
}) => { x1: number; x2: number; y1: number; y2: number };

export const getXCoordinates: GetCoordinates = ({
  lineChartXPosition,
  lineChartYPosition,
  canvasHeight,
  canvasWidth,
  customBreakAxis,
  xAxisLeftSpacing,
  xAxisTopSpacing,
  xAxisRightSpacing,
  xAxisBottomSpacing,
  yAxisLeftSpacing,
  yAxisTopSpacing,
  yAxisRightSpacing,
  yAxisBottomSpacing,
}) => {
  const x1 =
    lineChartYPosition === Positions.LEFT ? Math.max(yAxisLeftSpacing, xAxisLeftSpacing) : 0;
  const x2 =
    lineChartYPosition === Positions.RIGHT
      ? canvasWidth - Math.max(yAxisRightSpacing, xAxisRightSpacing)
      : canvasWidth;

  if (lineChartXPosition === Positions.TOP) {
    return {
      x1,
      x2,
      y1: Math.max(yAxisTopSpacing, xAxisTopSpacing),
      y2: Math.max(yAxisTopSpacing, xAxisTopSpacing),
    };
  }
  if (lineChartXPosition === Positions.CENTER) {
    return { x1, x2, y1: canvasHeight / 2, y2: canvasHeight / 2 };
  }
  if (lineChartXPosition === Positions.CUSTOM) {
    return { x1, x2, y1: customBreakAxis, y2: customBreakAxis };
  }
  // BOTTOM
  return {
    x1,
    x2,
    y1: canvasHeight - Math.max(yAxisBottomSpacing, xAxisBottomSpacing),
    y2: canvasHeight - Math.max(yAxisBottomSpacing, xAxisBottomSpacing),
  };
};

export const getYCoordinates: GetCoordinates = ({
  lineChartXPosition,
  lineChartYPosition,
  canvasHeight,
  canvasWidth,
  customBreakAxis,
  xAxisLeftSpacing,
  xAxisTopSpacing,
  xAxisRightSpacing,
  xAxisBottomSpacing,
  yAxisLeftSpacing,
  yAxisTopSpacing,
  yAxisRightSpacing,
  yAxisBottomSpacing,
}) => {
  const y1 = lineChartXPosition === Positions.TOP ? Math.max(yAxisTopSpacing, xAxisTopSpacing) : 0;
  const y2 =
    lineChartXPosition === Positions.BOTTOM
      ? canvasHeight - Math.max(yAxisBottomSpacing, xAxisBottomSpacing)
      : canvasHeight;
  if (lineChartYPosition === Positions.RIGHT) {
    return {
      x1: canvasWidth - Math.max(yAxisRightSpacing, xAxisRightSpacing),
      x2: canvasWidth - Math.max(yAxisRightSpacing, xAxisRightSpacing),
      y1,
      y2,
    };
  }
  if (lineChartYPosition === Positions.CENTER) {
    return { x1: canvasWidth / 2, x2: canvasWidth / 2, y1, y2 };
  }
  if (lineChartYPosition === Positions.CUSTOM) {
    return { x1: customBreakAxis, x2: customBreakAxis, y1, y2 };
  }
  // LEFT
  return {
    x1: Math.max(yAxisLeftSpacing, xAxisLeftSpacing),
    x2: Math.max(yAxisLeftSpacing, xAxisLeftSpacing),
    y1,
    y2,
  };
};
