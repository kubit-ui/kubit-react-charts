import type { ArgTypes } from '@storybook/react';

import type { FocusRingProps } from '../focusRing.types';

export const focusRingArgtypes: ArgTypes<FocusRingProps> = {
  autoDetect: {
    control: 'boolean',
    defaultValue: true,
    description:
      'Whether to automatically detect element properties from children. When false, manual props are required.',
  },
  children: {
    control: false,
    description: 'The SVG element to wrap with focus ring functionality',
  },
  dataTestId: {
    control: 'text',
    defaultValue: 'focus-ring',
    description: 'Test identifier for the focus ring elements',
  },
  disabled: {
    control: 'boolean',
    defaultValue: false,
    description: 'Whether the focus ring is disabled',
  },
  elementHeight: {
    control: { max: 150, min: 8, step: 4, type: 'number' },
    description: 'Element height for rectangles/ellipses (overrides auto-detection)',
  },
  elementPosition: {
    control: 'object',
    defaultValue: { x: 50, y: 50 },
    description: 'Position of the element center (overrides auto-detection)',
  },
  elementSize: {
    control: { max: 100, min: 8, step: 4, type: 'number' },
    defaultValue: 32,
    description: 'Size of the element (overrides auto-detection)',
  },
  elementStrokeWidth: {
    control: { max: 10, min: 0, step: 1, type: 'number' },
    defaultValue: 0,
    description: 'Stroke width of the wrapped element (overrides auto-detection)',
  },
  elementWidth: {
    control: { max: 150, min: 8, step: 4, type: 'number' },
    description: 'Element width for rectangles/ellipses (overrides auto-detection)',
  },
  focusConfig: {
    control: 'object',
    description: 'Configuration for focus ring appearance',
  },
  onBlur: {
    action: 'blur',
    control: false,
    description: 'Original blur handler to preserve',
  },
  onFocus: {
    action: 'focus',
    control: false,
    description: 'Original focus handler to preserve',
  },
  onFocusChange: {
    action: 'focusChange',
    control: false,
    description: 'Callback fired when focus state changes',
  },
};
