import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { PlotShapeProps } from '../../plot.types';

const SquareComponent: ForwardRefRenderFunction<SVGRectElement, PlotShapeProps> = (
  { dataTestId, position, size, ...props },
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
  props: PlotShapeProps & {
    ref?: ForwardedRef<SVGElement>;
  }
) => React.JSX.Element;
