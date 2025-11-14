import { type FC, type ReactElement, useContext } from 'react';

import { XAxis } from '@/components/axisChart/xAxis/xAxis';
import { Positions } from '@/types/position.enum';
import { getTickTextYCoordinate } from '@/utils/getTickTextCoordinate/getTickTextCoordinates';

import { CHART_SPACING_DEFAULTS } from '../../constants/chartDefaults';
import type { BarChartXAxisProps } from '../barChart.type';
import { BarChartContext } from '../context/barChartContext';

export const BarChartXAxis: FC<BarChartXAxisProps> = ({
  position = Positions.BOTTOM,
  tickLine,
  tickText,
  ...props
}): ReactElement => {
  const {
    xAxisCoordinates: { coordinates, tickValues },
    // xCursor,
    ...context
  } = useContext(BarChartContext);

  const tickTextY = getTickTextYCoordinate(
    position,
    coordinates.y1,
    Number(tickText?.fontSize),
    tickText?.top ?? CHART_SPACING_DEFAULTS.DEFAULT_SPACE
  );

  const y1 = context.extraSpaceTopY;
  const y2 = Number(context.canvasHeight) - context.extraSpaceBottomY;

  return (
    <XAxis
      {...coordinates}
      {...props}
      canvasHeight={Number(context.canvasHeight)}
      canvasWidth={Number(context.canvasWidth)}
      // cursor={xCursor}
      dataTestId={`${context.dataTestId}xAxis`}
      extraSpace={{
        left: context.extraSpaceLeftX,
        right: context.extraSpaceRightX,
      }}
      tickLine={{
        ...tickLine,
        y1,
        y2,
      }}
      tickText={{
        ...tickText,
        y: tickTextY,
      }}
      tickValues={tickText ? tickValues : undefined}
    />
  );
};
