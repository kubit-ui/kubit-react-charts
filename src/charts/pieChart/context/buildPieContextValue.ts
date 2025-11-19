import { Children, type ReactNode, isValidElement } from 'react';

import type { PathProps } from '@/components/path/path.types';
import type { ChartError, ErrorType } from '@/types/errors.type';
import { buildCanvasDimensionsError } from '@/utils/buildErrors/buildErrors';
import { parseStringToNumberPx } from '@/utils/parseStringToNumberPx.ts/parseStringToNumberPx';

import { CHART_CANVAS_DEFAULTS } from '../../constants/chartDefaults';
import { PieChartPath } from '../fragments/pieChartPath';
import type { PieChartChildrenType, PieChartContextType } from '../pieChart.type';

interface BuildPieContextValueProps {
  children: PieChartChildrenType;
  canvasWidth: number;
  canvasHeight: number;
  halfChart?: boolean;
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}

/**
 * Builds the context value for the PieChart component.
 *
 * @param {BuildPieContextValueProps} props - The props for building the context value.
 * @returns {Omit<PieChartContextType, 'canvasHeight' | 'canvasWidth' | 'data'>} The context value.
 */

export const buildPieContextValue = ({
  addError,
  canvasHeight,
  canvasWidth,
  children,
  halfChart,
}: BuildPieContextValueProps): Omit<
  PieChartContextType,
  'canvasHeight' | 'canvasWidth' | 'data'
> => {
  // Validate canvas dimensions
  if (canvasWidth <= 0 || canvasHeight <= 0) {
    addError?.('PIE_CHART_CONTEXT_ERROR', {
      error: buildCanvasDimensionsError(canvasWidth, canvasHeight),
    });
  }

  // Use safe canvas dimensions with defaults if invalid
  const safeCanvasWidth = canvasWidth > 0 ? canvasWidth : CHART_CANVAS_DEFAULTS.SAFE_WIDTH;
  const safeCanvasHeight = canvasHeight > 0 ? canvasHeight : CHART_CANVAS_DEFAULTS.SAFE_HEIGHT;

  // Use the min inner radious of the paths to calculate the size
  let minRadius: number | undefined = undefined;
  let foreignObjectSize: number | undefined = undefined;

  Children.forEach(children, (child: ReactNode) => {
    if (!isValidElement(child)) {
      return;
    }
    if (child.type === PieChartPath) {
      const { innerRadius } = child.props as PathProps;
      if (!innerRadius) {
        return;
      }
      const parsedInnerRadius = parseStringToNumberPx(innerRadius);
      if (!minRadius || parsedInnerRadius < minRadius) {
        minRadius = parsedInnerRadius;
      }
    }
  });
  if (minRadius) {
    foreignObjectSize = minRadius * 2;
  }
  const sizeFixed = foreignObjectSize ?? 0;
  const height = halfChart ? sizeFixed / 2 : sizeFixed;
  const width = sizeFixed;
  const x = safeCanvasWidth / 2;
  const y = halfChart ? safeCanvasHeight : safeCanvasHeight / 2;

  return {
    addError,
    foreignObject: {
      height,
      width,
      x: x - width / 2,
      y: halfChart ? y - height : y - height / 2,
    },
  };
};
