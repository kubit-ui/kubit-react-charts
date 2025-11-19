import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { BarChartProps } from '../../barChart.type';

export const argtypes = (): ArgTypes<BarChartProps> => {
  return {
    canvasConfig: {
      control: 'object',
      description: 'Optional configuration for the canvas.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'CanvasConfig | undefined' },
      },
    },
    caption: {
      control: 'text',
      description: 'Optional caption for the chart.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    data: {
      control: 'object',
      description: 'Data points to be used by the chart.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'IDataPoint' },
      },
    },
    dataTestId: {
      control: 'text',
      description: 'Optional test ID for the component.',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        disable: true,
      },
    },
    gapBetweenBars: {
      control: 'number',
      description: 'Gap between bars',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    height: {
      control: 'text',
      description: 'Height of the component, can be a string (e.g., "100vh") or a number.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string | number' },
      },
    },
    onErrors: {
      action: 'error-occurred',
      description:
        'Callback function triggered when errors are detected in the chart. Receives a collection of validation errors from chart components (context, paths, axes, separators). Use this to handle data validation errors, display error messages, or provide fallback UI.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(errors: ChartErrorCollection) => void' },
      },
    },
    orientation: {
      control: 'select',
      description: 'Orientation of the bars (horizontal or vertical).',
      options: ['HORIZONTAL', 'VERTICAL'],
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'VERTICAL' },
        type: { summary: 'BarOrientation' },
      },
    },
    pKey: {
      control: 'text',
      description: 'Key to be used as the x-axis value from the data points.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the component, can be a string (e.g., "100%") or a number.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string | number' },
      },
    },
  };
};
