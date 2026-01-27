import { type FC, type ReactElement, useMemo } from 'react';

import { SvgContainer } from '@/components/svgContainer/svgContainer';
import { useId } from '@/hooks/useId/useId';
import { useResponsiveCanvas } from '@/hooks/useResponsiveCanvas/useResponsiveCanvas';
import { DefaultCanvasConfig } from '@/types/canvas.type';
import type { ChartError, ErrorType } from '@/types/errors.type';
import { createErrorAccumulator } from '@/utils/createErrorAccumulator';
import { getDataFingerprint } from '@/utils/getDataFingerprint/getDataFingerprint';

import { buildPieContextValue } from './context/buildPieContextValue';
import { PieChartContext } from './context/pieChartContext';
import type { PieChartProps } from './pieChart.type';

/**
 * Renders a pie chart component.
 *
 * @component
 * @example
 * ```tsx
 * <PieChart
 *   caption="Pie Chart"
 *   canvasConfig={DefaultCanvasConfig}
 *   dataTestId="pie-chart"
 *   width="100%"
 *   height="100%"
 *   classNames="pie-chart"
 *   data={chartData}
 * >
 *   {chartChildren}
 * </PieChart>
 * ```
 *
 * @param {PieChartProps} props - The props for the PieChart component.
 * @param {string} props.caption - The caption for the pie chart.
 * @param {DefaultCanvasConfig} props.canvasConfig - The canvas configuration for the pie chart.
 * @param {string} props.dataTestId - The data test ID for the pie chart.
 * @param {string} props.width - The width of the pie chart.
 * @param {string} props.height - The height of the pie chart.
 * @param {string} props.classNames - The class names for the pie chart.
 * @param {ReactNode} props.children - The children components of the pie chart.
 * @param {ChartData[]} props.data - The data for the pie chart.
 * @returns {ReactElement} The rendered pie chart component.
 */
export const PieChartStructure: FC<PieChartProps> = ({
  ariaHidden,
  ariaLabel,
  canvasConfig = DefaultCanvasConfig,
  caption,
  children,
  classNames,
  data,
  dataTestId: dataTestIdProp = 'pie-chart',
  halfChart,
  height = '100%',
  onErrors,
  radius = '50%',
  role,
  tabIndex,
  width = '100%',
  ...props
}): ReactElement => {
  const dataTestId = useId(dataTestIdProp);
  
  // Use the responsive canvas hook for dimension management
  const { parsedCanvas, viewBox } = useResponsiveCanvas({
    canvasConfig,
    dataTestId,
    height,
    width,
  });

  const parsedCanvasWidth = parsedCanvas.width;
  const parsedCanvasHeight = parsedCanvas.height;

  const errorAccumulator = useMemo(() => createErrorAccumulator(onErrors), [onErrors]);

  // Create a fingerprint of the data to avoid unnecessary contextValue updates
  const dataFingerprint = getDataFingerprint(data);

  const contextValue = useMemo(() => {
    // Clear previous errors before building new context
    errorAccumulator.clearErrors();

    return buildPieContextValue({
      addError: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => {
        errorAccumulator.addError(errorType, error);
      },
      canvasHeight: parsedCanvasHeight,
      canvasWidth: parsedCanvasWidth,
      children,
      halfChart,
    });
  }, [parsedCanvasHeight, parsedCanvasWidth, halfChart, dataFingerprint, errorAccumulator]);

  return (
    <SvgContainer
      ariaHidden={ariaHidden}
      ariaLabel={ariaLabel}
      caption={caption}
      className={classNames}
      dataTestId={dataTestId}
      height={height}
      radius={radius}
      role={role}
      tabIndex={tabIndex}
      viewBox={viewBox}
      width={width}
      {...props}
    >
      <PieChartContext.Provider
        value={{
          ...contextValue,
          canvasHeight: parsedCanvasHeight,
          canvasWidth: parsedCanvasWidth,
          data,
          dataTestId,
          halfChart,
        }}
      >
        {children}
      </PieChartContext.Provider>
    </SvgContainer>
  );
};
