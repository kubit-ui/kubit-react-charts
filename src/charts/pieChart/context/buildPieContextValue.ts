import { Children, type ReactNode, isValidElement } from 'react';

import type { PathProps } from '@/components/path/path.types';
import { parseStringToNumberPx } from '@/utils/parseStringToNumberPx.ts/parseStringToNumberPx';

import { PieChartPath } from '../fragments/pieChartPath';
import type { PieChartChildrenType, PieChartContextType } from '../pieChart.type';

interface BuildPieContextValueProps {
  children: PieChartChildrenType;
  canvasWidth: number;
  canvasHeight: number;
  halfChart?: boolean;
}

/**
 * Builds the context value for the PieChart component.
 *
 * @param {BuildPieContextValueProps} props - The props for building the context value.
 * @returns {Omit<PieChartContextType, 'canvasHeight' | 'canvasWidth' | 'data'>} The context value.
 */

export const buildPieContextValue = ({
  canvasHeight,
  canvasWidth,
  children,
  halfChart,
}: BuildPieContextValueProps): Omit<
  PieChartContextType,
  'canvasHeight' | 'canvasWidth' | 'data'
> => {
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
  const x = canvasWidth / 2;
  const y = halfChart ? canvasHeight : canvasHeight / 2;

  return {
    foreignObject: {
      height,
      width,
      x: x - width / 2,
      y: halfChart ? y - height : y - height / 2,
    },
  };
};
