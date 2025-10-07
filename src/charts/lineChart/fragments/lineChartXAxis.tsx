import { type FC, type ReactElement, useContext } from 'react';

import { XAxis } from '@/components/axisChart/xAxis/xAxis';
import { TickDataUtils } from '@/components/tick/tick.types';
import { Positions } from '@/types/position.enum';
import { getTickTextYCoordinate } from '@/utils/getTickTextCoordinate/getTickTextCoordinates';
import { pickCustomAttributes } from '@/utils/pickCustomAttributes/pickCustomAttributes';

import { LineChartContext } from '../context/lineChartContext';
import type { LineChartXAxisProps } from '../lineChart.type';

export const LineChartXAxis: FC<LineChartXAxisProps> = ({
  ariaLabel,
  position = Positions.BOTTOM,
  tickLine,
  tickText,
  valueFormatter = (value: string) => value,
  ...props
}): ReactElement => {
  const {
    xAxisCoordinates: { coordinates, tickValues: contextTickValues },
    xCursor,
    ...context
  } = useContext(LineChartContext);

  const tickTextY = getTickTextYCoordinate(
    position,
    coordinates.y1,
    Number(tickText?.fontSize),
    tickText?.top ?? 0
  );

  const y1 = context.extraSpaceTopY;
  const y2 = Number(context.canvasHeight) - context.extraSpaceBottomY;

  const tickValues = tickText
    ? TickDataUtils.formatTicksValues(contextTickValues, valueFormatter)
    : undefined;

  // Extract custom attributes (aria-*, data-*) and handle deprecated ariaLabel
  const customAttributes = pickCustomAttributes(props);
  const finalAriaLabel = ariaLabel || props['aria-label'];

  // Merge all props including custom attributes and ariaLabel precedence
  const mergedProps = {
    ...props,
    ...customAttributes,
    ...(finalAriaLabel && { 'aria-label': finalAriaLabel }),
  };

  return (
    <XAxis
      {...coordinates}
      {...mergedProps}
      canvasHeight={Number(context.canvasHeight)}
      canvasWidth={Number(context.canvasWidth)}
      cursor={xCursor}
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
      tickValues={tickValues}
    />
  );
};
