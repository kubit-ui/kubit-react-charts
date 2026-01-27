import { Children, type FC, type ReactElement, useEffect, useMemo, useState } from 'react';

import { SvgContainer } from '@/components/svgContainer/svgContainer';
import { useId } from '@/hooks/useId/useId';
import { useResponsiveCanvas } from '@/hooks/useResponsiveCanvas/useResponsiveCanvas';
import { DefaultCanvasConfig } from '@/types/canvas.type';
import type { ChartError, ErrorType } from '@/types/errors.type';
import { createErrorAccumulator } from '@/utils/createErrorAccumulator';
import { getChildrenAttr } from '@/utils/getChildrenAttr/getChildrenAttr';
import { getDataFingerprint } from '@/utils/getDataFingerprint/getDataFingerprint';
import { buildLineContextValue } from './context/buildLineContextValue';
import { LineChartContext } from './context/lineChartContext';
import { LineChartXAxis } from './fragments/lineChartXAxis';
import { LineChartYAxis } from './fragments/lineChartYAxis';
import { useHover } from './hook/useHover';
import type { LineChartProps } from './lineChart.type';

/**
 * Renders a line chart component.
 *
 * @component
 * @example
 * ```
 * <LineChart
 *   caption="Line Chart"
 *   canvasConfig={DefaultCanvasConfig}
 *   dataTestId="line-chart"
 *   width="100%"
 *   height="70%"
 *   data={chartData}
 * >
 *  {chartChildren}
 * </LineChart>
 * ```
 *
 * @param props - `LineChartProps` include:
 * - `width`: The width of the chart (default is '100%').
 * - `height`: The height of the chart (default is '100%').
 * - `data`: The data for the chart.
 * - `xKey`: The key for the x-axis data.
 * - `canvasConfig`: The configuration for the chart canvas (default is `DefaultCanvasConfig`).
 * - `dataTestId`: The data test ID for the chart (default is 'line-chart').
 * - `caption`: The caption for the chart (default is 'Line chart').
 *
 * @returns The rendered LineChart component.
 */
export const LineChartStructure: FC<LineChartProps> = ({
  ariaHidden,
  ariaLabel,
  canvasConfig = DefaultCanvasConfig,
  caption,
  children,
  classNames,
  data,
  dataTestId: dataTestIdProp = 'line-chart',
  getPathArea,
  height = '100%',
  onErrors,
  role,
  tabIndex,
  width = '100%',
  xKey,
  ...props
}): ReactElement => {
  const dataTestId = useId(dataTestIdProp);

  const [childrenYKeys, setChildrenYKey] = useState<string>('');

  // Use the responsive canvas hook for dimension management
  const { parsedCanvas, parsedCanvasExtraSpace, viewBox } = useResponsiveCanvas({
    canvasConfig,
    dataTestId,
    height,
    width,
  });

  // Set the default axis for the chart
  const defaultAxis = [
    <LineChartXAxis key="default-x-axis" />,
    <LineChartYAxis key="default-y-axis" />,
  ];
  const arrayChildren = (Children.toArray(children) || []) as JSX.Element[];
  const chidrenWithDefaultAxis = defaultAxis.concat(arrayChildren);

  // watch the Y childs keys
  getChildrenAttr({
    attrName: 'dataKey',
    children: chidrenWithDefaultAxis,
    originalValue: childrenYKeys,
    updateValue: setChildrenYKey,
  });

  const errorAccumulator = useMemo(() => createErrorAccumulator(onErrors), [onErrors]);

  const dataFingerprint = getDataFingerprint(data);
  const contextValue = useMemo(() => {
    // Clear previous errors before building new context
    errorAccumulator.clearErrors();

    return buildLineContextValue({
      addError: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => {
        errorAccumulator.addError(errorType, error);
      },
      canvasHeight: parsedCanvas.height,
      canvasWidth: parsedCanvas.width,
      children: chidrenWithDefaultAxis,
      data,
      viewBox,
      xKey,
    });
  }, [
    parsedCanvas.width,
    parsedCanvas.height,
    dataFingerprint,
    xKey,
    childrenYKeys,
    errorAccumulator.addError,
  ]);

  const { svgRef, xCursor, yCursor } = useHover({
    canvasHeight: parsedCanvas.height,
    canvasWidth: parsedCanvas.width,
  });

  useEffect(() => {
    getPathArea?.({
      x1: contextValue.xAxisCoordinates.coordinates.x1,
      y1: contextValue.yAxisCoordinates.coordinates.y1,
      x2: contextValue.xAxisCoordinates.coordinates.x2,
      y2: contextValue.yAxisCoordinates.coordinates.y2,
    });
  }, [
    contextValue.xAxisCoordinates.coordinates.x1,
    contextValue.yAxisCoordinates.coordinates.y1,
    contextValue.xAxisCoordinates.coordinates.x2,
    contextValue.yAxisCoordinates.coordinates.y2,
    getPathArea,
  ]);

  return (
    <SvgContainer
      ref={svgRef}
      ariaHidden={ariaHidden}
      ariaLabel={ariaLabel}
      caption={caption}
      className={classNames}
      data-kbt-svg={true}
      dataTestId={dataTestId}
      height={height}
      role={role}
      tabIndex={tabIndex}
      viewBox={viewBox}
      width={width}
      {...props}
    >
      <LineChartContext.Provider
        value={{
          ...contextValue,
          canvasExtraSpace: parsedCanvasExtraSpace,
          canvasHeight: parsedCanvas.height,
          canvasWidth: parsedCanvas.width,
          data,
          dataTestId,
          xCursor,
          xKey,
          yCursor,
        }}
      >
        {children}
      </LineChartContext.Provider>
    </SvgContainer>
  );
};
