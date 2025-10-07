import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { LineChartYAxisProps } from '../../../lineChart.type';
import type { YAxisStoryArgs } from './yAxis.types';

export const yAxisArgTypes = (): ArgTypes<YAxisStoryArgs<LineChartYAxisProps>> => {
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
      description:
        'Additional spacing around the Y-axis. Object with left, right, top, bottom properties in SVG units.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: '{left?: number, right?: number, top?: number, bottom?: number}' },
      },
    },

    position: {
      control: { type: 'select' },
      description:
        'Position of the Y-axis relative to the chart area. LEFT shows axis on left side, RIGHT on right side.',
      options: ['LEFT', 'RIGHT'],
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'LEFT' },
        type: { summary: '"LEFT" | "RIGHT"' },
      },
    },

    showTickLines: {
      control: { type: 'boolean' },
      description: 'Whether to display tick lines extending from the axis into the chart area.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },

    stroke: {
      control: { type: 'color' },
      description: 'Color of the main Y-axis line.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: '#666666' },
        type: { summary: 'string' },
      },
    },

    strokeDasharray: {
      control: { type: 'text' },
      description:
        'Dash pattern for the main Y-axis line. Example: "5,5" for dashed, "2,3,5,3" for complex patterns.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    strokeLinecap: {
      control: { type: 'select' },
      description: 'Shape used at the end of the Y-axis line.',
      options: ['butt', 'round', 'square'],
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: '"butt" | "round" | "square"' },
      },
    },

    strokeLinejoin: {
      control: { type: 'select' },
      description: 'Shape used at the corners of the Y-axis line.',
      options: ['miter', 'round', 'bevel'],
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: '"miter" | "round" | "bevel"' },
      },
    },

    strokeOpacity: {
      control: { max: 1, min: 0, step: 0.1, type: 'range' },
      description: 'Opacity of the main Y-axis line stroke.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },

    strokeWidth: {
      control: { max: 10, min: 0, step: 0.1, type: 'number' },
      description: 'Thickness of the main Y-axis line in SVG units.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: '1' },
        type: { summary: 'number | string' },
      },
    },

    style: {
      control: { type: 'object' },
      description: 'CSS styles to apply to the Y-axis component.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'React.CSSProperties' },
      },
    },

    tabIndex: {
      control: { max: 10, min: -1, type: 'number' },
      description:
        'Tab index for keyboard navigation focus. -1 removes from tab order, 0+ sets tab order.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },

    tickLine: {
      control: { type: 'object' },
      description:
        'Styling for tick lines. Object with stroke, strokeWidth, strokeDasharray, etc. These extend from axis into chart area.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'LineProps' },
      },
    },

    tickLineHover: {
      control: { type: 'object' },
      description:
        'Styling for tick lines on hover/focus. Overrides tickLine properties when cursor is near. Object with stroke, strokeWidth, etc.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'LineProps' },
      },
    },

    tickText: {
      control: { type: 'object' },
      description:
        'Styling for tick labels. Object with fontSize, fill, fontFamily, textAnchor, left, right spacing, etc. Controls appearance of value labels.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ChartTextProps & {left?: number, right?: number}' },
      },
    },

    tickValues: {
      control: { type: 'object' },
      description:
        'Custom tick values configuration. Use "numeric" for min/max/step ranges or "custom" for specific value arrays. Example: {numeric: {min: 0, max: 100, step: 10}} or {custom: {values: ["0", "50", "100"]}}',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'TickValuesAxisProps' },
      },
    },

    transform: {
      control: { type: 'text' },
      description: 'SVG transform attribute for the entire Y-axis group.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    valueFormatter: {
      control: {
        labels: {
          currency: 'Currency ($)',
          custom: 'Custom brackets [val]',
          millions: 'Millions (M)',
          none: 'None (no formatting)',
          percentage: 'Percentage (%)',
          thousands: 'Thousands (K)',
          units: 'Units (k)',
        },
        type: 'select',
      },
      description:
        'Format tick label values. In real code, pass a function like `(val) => $${val}` for currency formatting, `(val) => ${val}%` for percentages, etc.',
      options: ['none', 'currency', 'percentage', 'units', 'thousands', 'millions', 'custom'],
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ValueFormatter' },
      },
    },
  };
};
