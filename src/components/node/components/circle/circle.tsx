import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { NodeProps } from '../../node.types';

const CircleComponent: ForwardRefRenderFunction<SVGCircleElement, NodeProps> = (
  { dataTestId, position, size = 1, ...props },
  ref
): React.JSX.Element => {
  return (
    <circle
      {...props}
      ref={ref}
      cx={position?.x}
      cy={position?.y}
      data-testid={`${dataTestId}-circle`}
      r={size / 2}
    />
  );
};

export const Circle = forwardRef(CircleComponent) as (
  props: NodeProps & {
    ref?: ForwardedRef<SVGSVGElement>;
  }
) => React.JSX.Element;
