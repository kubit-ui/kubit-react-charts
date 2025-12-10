import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { FocusRingProps } from '../focusRing.types';

// Specific ArgTypes for FocusRing - Internal component for focus visualization
// Categorized following CATEGORY_CONTROL categories
export const argtypes = (): ArgTypes<FocusRingProps> => {
  return {
    // === CONTENT ===
    children: {
      control: false,
      description:
        'The SVG element to wrap with focus ring functionality (Mode 1: inline rendering). Mutually exclusive with targetRef.',
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        disable: true,
        type: { summary: 'ReactElement' },
      },
    },

    // === TESTING ===
    dataTestId: {
      control: 'text',
      description:
        'Test identifier for the focus ring elements. Used for automated testing and element identification.',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        defaultValue: { summary: 'focus-ring' },
        type: { summary: 'string' },
      },
    },

    // === BEHAVIOR ===
    disabled: {
      control: 'boolean',
      description:
        'Whether the focus ring is disabled. When true, no focus ring is rendered regardless of isFocused state.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },

    // === CUSTOMIZATION ===
    focusConfig: {
      control: 'object',
      description:
        'Configuration for focus ring appearance. Includes outlineColor (default: "#0078D4"), outlineStrokeWidth (default: 2), innerColor (default: "#ffffff"), innerStrokeWidth (default: 2), gap (default: 0, only for bounding-box variant), and variant ("adaptive" | "bounding-box", default: "adaptive").',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: {
          summary:
            '{ outlineColor: "#0078D4", outlineStrokeWidth: 2, innerColor: "#ffffff", innerStrokeWidth: 2, gap: 0, variant: "adaptive" }',
        },
        type: {
          summary:
            '{ outlineColor?: string; outlineStrokeWidth?: number; innerColor?: string; innerStrokeWidth?: number; gap?: number; variant?: "adaptive" | "bounding-box" }',
        },
      },
    },

    // === STATE ===
    isFocused: {
      control: 'boolean',
      description:
        'Controlled focus state (REQUIRED). Parent component must manage this state based on focus/blur events. When true, focus ring is visible.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },

    // === ADVANCED ===
    targetRef: {
      control: false,
      description:
        'Reference to external SVG element for separate rendering (Mode 2). When provided, only focus ring is rendered. Mutually exclusive with children.',
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        disable: true,
        type: { summary: 'RefObject<SVGGraphicsElement>' },
      },
    },
  };
};
