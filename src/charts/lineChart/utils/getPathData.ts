interface GetPathDataParamsType {
  points: [number, number][];
  curved?: boolean;
  svgHeight: number;
  extendToBottom?: boolean;
}

/**
 * Generates SVG path data from an array of points.
 * @param points - An array of points, where each point is an array of two numbers representing the x and y coordinates.
 * @param curved - A boolean indicating whether the path should be a cubic Bezier curve (true) or a straight line (false). Defaults to false.
 * @param svgWidth - The width of the SVG container.
 * @param svgHeight - The height of the SVG container.
 * @param extendToBottom - A boolean indicating whether the path should extend to the bottom of the SVG container. Defaults to false.
 * @returns The SVG path data as a string.
 */
export const getPathData = ({
  curved = false,
  extendToBottom = false,
  points,
  svgHeight,
}: GetPathDataParamsType): string => {
  if (points.length === 0) {return '';}

  const [firstPoint, ...remainingPoints] = points;
  let pathData = `M ${firstPoint[0]} ${firstPoint[1]}`;

  if (curved) {
    pathData += remainingPoints.reduce((data, point, i) => {
      const [x1, y1] = points[i];
      const [x2, y2] = point;
      const dx = (x2 - x1) * 0.3;
      const controlPoint1 = [x1 + dx, y1];
      const controlPoint2 = [x2 - dx, y2];
      return `${data} C ${controlPoint1[0]} ${controlPoint1[1]}, ${controlPoint2[0]} ${controlPoint2[1]}, ${x2} ${y2}`;
    }, '');
  } else {
    pathData += remainingPoints.reduce((data, point) => `${data} L ${point[0]} ${point[1]}`, '');
  }

  if (extendToBottom) {
    pathData += ` L ${remainingPoints[remainingPoints.length - 1][0]} ${svgHeight} L ${firstPoint[0]} ${svgHeight} Z`;
  }

  return pathData;
};
