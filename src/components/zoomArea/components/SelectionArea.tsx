import { type KeyboardEvent, type MouseEvent, type TouchEvent, forwardRef } from 'react';

import { isFullRange } from '../utils/rangeAndPositions';
import type { ZoomAreaSelectionConfig, ZoomRange } from '../zoomArea.type';

/**

/**
 * Props for the SelectionArea component
 */
interface SelectionAreaProps {
  /** Start X position */
  startX: number;
  /** End X position */
  endX: number;
  /** Chart height */
  height: number;
  /** Current zoom range */
  currentRange: ZoomRange;
  /** Data length for ARIA values */
  dataLength: number;
  /** Data test ID */
  dataTestId: string;
  /** Custom selection area configuration */
  selectionConfig: Required<ZoomAreaSelectionConfig>;
  /** Text announced by screen readers */
  screenReaderText?: string;
  /** Event handlers */
  onMouseDown: (event: MouseEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
}

/**
 * Selection area overlay - the interactive rectangle that users can drag and focus
 */
export const SelectionArea = forwardRef<SVGRectElement, SelectionAreaProps>(
  (
    {
      currentRange,
      dataLength,
      dataTestId,
      endX,
      height,
      onBlur,
      onFocus,
      onKeyDown,
      onMouseDown,
      onTouchStart,
      screenReaderText,
      selectionConfig,
      startX,
    },
    ref
  ) => {
    // Check if overlay should be hidden based on design specs:
    // "Only visible when a range is defined"
    const shouldHideOverlay =
      selectionConfig.hideOverlayOnFullRange && isFullRange(currentRange, dataLength);

    return (
      <>
        {/* Selection area overlay - conditionally rendered */}
        <rect
          ref={ref}
          aria-label={screenReaderText}
          aria-valuemax={dataLength - 1}
          aria-valuemin={0}
          // Used valuetext instead of valuenow to provide understandable information
          aria-valuetext={screenReaderText}
          cursor="grab"
          data-testid={dataTestId}
          fill={selectionConfig.fill}
          fillOpacity={selectionConfig.fillOpacity}
          height={height}
          role="slider"
          stroke={selectionConfig.stroke}
          strokeWidth={selectionConfig.strokeWidth}
          style={{
            outline: 'none',
            visibility: shouldHideOverlay ? 'hidden' : 'visible',
          }}
          tabIndex={0}
          width={endX - startX}
          x={startX}
          y={0}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        />
      </>
    );
  }
);

SelectionArea.displayName = 'SelectionArea';
