import { cloneElement, forwardRef, useMemo } from 'react';

import { useFocus } from '@/hooks/useFocus/useFocus';
import {
  calculateFocusOutline,
  getFocusConfig,
} from '@/utils/calculateFocusOutline/calculateFocusOutline';

import './focusRing.css';
import type { FocusRingProps, FocusRingRendererProps } from './focusRing.types';
import { detectElementInfo } from './utils/detectElementInfo';

/**
 * Internal component that renders the actual focus ring elements
 */
const FocusRingRenderer: React.FC<FocusRingRendererProps> = ({
  dataTestId,
  focusConfig,
  outline,
}) => {
  // For the basic version, we always render rectangles
  if (outline.type !== 'rectangle') {
    return null;
  }

  return (
    <g className="focus-ring-container" pointerEvents="none">
      {/* Outer focus ring */}
      <rect
        className="focus-ring-outer"
        data-testid={`${dataTestId}-focus-outer`}
        fill="none"
        height={outline.outer.height}
        stroke={focusConfig.outlineColor}
        strokeWidth={focusConfig.outlineStrokeWidth}
        width={outline.outer.width}
        x={outline.outer.x}
        y={outline.outer.y}
      />

      {/* Inner focus ring */}
      <rect
        className="focus-ring-inner"
        data-testid={`${dataTestId}-focus-inner`}
        fill="none"
        height={outline.inner.height}
        stroke={focusConfig.innerColor}
        strokeWidth={focusConfig.innerStrokeWidth}
        width={outline.inner.width}
        x={outline.inner.x}
        y={outline.inner.y}
      />
    </g>
  );
};

/**
 * FocusRing component that wraps SVG elements and automatically handles focus ring rendering.
 *
 * Features automatic element detection that analyzes SVG element properties to determine
 * appropriate focus ring dimensions and positioning. Manual props can be provided as overrides.
 *
 * @example
 * ```tsx
 * // Automatic detection (recommended)
 * <FocusRing>
 *   <rect x={34} y={34} width={32} height={32} fill="blue" />
 * </FocusRing>
 *
 * // Manual configuration (for compatibility or overrides)
 * <FocusRing
 *   elementSize={40}
 *   elementPosition={{ x: 50, y: 50 }}
 *   focusConfig={{ outlineColor: 'blue' }}
 * >
 *   <CustomComponent />
 * </FocusRing>
 *
 * // Automatic detection with manual override
 * <FocusRing elementSize={40}>
 *   <circle cx={50} cy={50} r={16} />
 * </FocusRing>
 * ```
 */
