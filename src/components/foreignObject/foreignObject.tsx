import type { FC } from 'react';

import type { ForeignObjectProps } from './foreignObject.types';

export const ForeignObject: FC<ForeignObjectProps> = ({
  children,
  dataTestId,
  height,
  width,
  x,
  y,
}: ForeignObjectProps) => {
  return (
    <foreignObject data-testid={dataTestId} height={height} width={width} x={x} y={y}>
      {children}
    </foreignObject>
  );
};
