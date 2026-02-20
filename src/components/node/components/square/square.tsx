import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { NodeProps } from '../../node.types';

const SquareComponent: ForwardRefRenderFunction<SVGRectElement, NodeProps> = (
  { dataTestId, position = { x: 0, y: 0 }, size = 1, ...props },
  ref
): React.JSX.Element => {
  return (
    <rect
      {...props}
      ref={ref}
      data-testid={`${dataTestId}-square`}
      height={size}
      width={size}
      x={position.x - size / 2}
      y={position.y - size / 2}
    />
  );
};

export const Square = forwardRef(SquareComponent) as (
  props: NodeProps & {
    ref?: ForwardedRef<SVGSVGElement>;
  }
) => React.JSX.Element;
