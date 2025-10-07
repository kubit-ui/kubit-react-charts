import { calculatePoint } from './calculatePoint';
import { drawSegmentPath } from './drawSegmentPath';
import { type RotateDirection, rotationDirection } from './rotationDirection';

interface CalculateSegmanentPathProps {
  value: number;
  total: number;
  startAngle: React.MutableRefObject<number>;
  canvasWidth: number;
  canvasHeight: number;
  innerRadius: number;
  gap: number;
  customRadius?: number | null;
  singleStroke: boolean;
  halfChart?: boolean;
  rotateDirection?: (typeof RotateDirection)[keyof typeof RotateDirection];
}

/**
 * Calculates the SVG path for a segment of a pie chart.
 *
 * @param {Object} params - The parameters for the segment path calculation.
 * @param {number} params.value - The value of the segment.
 * @param {number} params.total - The total value of all segments.
 * @param {Object} params.startAngle - The starting angle for the segment.
 * @param {number} params.canvasWidth - The width of the canvas.
 * @param {number} params.canvasHeight - The height of the canvas.
 * @param {number} params.innerRadius - The inner radius of the segment.
 * @param {number} params.gap - The gap between segments.
 * @param {number} [params.customRadius] - A custom radius for the segment.
 * @param {boolean} params.singleStroke - Whether the segment is a single stroke.
 * @param {boolean} params.halfChart - Whether the chart is a half chart.
 * @param {string} params.rotateDirection - The direction of rotation for the segment.
 * @returns {string} The SVG path for the segment.
 */
export const calculateSegmentPath = ({
  canvasHeight,
  canvasWidth,
  customRadius,
  gap,
  halfChart,
  innerRadius,
  rotateDirection,
  singleStroke,
  startAngle,
  total,
  value,
}: CalculateSegmanentPathProps): string => {
  const segmentCanvasHeight = halfChart ? canvasHeight * 2 : canvasHeight;
  const maxRadius = Math.min(canvasWidth, segmentCanvasHeight) / 2;
  const radius = customRadius && customRadius < maxRadius ? customRadius : maxRadius;
  const maxAngle = halfChart ? Math.PI : 2 * Math.PI; // ? 180deg : 360deg
  const center = { x: canvasWidth / 2, y: halfChart ? canvasHeight : canvasHeight / 2 };

  // Total * 2 is needed when a single stroke is used, to prevent the segment from being drawn as a full circle
  const segmentTotal = singleStroke ? total * 2 : total;
  const piePortion = (value * 100) / segmentTotal;
  const angleEquivalent = (piePortion * maxAngle) / 100;
  const gapAngle = gap / radius;

  const { carryAngle, finalAngle, initialAngle } = rotationDirection({
    angleEquivalent,
    direction: rotateDirection,
    gapAngle,
    startAngle: startAngle.current,
  });
  startAngle.current = carryAngle;
  const segmentAngle = (maxAngle * value) / segmentTotal;

  const largeArcFlag = segmentAngle - gapAngle <= Math.PI ? '0' : '1';

  const innerStart = calculatePoint(center, innerRadius, initialAngle);
  const innerEnd = calculatePoint(center, innerRadius, finalAngle);
  const outerStart = calculatePoint(center, radius, initialAngle);
  const outerEnd = calculatePoint(center, radius, finalAngle);

  return drawSegmentPath({
    center,
    innerEnd,
    innerRadius,
    innerStart,
    largeArcFlag,
    outerEnd,
    outerStart,
    radius,
    rotateDirection,
    singleStroke,
  });
};
