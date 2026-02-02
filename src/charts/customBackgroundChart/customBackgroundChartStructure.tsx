import { type ReactElement, useEffect, useMemo } from 'react';

import { SvgContainer } from '@/components/svgContainer/svgContainer';
import { useId } from '@/hooks/useId/useId';
import type { ChartError, ErrorType } from '@/types/errors.type';
import { createErrorAccumulator } from '@/utils/createErrorAccumulator';

import { CustomBackgroundChartContext } from './context/customBackgroundChartContext';
import type { CustomBackgroundChartProps } from './customBackgroundChart.type';

export const CustomBackgroundChartStructure = <T = number,>({
  ariaHidden,
  ariaLabel,
  backgroundUrl,
  caption,
  children,
  className,
  data,
  dataTestId: dataTestIdProp = 'custom-background-chart',
  height = '100%',
  onBlur,
  onClick,
  onDoubleClick,
  onErrors,
  onFocus,
  onKeyDown,
  onKeyUp,
  onMouseEnter,
  onMouseLeave,
  role = 'img',
  tabIndex,
  viewBox,
  width = '100%',
  ...props
}: CustomBackgroundChartProps<T>): ReactElement => {
  const dataTestId = useId(dataTestIdProp);

  // Build viewBox string for SVG
  const viewBoxString = `0 0 ${viewBox.width} ${viewBox.height}`;

  // Error accumulator (existing pattern)
  const errorAccumulator = useMemo(() => createErrorAccumulator(onErrors), [onErrors]);

  // Validate props
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      errorAccumulator.addError('CUSTOM_BACKGROUND_CHART_CONTEXT_ERROR', {
        error: new Error('Data object is empty. At least one data point is required.'),
      });
    }
    if (!backgroundUrl || backgroundUrl.trim() === '') {
      errorAccumulator.addError('CUSTOM_BACKGROUND_CHART_CONTEXT_ERROR', {
        error: new Error('backgroundUrl is required and cannot be empty.'),
      });
    }
    if (viewBox.width <= 0 || viewBox.height <= 0) {
      errorAccumulator.addError('CUSTOM_BACKGROUND_CHART_CONTEXT_ERROR', {
        error: new Error(
          `Invalid viewBox dimensions: width=${viewBox.width}, height=${viewBox.height} (both must be > 0)`
        ),
      });
    }
  }, [data, backgroundUrl, viewBox, errorAccumulator]);

  // Context value
  const contextValue = useMemo(
    () => ({
      addError: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => {
        errorAccumulator.addError(errorType, error);
      },
      data,
      dataTestId,
      viewBox,
    }),
    [viewBox, data, dataTestId, errorAccumulator]
  );

  return (
    <SvgContainer
      ariaHidden={ariaHidden}
      ariaLabel={ariaLabel}
      caption={caption}
      className={className}
      dataTestId={dataTestId}
      height={height}
      role={role}
      tabIndex={tabIndex}
      viewBox={viewBoxString}
      width={width}
      onBlur={onBlur}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <CustomBackgroundChartContext.Provider value={contextValue}>
        {/* Background layer */}
        <image
          data-testid={`${dataTestId}-background`}
          height={viewBox.height}
          href={backgroundUrl}
          preserveAspectRatio="xMidYMid meet"
          width={viewBox.width}
          x={0}
          y={0}
        />
        {/* Plots layer */}
        <g data-testid={`${dataTestId}-plots`}>{children}</g>
      </CustomBackgroundChartContext.Provider>
    </SvgContainer>
  );
};
