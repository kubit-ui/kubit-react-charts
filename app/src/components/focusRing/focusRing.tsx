import { cloneElement, forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { useFocus } from '@/hooks/useFocus/useFocus';
import {
  calculateFocusOutline,
  getFocusConfig,
} from '@/utils/calculateFocusOutline/calculateFocusOutline';

import './focusRing.css';
import type { FocusRingProps, FocusRingRendererProps } from './focusRing.types';
import { composeRefs } from './utils/composeRefs';
import { type ElementInfo, detectElementInfo, detectWithFallback } from './utils/detectElementInfo';

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
 * Internal component with zero-configuration automatic element detection.
 * Analyzes SVG element properties to determine appropriate focus ring dimensions
 * and positioning without requiring any manual props.
 *
 * @example
 * ```tsx
 * // Plug-and-play usage - automatically detects all element types
 * <FocusRing>
 *   <rect x={34} y={34} width={32} height={32} fill="blue" />
 * </FocusRing>
 *
 * <FocusRing>
 *   <circle cx={50} cy={50} r={20} fill="red" />
 * </FocusRing>
 *
 * <FocusRing focusConfig={{ outlineColor: 'blue' }}>
 *   <polygon points="50,5 95,40 5,40" fill="green" />
 * </FocusRing>
 * ```
 */
const FocusRingComponent = forwardRef<SVGElement, FocusRingProps>(
  (
    {
      children,
      dataTestId = 'focus-ring',
      disabled = false,
      focusConfig,
      onBlur,
      onFocus,
      onFocusChange,
    },
    ref
  ) => {
    // Early validation: ensure we have a valid React element
    if (!children || typeof children !== 'object' || !('type' in children)) {
      return null;
    }

    // Use the existing focus hook to manage focus state
    const { handleBlur, handleFocus, isFocused } = useFocus();

    // Internal ref for DOM-based detection
    const elementRef = useRef<SVGElement>(null);
    const [domDetectedInfo, setDomDetectedInfo] = useState<ElementInfo | null>(null);

    // Detect element properties automatically
    // Optimized memoization: only re-calculate if relevant props change
    const detectedInfo = useMemo(() => {
      return detectElementInfo(children);
    }, [
      // Only include props that affect detection
      children.type,
      children.props.x,
      children.props.y,
      children.props.width,
      children.props.height,
      children.props.cx,
      children.props.cy,
      children.props.r,
      children.props.rx,
      children.props.ry,
      children.props.d,
      children.props.points,
      children.props.x1,
      children.props.y1,
      children.props.x2,
      children.props.y2,
      children.props.strokeWidth,
      children.props['stroke-width'],
      children.props.fontSize,
      children.props['font-size'],
    ]);

    // DOM-based fallback detection when props detection fails
    useEffect(() => {
      if (detectedInfo.isValid || !elementRef.current) {
        return;
      }

      const domInfo = detectWithFallback(children, elementRef.current);
      if (domInfo?.isValid) {
        setDomDetectedInfo(domInfo);
      }
    }, [children, detectedInfo.isValid]);

    // Combine refs for both internal and external use
    const combinedRef = useMemo(() => composeRefs(ref, elementRef), [ref]);

    // Use automatic detection with DOM fallback
    // Return null if no valid information is available (strict behavior)
    const finalElementInfo = useMemo(() => {
      // Use props detection first, then DOM detection fallback
      const sourceInfo = detectedInfo.isValid ? detectedInfo : domDetectedInfo || detectedInfo;

      // If no valid detection, return null (component won't render focus ring)
      if (!sourceInfo.isValid) {
        return null;
      }

      // Return the detected info directly
      return {
        elementHeight: sourceInfo.elementHeight || sourceInfo.elementSize || 24,
        elementPosition: sourceInfo.elementPosition || { x: 0, y: 0 },
        elementSize: sourceInfo.elementSize || 24,
        elementStrokeWidth: sourceInfo.elementStrokeWidth ?? 0,
        elementType: sourceInfo.elementType || 'rectangle',
        elementWidth: sourceInfo.elementWidth || sourceInfo.elementSize || 24,
      };
    }, [detectedInfo, domDetectedInfo]);

    // Calculate focus outline dimensions using existing utility
    // Only calculate if we have valid element info
    const focusOutline = useMemo(() => {
      if (!finalElementInfo) {
        return null;
      }

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
      ref: combinedRef,
    });

    return (
      <>
        {/* Render the wrapped children */}
        {wrappedChildren}

        {/* Render focus ring when focused, not disabled, and we have valid element info */}
        {isFocused && !disabled && focusOutline && (
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
 * **Simplified Internal Component**: Zero-configuration automatic element detection that
 * analyzes SVG element properties to determine appropriate focus ring dimensions and
 * positioning without requiring any manual configuration.
 *
 * Features:
 * - **Complete Automatic Detection**: Supports rect, circle, ellipse, path, polygon, line, and text elements
 * - **Zero Configuration**: No manual props required - just wrap your SVG element
 * - **Strict Validation**: Won't render focus ring for invalid/undetectable elements
 * - **DOM Fallback**: Uses getBBox() when props detection fails
 * - **Performance Optimized**: Smart memoization and path caching
 * - **Event Preservation**: Preserves all original event handlers on wrapped children
 * - **Flexible Styling**: Supports custom focus configuration via focusConfig prop
 *
 * @param props - Simplified FocusRingProps (no manual element props)
 * @returns JSX element with automatic focus ring functionality or null if element invalid
 */
export const FocusRing = FocusRingComponent;
