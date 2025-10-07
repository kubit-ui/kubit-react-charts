import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { BarChartXAxisProps } from '../../../barChart.type';

export const xAxisArgTypes = (): ArgTypes<BarChartXAxisProps> => {
  return {
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessibility label for screen readers describing the X-axis purpose.',
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
      description: 'Extra spacing around the X-axis for fine positioning control.',
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
      description: 'Whether to show tick marks/lines on the X-axis.',
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

    strokeDashoffset: {
      control: { type: 'number' },
      description: 'Distance into the dash pattern to start the dash.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'number' },
      },
    },

    strokeLinecap: {
      control: { type: 'select' },
      description: 'Shape to be used at the end of the X-axis line.',
      options: ['butt', 'round', 'square'],
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: '"butt" | "round" | "square"' },
      },
    },

    strokeLinejoin: {
      control: { type: 'select' },
      description: 'Shape to be used at the corners of the X-axis line.',
      options: ['miter', 'round', 'bevel'],
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: '"miter" | "round" | "bevel"' },
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

    // TODO: tickLineHover functionality is not implemented in BarChart
    // This prop works in LineChart but is declared as available in BarChart without being functional.
    // Implementation requires adding useHover hook, xCursor/yCursor to context, and cursor prop to XAxis component.
    // 'tickLineHover': {
    //   control: { type: 'object' },
    //   description: 'Styling properties for tick lines on hover state.',
    //   table: {
    //     category: CATEGORY_CONTROL.CUSTOMIZATION,
    //     type: { summary: 'LineProps' },
    //   },
    // },

    strokeWidth: {
      control: { max: 10, min: 0, step: 0.5, type: 'number' },
      description: 'Thickness of the main X-axis line.',
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
      description: 'Styling properties for tick lines (stroke, strokeWidth, etc.).',
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
      description: 'Custom tick values configuration for numeric or custom ticks on the X-axis.',
      table: {
        category: CATEGORY_CONTROL.DATA,
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
