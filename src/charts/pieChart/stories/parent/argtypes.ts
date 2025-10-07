import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { PieChartProps } from '../../pieChart.type';

// ArgTypes para el componente principal PieChart
export const pieChartArgTypes: ArgTypes<PieChartProps> = {
  ariaHidden: {
    control: 'boolean',
    description: 'Hide chart from screen readers.',
    table: {
      category: CATEGORY_CONTROL.ACCESIBILITY,
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
    },
  },

  ariaLabel: {
    control: 'text',
    description: 'Accessibility label for screen readers.',
    table: {
      category: CATEGORY_CONTROL.ACCESIBILITY,
      type: { summary: 'string' },
    },
  },

  caption: {
    control: 'text',
    description: 'Caption text for the chart.',
    table: {
      category: CATEGORY_CONTROL.ACCESIBILITY,
      type: { summary: 'string' },
    },
  },

  // === CUSTOMIZATION ===
  classNames: {
    control: 'text',
    description: 'CSS class names for custom styling.',
    table: {
      category: CATEGORY_CONTROL.CUSTOMIZATION,
      type: { summary: 'string' },
    },
  },

  // === DATA ===
  data: {
    control: 'object',
    description: 'Data object containing the chart data.',
    table: {
      category: CATEGORY_CONTROL.DATA,
      type: { summary: 'DataItem' },
    },
  },

  // === TESTING ===
  dataTestId: {
    control: 'text',
    description: 'Test identifier for the chart.',
    table: {
      category: CATEGORY_CONTROL.TESTING,
      type: { summary: 'string' },
    },
  },

  halfChart: {
    control: 'boolean',
    description: 'Render as a half chart (semicircle).',
    table: {
      category: CATEGORY_CONTROL.CONTENT,
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
    },
  },

  height: {
    control: 'text',
    description: 'Height of the chart.',
    table: {
      category: CATEGORY_CONTROL.CONTENT,
      type: { summary: 'string' },
    },
  },

  radius: {
    control: 'text',
    description: 'Radius of the pie chart.',
    table: {
      category: CATEGORY_CONTROL.CONTENT,
      type: { summary: 'string' },
    },
  },

  // === ACCESSIBILITY ===
  role: {
    control: 'text',
    description: 'ARIA role for the chart.',
    table: {
      category: CATEGORY_CONTROL.ACCESIBILITY,
      defaultValue: { summary: 'img' },
      type: { summary: 'string' },
    },
  },

  segmentClassNames: {
    control: 'object',
    description: 'Class names for individual segments.',
    table: {
      category: CATEGORY_CONTROL.CUSTOMIZATION,
      type: { summary: 'Record<string, string>' },
    },
  },

  // === CONTENT ===
  width: {
    control: 'text',
    description: 'Width of the chart.',
    table: {
      category: CATEGORY_CONTROL.CONTENT,
      type: { summary: 'string' },
    },
  },
};
