import { useCallback, useEffect, useRef, useState } from 'react';

import { clampRange, mouseToDataIndex } from '../utils/rangeAndPositions';
import { ZoomAreaElements, type ZoomAreaInteractionConfig, type ZoomRange } from '../zoomArea.type';

/**
 * Parameters for the useDragInteraction hook
 */
interface UseDragInteractionParams {
  /** Current zoom range */
  currentRange: ZoomRange;
  /** Width of the zoom area */
  width: number;
  /** Total length of the data array */
  dataLength: number;
  /** Callback when range changes */
  onRangeChange: (range: ZoomRange) => void;
  /** Interaction configuration with resolved defaults */
  interactionConfig: Required<ZoomAreaInteractionConfig>;
}

/**
 * Return value for the useDragInteraction hook
 */
interface UseDragInteractionReturn {
  /** Reference to the SVG group element */
  groupRef: React.RefObject<SVGSVGElement>;
  /** Handler for mouse down events on different elements */
  handleMouseDown: (
    target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements]
  ) => (event: React.MouseEvent) => void;
  /** Handler for touch start events on different elements */
  handleTouchStart: (
    target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements]
  ) => (event: React.TouchEvent) => void;
  /** Currently dragging element, if any */
  isDragging: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements] | null;
}

/**
 * Calculate new range based on drag type and pointer position
 */
const calculateNewRange = (
  dragType: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements],
  currentRange: ZoomRange,
  dataIndex: number,
  dataLength: number,
  interactionConfig: Required<ZoomAreaInteractionConfig>
): ZoomRange => {
  const newRange = { ...currentRange };

  if (dragType === ZoomAreaElements.START_HANDLER) {
    newRange.start = Math.max(
      0,
      Math.min(dataIndex, currentRange.end - interactionConfig.minHandlerDistance)
    );
  } else if (dragType === ZoomAreaElements.END_HANDLER) {
    newRange.end = Math.min(
      dataLength - 1,
      Math.max(dataIndex, currentRange.start + interactionConfig.minHandlerDistance)
    );
  } else if (dragType === ZoomAreaElements.SELECTION_AREA) {
    // Moving entire selection
    const selectionWidth = currentRange.end - currentRange.start;
    const newStart = Math.max(
      0,
      Math.min(dataLength - 1 - selectionWidth, dataIndex - selectionWidth / 2)
    );
    newRange.start = newStart;
    newRange.end = newStart + selectionWidth;
  }

  return newRange;
};

/**
 * Custom hook for handling mouse and touch drag interactions in ZoomArea
 *
 * Supports both mouse and touch events for cross-platform compatibility.
 * Simplified implementation that works with overflow:visible SVG containers.
 * No complex viewBox calculations needed - coordinates are direct and intuitive.
 *
 * @param params - Configuration parameters for drag functionality
 * @returns Object with drag handlers and state
 */
export const useDragInteraction = (params: UseDragInteractionParams): UseDragInteractionReturn => {
  const { currentRange, dataLength, interactionConfig, onRangeChange, width } = params;
  const groupRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState<
    (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements] | null
  >(null);

  const handleMouseDown = useCallback(
    (target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements]) => {
      return () => {
        setIsDragging(target);
      };
    },
    []
  );

  const handleTouchStart = useCallback(
    (target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements]) => {
      return () => {
        setIsDragging(target);
      };
    },
    []
  );

  // Common logic for handling pointer movement (mouse or touch)
  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !groupRef.current) {
        return;
      }

      // Get the SVG element's bounding rect for coordinate conversion
      const svgElement = groupRef.current;
      if (!svgElement) {
        return;
      }

      // Simple coordinate calculation - no viewBox complexity!
      const rect = svgElement.getBoundingClientRect();
      const pointerX = clientX - rect.left;

      // Convert pointer X to data index (0 to dataLength-1)
      const dataIndex = mouseToDataIndex(pointerX, width, dataLength);

      const newRange = calculateNewRange(
        isDragging,
        currentRange,
        dataIndex,
        dataLength,
        interactionConfig
      );
      const clampedRange = clampRange(newRange, dataLength, interactionConfig.minHandlerDistance);

      onRangeChange(clampedRange);
    },
    [isDragging, width, dataLength, currentRange, onRangeChange, interactionConfig]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      handlePointerMove(event.clientX);
    },
    [handlePointerMove]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (event.touches.length === 0) {
        return;
      }

      // Prevent default native scrolling behavior while dragging
      event.preventDefault();

      handlePointerMove(event.touches[0].clientX);
    },
    [handlePointerMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Set up global mouse and touch events when dragging
  useEffect(() => {
    if (isDragging) {
      // Mouse events
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      // Touch events
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        // Cleanup mouse events
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        // Cleanup touch events
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
    return undefined;
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return {
    groupRef,
    handleMouseDown,
    handleTouchStart,
    isDragging,
  };
};
