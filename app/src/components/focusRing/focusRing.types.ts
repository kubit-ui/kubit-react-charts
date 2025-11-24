import type { FocusEventHandler, ReactElement } from 'react';

import type { FocusConfig } from '@/types/focusConfig.type';
import type { FocusOutlineDimensions } from '@/utils/calculateFocusOutline/calculateFocusOutline';

import type { FocusRingLayers } from './utils/createFocusRingLayersFromDOM';

/**
 * Props for the FocusRing component.
 *
 * Supports both manual configuration and automatic detection of SVG element properties.
 * When automatic detection is used, manual props are optional and serve as overrides.
 */
export interface FocusRingProps {
  /** The SVG element to wrap with focus ring functionality */
  children: ReactElement;

  /** Test identifier for the focus ring elements */
  dataTestId?: string;

  /** Whether the focus ring is disabled */
  disabled?: boolean;

  /**
   * Whether to automatically detect element properties from children.
   * When true (default), manual props are optional and serve as overrides.
   * When false, manual props are required.
   */
  autoDetect?: boolean;

  /** Position of the element center (overrides auto-detection) */
  elementPosition?: { x: number; y: number };

  /** Size of the element (overrides auto-detection) */
  elementSize?: number;

  /** Stroke width of the wrapped element (overrides auto-detection) */
  elementStrokeWidth?: number;

  /** Element width for rectangles/ellipses (overrides auto-detection) */
  elementWidth?: number;

  /** Element height for rectangles/ellipses (overrides auto-detection) */
  elementHeight?: number;

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

  /** The React element to create focus rings for (for adaptive mode with children) */
  element?: ReactElement;

  /** Pre-computed adaptive layers from DOM (for adaptive mode with targetRef) */
  layers?: FocusRingLayers;

  /** Focus outline dimensions calculated by calculateFocusOutline (for bounding-box mode) */
  outline?: FocusOutlineDimensions;
}
