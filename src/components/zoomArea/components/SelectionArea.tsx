import type { FC, KeyboardEvent, MouseEvent, TouchEvent } from 'react';

import type { FocusConfig } from '@/types/focusConfig.type';
import { calculateFocusOutline } from '@/utils/calculateFocusOutline/calculateFocusOutline';

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
 * Props for the SelectionAreaFocusRing component
 */
interface SelectionAreaFocusRingProps {
  /** Start X position */
  startX: number;
  /** End X position */
  endX: number;
  /** Chart height */
  height: number;
  /** Whether the selection area is focused */
  isFocused: boolean;
  /** Custom focus configuration (already resolved) */
  focusConfig: Required<FocusConfig>;
}

/**
 * Focus ring for the selection area - rendered separately to control z-order
 */
export const SelectionAreaFocusRing: FC<SelectionAreaFocusRingProps> = ({
  endX,
  focusConfig,
  height,
  isFocused,
  startX,
}) => {
  if (!isFocused) {
    return null;
  }

  // Calculate selection area dimensions
  const selectionWidth = endX - startX;
  const selectionHeight = height;
  const centerX = startX + selectionWidth / 2;
  const centerY = height / 2;

  // Calculate focus ring dimensions using the new util
  const focusOutline = calculateFocusOutline({
    elementHeight: selectionHeight,
    elementPosition: { x: centerX, y: centerY },
    elementStrokeWidth: 0, // Selection area typically has no border
    elementType: 'rectangle',
    elementWidth: selectionWidth,
    gap: focusConfig.gap,
    innerStrokeWidth: focusConfig.innerStrokeWidth,
    outlineStrokeWidth: focusConfig.outlineStrokeWidth,
  });

  // Use resolved configuration values directly
  const outlineColor = focusConfig.outlineColor;
  const innerColor = focusConfig.innerColor;
  const outlineStrokeWidth = focusConfig.outlineStrokeWidth;
  const innerStrokeWidth = focusConfig.innerStrokeWidth;

  if (focusOutline.type !== 'rectangle') {
    return null;
  }

  return (
    <g pointerEvents="none">
      {/* Outer border */}
      <rect
        fill="none"
        height={focusOutline.outer.height}
        stroke={outlineColor}
        strokeWidth={outlineStrokeWidth}
        width={focusOutline.outer.width}
        x={focusOutline.outer.x}
        y={focusOutline.outer.y}
      />
      {/* Inner border */}
      <rect
        fill="none"
        height={focusOutline.inner.height}
        stroke={innerColor}
        strokeWidth={innerStrokeWidth}
        width={focusOutline.inner.width}
        x={focusOutline.inner.x}
        y={focusOutline.inner.y}
      />
    </g>
  );
};

/**
 * Selection area overlay
 */
export const SelectionArea: FC<SelectionAreaProps> = ({
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
}) => {
  // Check if overlay should be hidden based on design specs:
  // "Only visible when a range is defined"
  const shouldHideOverlay =
    selectionConfig.hideOverlayOnFullRange && isFullRange(currentRange, dataLength);

  return (
    <>
      {/* Selection area overlay - conditionally rendered */}
      <rect
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
};
