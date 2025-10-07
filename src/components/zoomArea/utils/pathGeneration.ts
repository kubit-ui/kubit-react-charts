import type { IZoomAreaDataPoint, ZoomAreaLineConfig } from '../zoomArea.type';

/**
 * Path generation utilities for ZoomArea SVG rendering
 */

/**
 * Generates smooth curved path using simplified Bézier curves.
 *
 * This implementation is based on LineChart's curve algorithm but optimized for performance
 * in the ZoomArea context. Uses cubic Bézier curves with control points positioned at 30%
 * of the horizontal distance between consecutive points.
 *
 * @param points - Array of [x, y] coordinates representing the line points
 * @returns SVG path string with curved segments (e.g., "M 0 10 C 3 10, 7 20, 10 20")
 *
 * @example
 * ```typescript
 * const points: Array<[number, number]> = [[0, 10], [10, 20], [20, 15]];
 * const curvedPath = generateCurvedPath(points);
 * // Returns: "M 0 10 C 3 10, 7 20, 10 20 C 13 20, 17 15, 20 15"
 * ```
 */
export const generateCurvedPath = (points: Array<[number, number]>): string => {
  if (points.length === 0) {return '';}
  if (points.length === 1) {return `M ${points[0][0]} ${points[0][1]}`;}

  const [firstPoint, ...remainingPoints] = points;
  let path = `M ${firstPoint[0]} ${firstPoint[1]}`;

  remainingPoints.forEach((point, i) => {
    const start = i === 0 ? firstPoint : remainingPoints[i - 1];
    const [x1, y1] = start;
    const [x2, y2] = point;

    // Control points calculation (same as LineChart but simplified factor)
    const dx = (x2 - x1) * 0.3;
    const controlPoint1 = [x1 + dx, y1];
    const controlPoint2 = [x2 - dx, y2];

    path += ` C ${controlPoint1[0]} ${controlPoint1[1]}, ${controlPoint2[0]} ${controlPoint2[1]}, ${x2} ${y2}`;
  });

  return path;
};

/**
 * Calculates path data for all lines with unified Y-scale, supporting both curved and straight lines.
 *
 * This function processes multiple line configurations and generates SVG path strings for each line.
 * All lines share the same Y-scale to maintain visual consistency when comparing different datasets.
 *
 * **Y-scaling behavior:** Uses padding to prevent lines from touching chart bounds, similar to LineChart.
 * The effective chart area is reduced by 10% (5% top + 5% bottom) to provide visual breathing room.
 *
 * @param data - Array of data points containing values for all lines
 * @param lines - Configuration for each line including styling and curve settings
 * @param width - Canvas width for scaling X coordinates
 * @param height - Canvas height for scaling Y coordinates
 * @returns Array of objects containing line and fill paths with their configurations
 *
 * @example
 * ```typescript
 * const result = calculateLinesPathData(
 *   [{ month: 'Jan', sales: 100, profit: 20 }, { month: 'Feb', sales: 150, profit: 30 }],
 *   [
 *     { yKey: 'sales', stroke: '#blue', curved: true },
 *     { yKey: 'profit', stroke: '#red', curved: false }
 *   ],
 *   400, // width
 *   100  // height
 * );
 * // Returns: [{ linePath: "M 0 80 C...", fillPath: "", config: {...} }, ...]
 * ```
 */
export const calculateLinesPathData = (
  data: IZoomAreaDataPoint[],
  lines: ZoomAreaLineConfig[],
  width: number,
  height: number
): Array<{
  linePath: string;
  fillPath: string;
  config: ZoomAreaLineConfig;
}> => {
  if (data.length === 0 || lines.length === 0) {return [];}

  // Add padding to prevent lines from touching chart bounds (similar to LineChart behavior)
  const yPaddingPercent = 0.05; // 5% padding top and bottom
  const yPadding = height * yPaddingPercent;
  const effectiveHeight = height - 2 * yPadding;

  // Get min/max values for scaling across all lines for consistent Y scale
  const allYValues = lines.flatMap(line => data.map(d => Number(d[line.yKey])));
  const minY = Math.min(...allYValues);
  const maxY = Math.max(...allYValues);
  const yRange = maxY - minY || 1;

  return lines.map(lineConfig => {
    // Create path points for this specific line
    const pathPoints: Array<[number, number]> = data.map((d, index) => {
      const x = (index / Math.max(1, data.length - 1)) * width;
      // Apply padding and scale within the effective height
      const y =
        yPadding +
        effectiveHeight -
        ((Number(d[lineConfig.yKey]) - minY) / yRange) * effectiveHeight;
      return [x, y];
    });

    // Generate line path - curved or straight based on config
    const linePath = lineConfig.curved
      ? generateCurvedPath(pathPoints)
      : `M ${pathPoints.map(([x, y]) => `${x},${y}`).join(' L ')}`;

    // Generate fill path if needed
    let fillPath = '';
    if (lineConfig.fill) {
      // For fill, extend to the bottom of the chart (full height)
      fillPath = lineConfig.curved
        ? `${generateCurvedPath(pathPoints)} L ${width} ${height} L 0 ${height} Z`
        : `${linePath} L ${width},${height} L 0,${height} Z`;
    }

    return {
      config: lineConfig,
      fillPath,
      linePath,
    };
  });
};
