import { type ReactElement, cloneElement, useRef } from 'react';

import type { FocusConfig } from '@/types/focusConfig.type';

import { useFocusRingData } from '../hooks/useFocusRingData';
import { composeRefs } from '../utils/composeRefs';
import { FocusRingRenderer } from './FocusRingRenderer';

export interface FocusRingInlineProps {
  children: ReactElement;
  isFocused: boolean;
  disabled?: boolean;
  dataTestId?: string;
  focusConfig?: FocusConfig;
}

/**
 * FocusRing component for inline mode (children).
 * Wraps the element and renders focus ring inline with automatic z-order.
 *
 * This component:
 * - Clones the children element and attaches a ref to it
 * - Detects element bounds on mount and when focus state changes
 * - Renders the focus ring BEFORE the element (proper z-order)
 * - Handles both adaptive and bounding-box variants
 * - Preserves any existing ref the children might have
 *
 * @param props - FocusRingInlineProps
 * @returns JSX element with focus ring + wrapped children
 */
export const FocusRingInline: React.FC<FocusRingInlineProps> = ({
  children,
  dataTestId = 'focus-ring',
  disabled = false,
  focusConfig,
  isFocused,
}) => {
  // TODO - review this validation
  // Validate that children is a valid ReactElement (required for cloneElement)
  if (!children || typeof children !== 'object' || !('type' in children)) {
    return null;
  }

  // Create ref for the element
  const childrenRef = useRef<SVGElement>(null);
  const { layers } = useFocusRingData({
    elementRef: childrenRef,
    focusConfig,
    isFocused,
  });

  // Extract the ref from children safely
  // Children might have a ref attached, we need to preserve it while adding our own
  const childrenWithRef = children as ReactElement & { ref?: React.Ref<SVGElement> };
  const combinedRef = composeRefs(childrenRef, childrenWithRef.ref);

  // Clone children and add ref (but NOT event handlers - parent manages those)
  const wrappedChildren = cloneElement(children, {
    ref: combinedRef,
  });

  return (
    <>
      {/* Render focus ring when focused and not disabled */}
      {isFocused && !disabled && (
        <FocusRingRenderer dataTestId={dataTestId} layers={layers ?? undefined} />
      )}

      {/* Render the wrapped children */}
      {wrappedChildren}
    </>
  );
};
