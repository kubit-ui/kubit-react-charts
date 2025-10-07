import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { NodeProps } from '../../node.types';
import { calculateShapePoints } from '../../utils/calculateShapePoints/calculateShapePoints';

const HexagonComponent: ForwardRefRenderFunction<SVGPolygonElement, NodeProps> = (
  { dataTestId, position = { x: 0, y: 0 }, size = 1, ...props },
  ref
): JSX.Element => {
  const hexagonPoints = calculateShapePoints(position.x, position.y, 6, size / 2, size / 2);
  return (
    <polygon {...props} ref={ref} data-testid={`${dataTestId}-hexagon`} points={hexagonPoints} />
  );
};

export const Hexagon = forwardRef(HexagonComponent) as (
  props: NodeProps & {
    ref?: ForwardedRef<SVGSVGElement>;
  }
) => JSX.Element;
