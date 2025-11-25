import type { FC } from 'react';

import { FocusRingInline } from './components/FocusRingInline';
import { FocusRingSeparate } from './components/FocusRingSeparate';
import './focusRing.css';
import type { FocusRingProps } from './focusRing.types';

const FocusRingComponent: FC<FocusRingProps> = ({
  children,
  dataTestId = 'focus-ring',
  disabled = false,
  focusConfig,
  isFocused,
  targetRef,
}) => {
  // Validation: need either children OR targetRef (not both, not neither)
  const hasChildren = !!children;
  const hasTargetRef = !!targetRef;

  if (!hasChildren && !hasTargetRef) {
    return null;
  }

  // Route to appropriate component based on mode
  if (hasChildren) {
    return (
      <FocusRingInline
        dataTestId={dataTestId}
        disabled={disabled}
        focusConfig={focusConfig}
        isFocused={isFocused}
      >
        {children}
      </FocusRingInline>
    );
  }

  if (hasTargetRef) {
    return (
      <FocusRingSeparate
        dataTestId={dataTestId}
        disabled={disabled}
        focusConfig={focusConfig}
        isFocused={isFocused}
        targetRef={targetRef}
      />
    );
  }

  return null;
};

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
