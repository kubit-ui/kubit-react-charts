import type { ReactElement, RefObject } from 'react';

import type { FocusConfig } from '@/types/focusConfig.type';
import type { FocusOutlineDimensions } from '@/utils/calculateFocusOutline/calculateFocusOutline';

import type { FocusRingLayers } from './utils/createFocusRingLayers';

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

  /** Pre-computed adaptive layers from DOM (for adaptive mode - unified approach) */
  layers?: FocusRingLayers;

  /** Focus outline dimensions calculated by calculateFocusOutline (for bounding-box mode) */
  outline?: FocusOutlineDimensions;
}
