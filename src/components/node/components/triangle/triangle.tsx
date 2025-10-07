import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { NodeProps } from '../../node.types';

const TriangleComponent: ForwardRefRenderFunction<SVGPolygonElement, NodeProps> = (
  { dataTestId, position = { x: 0, y: 0 }, size = 1, ...props },
  ref
): JSX.Element => {
  const points = [
    `${position.x},${position.y - size / 2}`,
    `${position.x - size / 2},${position.y + size / 2}`,
    `${position.x + size / 2},${position.y + size / 2}`,
  ].join(' ');
  return <polygon {...props} ref={ref} data-testid={`${dataTestId}-triangle`} points={points} />;
};

export const Triangle = forwardRef(TriangleComponent) as (
  props: NodeProps & {
    ref?: ForwardedRef<SVGSVGElement>;
  }
) => JSX.Element;
