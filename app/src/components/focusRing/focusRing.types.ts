import type { FocusEventHandler, ReactElement } from 'react';

import type { FocusConfig } from '@/types/focusConfig.type';
import type { FocusOutlineDimensions } from '@/utils/calculateFocusOutline/calculateFocusOutline';

/**
 * Props for the FocusRing component.
 *
 * Internal component that automatically detects SVG element properties
 * and renders appropriate focus rings with zero configuration required.
 */
export interface FocusRingProps {
  /** The SVG element to wrap with focus ring functionality */
  children: ReactElement;

  /** Test identifier for the focus ring elements */
  dataTestId?: string;

  /** Whether the focus ring is disabled */
  disabled?: boolean;

  /** Configuration for focus ring appearance */
  focusConfig?: FocusConfig;

  /** Callback fired when focus state changes */
  onFocusChange?: (isFocused: boolean) => void;

  /** Original focus handler to preserve */
  onFocus?: FocusEventHandler<SVGElement>;

  /** Original blur handler to preserve */
  onBlur?: FocusEventHandler<SVGElement>;
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
