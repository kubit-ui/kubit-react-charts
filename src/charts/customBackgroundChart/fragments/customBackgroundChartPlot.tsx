import { type ReactElement, useContext, useEffect, useMemo } from 'react';

import { Plot } from '@/components/plot/plot';

import { CustomBackgroundChartContext } from '../context/customBackgroundChartContext';
import type { CustomBackgroundChartPlotProps } from '../customBackgroundChart.type';
import { buildAriaLabel, formatValue } from '../utils/accessibility';

export const CustomBackgroundChartPlot = <T = number,>({
  ariaLabel,
  dataKey,
  formatAriaValue,
  ...props
}: CustomBackgroundChartPlotProps<T>): ReactElement | null => {
  const {
    addError,
    data,
    dataTestId: parentTestId,
    viewBox,
  } = useContext(CustomBackgroundChartContext);

  // Access data point by dataKey (PieChart pattern)
  const dataPoint = useMemo(() => data[dataKey], [data, dataKey]);

  // Validate dataKey and coordinates
  useEffect(() => {
    if (!dataPoint) {
      addError?.('CUSTOM_BACKGROUND_CHART_PLOT_ERROR', {
        error: new Error(`dataKey "${dataKey}" not found in data object.`),
      });
      return;
    }

    const { x, y } = dataPoint;
    if (x < 0 || x > viewBox.width || y < 0 || y > viewBox.height) {
      addError?.('CUSTOM_BACKGROUND_CHART_PLOT_ERROR', {
        error: new Error(
          `Plot "${dataKey}" coordinates (${x}, ${y}) are outside viewBox bounds (0-${viewBox.width}, 0-${viewBox.height})`
        ),
      });
    }
  }, [dataPoint, dataKey, addError, viewBox.width, viewBox.height]);

  // Generate accessible label using template system
  const accessibleLabel = useMemo(() => {
    if (!dataPoint) {
      return dataKey;
    }

    // Format the value using custom formatter or default
    const formattedValue = formatAriaValue
      ? formatAriaValue(dataPoint.value as T)
      : formatValue(dataPoint.value);

    // Build label from template (uses default template if ariaLabel not provided)
    return buildAriaLabel({
      ariaLabel,
      dataKey,
      formattedValue,
      name: dataPoint.name,
      x: dataPoint.x,
      y: dataPoint.y,
    });
  }, [ariaLabel, dataPoint, dataKey, formatAriaValue]);

  const position = useMemo(
    () => ({ x: dataPoint?.x ?? 0, y: dataPoint?.y ?? 0 }),
    [dataPoint?.x, dataPoint?.y]
  );

  if (!dataPoint) {
    return null;
  }

  return (
    <Plot<T>
      {...props}
      data={{ value: dataPoint.value as T }}
      dataTestId={`${parentTestId}-plot-${dataKey}`}
      label={accessibleLabel}
      position={position}
    />
  );
};
