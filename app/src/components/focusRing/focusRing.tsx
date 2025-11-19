import { cloneElement, forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import {
  calculateFocusOutline,
  getFocusConfig,
} from '@/utils/calculateFocusOutline/calculateFocusOutline';

import './focusRing.css';
import type { FocusRingProps, FocusRingRendererProps } from './focusRing.types';
import { composeRefs } from './utils/composeRefs';
import {
  type ElementInfo,
  detectElementBounds,
  detectElementInfo,
  detectWithFallback,
} from './utils/detectElementInfo';

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
 * **Controlled & Decorative Component**: This component is purely decorative and does not
 * manage focus state internally. The parent component must control the `isFocused` prop.
 *
 * **Two Modes of Operation:**
 *
 * 1. **Inline Mode (children)**: Wraps the element and renders the focus ring inline.
 *    Best for simple cases where z-order is not a concern.
 *
 * 2. **Separate Mode (targetRef)**: Only renders the focus ring, not the element.
 *    Allows precise control over z-order (e.g., ring on top of other elements).
 *
 * Features:
 * - **Complete Automatic Detection**: Supports rect, circle, ellipse, path, polygon, line, and text elements
 * - **Zero Configuration**: No manual props required - just provide isFocused state
 * - **Controlled Component**: Parent manages focus state via isFocused prop
 * - **Strict Validation**: Won't render focus ring for invalid/undetectable elements
 * - **DOM Fallback**: Uses getBBox() when props detection fails
 * - **Performance Optimized**: Smart memoization and path caching
 * - **Flexible Z-Order**: Choose inline or separate rendering
 *
 * @example
 * // Mode 1: Inline (children)
 * const [isFocused, setIsFocused] = useState(false);
 * <FocusRing isFocused={isFocused}>
 *   <rect
 *     onFocus={() => setIsFocused(true)}
 *     onBlur={() => setIsFocused(false)}
 *   />
 * </FocusRing>
 *
 * @example
 * // Mode 2: Separate (targetRef)
 * const rectRef = useRef<SVGRectElement>(null);
 * const [isFocused, setIsFocused] = useState(false);
 * <>
 *   <rect
 *     ref={rectRef}
 *     onFocus={() => setIsFocused(true)}
 *     onBlur={() => setIsFocused(false)}
 *   />
 *   <FocusRing targetRef={rectRef} isFocused={isFocused} />
 * </>
 */
const FocusRingComponent = forwardRef<SVGElement, FocusRingProps>(
  (
    { children, dataTestId = 'focus-ring', disabled = false, focusConfig, isFocused, targetRef },
    ref
  ) => {
    // Validation: need either children OR targetRef (not both, not neither)
    const hasChildren = !!children;
    const hasTargetRef = !!targetRef;

    if (!hasChildren && !hasTargetRef) {
      // Silent fail - no warning needed
      return null;
    }

    if (hasChildren && hasTargetRef) {
      // Silent fail - use children mode when both are provided
    }

    // Determine which mode we're in
    const useExternalRef = !hasChildren && hasTargetRef;

    // Early validation for children mode
    if (hasChildren && (typeof children !== 'object' || !('type' in children))) {
      // Silent fail - invalid children
      return null;
    }

    // Internal ref for DOM-based detection (used for both modes)
    const internalRef = useRef<SVGElement>(null);
    const [domDetectedInfo, setDomDetectedInfo] = useState<ElementInfo | null>(null);

    // Use the appropriate ref: targetRef for external mode, internalRef for children mode
    const elementRef = useExternalRef ? targetRef : internalRef;

    // Detect element properties automatically from props (children mode)
    const detectedInfo = useMemo(() => {
      if (!hasChildren || !children) {
        return null;
      }
      return detectElementInfo(children);
    }, [
      hasChildren,
      children,
      // Only re-detect if relevant props change
      children?.type,
      children?.props.x,
      children?.props.y,
      children?.props.width,
      children?.props.height,
      children?.props.cx,
      children?.props.cy,
      children?.props.r,
      children?.props.rx,
      children?.props.ry,
      children?.props.d,
      children?.props.points,
      children?.props.x1,
      children?.props.y1,
      children?.props.x2,
      children?.props.y2,
      children?.props.strokeWidth,
      children?.props['stroke-width'],
      children?.props.fontSize,
      children?.props['font-size'],
    ]);

    // DOM-based detection for targetRef mode or fallback for children mode
    useEffect(() => {
      // For targetRef mode, always use DOM detection
      if (useExternalRef && elementRef?.current) {
        const domInfo = detectElementBounds(elementRef.current);
        if (domInfo?.isValid) {
          setDomDetectedInfo(domInfo);
        }
        return;
      }

      // For children mode, use DOM fallback only if props detection failed
      if (hasChildren && !detectedInfo?.isValid && elementRef?.current && children) {
        const domInfo = detectWithFallback(children, elementRef.current);
        if (domInfo?.isValid) {
          setDomDetectedInfo(domInfo);
        }
      }
    }, [useExternalRef, hasChildren, children, detectedInfo, elementRef, isFocused]);

    // Determine final element info (props detection or DOM fallback)
    const finalElementInfo = useMemo(() => {
      // For targetRef mode, always use DOM detection
      if (useExternalRef) {
        if (!domDetectedInfo?.isValid) {
          return null;
        }

        return {
          elementHeight: domDetectedInfo.elementHeight || domDetectedInfo.elementSize || 24,
          elementPosition: domDetectedInfo.elementPosition || { x: 0, y: 0 },
          elementSize: domDetectedInfo.elementSize || 24,
          elementStrokeWidth: domDetectedInfo.elementStrokeWidth ?? 0,
          elementType: domDetectedInfo.elementType || 'rectangle',
          elementWidth: domDetectedInfo.elementWidth || domDetectedInfo.elementSize || 24,
        };
      }

      // For children mode, prefer props detection, fallback to DOM
      const sourceInfo = detectedInfo?.isValid ? detectedInfo : domDetectedInfo || detectedInfo;

      if (!sourceInfo?.isValid) {
        return null;
      }

      return {
        elementHeight: sourceInfo.elementHeight || sourceInfo.elementSize || 24,
        elementPosition: sourceInfo.elementPosition || { x: 0, y: 0 },
        elementSize: sourceInfo.elementSize || 24,
        elementStrokeWidth: sourceInfo.elementStrokeWidth ?? 0,
        elementType: sourceInfo.elementType || 'rectangle',
        elementWidth: sourceInfo.elementWidth || sourceInfo.elementSize || 24,
      };
    }, [useExternalRef, detectedInfo, domDetectedInfo]);

    // Calculate focus outline dimensions using existing utility
    const focusOutline = useMemo(() => {
      if (!finalElementInfo) {
        return null;
      }

      const resolvedFocusConfig = getFocusConfig(focusConfig);

      return calculateFocusOutline({
        elementHeight: finalElementInfo.elementHeight,
        elementPosition: finalElementInfo.elementPosition,
        elementStrokeWidth: finalElementInfo.elementStrokeWidth,
        elementType: 'rectangle',
        elementWidth: finalElementInfo.elementWidth,
        gap: resolvedFocusConfig.gap,
        innerStrokeWidth: resolvedFocusConfig.innerStrokeWidth,
        outlineStrokeWidth: resolvedFocusConfig.outlineStrokeWidth,
      });
    }, [finalElementInfo, focusConfig]);

    // Get resolved focus configuration with defaults
    const resolvedFocusConfig = useMemo(() => getFocusConfig(focusConfig), [focusConfig]);

    // MODO 1: children (render inline)
    if (hasChildren && children) {
      // Combine refs for both internal and external use
      const combinedRef = useMemo(() => composeRefs(ref, internalRef), [ref]);

      // Clone children and add ref (but NOT event handlers - parent manages those)
      const wrappedChildren = cloneElement(children, {
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

    // MODO 2: targetRef (render only focus ring)
    return isFocused && !disabled && focusOutline ? (
      <FocusRingRenderer
        dataTestId={dataTestId}
        focusConfig={resolvedFocusConfig}
        outline={focusOutline}
      />
    ) : null;
  }
);

FocusRingComponent.displayName = 'FocusRing';

/**
 * FocusRing - Controlled, purely decorative component for rendering focus rings around SVG elements.
 *
 * **Key Characteristics:**
 * - **Controlled Component**: Parent manages `isFocused` state
 * - **Purely Decorative**: Does not intercept or manage events
 * - **Two Modes**: Inline (children) or Separate (targetRef) rendering
 * - **Zero Configuration**: Automatic element detection
 * - **Strict Validation**: Won't render for invalid elements
 * - **DOM Fallback**: Uses getBBox() when props detection fails
 *
 * **Mode 1: Inline (children)**
 * - Wraps the element and renders focus ring inline
 * - Best for simple cases where z-order is not a concern
 *
 * **Mode 2: Separate (targetRef)**
 * - Only renders the focus ring, not the element
 * - Allows precise control over z-order
 * - Element must be rendered separately by parent
 *
 * @param props - FocusRingProps
 * @returns JSX element with focus ring or null
 */
export const FocusRing = FocusRingComponent;
