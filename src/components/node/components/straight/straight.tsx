import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { NodeProps } from '../../node.types';

const StraightComponent: ForwardRefRenderFunction<SVGPathElement, NodeProps> = (
  { dataTestId, position = { x: 0, y: 0 }, size = 1, ...props },
  ref
): JSX.Element => {
  const d = `M ${position.x - size / 2} ${position.y} H ${position.x + size / 2} M ${position.x} ${position.y - size / 2} V ${position.y + size / 2}`;
  return <path {...props} ref={ref} d={d} data-testid={`${dataTestId}-straight`} strokeWidth={2} />;
};

export const Straight = forwardRef(StraightComponent) as (
  props: NodeProps & {
    ref?: ForwardedRef<SVGSVGElement>;
  }
) => JSX.Element;
