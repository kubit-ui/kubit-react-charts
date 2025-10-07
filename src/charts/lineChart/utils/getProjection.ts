type PointType = Array<[number, number]>;

interface GetProjectionPropsType {
  points: PointType;
  curved?: boolean;
  svgHeight: number;
  upperProjection?: { x?: number; y?: number };
  lowerProjection?: { x?: number; y?: number };
}

interface GetProjectionReturnType {
  shapePath: string;
  upPath?: string;
  downPath?: string;
}

const addXProjection = (point: number, projection?: number): number => {
  if (!projection) {
    return point;
  }
  const isNegative = projection < 0;
  const diff = Math.abs(projection);
  const pointDiff = (point * diff) / 100;
  return isNegative ? point - pointDiff : point + pointDiff;
};

const addYProjection = (point: number, svgHeight: number, projection?: number): number => {
  if (!projection) {
    return point;
  }
  const isNegative = projection < 0;
  const diff = Math.abs(projection);
  const ref = point === 0 ? svgHeight : point;
  const pointDiff = (ref * diff) / 100;
  return isNegative ? point + pointDiff : point - pointDiff;
};

/**
 * Generates the SVG path data for a line chart with optional upper and lower projections.
 *
 * @param {Object} params - The parameters for generating the projection.
 * @param {PointType[]} params.points - The data points for the line chart.
 * @param {boolean} params.curved - Whether the line should be curved.
 * @param {number} params.svgHeight - The height of the SVG element.
 * @param {ProjectionType} [params.upperProjection] - The upper projection data.
 * @param {ProjectionType} [params.lowerProjection] - The lower projection data.
 * @returns {GetProjectionReturnType} The generated SVG path data.
 */
export const getProjection = ({
  curved,
  lowerProjection,
  points,
  svgHeight,
  upperProjection,
}: GetProjectionPropsType): GetProjectionReturnType => {
  const hasProjections = upperProjection || lowerProjection;
  if (points.length === 0 && !hasProjections) {
    return { shapePath: '' };
  }

  const [firstPoint, ...remainingPoints] = points;
  const startPath = `M ${firstPoint[0]} ${firstPoint[1]}`;
  let shapePath = startPath;
  let upPath = upperProjection ? startPath : undefined;
  let downPath = lowerProjection ? startPath : undefined;
  const upperData: PointType = [];
  const lowerData: PointType = [];

  remainingPoints.forEach(([x, y]) => {
    const lineUp = upperProjection
      ? [addXProjection(x, upperProjection.x), addYProjection(y, svgHeight, upperProjection.y)]
      : [x, y];
    const lineDown = lowerProjection
      ? [
          addXProjection(x, -(lowerProjection.x ?? 0)),
          addYProjection(y, svgHeight, -(lowerProjection.y ?? 0)),
        ]
      : [x, y];
    upperData.push(lineUp as [number, number]);
    lowerData.push(lineDown as [number, number]);
  });

  const hasAllProjections = upperProjection && lowerProjection;
  const combinedData = hasAllProjections
    ? [...upperData, remainingPoints.at(-1), ...lowerData.reverse(), firstPoint]
    : [...upperData, ...lowerData.reverse(), firstPoint];

  if (curved) {
    shapePath += (combinedData as PointType).reduce((data, point, i) => {
      const start = i === 0 ? firstPoint : combinedData[i - 1];
      const [x1, y1] = start as [number, number];
      const [x2, y2] = point;
      const dx = (x2 - x1) * 0.3;
      const controlPoint1 = [x1 + dx, y1];
      const controlPoint2 = [x2 - dx, y2];
      return `${data} C ${controlPoint1[0]} ${controlPoint1[1]}, ${controlPoint2[0]} ${controlPoint2[1]}, ${x2} ${y2}`;
    }, '');
    if (upPath) {
      upPath += upperData.reduce((data, point, i) => {
        const start = i === 0 ? firstPoint : upperData[i - 1];
        const [x1, y1] = start as [number, number];
        const [x2, y2] = point;
        const dx = (x2 - x1) * 0.3;
        const controlPoint1 = [x1 + dx, y1];
        const controlPoint2 = [x2 - dx, y2];
        return `${data} C ${controlPoint1[0]} ${controlPoint1[1]}, ${controlPoint2[0]} ${controlPoint2[1]}, ${x2} ${y2}`;
      }, '');
    }
    if (downPath) {
      downPath += lowerData.reverse().reduce((data, point, i) => {
        const start = i === 0 ? firstPoint : lowerData[i - 1];
        const [x1, y1] = start as [number, number];
        const [x2, y2] = point;
        const dx = (x2 - x1) * 0.3;
        const controlPoint1 = [x1 + dx, y1];
        const controlPoint2 = [x2 - dx, y2];
        return `${data} C ${controlPoint1[0]} ${controlPoint1[1]}, ${controlPoint2[0]} ${controlPoint2[1]}, ${x2} ${y2}`;
      }, '');
    }
  } else {
    shapePath += combinedData.reduce((data, point) => `${data} L ${point?.[0]} ${point?.[1]}`, '');
    if (upPath) {
      upPath += upperData.reduce((data, point) => `${data} L ${point[0]} ${point[1]}`, '');
    }
    if (downPath) {
      downPath += lowerData
        .reverse()
        .reduce((data, point) => `${data} L ${point[0]} ${point[1]}`, '');
    }
  }

  return { downPath, shapePath, upPath };
};
