import { type FC, type ReactElement, useContext } from 'react';

import { ForeignObject } from '@/components/foreignObject/foreignObject';
import type { ForeignObjectProps } from '@/components/foreignObject/foreignObject.types';

import { PieChartContext } from '../context/pieChartContext';

export const PieChartForeign: FC<ForeignObjectProps> = ({
  children,
  dataTestId: childDataTestId,
  height: childHeight,
  width: childWidth,
  x: childX,
  y: childY,
  ...props
}): ReactElement => {
  const { dataTestId: canvasDataTestId, foreignObject } = useContext(PieChartContext);

  const width = !childWidth && foreignObject?.width ? foreignObject.width : childWidth;
  const height = !childHeight && foreignObject?.height ? foreignObject.height : childHeight;
  const x = !childX && foreignObject?.x ? foreignObject.x : childX;
  const y = !childY && foreignObject?.y ? foreignObject.y : childY;
  const dataTestId =
    !childDataTestId && canvasDataTestId ? `${canvasDataTestId}-foreign-object` : childDataTestId;

  return (
    <ForeignObject {...props} dataTestId={dataTestId} height={height} width={width} x={x} y={y}>
      {children}
    </ForeignObject>
  );
};
