import type { KeyboardEvent, MouseEvent, TouchEvent } from 'react';

import type { FocusConfig } from '@/types/focusConfig.type';
import { calculateFocusOutline } from '@/utils/calculateFocusOutline/calculateFocusOutline';

import type { ZoomAreaElements, ZoomAreaHandlerConfig } from '../zoomArea.type';
import { HandlerIcon } from './HandlerIcon';

/**
 * Default colors for zoom handlers
 */
const HANDLER_COLORS = {
  /** Handler background */
  FILL: '#ffffff',
  /** Handler border and icons */
  STROKE: '#8f8f8f',
} as const;

/**
 * Default dimensions and styling for zoom handlers
 */
const HANDLER_DIMENSIONS = {
  /** Radius of the circular handler */
  RADIUS: 17,
  /** Stroke width for handler border */
  STROKE_WIDTH: 1,
  /** Width for vertical guide line */
  VERTICAL_LINE_WIDTH: 2,
} as const;

/**
 * Props for a single zoom handler
 */
interface ZoomHandlerProps {
  /** Handler type using ZoomAreaElements enum */
  type: keyof typeof ZoomAreaElements;
  /** X position */
  x: number;
  /** Chart height */
  height: number;
  /** Current value */
  value: number;
  /** Minimum allowed value */
  min: number;
  /** Maximum allowed value */
  max: number;
  /** Whether this handler is focused */
  isFocused: boolean;
  /** Custom handler configuration */
  handlerConfig?: ZoomAreaHandlerConfig;
  /** Custom focus configuration (already resolved) */
  focusConfig: Required<FocusConfig>;
  /** Text announced by screen readers */
  screenReaderText?: string;
  /** Data test ID */
  dataTestId: string;
  /** Event handlers */
  onMouseDown: (event: MouseEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
}

/**
 * Helper function to merge handler configuration with defaults
 */
const getHandlerStyles = (handlerConfig?: ZoomAreaHandlerConfig) => ({
  fill: handlerConfig?.fill || HANDLER_COLORS.FILL,
  // Icon properties
  iconColor: handlerConfig?.iconColor || HANDLER_COLORS.STROKE,
  radius: handlerConfig?.radius || HANDLER_DIMENSIONS.RADIUS,
  // Circle properties
  stroke: handlerConfig?.stroke || HANDLER_COLORS.STROKE,
  strokeWidth: handlerConfig?.strokeWidth || HANDLER_DIMENSIONS.STROKE_WIDTH,
  // Vertical line properties
  verticalLineStroke: handlerConfig?.verticalLineStroke || HANDLER_COLORS.STROKE,
  verticalLineStrokeWidth:
    handlerConfig?.verticalLineStrokeWidth || HANDLER_DIMENSIONS.VERTICAL_LINE_WIDTH,
});

/**
 * Individual zoom handler with line, circle, and icon
 */
export const ZoomHandler: React.FC<ZoomHandlerProps> = ({
  dataTestId,
  focusConfig,
  handlerConfig,
  height,
  isFocused,
  max,
  min,
  onBlur,
  onFocus,
  onKeyDown,
  onMouseDown,
  onTouchStart,
  screenReaderText,
  x,
}) => {
  const centerY = height / 2;
  const styles = getHandlerStyles(handlerConfig);

  // Calculate focus ring dimensions using the new util
  const focusOutline = calculateFocusOutline({
    elementHeight: styles.radius * 2,
    elementPosition: { x, y: centerY },
    elementStrokeWidth:
      typeof styles.strokeWidth === 'number'
        ? styles.strokeWidth
        : parseFloat(styles.strokeWidth.toString()),
    elementType: 'circle',
    elementWidth: styles.radius * 2,
    gap: focusConfig.gap,
    innerStrokeWidth: focusConfig.innerStrokeWidth,
    outlineStrokeWidth: focusConfig.outlineStrokeWidth,
  });

  return (
    <g data-testid={`${dataTestId}-group`}>
      {/* Vertical guide line */}
      <line
        pointerEvents="none"
        stroke={styles.verticalLineStroke}
        strokeWidth={styles.verticalLineStrokeWidth}
        x1={x}
        x2={x}
        y1={0}
        y2={height}
      />

      {/* Circular handle */}
      <circle
        aria-label={screenReaderText}
        aria-valuemax={max}
        aria-valuemin={min}
        // Used valuetext instead of valuenow to provide understandable information
        aria-valuetext={screenReaderText}
        cursor="ew-resize"
        cx={x}
        cy={centerY}
        data-testid={dataTestId}
        fill={styles.fill}
        r={styles.radius}
        role="slider"
        stroke={styles.stroke}
        strokeWidth={styles.strokeWidth}
        style={{ outline: 'none' }}
        tabIndex={0}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      />

      {/* Handler icon */}
      <HandlerIcon fill={styles.iconColor} x={x} y={centerY} />

      {/* Focus ring */}
      {isFocused && focusOutline.type === 'circle' && (
        <g pointerEvents="none">
          {/* Outer border */}
          <circle
            cx={focusOutline.outer.cx}
            cy={focusOutline.outer.cy}
            fill="none"
            r={focusOutline.outer.r}
            stroke={focusConfig.outlineColor}
            strokeWidth={focusConfig.outlineStrokeWidth}
          />
          {/* Inner border */}
          <circle
            cx={focusOutline.inner.cx}
            cy={focusOutline.inner.cy}
            fill="none"
            r={focusOutline.inner.r}
            stroke={focusConfig.innerColor}
            strokeWidth={focusConfig.innerStrokeWidth}
          />
        </g>
      )}
    </g>
  );
};
