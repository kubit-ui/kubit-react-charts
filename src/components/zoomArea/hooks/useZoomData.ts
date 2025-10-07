import { useEffect, useState } from 'react';

import { getRangeIndices } from '../utils/indexRounding';
import { createDefaultRange } from '../utils/rangeAndPositions';
import type { IZoomAreaDataPoint, ZoomRange } from '../zoomArea.type';

/**
 * Custom hook for managing zoom data state and filtering logic.
 *
 * Handles the core zoom functionality including range state management,
 * data filtering, and automatic emission of filtered data changes.
 *
 * @param data - Array of data points to be filtered
 * @param initialRange - Optional initial zoom range
 * @param onDataChange - Callback function to handle filtered data changes
 * @returns Object containing current range and range change handler
 *
 * @example
 * ```tsx
 * const { currentRange, handleRangeChange } = useZoomData({
 *   data: chartData,
 *   initialRange: { start: 0, end: 10 },
 *   onDataChange: (filteredData) => setChartData(filteredData)
 * });
 * ```
 */

interface UseZoomDataParams {
  data: IZoomAreaDataPoint[];
  initialRange?: ZoomRange;
  onDataChange?: (filteredData: IZoomAreaDataPoint[]) => void;
}

interface UseZoomDataReturn {
  currentRange: ZoomRange;
  handleRangeChange: (newRange: ZoomRange) => void;
}

export const useZoomData = ({
  data,
  initialRange,
  onDataChange,
}: UseZoomDataParams): UseZoomDataReturn => {
  // Initialize range state
  const defaultRange = initialRange || createDefaultRange(data.length);
  const [currentRange, setCurrentRange] = useState<ZoomRange>(defaultRange);

  // Filter data based on current range and emit changes
  const filterData = (range: ZoomRange) => {
    if (!onDataChange || data.length === 0) {return;}

    // Use centralized rounding logic to ensure consistency with accessibility labels
    const { endIndex, startIndex } = getRangeIndices(range, data.length);
    const filteredData = data.slice(startIndex, endIndex + 1);
    onDataChange(filteredData);
  };

  // Handle range changes - updates state and filters data
  const handleRangeChange = (newRange: ZoomRange) => {
    setCurrentRange(newRange);
    filterData(newRange);
  };

  // Emit initial filtered data on mount
  useEffect(() => {
    filterData(currentRange);
  }, []);

  return {
    currentRange,
    handleRangeChange,
  };
};
