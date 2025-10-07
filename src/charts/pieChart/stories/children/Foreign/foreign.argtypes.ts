import type { ArgTypes } from 'storybook/internal/types';

import type { ForeignObjectProps } from '@/components/foreignObject/foreignObject.types';
import { CATEGORY_CONTROL } from '@/storybook';

import type { ForeignStoryArgs } from './foreign.types';

// Specific ArgTypes for Foreign - Only PieChart.Foreign props
// Categorized following CATEGORY_CONTROL categories
export const foreignArgTypes = (): ArgTypes<ForeignStoryArgs<ForeignObjectProps>> => {
  return {
    children: {
      control: { type: 'select' },
      description:
        'Type of content to display inside the foreign object. Note: These options (text, icon, image, gif) are specific to this story example. In real usage, children accepts any ReactNode.',
      options: ['text', 'icon', 'image', 'gif'],
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'ReactNode' },
      },
    },

    dataTestId: {
      control: { type: 'text' },
      description: 'Test identifier for the foreign object element.',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        type: { summary: 'string' },
      },
    },

    fontSize: {
      control: { max: 100, min: 12, step: 2, type: 'range' },
      description: 'Font size for text content (story example only - when children is "text").',
      if: { arg: 'children', eq: 'text' },
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'number' },
      },
    },

    gifSize: {
      control: { max: 200, min: 30, step: 10, type: 'range' },
      description: 'Size of the animated GIF (story example only - when children is "gif").',
      if: { arg: 'children', eq: 'gif' },
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'number' },
      },
    },

    gifUrl: {
      control: { type: 'text' },
      description: 'URL of the GIF to display (story example only - when children is "gif").',
      if: { arg: 'children', eq: 'gif' },
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'string' },
      },
    },

    height: {
      control: { type: 'number' },
      description: 'Height of the foreign object in pixels.',
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'string | number' },
      },
    },

    iconColor: {
      control: { type: 'color' },
      description: 'Color of the icon (story example only - when children is "icon").',
      if: { arg: 'children', eq: 'icon' },
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'string' },
      },
    },

    iconSize: {
      control: { max: 100, min: 16, step: 4, type: 'range' },
      description: 'Size of the icon (story example only - when children is "icon").',
      if: { arg: 'children', eq: 'icon' },
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'number' },
      },
    },

    imageSize: {
      control: { max: 150, min: 30, step: 10, type: 'range' },
      description: 'Size of the image (story example only - when children is "image").',
      if: { arg: 'children', eq: 'image' },
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'number' },
      },
    },

    imageUrl: {
      control: { type: 'text' },
      description: 'URL of the image to display (story example only - when children is "image").',
      if: { arg: 'children', eq: 'image' },
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'string' },
      },
    },

    textContent: {
      control: { type: 'text' },
      description: 'Text content to display (story example only - when children is "text").',
      if: { arg: 'children', eq: 'text' },
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'string' },
      },
    },

    width: {
      control: { type: 'number' },
      description: 'Width of the foreign object in pixels.',
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'string | number' },
      },
    },

    x: {
      control: { type: 'number' },
      description: 'X position of the foreign object.',
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'string | number' },
      },
    },

    y: {
      control: { type: 'number' },
      description: 'Y position of the foreign object.',
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        type: { summary: 'string | number' },
      },
    },
  };
};
