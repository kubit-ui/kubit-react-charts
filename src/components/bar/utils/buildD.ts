import { BarOrientation, type BarProps } from '../bar.type';

type GetSegmentProps = Omit<BarProps, 'barConfig' | 'order' | 'extraSpacing'> & {
  barWidth: number;
  order: number;
  extraSpacing: number;
};

interface LocateFromPositionProps {
  order: number;
  currentBars: number;
  barWidth: number;
  extraSpacing: number;
  orientation: (typeof BarOrientation)[keyof typeof BarOrientation];
}

const locateFromPosition = ({
  barWidth,
  currentBars,
  extraSpacing,
  order,
  orientation,
}: LocateFromPositionProps) => {
  const halfWidth = barWidth / 2;
  const gap = extraSpacing / 2;
  const isEven = currentBars % 2 === 0;
  // calculate the space between the bars
  const ajustedSpace = isEven ? gap : gap + halfWidth;
  // calculate the center of the bars
  const center = Math.ceil(currentBars / 2);
  // calculate the current position of the bar
  const currentPosition = order - center;
  // calculate the start reference based on the current position
  let startReference = 0;
  if (currentPosition === 0) {
    startReference = isEven ? -gap : halfWidth;
  } else if (currentPosition < 0) {
    if (orientation === BarOrientation.HORIZONTAL) {
      startReference = currentPosition * -ajustedSpace + barWidth;
    } else {
      startReference = currentPosition * ajustedSpace;
    }
  } else if (currentPosition > 0) {
    if (orientation === BarOrientation.HORIZONTAL) {
      startReference = currentPosition * -ajustedSpace;
    } else {
      startReference = currentPosition * ajustedSpace + barWidth;
    }
  }
  return startReference;
};

export const buildD = ({
  barWidth,
  currentBars,
  endRounded = 0,
  extraSpacing,
  order,
  orientation,
  startRounded = 0,
  x1,
  x2,
  y1,
  y2,
}: GetSegmentProps): string => {
  // declare the variables for the path
  let start, draw1, draw2, draw3;
  let end = 'Z';
  // get the reference for the start of the draw
  const startReference = locateFromPosition({
    barWidth,
    currentBars,
    extraSpacing,
    order,
    orientation,
  });
  /**
   * M = moove to (x, y)
   * L = line to (x, y)
   * Q = quadratic curve to (x curve deep, y curve deep), (end draw x, end draw y)
   */
  if (orientation === BarOrientation.HORIZONTAL) {
    // calculate the start and end of the quadratic curve in horizontal orientation
    const modifyXStart = x1 + startRounded;
    const modifyXEnd = x2 - endRounded;
    if (startRounded && endRounded) {
      start = `M ${modifyXStart},${y1 + startReference}`;
      draw1 = `L${modifyXEnd},${y2 + startReference}`;
      draw2 = `Q${x2 + endRounded} ${y2 + startReference - barWidth / 2}, ${modifyXEnd} ${y2 + startReference - barWidth}`;
      draw3 = `L${modifyXStart},${y1 + startReference - barWidth}`;
      end = `Q${x1 - startRounded} ${y1 + startReference - barWidth / 2}, ${modifyXStart} ${y1 + startReference}`;
    } else if (startRounded) {
      start = `M ${modifyXStart},${y1 + startReference}`;
      draw1 = `L${x2},${y2 + startReference}`;
      draw2 = `L${x2},${y2 + startReference - barWidth}`;
      draw3 = `L${modifyXStart},${y1 + startReference - barWidth}`;
      end = `Q${x1 - startRounded} ${y1 + startReference - barWidth / 2}, ${modifyXStart} ${y1 + startReference}`;
    } else if (endRounded) {
      start = `M${x1},${y1 + startReference}`;
      draw1 = `L${modifyXEnd},${y2 + startReference}`;
      draw2 = `Q${x2 + endRounded} ${y2 + startReference - barWidth / 2}, ${modifyXEnd} ${y2 + startReference - barWidth}`;
      draw3 = `L${x1},${y1 + startReference - barWidth}`;
    } else {
      start = `M${x1},${y1 + startReference}`;
      draw1 = `L${x2},${y2 + startReference}`;
      draw2 = `L${x2},${y2 + startReference - barWidth}`;
      draw3 = `L${x1},${y1 + startReference - barWidth}`;
    }
  } else {
    // calculate the start and end of the quadratic curve in vertical orientation
    const modifyYStart = y1 - startRounded;
    const modifyYEnd = y2 + endRounded;
    if (startRounded && endRounded) {
      start = `M${x1 + startReference}, ${modifyYStart}`;
      draw1 = `L${x2 + startReference},${modifyYEnd}`;
      draw2 = `Q${x2 + startReference - barWidth / 2} ${y2 - endRounded}, ${x2 + startReference - barWidth} ${modifyYEnd}`;
      draw3 = `L${x1 + startReference - barWidth},${modifyYStart}`;
      end = `Q${x1 + startReference - barWidth / 2} ${y1 + startRounded}, ${x1 + startReference} ${modifyYStart}`;
    } else if (startRounded) {
      start = `M${x1 + startReference}, ${modifyYStart}`;
      draw1 = `L${x2 + startReference},${y2}`;
      draw2 = `L${x2 + startReference - barWidth},${y2}`;
      draw3 = `L${x1 + startReference - barWidth},${modifyYStart}`;
      end = `Q${x1 + startReference - barWidth / 2} ${y1 + startRounded}, ${x1 + startReference} ${modifyYStart}`;
    } else if (endRounded) {
      start = `M${x1 + startReference},${y1}`;
      draw1 = `L${x2 + startReference},${modifyYEnd}`;
      draw2 = `Q${x2 + startReference - barWidth / 2} ${y2 - endRounded}, ${x2 + startReference - barWidth} ${modifyYEnd}`;
      draw3 = `L${x2 + startReference - barWidth},${y1}`;
    } else {
      start = `M${x1 + startReference},${y1}`;
      draw1 = `L${x2 + startReference},${y2}`;
      draw2 = `L${x2 + startReference - barWidth},${y2}`;
      draw3 = `L${x1 + startReference - barWidth},${y1}`;
    }
  }

  return `${start} ${draw1} ${draw2} ${draw3} ${end}`;
};
