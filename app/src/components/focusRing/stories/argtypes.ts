import type { ArgTypes } from '@storybook/react';

import type { FocusRingProps } from '../focusRing.types';

export const focusRingArgtypes: ArgTypes<FocusRingProps> = {
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
  focusConfig: {
    control: 'object',
    description: 'Configuration for focus ring appearance',
  },
  isFocused: {
    control: 'boolean',
    defaultValue: false,
    description: 'Controlled focus state - determines whether the focus ring is visible',
  },
  targetRef: {
    control: false,
    description:
      'Reference to external SVG element for separate rendering (alternative to children mode)',
  },
};
