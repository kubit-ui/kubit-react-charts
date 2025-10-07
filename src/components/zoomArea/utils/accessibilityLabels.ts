import type { IZoomAreaDataPoint, ScreenReaderConfig, ZoomRange } from '../zoomArea.type';
import { getRangeIndices } from './indexRounding';

// Template keys for accessibility labels
const ACCESSIBILITY_START_VALUE_KEY = '{{startValue}}';
const ACCESSIBILITY_END_VALUE_KEY = '{{endValue}}';

/**
 * Extracts the X-axis value from data at a specific index.
 *
 * @param data - Array of data points
 * @param xKey - Property name to extract from data points
 * @param index - Integer index (should be pre-rounded using indexRounding utils)
 * @returns String representation of the X-axis value, or fallback to string index
 */
export const getXAxisValue = (data: IZoomAreaDataPoint[], xKey: string, index: number): string => {
  // Index should already be rounded and clamped by getRangeIndices()
  return data[index]?.[xKey]?.toString() || `${index}`;
};

/**
 * Builds screen reader text by replacing template keys with actual values
 *
 * @param template - Template string with {{startValue}} and/or {{endValue}} placeholders
 * @param startValue - Value to replace {{startValue}} with
 * @param endValue - Value to replace {{endValue}} with
 * @returns String with placeholders replaced, or undefined if template is not provided
 */
const buildScreenReaderText = (
  template: string | undefined,
  startValue: string,
  endValue: string
): string | undefined => {
  if (!template) {
    return template;
  }

  const startValueRegExp = new RegExp(ACCESSIBILITY_START_VALUE_KEY, 'g');
  const endValueRegExp = new RegExp(ACCESSIBILITY_END_VALUE_KEY, 'g');

  return template.replace(startValueRegExp, startValue).replace(endValueRegExp, endValue);
};

/**
 * Generates consistent accessibility labels for ZoomArea handlers and selection area.
 *
 * Uses the same floor/ceil logic as data filtering to ensure that screen reader
 * announcements exactly match the boundaries of the filtered data.
 *
 * @param data - Array of data points
 * @param xKey - Property name to extract X-axis values from
 * @param currentRange - Current zoom range with start and end indices
 * @param config - Optional configuration for custom label templates
 * @returns Object with formatted accessibility labels for UI components
 */
export const generateAccessibilityLabels = (
  data: IZoomAreaDataPoint[],
  xKey: string,
  currentRange: ZoomRange,
  config?: ScreenReaderConfig
): {
  startHandler: string;
  endHandler: string;
  selectionArea: string;
} => {
  // Use EXACT same indexing logic as useZoomData.filterData() via shared utilities
  const { endIndex, startIndex } = getRangeIndices(currentRange, data.length);

  const startValue = getXAxisValue(data, xKey, startIndex);
  const endValue = getXAxisValue(data, xKey, endIndex);

  // Use custom templates or fall back to simple defaults (just the values)
  const startHandler =
    buildScreenReaderText(config?.startHandler, startValue, endValue) ?? startValue;

  const endHandler = buildScreenReaderText(config?.endHandler, startValue, endValue) ?? endValue;

  const selectionArea =
    buildScreenReaderText(config?.selectionArea, startValue, endValue) ??
    `${startValue} - ${endValue}`;

  return {
    endHandler,
    selectionArea,
    startHandler,
  };
};
