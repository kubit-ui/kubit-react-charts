import { useCallback } from 'react';

import { clampRange } from '../utils/rangeAndPositions';
import { ZoomAreaElements, type ZoomAreaInteractionConfig, type ZoomRange } from '../zoomArea.type';

/**
 * Parameters for the useKeyboardNavigation hook
 */
interface UseKeyboardNavigationParams {
  /** Current zoom range */
  currentRange: ZoomRange;
  /** Total length of the data array */
  dataLength: number;
  /** Callback when range changes */
  onRangeChange: (range: ZoomRange) => void;
  /** Interaction configuration with resolved defaults */
  interactionConfig: Required<ZoomAreaInteractionConfig>;
}

/**
 * Return value for the useKeyboardNavigation hook
 */
interface UseKeyboardNavigationReturn {
  /** Handler for keyboard events on different elements */
  handleKeyDown: (
    target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements]
  ) => (event: React.KeyboardEvent) => void;
}

/**
 * Handle left arrow and down arrow key movement (decrease values)
 */
const handleArrowLeft = (
  target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements],
  currentRange: ZoomRange,
  step: number,
  interactionConfig: Required<ZoomAreaInteractionConfig>
): ZoomRange => {
  const newRange = { ...currentRange };

  if (target === ZoomAreaElements.START_HANDLER) {
    newRange.start = Math.max(0, currentRange.start - step);
  } else if (target === ZoomAreaElements.END_HANDLER) {
    newRange.end = Math.max(
      currentRange.start + interactionConfig.minHandlerDistance,
      currentRange.end - step
    );
  } else if (target === ZoomAreaElements.SELECTION_AREA) {
    // Move entire selection left
    const selectionWidth = currentRange.end - currentRange.start;
    const newStart = Math.max(0, currentRange.start - step);
    newRange.start = newStart;
    newRange.end = newStart + selectionWidth;
  }

  return newRange;
};

/**
 * Handle right arrow and up arrow key movement (increase values)
 */
const handleArrowRight = (
  target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements],
  currentRange: ZoomRange,
  step: number,
  dataLength: number,
  interactionConfig: Required<ZoomAreaInteractionConfig>
): ZoomRange => {
  const newRange = { ...currentRange };

  if (target === ZoomAreaElements.START_HANDLER) {
    newRange.start = Math.min(
      currentRange.end - interactionConfig.minHandlerDistance,
      currentRange.start + step
    );
  } else if (target === ZoomAreaElements.END_HANDLER) {
    newRange.end = Math.min(dataLength - 1, currentRange.end + step);
  } else if (target === ZoomAreaElements.SELECTION_AREA) {
    // Move entire selection right
    const selectionWidth = currentRange.end - currentRange.start;
    const newStart = Math.min(dataLength - 1 - selectionWidth, currentRange.start + step);
    newRange.start = newStart;
    newRange.end = newStart + selectionWidth;
  }

  return newRange;
};

/**
 * Handle Home key - move to beginning
 */
const handleHome = (
  target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements],
  currentRange: ZoomRange,
  dataLength: number
): ZoomRange => {
  const newRange = { ...currentRange };

  if (target === ZoomAreaElements.START_HANDLER) {
    newRange.start = 0;
  } else if (target === ZoomAreaElements.END_HANDLER) {
    newRange.end = dataLength - 1;
  } else if (target === ZoomAreaElements.SELECTION_AREA) {
    const selectionWidth = currentRange.end - currentRange.start;
    newRange.start = 0;
    newRange.end = selectionWidth;
  }

  return newRange;
};

/**
 * Handle End key - move to end
 */
const handleEnd = (
  target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements],
  currentRange: ZoomRange,
  dataLength: number,
  interactionConfig: Required<ZoomAreaInteractionConfig>
): ZoomRange => {
  const newRange = { ...currentRange };

  if (target === ZoomAreaElements.START_HANDLER) {
    newRange.start = currentRange.end - interactionConfig.minHandlerDistance;
  } else if (target === ZoomAreaElements.END_HANDLER) {
    newRange.end = dataLength - 1;
  } else if (target === ZoomAreaElements.SELECTION_AREA) {
    const selectionWidth = currentRange.end - currentRange.start;
    newRange.start = dataLength - 1 - selectionWidth;
    newRange.end = dataLength - 1;
  }

  return newRange;
};

/**
 * Custom hook for handling keyboard navigation in ZoomArea
 *
 * @param params - Configuration parameters for keyboard navigation
 * @returns Object with keyboard event handlers
 */
export const useKeyboardNavigation = (
  params: UseKeyboardNavigationParams
): UseKeyboardNavigationReturn => {
  const { currentRange, dataLength, interactionConfig, onRangeChange } = params;
  const handleKeyDown = useCallback(
    (target: (typeof ZoomAreaElements)[keyof typeof ZoomAreaElements]) => {
      return (event: React.KeyboardEvent) => {
        // Shift key = fast navigation, normal keys = precise control
        const step = event.shiftKey
          ? interactionConfig.keyboardFastStep
          : interactionConfig.keyboardStep;

        let newRange: typeof currentRange;

        switch (event.key) {
          case 'ArrowLeft':
          case 'ArrowDown':
            event.preventDefault();
            newRange = handleArrowLeft(target, currentRange, step, interactionConfig);
            break;
          case 'ArrowRight':
          case 'ArrowUp':
            event.preventDefault();
            newRange = handleArrowRight(target, currentRange, step, dataLength, interactionConfig);
            break;
          case 'Home':
            event.preventDefault();
            newRange = handleHome(target, currentRange, dataLength);
            break;
          case 'End':
            event.preventDefault();
            newRange = handleEnd(target, currentRange, dataLength, interactionConfig);
            break;
          default:
            return; // Don't handle other keys
        }

        const clampedRange = clampRange(newRange, dataLength, interactionConfig.minHandlerDistance);
        onRangeChange(clampedRange);
      };
    },
    [currentRange, dataLength, onRangeChange, interactionConfig]
  );

  return { handleKeyDown };
};
