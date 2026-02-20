import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { PlotShapeProps } from '../../plot.types';

const CircleComponent: ForwardRefRenderFunction<SVGCircleElement, PlotShapeProps> = (
  { dataTestId, position, size, ...props },
  ref
): React.JSX.Element => {
  return (
    <circle
      {...props}
      ref={ref}
      cx={position.x}
      cy={position.y}
      data-testid={`${dataTestId}-circle`}
      r={size / 2}
    />
  );
};

export const Circle = forwardRef(CircleComponent) as (
  props: PlotShapeProps & {
    ref?: ForwardedRef<SVGElement>;
  }
) => React.JSX.Element;
