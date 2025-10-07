import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { LineChartXAxisProps } from '../../../lineChart.type';
import type { XAxisStoryArgs } from './xAxis.types';

export const xAxisArgTypes = (): ArgTypes<XAxisStoryArgs<LineChartXAxisProps>> => {
  return {
    className: {
      control: { type: 'text' },
      description: 'CSS class name for custom styling.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'string' },
      },
    },
    extraSpace: {
      control: { type: 'object' },
      description: 'Extra spacing around the axis for fine positioning control.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: '{ left?: number; right?: number; top?: number; bottom?: number }' },
      },
    },

    position: {
      control: { type: 'select' },
      description: 'Position of the X-axis relative to the chart area.',
      options: ['TOP', 'BOTTOM'],
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'BOTTOM' },
        type: { summary: '"TOP" | "BOTTOM"' },
      },
    },
    showTickLines: {
      control: { type: 'boolean' },
      description: 'Whether to show tick marks/lines on the axis.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    stroke: {
      control: { type: 'color' },
      description: 'Color of the main X-axis line.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: '#666666' },
        type: { summary: 'string' },
      },
    },

    strokeDasharray: {
      control: { type: 'text' },
      description: 'Dash pattern for the main X-axis line (e.g., "5,5" for dashed).',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'string' },
      },
    },

    strokeOpacity: {
      control: { max: 1, min: 0, step: 0.1, type: 'range' },
      description: 'Overall opacity of the entire X-axis.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },

    strokeWidth: {
      control: { max: 10, min: 0, step: 0.5, type: 'number' },
      description: 'Thickness of the main X-axis line.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },

    style: {
      control: { type: 'object' },
      description: 'Inline CSS styles for the axis.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'React.CSSProperties' },
      },
    },
    tickLine: {
      control: { type: 'object' },
      description: 'Styling properties for tick lines (stroke, strokeWidth, etc.).',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'LineProps' },
      },
    },
    tickLineHover: {
      control: { type: 'object' },
      description: 'Styling properties for tick lines on hover state.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'LineProps' },
      },
    },

    tickText: {
      control: { type: 'object' },
      description: 'Comprehensive text styling for tick labels (font, color, positioning).',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: {
          summary: 'ChartTextProps & { top?: number; bottom?: number; transform?: "rotate" }',
        },
      },
    },

    tickValues: {
      control: { type: 'object' },
      description: 'Custom tick values configuration for numeric or custom ticks.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'TickValuesAxisProps' },
      },
    },
    valueFormatter: {
      control: {
        labels: {
          currency: 'Currency ($)',
          custom: 'Custom Format [val]',
          millions: 'Millions (M)',
          none: 'None (no formatting)',
          percentage: 'Percentage (%)',
          thousands: 'Thousands (K)',
        },
        type: 'select',
      },
      description:
        'Select a formatting style for tick labels. In real code, pass a function like `(val) => ${val}K`. This dropdown is a story convenience feature.',
      options: ['none', 'currency', 'percentage', 'thousands', 'millions', 'custom'],
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'ValueFormatter | undefined' },
      },
    },
  };
};
