import { type FC, type ReactElement, useContext } from 'react';

import { YAxis } from '@/components/axisChart/yAxis/yAxis';
import { Positions } from '@/types/position.enum';
import { ajustedTextSpace } from '@/utils/ajustedTextSpace/ajustedTextSpace';
import { getTickTextXCoordinate } from '@/utils/getTickTextCoordinate/getTickTextCoordinates';

import { CHART_SPACING_DEFAULTS } from '../../constants/chartDefaults';
import type { BarChartYAxisProps } from '../barChart.type';
import { BarChartContext } from '../context/barChartContext';

export const BarChartYAxis: FC<BarChartYAxisProps> = ({
  position = Positions.LEFT,
  tickLine,
  tickText,
  ...props
}): ReactElement => {
  const {
    yAxisCoordinates: { coordinates, tickValues },
    ...context
  } = useContext(BarChartContext);

  const textAnchor = tickText?.textAnchor || 'middle';
  const addSpace = position === Positions.RIGHT ? tickText?.right : tickText?.left;
  const ajustedSpace = addSpace ?? CHART_SPACING_DEFAULTS.DEFAULT_SPACE;
  const ajustedText = ajustedTextSpace(textAnchor, context.yAxisText, ajustedSpace);

  const xTickText = getTickTextXCoordinate(
    position as (typeof Positions)[keyof typeof Positions],
    coordinates.x1,
    ajustedText
  );

  return (
    <YAxis
      {...coordinates}
      {...props}
      canvasHeight={Number(context.canvasHeight)}
      canvasWidth={Number(context.canvasWidth)}
      dataTestId={`${context.dataTestId}yAxis`}
      tickLine={{
        ...tickLine,
        x1: context.extraSpaceLeftX,
        x2: Number(context.canvasWidth) - context.extraSpaceRightX,
      }}
      tickText={{ ...tickText, x: xTickText }}
      tickValues={tickText ? tickValues : undefined}
    />
  );
};
