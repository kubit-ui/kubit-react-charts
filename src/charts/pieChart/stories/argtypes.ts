import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { PieChartProps } from '../pieChart.type';

export const argtypes = (): ArgTypes<PieChartProps> => {
  return {
    // === ACCESSIBILITY ===
    ariaHidden: {
      control: 'boolean',
      description:
        'When true, hides the chart from screen readers. Use only when chart is decorative or when alternative accessible content is provided.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    ariaLabel: {
      control: 'text',
      description:
        'Accessible name for screen readers. Should describe the chart purpose and data overview (e.g., "Pie chart showing budget distribution by department").',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    // === CONFIGURATION AND DIMENSIONS ===
    canvasConfig: {
      control: 'object',
      description:
        'Configuration object for chart dimensions and spacing. Controls internal chart area size, margins, and padding.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'CanvasConfig' },
      },
    },
    caption: {
      control: 'text',
      description:
        'Visible caption displayed with the chart. Provides context and description for all users, not just screen readers.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    // === INTERNAL PROPERTIES (DISABLED IN CONTROLS) ===
    children: {
      description:
        'Chart components (segments, labels, etc.). Managed internally by the chart structure.',
      table: {
        disable: true,
      },
    },

    classNames: {
      control: 'text',
      description:
        'Optional class names to apply to the pie chart container. Use for custom styling of the overall chart component.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'pie-chart' },
        type: { summary: 'string' },
      },
    },

    // === DATA ===
    data: {
      control: 'object',
      description:
        'Data points to be used by the chart. Object with keys containing arrays of segments with name, value, and optional color properties.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'DataItem' },
      },
    },
    dataTestId: {
      control: 'text',
      description: 'Optional test ID for the component. Used for automated testing.',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        disable: true,
      },
    },
    // === CUSTOMIZATION ===
    halfChart: {
      control: 'boolean',
      description:
        'When true, renders as a half pie chart (semicircle). Useful for gauge-like visualizations or when space is limited.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },

    height: {
      control: 'text',
      description:
        'Height of the component, can be a string (e.g., "100vh") or a number. Controls the overall chart container height.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    // === CALLBACK FUNCTIONS ===
    onBlur: {
      action: 'blurred',
      description: 'Callback function triggered when the chart loses focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent<SVGElement>) => void' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function triggered when the chart is clicked.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement, MouseEvent>) => void' },
      },
    },
    onDoubleClick: {
      action: 'double-clicked',
      description: 'Callback function triggered when the chart is double-clicked.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement, MouseEvent>) => void' },
      },
    },

    onFocus: {
      action: 'focused',
      description: 'Callback function triggered when the chart receives focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent<SVGElement>) => void' },
      },
    },
    onKeyDown: {
      action: 'key-down',
      description: 'Callback function triggered when a key is pressed down while chart has focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.KeyboardEvent<SVGSVGElement>) => void' },
      },
    },
    onKeyUp: {
      action: 'key-up',
      description: 'Callback function triggered when a key is released while chart has focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.KeyboardEvent<SVGSVGElement>) => void' },
      },
    },
    onMouseEnter: {
      action: 'mouse-enter',
      description: 'Callback function triggered when the mouse cursor enters the chart area.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement, MouseEvent>) => void' },
      },
    },
    onMouseLeave: {
      action: 'mouse-leave',
      description: 'Callback function triggered when the mouse cursor leaves the chart area.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement, MouseEvent>) => void' },
      },
    },
    radius: {
      control: 'text',
      description:
        'Radius of the pie chart as a percentage (e.g., "80%") or absolute value. Controls the size of the pie relative to the canvas.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    role: {
      control: 'text',
      description:
        'ARIA role for the chart element. Typically "img" for charts representing data visualizations.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    segmentClassNames: {
      control: 'text',
      description:
        'Optional class names to apply to individual pie segments. Use for styling all segments uniformly (e.g., animations, hover effects).',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    tabIndex: {
      control: 'number',
      description:
        'Tab index for keyboard navigation. Set to 0 to make chart focusable, -1 to remove from tab order.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    width: {
      control: 'text',
      description:
        'Width of the component, can be a string (e.g., "100%") or a number. Controls the overall chart container width.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
  };
};