const FocusRingComponent = forwardRef<SVGElement, FocusRingProps>(
  (
    {
      autoDetect = true,
      children,
      dataTestId = 'focus-ring',
      disabled = false,
      elementHeight,
      elementPosition,
      elementSize,
      elementStrokeWidth,
      elementWidth,
      focusConfig,
      onBlur,
      onFocus,
      onFocusChange,
    },
    ref
  ) => {
    // Use the existing focus hook to manage focus state
    const { handleBlur, handleFocus, isFocused } = useFocus();

    // Detect element properties automatically or use manual props
    const detectedInfo = useMemo(() => {
      if (autoDetect) {
        return detectElementInfo(children);
      }
      return {
        elementHeight: elementHeight || elementSize || 24,
        elementPosition: elementPosition || { x: 0, y: 0 },
        elementSize: elementSize || 24,
        elementStrokeWidth: elementStrokeWidth || 0,
        elementType: 'rectangle' as const,
        elementWidth: elementWidth || elementSize || 24,
      };
    }, [
      children,
      autoDetect,
      elementSize,
      elementPosition,
      elementStrokeWidth,
      elementWidth,
      elementHeight,
    ]);

    // Merge detected properties with manual overrides
    const finalElementInfo = useMemo(
      () => ({
        elementHeight:
          elementHeight ||
          detectedInfo.elementHeight ||
          elementSize ||
          detectedInfo.elementSize ||
          24,
        elementPosition: elementPosition || detectedInfo.elementPosition || { x: 0, y: 0 },
        elementSize: elementSize || detectedInfo.elementSize || 24,
        elementStrokeWidth: elementStrokeWidth ?? detectedInfo.elementStrokeWidth ?? 0,
        elementType: detectedInfo.elementType || 'rectangle',
        elementWidth:
          elementWidth ||
          detectedInfo.elementWidth ||
          elementSize ||
          detectedInfo.elementSize ||
          24,
      }),
      [detectedInfo, elementSize, elementPosition, elementStrokeWidth, elementWidth, elementHeight]
    );

    // Calculate focus outline dimensions using existing utility
    const focusOutline = useMemo(() => {
      const resolvedFocusConfig = getFocusConfig(focusConfig);

      return calculateFocusOutline({
        elementHeight: finalElementInfo.elementHeight,
        elementPosition: finalElementInfo.elementPosition,
        elementStrokeWidth: finalElementInfo.elementStrokeWidth,
        elementType: 'rectangle', // Keep as rectangle for now (will be extended in Phase 2B)
        elementWidth: finalElementInfo.elementWidth,
        gap: resolvedFocusConfig.gap,
        innerStrokeWidth: resolvedFocusConfig.innerStrokeWidth,
        outlineStrokeWidth: resolvedFocusConfig.outlineStrokeWidth,
      });
    }, [finalElementInfo, focusConfig]);

    // Get resolved focus configuration with defaults
    const resolvedFocusConfig = useMemo(() => getFocusConfig(focusConfig), [focusConfig]);

    // Clone children and add focus/blur handlers
    const wrappedChildren = cloneElement(children, {
      onBlur: (event: React.FocusEvent<SVGElement>) => {
        // Call original onBlur if it exists from props
        onBlur?.(event);
        // Call children's original onBlur if it exists
        children.props.onBlur?.(event);
        // Handle blur state change
        handleBlur(event);
        // Call callback if provided
        onFocusChange?.(false);
      },
      onFocus: (event: React.FocusEvent<SVGElement>) => {
        // Call original onFocus if it exists from props
        onFocus?.(event);
        // Call children's original onFocus if it exists
        children.props.onFocus?.(event);
        // Handle focus state change
        handleFocus(event);
        // Call callback if provided
        onFocusChange?.(true);
      },
      ref,
    });

    return (
      <>
        {/* Render the wrapped children */}
        {wrappedChildren}

        {/* Render focus ring when focused and not disabled */}
        {isFocused && !disabled && (
          <FocusRingRenderer
            dataTestId={dataTestId}
            focusConfig={resolvedFocusConfig}
            outline={focusOutline}
          />
        )}
      </>
    );
  }
);

FocusRingComponent.displayName = 'FocusRing';

/**
 * FocusRing component that wraps SVG elements and automatically handles focus ring rendering.
 *
 * **Enhanced Implementation**: Features automatic element detection that analyzes SVG element
 * properties to determine appropriate focus ring dimensions and positioning. Manual props can
 * be provided as overrides when needed.
 *
 * Features:
 * - **Automatic Element Detection**: Analyzes rect, circle, ellipse, path, and polygon elements
 * - **Manual Override Support**: All detected properties can be manually overridden
 * - **Backward Compatibility**: Existing manual prop usage continues to work
 * - **Automatic Focus Management**: Uses the `useFocus` hook internally
 * - **Precise Calculations**: Reuses existing `calculateFocusOutline` utility
 * - **Event Preservation**: Preserves original event handlers on wrapped children
 * - **Consistent Styling**: Maintains existing `FocusConfig` API
 *
 * @param props - FocusRingProps configuration
 * @returns JSX element with focus ring functionality
 */
export const FocusRing = FocusRingComponent;
