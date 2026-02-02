import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { CustomBackgroundChartProps } from '../../customBackgroundChart.type';

export const argtypes = (): ArgTypes<CustomBackgroundChartProps> => {
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
        'Accessible name for screen readers. Should describe the chart purpose and data overview (e.g., "Map showing sales distribution by region"). Note: For Plot-level aria-labels, see CustomBackgroundChart.Plot props.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    backgroundUrl: {
      control: 'text',
      description:
        'URL of the background image (SVG, PNG, JPG). Can be an absolute URL or a relative path. The image is rendered using the SVG <image> element. Note: SVG files loaded via URL are static (non-interactive).',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'string' },
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
    children: {
      description:
        'Plot components to render over the background. Use CustomBackgroundChart.Plot components.',
      table: {
        disable: true,
      },
    },
    className: {
      control: 'text',
      description:
        'Optional class names to apply to the chart container. Use for custom styling of the overall chart component.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'custom-background-chart' },
        type: { summary: 'string' },
      },
    },
    data: {
      control: 'object',
      description:
        'Data points to be rendered as plots. Object where keys are identifiers (dataKey) and values contain x, y coordinates, value, and optional name.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'CustomBackgroundData<T>' },
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
    height: {
      control: 'text',
      description:
        'Height of the component, can be a string (e.g., "400px", "100%") or a number. Controls the overall chart container height.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '100%' },
        type: { summary: 'string | number' },
      },
    },
    onBlur: {
      action: 'blur',
      description: 'Callback triggered when the chart loses focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent<SVGElement>) => void' },
      },
    },
    onClick: {
      action: 'click',
      description: 'Callback triggered when clicking on the chart container.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },
    onDoubleClick: {
      action: 'double-click',
      description: 'Callback triggered when double-clicking on the chart container.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },
    onErrors: {
      action: 'error-occurred',
      description:
        'Callback triggered when errors are detected in the chart (empty data, missing dataKey, etc.).',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(errors: ChartErrorCollection) => void' },
      },
    },
    onFocus: {
      action: 'focus',
      description: 'Callback triggered when the chart receives focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent<SVGElement>) => void' },
      },
    },
    onKeyDown: {
      action: 'key-down',
      description: 'Callback triggered when a key is pressed while the chart has focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.KeyboardEvent<SVGSVGElement>) => void' },
      },
    },
    onKeyUp: {
      action: 'key-up',
      description: 'Callback triggered when a key is released while the chart has focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.KeyboardEvent<SVGSVGElement>) => void' },
      },
    },
    onMouseEnter: {
      action: 'mouse-enter',
      description: 'Callback triggered when the mouse enters the chart container.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },
    onMouseLeave: {
      action: 'mouse-leave',
      description: 'Callback triggered when the mouse leaves the chart container.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },
    role: {
      control: 'text',
      description:
        'ARIA role for the chart element. Typically "img" for charts representing data visualizations.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'img' },
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
    viewBox: {
      control: 'object',
      description:
        'ViewBox dimensions of the background SVG. **Required**. Must match the viewBox of your background SVG for plots to position correctly. Example: { width: 800, height: 600 } for a SVG with viewBox="0 0 800 600".',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: '{ width: number; height: number }' },
      },
    },
    width: {
      control: 'text',
      description:
        'Width of the component, can be a string (e.g., "100%", "800px") or a number. Controls the overall chart container width.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '100%' },
        type: { summary: 'string | number' },
      },
    },
  };
};
