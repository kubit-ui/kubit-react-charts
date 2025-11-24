import { cloneElement, forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import {
  calculateFocusOutline,
  getFocusConfig,
} from '@/utils/calculateFocusOutline/calculateFocusOutline';

import './focusRing.css';
import type { FocusRingProps, FocusRingRendererProps } from './focusRing.types';
import { composeRefs } from './utils/composeRefs';
import { createFocusRingLayers } from './utils/createFocusRingLayers';
import { createFocusRingLayersFromDOM } from './utils/createFocusRingLayersFromDOM';
import {
  type ElementInfo,
  detectElementBounds,
  detectElementInfo,
  detectWithFallback,
} from './utils/detectElementInfo';

/**
 * Internal component that renders the actual focus ring elements.
 * Supports both adaptive (Clone & Scale) and bounding-box strategies.
 */
const FocusRingRenderer: React.FC<FocusRingRendererProps> = ({
  dataTestId,
  element,
  focusConfig,
  layers,
  outline,
}) => {
  // Strategy 1a: Adaptive mode with element (Clone & Scale from React element)
  if (element && focusConfig.variant === 'adaptive') {
    const computedLayers = createFocusRingLayers(element, focusConfig);

    if (!computedLayers || !computedLayers.canRender) {
      return null; // Element not supported
    }

    return (
      <g className="focus-ring-container" pointerEvents="none">
        {/* Outer ring with data-testid */}
        {cloneElement(computedLayers.outerRing, {
          'data-testid': `${dataTestId}-focus-outer`,
        })}

        {/* Inner ring with data-testid */}
        {cloneElement(computedLayers.innerRing, {
          'data-testid': `${dataTestId}-focus-inner`,
        })}
      </g>
    );
  }

  // Strategy 1b: Adaptive mode with pre-computed layers (from DOM in targetRef mode)
  if (layers && focusConfig.variant === 'adaptive' && layers.canRender) {
    return (
      <g className="focus-ring-container" pointerEvents="none">
        {/* Outer ring with data-testid */}
        {cloneElement(layers.outerRing, {
          'data-testid': `${dataTestId}-focus-outer`,
        })}

        {/* Inner ring with data-testid */}
        {cloneElement(layers.innerRing, {
          'data-testid': `${dataTestId}-focus-inner`,
        })}
      </g>
    );
  }

  // Strategy 2: Bounding-box mode with outline (legacy calculateFocusOutline)
  if (outline && outline.type === 'rectangle') {
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
  }

  // No valid rendering strategy
  return null;
};

const FocusRingComponent = forwardRef<SVGElement, FocusRingProps>(
  (
    { children, dataTestId = 'focus-ring', disabled = false, focusConfig, isFocused, targetRef },
    ref
  ) => {
    // Validation: need either children OR targetRef (not both, not neither)
    const hasChildren = !!children;
    const hasTargetRef = !!targetRef;

    // TODO - REVIEW
    if (!hasChildren && !hasTargetRef) {
      // Silent fail - no warning needed
      return null;
    }

    // TODO - REVIEW
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

    // State to store adaptive layers for targetRef mode
    const [adaptiveLayers, setAdaptiveLayers] = useState<ReturnType<
      typeof createFocusRingLayersFromDOM
    > | null>(null);

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

        // If using adaptive variant with targetRef, generate adaptive layers from DOM
        const resolvedConfig = getFocusConfig(focusConfig);
        if (resolvedConfig.variant === 'adaptive') {
          const layers = createFocusRingLayersFromDOM(elementRef.current, resolvedConfig);
          setAdaptiveLayers(layers);
        } else {
          setAdaptiveLayers(null);
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
    }, [useExternalRef, hasChildren, children, detectedInfo, elementRef, isFocused, focusConfig]);

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
          {/* Render focus ring when focused, not disabled, and we have valid data */}
          {isFocused && !disabled && (
            <>
              {/* Try adaptive mode first (Clone & Scale) */}
              {resolvedFocusConfig.variant === 'adaptive' && (
                <FocusRingRenderer
                  dataTestId={dataTestId}
                  element={children}
                  focusConfig={resolvedFocusConfig}
                />
              )}

              {/* Fallback to bounding-box mode with outline calculation */}
              {resolvedFocusConfig.variant === 'bounding-box' && focusOutline && (
                <FocusRingRenderer
                  dataTestId={dataTestId}
                  focusConfig={resolvedFocusConfig}
                  outline={focusOutline}
                />
              )}
            </>
          )}
          {/* Render the wrapped children */}
          {wrappedChildren}
        </>
      );
    }

    // MODO 2: targetRef (render only focus ring)
    // Supports both adaptive and bounding-box strategies
    if (!isFocused || disabled) {
      return null;
    }

    // For adaptive variant with targetRef, render using adaptive layers from DOM
    if (resolvedFocusConfig.variant === 'adaptive' && adaptiveLayers?.canRender) {
      return (
        <FocusRingRenderer
          dataTestId={dataTestId}
          focusConfig={resolvedFocusConfig}
          layers={adaptiveLayers}
        />
      );
    }

    // For bounding-box variant with targetRef, render using calculated outline
    if (resolvedFocusConfig.variant === 'bounding-box' && focusOutline) {
      return (
        <FocusRingRenderer
          dataTestId={dataTestId}
          focusConfig={resolvedFocusConfig}
          outline={focusOutline}
        />
      );
    }

    return null;
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
 *
 * **Two Modes:**
 *
 * 1. **Inline (children)** - Wraps element, focus ring rendered inline, z-order handled automatically
 * 2. **Separate (targetRef)** - Only renders focus ring, allows precise z-order control
 *
 * **IMPORTANT NOTE: Z-Order with Adaptive Variant**
 *
 * When using `variant: 'adaptive'` (default) with `targetRef` mode, the FocusRing **MUST be rendered BEFORE**
 * the target element in SVG document order. Otherwise, focus ring strokes will cover the element.
 *
 * ```tsx
 * // CORRECT: FocusRing before element
 * <>
 *   <FocusRing targetRef={ref} isFocused={focused} />
 *   <circle ref={ref} cx={50} cy={50} r={30} />
 * </>
 * ```
 *
 * @param props - FocusRingProps
 * @returns JSX element with focus ring or null
 */
export const FocusRing = FocusRingComponent;
