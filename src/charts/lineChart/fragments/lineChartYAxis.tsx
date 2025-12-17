import { type ReactElement, useContext } from 'react';

import { YAxis } from '@/components/axisChart/yAxis/yAxis';
import { TickDataUtils } from '@/components/tick/tick.types';
import { Positions } from '@/types/position.enum';
import { pickCustomAttributes } from '@/utils/pickCustomAttributes/pickCustomAttributes';

import { LineChartContext } from '../context/lineChartContext';
import type { LineChartYAxisProps } from '../lineChart.type';
import { getYAxisTextXCoordinate } from '../utils/tickTextPosition';

export const LineChartYAxis: React.FC<LineChartYAxisProps> = ({
  ariaLabel,
  position = Positions.LEFT,
  tickLine,
  tickText,
  valueFormatter = (value: string) => value,
  // NOTE: tickValues prop is destructured but NOT USED - see TODO in lineChart.type.ts
  ...props
}): ReactElement => {
  const {
    yAxisCoordinates: { coordinates, tickValues: contextTickValues },
    yCursor,
    ...context
  } = useContext(LineChartContext);

  // TODO: Currently ignoring props.tickValues and using contextTickValues instead
  // This means custom tickValues prop has no effect. Implementation needed to:
  // 1. Check if props.tickValues exists
  // 2. Use custom tick values instead of context values when provided
  // 3. Update buildLineContextValue to handle custom Y-axis tick values

  const xTickText = getYAxisTextXCoordinate({
    tickText,
    yAxisPosition: position,
    textWidth: context.yAxisText,
    yAxisX1: coordinates.x1,
  });

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
    <YAxis
      {...coordinates}
      {...mergedProps}
      canvasHeight={Number(context.canvasHeight)}
      canvasWidth={Number(context.canvasWidth)}
      cursor={yCursor}
      dataTestId={`${context.dataTestId}yAxis`}
      tickLine={{
        ...tickLine,
        x1: context.xAxisCoordinates.coordinates.x1,
        x2: context.xAxisCoordinates.coordinates.x2,
      }}
      tickText={{ ...tickText, x: xTickText }}
      tickValues={tickValues}
    />
  );
};
