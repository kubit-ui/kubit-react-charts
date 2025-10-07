import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { BarChartYAxisProps } from '../../../barChart.type';

export const yAxisArgTypes = (): ArgTypes<BarChartYAxisProps> => {
  return {
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessibility label for screen readers describing the Y-axis purpose.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'string' },
      },
    },

    className: {
      control: { type: 'text' },
      description: 'CSS class name for custom styling.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'string' },
      },
    },

    dataTestId: {
      control: { type: 'text' },
      description: 'Test identifier for automated testing.',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        type: { summary: 'string' },
      },
    },

    extraSpace: {
      control: { type: 'object' },
      description: 'Extra spacing around the Y-axis to adjust its position within the canvas.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: '{ left?: number; right?: number; top?: number; bottom?: number; }' },
      },
    },

    position: {
      control: { type: 'select' },
      description: 'Position of the X-axis relative to the chart area.',
      options: ['LEFT', 'RIGHT'],
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'LEFT' },
        type: { summary: '"LEFT" | "RIGHT"' },
      },
    },

    showTickLines: {
      control: { type: 'boolean' },
      description: 'Determines whether tick lines should be displayed.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },

    stroke: {
      control: { type: 'color' },
      description: 'Color of the axis line.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    strokeDasharray: {
      control: { type: 'text' },
      description: 'Dash pattern for the axis line.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    strokeDashoffset: {
      control: { type: 'number' },
      description: 'Offset for the dash pattern of the main Y-axis line.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'number' },
      },
    },

    strokeLinecap: {
      control: { type: 'select' },
      description: 'Shape of the line ends for the main Y-axis line.',
      options: ['butt', 'round', 'square'],
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: '"butt" | "round" | "square"' },
      },
    },

    strokeLinejoin: {
      control: { type: 'select' },
      description: 'Shape of the corners where line segments meet.',
      options: ['arcs', 'bevel', 'miter', 'miter-clip', 'round'],
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: '"arcs" | "bevel" | "miter" | "miter-clip" | "round"' },
      },
    },

    strokeOpacity: {
      control: { max: 1, min: 0, step: 0.1, type: 'range' },
      description: 'Overall opacity of the entire Y-axis.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },

    strokeWidth: {
      control: { max: 10, min: 0, step: 0.5, type: 'number' },
      description: 'Thickness of the main Y-axis line.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },

    tabIndex: {
      control: { type: 'number' },
      description: 'Tab index for keyboard navigation.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'number' },
      },
    },

    tickLine: {
      control: { type: 'object' },
      description: 'Style configuration for tick lines.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'LineProps' },
      },
    },

    tickText: {
      control: { type: 'object' },
      description: 'Configuration for tick text including font styling and positioning.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'ChartTextProps & { left?: number; right?: number }' },
      },
    },

    tickValues: {
      control: { type: 'object' },
      description: 'Configuration for tick values, can be numeric or custom.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'BarChartTickValuesAxisProps' },
      },
    },

    transform: {
      control: { type: 'text' },
      description: 'SVG transform attribute for positioning and scaling.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'string' },
      },
    },
  };
};
