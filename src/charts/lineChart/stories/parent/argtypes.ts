import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { LineChartProps } from '../../lineChart.type';

export const argtypes = (): ArgTypes<LineChartProps> => {
  return {
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
        'Accessible name for screen readers. Should describe the chart purpose and data overview (e.g., "Line chart showing sales trends from 2020 to 2024").',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    // === CANVAS CONFIGURATION ===
    canvasConfig: {
      control: 'object',
      description:
        'Configuration object for chart dimensions and spacing. Controls internal chart area size, margins, and padding. Use object with width, height, and extraSpace properties.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'DefaultCanvasConfig' },
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
        'Child components (LineChart.Path, LineChart.XAxis, LineChart.YAxis, LineChart.Separator) that define the chart structure and appearance. Not directly configurable in Stories - modify using subcomponent stories.',
      table: {
        category: CATEGORY_CONTROL.CONTENT,
        disable: true,
        type: { summary: 'ReactNode | ReactElement' },
      },
    },
    classNames: {
      control: 'text',
      description:
        'Additional CSS class names to apply to the root SVG element for custom styling.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    // === FUNDAMENTAL DATA ===
    data: {
      control: 'object',
      description:
        'Array of data points where each object contains properties for x-axis values and multiple y-axis series. Example: [{year: 2020, cats: 30, dogs: 20}, {year: 2021, cats: 35, dogs: 25}]',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: '[]' },
        type: { summary: 'IDataPoint[]' },
      },
    },
    // === TESTING IDENTIFIERS ===
    dataTestId: {
      control: 'text',
      description:
        'Test identifier for automated testing frameworks. Recommended pattern: "component-name-test-id".',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        defaultValue: { summary: '"line-chart"' },
        type: { summary: 'string' },
      },
    },
    // === ADVANCED CALLBACKS ===
    getPathArea: {
      action: 'path-area-calculated',
      description:
        'Advanced callback that receives the calculated chart area coordinates (x1, y1, x2, y2). Used for custom overlays, indicators, or synchronized charts.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(coordinates: LineChartCoordinates) => void' },
      },
    },
    height: {
      control: 'text',
      description:
        'Total height of the chart SVG container. Accepts CSS units (%, px, rem, vh) or numbers (treated as pixels).',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '"100%"' },
        type: { summary: 'string | number' },
      },
    },
    onBlur: {
      action: 'blurred',
      description:
        'Called when chart loses keyboard focus. Used to clean up focus-related states or hide focus indicators.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent<SVGElement>) => void' },
      },
    },

    // === INTERACTION EVENTS ===
    onClick: {
      action: 'clicked',
      description:
        'Called when user clicks anywhere on the chart SVG. Receives MouseEvent with click coordinates and target information.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },
    onDoubleClick: {
      action: 'double-clicked',
      description:
        'Called when user double-clicks the chart. Commonly used for zoom, reset, or drill-down interactions.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
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
    onFocus: {
      action: 'focused',
      description:
        'Called when chart receives keyboard focus. Essential for accessibility and keyboard navigation support.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent<SVGElement>) => void' },
      },
    },
    onKeyDown: {
      action: 'key-down',
      description:
        'Called when user presses keys while chart is focused. Handle arrow keys for navigation, Enter/Space for interaction.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.KeyboardEvent<SVGElement>) => void' },
      },
    },
    onKeyUp: {
      action: 'key-up',
      description:
        'Called when user releases keys while chart is focused. Less commonly used than onKeyDown.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.KeyboardEvent<SVGElement>) => void' },
      },
    },
    onMouseEnter: {
      action: 'mouse-enter',
      description:
        'Called when mouse cursor enters the chart area. Useful for showing tooltips or highlighting.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },
    onMouseLeave: {
      action: 'mouse-leave',
      description:
        'Called when mouse cursor leaves the chart area. Useful for hiding tooltips or removing highlights.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },

    // === ACCESSIBILITY AND SEMANTICS ===
    role: {
      control: 'select',
      description:
        'ARIA role attribute for the chart. "img" treats it as an image, "figure" as a diagram, "graphic" for interactive charts.',
      options: ['img', 'figure', 'graphic', 'application'],
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: '"img"' },
        type: { summary: 'string' },
      },
    },
    tabIndex: {
      control: { max: 1000, min: -1, type: 'number' },
      description:
        'Tab order for keyboard navigation. 0 = natural tab order, -1 = not focusable, positive numbers = explicit tab order.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },

    // === DIMENSIONS AND LAYOUT ===
    width: {
      control: 'text',
      description:
        'Total width of the chart SVG container. Accepts CSS units (%, px, rem, vh) or numbers (treated as pixels).',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '"100%"' },
        type: { summary: 'string | number' },
      },
    },

    xKey: {
      control: 'text',
      description:
        'Property name from data objects to use as x-axis values. Must match a key in your data objects (e.g., "year", "date", "category").',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: '"x"' },
        type: { summary: 'string' },
      },
    },
  };
};
