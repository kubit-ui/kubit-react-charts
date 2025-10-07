import type { FC } from 'react';

import type { LineChartProjectionProps } from '../lineChart.type';
import { getProjection } from '../utils/getProjection';
import './lineChartPath.css';

export const LineChartProjection: FC<LineChartProjectionProps> = ({
  curved,

  lineProjection,
  points,
  svgHeight,
}): JSX.Element => {
  const { lower, shapeColor, upper } = lineProjection;
  const { xProjection: xUp, yProjection: yUp, ...upperProps } = upper || {};
  const { xProjection: xDw, yProjection: yDw, ...lowerProps } = lower || {};
  const upperProjection = xUp || yUp ? { x: xUp, y: yUp } : undefined;
  const lowerProjection = xDw || yDw ? { x: xDw, y: yDw } : undefined;

  const { downPath, shapePath, upPath } = getProjection({
    curved,
    lowerProjection,
    points,
    svgHeight,
    upperProjection,
  });
  return (
    <g className="pointer-events-none">
      <path d={shapePath} fill={shapeColor} stroke="transparent" strokeWidth="0.1" />;
      {upPath && <path d={upPath} {...upperProps} />}
      {downPath && <path d={downPath} {...lowerProps} />}
    </g>
  );
};
