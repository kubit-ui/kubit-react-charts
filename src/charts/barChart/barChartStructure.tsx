import { Children, useMemo } from 'react';

import { SvgContainer } from '@/components/svgContainer/svgContainer';
import { buildViewBox } from '@/components/svgContainer/utils/buildViewBox/buildViewBox';
import { DefaultCanvasConfig } from '@/types/canvas.type';
import type { ChartError, ErrorType } from '@/types/errors.type';
import { createErrorAccumulator } from '@/utils/createErrorAccumulator';
import { getDataFingerprint } from '@/utils/getDataFingerprint/getDataFingerprint';
import { parseStringToNumberPx } from '@/utils/parseStringToNumberPx.ts/parseStringToNumberPx';

import type { BarChartProps } from './barChart.type';
import { BarChartContext } from './context/barChartContext';
import { buildBarContextValue } from './context/buildBarContextValues';
import { BarChartXAxis } from './fragments/barChartXAxis';
import { BarChartYAxis } from './fragments/barChartYAxis';
import { countBarChildren } from './utils/countBarChildren';

export const BarChartStructure: React.FC<BarChartProps> = ({
  canvasConfig = DefaultCanvasConfig,
  caption,
  children,
  classNames,
  data,
  dataTestId,
  gapBetweenBars = 0,
  height = '100%',
  onErrors,
  orientation,
  pKey,
  role,
  tabIndex,
  width = '100%',
  ...props
}): React.ReactElement => {
  // Extracts and sets default values for canvas configuration
  const { extraSpace: canvasExtraSpace, height: canvasHeight, width: canvasWidth } = canvasConfig;
  const parsedCanvasWidth = parseStringToNumberPx(canvasWidth);
  const parsedCanvasHeight = parseStringToNumberPx(canvasHeight);
  const parsedCanvasExtraSpace = canvasExtraSpace
    ? parseStringToNumberPx(canvasExtraSpace)
    : undefined;

  const viewBox = buildViewBox(parsedCanvasWidth, parsedCanvasHeight, parsedCanvasExtraSpace);

  // count how many of bar children exists
  const barChildrenCount = countBarChildren(children);
  const secureGap = gapBetweenBars * 2;

  // Set the default axis for the chart
  const defaultAxis = [
    <BarChartXAxis key="default-x-axis" />,
    <BarChartYAxis key="default-y-axis" />,
  ];
  const arrayChildren = (Children.toArray(children) || []) as React.JSX.Element[];
  const chidrenWithDefaultAxis = defaultAxis.concat(arrayChildren);

  const maxValue = Math.max(parsedCanvasWidth, parsedCanvasHeight, parsedCanvasExtraSpace ?? 0);
  const ajustedX = parsedCanvasWidth / maxValue;
  const ajustedY = parsedCanvasHeight / maxValue;

  const errorAccumulator = useMemo(() => createErrorAccumulator(onErrors), [onErrors]);

  // Create a fingerprint of the data to avoid unnecessary contextValue updates
  const dataFingerprint = getDataFingerprint(data);

  // Build the context value
  const contextValue = useMemo(() => {
    // Clear previous errors before building new context
    errorAccumulator.clearErrors();

    return buildBarContextValue({
      addError: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => {
        errorAccumulator.addError(errorType, error);
      },
      ajustedX,
      ajustedY,
      canvasHeight: parsedCanvasHeight,
      canvasWidth: parsedCanvasWidth,
      children: chidrenWithDefaultAxis,
      data,
      gapBetweenBars: secureGap,
      orientation,
      pKey,
      viewBox,
    });
  }, [canvasHeight, canvasWidth, dataFingerprint, pKey, orientation, errorAccumulator.addError]);

  return (
    <SvgContainer
      caption={caption}
      className={classNames}
      dataTestId={dataTestId}
      height={height}
      role={role}
      tabIndex={tabIndex}
      viewBox={viewBox}
      width={width}
      {...props}
    >
      <BarChartContext.Provider
        value={{
          ...contextValue,
          barChildrenCount,
          canvasExtraSpace: parsedCanvasExtraSpace,
          canvasHeight: parsedCanvasHeight,
          canvasWidth: parsedCanvasWidth,
          data,
          dataTestId,
          gapBetweenBars,
          orientation,
          pKey,
        }}
      >
        {children}
      </BarChartContext.Provider>
    </SvgContainer>
  );
};
