import { Positions } from '@/types/position.enum';

interface GetCoordinatesProps {
  position: (typeof Positions)[keyof typeof Positions];
  canvasHeight: number;
  canvasWidth: number;
  extraSpaceLeftX: number;
  extraSpaceRightX: number;
  extraSpaceTopY: number;
  extraSpaceBottomY: number;
  securityYSpace: number;
  customBreakAxis: number;
}

interface GetCoordinatesReturn {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

/**
 * Calculates the X coordinates for drawing lines in a chart.
 * @param position - The position of the line.
 * @param canvasHeight - The height of the canvas.
 * @param canvasWidth - The width of the canvas.
 * @param extraSpaceLeftX - The extra space on the left side of the chart.
 * @param extraSpaceRightX - The extra space on the right side of the chart.
 * @param extraSpaceTopY - The extra space on the top side of the chart.
 * @param extraSpaceBottomY - The extra space on the bottom side of the chart.
 * @param customBreakAxis - The custom break axis value.
 * @returns The X coordinates for drawing lines.
 */
export const getXCoordinates = ({
  canvasHeight,
  canvasWidth,
  customBreakAxis,
  extraSpaceBottomY,
  extraSpaceLeftX,
  extraSpaceRightX,
  extraSpaceTopY,
  position,
}: GetCoordinatesProps): GetCoordinatesReturn => {
  if (position === Positions.TOP) {
    return {
      x1: extraSpaceLeftX,
      x2: canvasWidth - extraSpaceRightX,
      y1: extraSpaceTopY,
      y2: extraSpaceTopY,
    };
  }
  if (position === Positions.CENTER) {
    return {
      x1: extraSpaceLeftX,
      x2: canvasWidth - extraSpaceRightX,
      y1: canvasHeight / 2,
      y2: canvasHeight / 2,
    };
  }
  if (position === Positions.CUSTOM) {
    return {
      x1: extraSpaceLeftX,
      x2: canvasWidth - extraSpaceRightX,
      y1: customBreakAxis,
      y2: customBreakAxis,
    };
  }
  return {
    x1: extraSpaceLeftX,
    x2: canvasWidth - extraSpaceRightX,
    y1: canvasHeight - extraSpaceBottomY,
    y2: canvasHeight - extraSpaceBottomY,
  };
};

/**
 * Calculates the y-coordinates for drawing lines in a chart.
 *
 * @param position - The position of the line (RIGHT, CENTER, CUSTOM).
 * @param canvasHeight - The height of the canvas.
 * @param canvasWidth - The width of the canvas.
 * @param extraSpaceLeftX - The extra space on the left side of the chart.
 * @param extraSpaceRightX - The extra space on the right side of the chart.
 * @param extraSpaceTopY - The extra space on the top of the chart.
 * @param extraSpaceBottomY - The extra space on the bottom of the chart.
 * @param customBreakAxis - The custom break axis position (used when position is CUSTOM).
 * @returns The y-coordinates for drawing lines in the chart.
 */
export const getYCoordinates = ({
  canvasHeight,
  canvasWidth,
  customBreakAxis,
  extraSpaceBottomY,
  extraSpaceLeftX,
  extraSpaceRightX,
  extraSpaceTopY,
  position,
}: GetCoordinatesProps): GetCoordinatesReturn => {
  if (position === Positions.RIGHT) {
    return {
      x1: canvasWidth - extraSpaceRightX,
      x2: canvasWidth - extraSpaceRightX,
      y1: extraSpaceTopY,
      y2: canvasHeight - extraSpaceBottomY,
    };
  }
  if (position === Positions.CENTER) {
    return {
      x1: canvasWidth / 2,
      x2: canvasWidth / 2,
      y1: extraSpaceTopY,
      y2: canvasHeight - extraSpaceBottomY,
    };
  }
  if (position === Positions.CUSTOM) {
    return {
      x1: customBreakAxis,
      x2: customBreakAxis,
      y1: extraSpaceTopY,
      y2: canvasHeight - extraSpaceBottomY,
    };
  }

  return {
    x1: extraSpaceLeftX,
    x2: extraSpaceLeftX,
    y1: extraSpaceTopY,
    y2: canvasHeight - extraSpaceBottomY,
  };
};
