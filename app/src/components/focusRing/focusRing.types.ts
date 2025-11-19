import type { ReactElement, RefObject } from 'react';

import type { FocusConfig } from '@/types/focusConfig.type';
import type { FocusOutlineDimensions } from '@/utils/calculateFocusOutline/calculateFocusOutline';

/**
 * Props for the FocusRing component.
 *
 * FocusRing is a controlled, purely decorative component that renders focus rings
 * around SVG elements. It supports two modes:
 *
 * **Mode 1: Inline rendering (children)**
 * - Wraps the element with focus ring inline
 * - Useful when z-order is not a concern
 *
 * **Mode 2: Separate rendering (targetRef)**
 * - Renders only the focus ring, separate from the element
 * - Allows control over z-order (e.g., ring on top of other elements)
 * - Element must be rendered separately by the parent
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
export interface FocusRingProps {
  /**
   * The SVG element to wrap with focus ring (Mode 1: inline rendering).
   * Mutually exclusive with targetRef - provide either children OR targetRef, not both.
   */
  children?: ReactElement;

  /**
   * Reference to external SVG element (Mode 2: separate rendering).
   * When provided, only the focus ring is rendered (not the element itself).
   * Mutually exclusive with children - provide either children OR targetRef, not both.
   */
  targetRef?: RefObject<SVGElement>;

  /**
   * Controlled focus state (REQUIRED).
   * The parent component must manage this state and update it based on focus/blur events.
   * FocusRing is purely decorative and does not manage state internally.
   */
  isFocused: boolean;

  /** Test identifier for the focus ring elements */
  dataTestId?: string;

  /** Whether the focus ring is disabled */
  disabled?: boolean;

  /** Configuration for focus ring appearance */
  focusConfig?: FocusConfig;
}

/**
 * Props for the internal FocusRingRenderer component
 */
export interface FocusRingRendererProps {
  /** Test identifier for the focus ring elements */
  dataTestId: string;

  /** Resolved focus configuration with defaults */
  focusConfig: Required<FocusConfig>;

  /** Focus outline dimensions calculated by calculateFocusOutline */
  outline: FocusOutlineDimensions;
}
