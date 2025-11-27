import type { RefObject } from 'react';

import type { FocusConfig } from '@/types/focusConfig.type';

import { useFocusRingData } from '../hooks/useFocusRingData';
import { FocusRingRenderer } from './FocusRingRenderer';

export interface FocusRingSeparateProps {
  targetRef: RefObject<SVGGraphicsElement>;
  isFocused: boolean;
  disabled?: boolean;
  dataTestId?: string;
  focusConfig?: FocusConfig;
}

/**
 * FocusRing component for separate mode (targetRef).
 * Renders only the focus ring, allowing precise z-order control.
 *
 * This component:
 * - Uses a ref to the target element (does not wrap it)
 * - Only renders the focus ring (no children cloning)
 * - Allows precise z-order control by controlling where FocusRing is placed in JSX
 * - Handles both adaptive and bounding-box variants
 *
 * **IMPORTANT NOTE: Z-Order with Adaptive Variant**
 *
 * When using `variant: 'adaptive'` (default), the FocusRing **MUST be rendered BEFORE**
 * the target element in SVG document order. Otherwise, focus ring strokes will cover the element.
 *
 * @param props - FocusRingSeparateProps
 * @returns JSX element with only focus ring, or null if not focused/disabled
 *
 * @example
 * ```tsx
 * const ref = useRef<SVGCircleElement>(null);
 *
 * // CORRECT: FocusRing before element
 * <>
 *   <FocusRingSeparate targetRef={ref} isFocused={true} />
 *   <circle ref={ref} cx={50} cy={50} r={30} />
 * </>
 * ```
 */
export const FocusRingSeparate: React.FC<FocusRingSeparateProps> = ({
  dataTestId = 'focus-ring',
  disabled = false,
  focusConfig,
  isFocused,
  targetRef,
}) => {
  const { layers } = useFocusRingData({
    elementRef: targetRef,
    focusConfig,
    isFocused,
  });

  // Early return if not focused or disabled
  if (!isFocused || disabled) {
    return null;
  }

  // Render focus ring with unified structure
  return <FocusRingRenderer dataTestId={dataTestId} layers={layers ?? undefined} />;
};
