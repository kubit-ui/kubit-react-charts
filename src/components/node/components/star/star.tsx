import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { NodeProps } from '../../node.types';
import { calculateShapePoints } from '../../utils/calculateShapePoints/calculateShapePoints';

const StarComponent: ForwardRefRenderFunction<SVGPolygonElement, NodeProps> = (
  { dataTestId, position = { x: 0, y: 0 }, size = 1, ...props },
  ref
): React.JSX.Element => {
  const outerRadius = size / 2;
  const innerRadius = outerRadius / 2;
  const starPoints = calculateShapePoints(position.x, position.y, 5, outerRadius, innerRadius);
  return <polygon {...props} ref={ref} data-testid={`${dataTestId}-star`} points={starPoints} />;
};

export const Star = forwardRef(StarComponent) as (
  props: NodeProps & {
    ref?: ForwardedRef<SVGSVGElement>;
  }
) => React.JSX.Element;
