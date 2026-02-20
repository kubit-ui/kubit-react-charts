import { type FC, useContext, useEffect } from 'react';

import {
  buildProjectionBoundsError,
  buildProjectionXOutOfRangeError,
  buildProjectionYOutOfRangeError,
} from '@/utils/buildErrors/charts/buildLineChartErrors';

import { LineChartContext } from '../context/lineChartContext';
import type { LineChartProjectionProps } from '../lineChart.type';
import { getProjection } from '../utils/getProjection';
import './lineChartPath.css';

export const LineChartProjection: FC<LineChartProjectionProps> = ({
  curved,
  lineProjection,
  points,
  svgHeight,
}): React.JSX.Element => {
  const { addError } = useContext(LineChartContext);
  const { lower, shapeColor, upper } = lineProjection;
  const { xProjection: xUp, yProjection: yUp, ...upperProps } = upper || {};
  const { xProjection: xDw, yProjection: yDw, ...lowerProps } = lower || {};
  const upperProjection = xUp || yUp ? { x: xUp, y: yUp } : undefined;
  const lowerProjection = xDw || yDw ? { x: xDw, y: yDw } : undefined;

  // Extract values for stable dependencies
  const upperY = upperProjection?.y;
  const lowerY = lowerProjection?.y;
  const upperX = upperProjection?.x;
  const lowerX = lowerProjection?.x;

  // Projection error validations
  useEffect(() => {
    // Invalid projection bounds - upper/lower overlap
    if (upperProjection && lowerProjection) {
      const upperYVal = upperY || 0;
      const lowerYVal = lowerY || 0;

      if (upperYVal >= lowerYVal) {
        addError?.('LINE_CHART_PROJECTION_ERROR', {
          error: buildProjectionBoundsError(upperYVal, lowerYVal),
        });
      }
    }

    // Projection coordinates outside chart area
    if (upperProjection) {
      if (upperX !== undefined && (upperX < 0 || upperX > 100)) {
        addError?.('LINE_CHART_PROJECTION_ERROR', {
          error: buildProjectionXOutOfRangeError(upperX, true),
        });
      }

      if (upperY !== undefined && (upperY < 0 || upperY > svgHeight)) {
        addError?.('LINE_CHART_PROJECTION_ERROR', {
          error: buildProjectionYOutOfRangeError(upperY, svgHeight, true),
        });
      }
    }

    if (lowerProjection) {
      if (lowerX !== undefined && (lowerX < 0 || lowerX > 100)) {
        addError?.('LINE_CHART_PROJECTION_ERROR', {
          error: buildProjectionXOutOfRangeError(lowerX, false),
        });
      }

      if (lowerY !== undefined && (lowerY < 0 || lowerY > svgHeight)) {
        addError?.('LINE_CHART_PROJECTION_ERROR', {
          error: buildProjectionYOutOfRangeError(lowerY, svgHeight, false),
        });
      }
    }
  }, [lowerProjection, lowerX, lowerY, svgHeight, upperProjection, upperX, upperY]);

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
