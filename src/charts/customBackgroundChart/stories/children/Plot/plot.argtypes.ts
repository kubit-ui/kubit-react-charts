import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { CustomBackgroundChartPlotProps } from '../../../customBackgroundChart.type';

export const plotArgtypes = (): ArgTypes<CustomBackgroundChartPlotProps> => {
  return {
    // === DATA ===
    dataKey: {
      control: 'text',
      description:
        'Key that references a point in the parent data object. Must match a key in the data object passed to CustomBackgroundChart.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'string' },
      },
    },

    // === ACCESSIBILITY ===
    ariaLabel: {
      control: 'text',
      description: `Aria-label template for the plot with placeholder support.

**Supported placeholders:**
- \`{{dataKey}}\` - The dataKey identifier
- \`{{name}}\` - Human-readable name (falls back to dataKey)
- \`{{value}}\` - Formatted value (uses formatAriaValue if provided)
- \`{{x}}\` - X coordinate
- \`{{y}}\` - Y coordinate

**Examples:**
- \`"{{name}}: {{value}}"\` → "Madrid: 3,223,000"
- \`"{{name}} at ({{x}}, {{y}})"\` → "Madrid at (970, 245)"`,
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: '"{{name}}, {{value}}"' },
        type: { summary: 'string' },
      },
    },
    formatAriaValue: {
      description: `Function to format the value for the \`{{value}}\` placeholder in ariaLabel.

Useful for complex generic types where default formatting is not suitable.

**Default behavior:**
- Numbers: \`value.toLocaleString()\` (e.g., 1234567 → "1,234,567")
- Strings: returned as-is
- Objects: \`JSON.stringify(value)\` (not recommended)

**Example:**
\`\`\`tsx
formatAriaValue={(v: ProjectMetrics) => \`\${v.team} · €\${v.budget}\`}
\`\`\``,
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: '(value: T) => string' },
      },
    },

    // === APPEARANCE ===
    fill: {
      control: 'color',
      description: 'Fill color of the plot.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'number',
      description: 'Size of the plot in pixels.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'number | PlotSize' },
      },
    },
    stroke: {
      control: 'color',
      description: 'Stroke color of the plot border.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },
    strokeWidth: {
      control: 'number',
      description: 'Width of the plot border stroke.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'number' },
      },
    },
    type: {
      control: 'select',
      description: 'Shape type of the plot.',
      options: ['CIRCLE', 'SQUARE', 'TRIANGLE'],
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'CIRCLE' },
        type: { summary: "'CIRCLE' | 'SQUARE' | 'TRIANGLE'" },
      },
    },

    // === INTERACTION ===
    hasHoverEffect: {
      control: 'boolean',
      description: 'Enables hover effect (scale and opacity change).',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    hoverConfig: {
      control: 'object',
      description: 'Configuration for hover effect (scale and opacity values).',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: '{ scale?: number; opacity?: number }' },
      },
    },
    tabIndex: {
      control: 'number',
      description: 'Tab index for keyboard navigation. Set to 0 to make plot focusable.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'number' },
      },
    },

    // === CALLBACKS ===
    onBlur: {
      action: 'plot-blurred',
      description: 'Callback function triggered when the plot loses focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.FocusEventHandler<SVGElement>' },
      },
    },
    onClick: {
      action: 'plot-clicked',
      description: 'Callback function triggered when the plot is clicked.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.MouseEventHandler<SVGElement>' },
      },
    },
    onFocus: {
      action: 'plot-focused',
      description: 'Callback function triggered when the plot receives focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.FocusEventHandler<SVGElement>' },
      },
    },
    onKeyDown: {
      action: 'plot-key-down',
      description: 'Callback function triggered when a key is pressed while the plot has focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.KeyboardEventHandler<SVGElement>' },
      },
    },
    onMouseEnter: {
      action: 'plot-mouse-enter',
      description: 'Callback function triggered when the mouse cursor enters the plot.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.MouseEventHandler<SVGElement>' },
      },
    },
    onMouseLeave: {
      action: 'plot-mouse-leave',
      description: 'Callback function triggered when the mouse cursor leaves the plot.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.MouseEventHandler<SVGElement>' },
      },
    },
  };
};
