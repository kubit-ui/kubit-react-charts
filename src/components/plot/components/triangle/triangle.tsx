import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { PlotShapeProps } from '../../plot.types';

const TriangleComponent: ForwardRefRenderFunction<SVGPolygonElement, PlotShapeProps> = (
  { dataTestId, position, size, ...props },
  ref
): React.JSX.Element => {
  // Create an isosceles triangle where both width and height are size*2
  // This maintains consistency with the circle and square Plots
  const halfWidth = size / 2;
  const height = size;

  const topPoint = `${position.x},${position.y - height / 2}`;
  const bottomLeft = `${position.x - halfWidth},${position.y + height / 2}`;
  const bottomRight = `${position.x + halfWidth},${position.y + height / 2}`;

  const trianglePoints = `${topPoint} ${bottomLeft} ${bottomRight}`;

  return (
    <polygon {...props} ref={ref} data-testid={`${dataTestId}-triangle`} points={trianglePoints} />
  );
};

export const Triangle = forwardRef(TriangleComponent) as (
  props: PlotShapeProps & {
    ref?: ForwardedRef<SVGElement>;
  }
) => React.JSX.Element;
