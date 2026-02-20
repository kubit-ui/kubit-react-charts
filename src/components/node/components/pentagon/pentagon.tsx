import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { NodeProps } from '../../node.types';
import { calculateShapePoints } from '../../utils/calculateShapePoints/calculateShapePoints';

const PentagonComponent: ForwardRefRenderFunction<SVGPolygonElement, NodeProps> = (
  { dataTestId, position = { x: 0, y: 0 }, size = 1, ...props },
  ref
): React.JSX.Element => {
  const pentagonPoints = calculateShapePoints(position.x, position.y, 5, size / 2, size / 2);
  return (
    <polygon {...props} ref={ref} data-testid={`${dataTestId}-pentagon`} points={pentagonPoints} />
  );
};

export const Pentagon = forwardRef(PentagonComponent) as (
  props: NodeProps & {
    ref?: ForwardedRef<SVGSVGElement>;
  }
) => React.JSX.Element;
