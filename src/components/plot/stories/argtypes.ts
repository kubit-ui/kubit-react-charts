import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import { type PlotProps, PlotSize, PlotType } from '../plot.types';

// Specific ArgTypes for Plot - Interactive plot points component for charts
// Categorized following CATEGORY_CONTROL categories
export const argtypes = (): ArgTypes<PlotProps> => {
  return {
    // === STYLING CLASSES ===
    className: {
      control: 'text',
      description: 'Additional CSS class names for custom styling of the plot point.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    // === DATA PROPERTIES ===
    data: {
      control: 'object',
      description:
        'Data associated with this plot point. Contains value, category, index, and coordinate information.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'PlotData<T>' },
      },
    },

    // === TESTING ===
    dataTestId: {
      control: 'text',
      description:
        'Test identifier for automated testing frameworks. Used to locate the plot element in tests.',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        defaultValue: { summary: 'plot' },
        type: { summary: 'string' },
      },
    },

    // === VISUAL STYLING ===
    fill: {
      control: 'color',
      description: 'Fill color of the plot point. This is the main color that fills the shape.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    fillOpacity: {
      control: { max: 1, min: 0, step: 0.1, type: 'range' },
      description: 'Opacity of the fill color. 0 = transparent, 1 = fully opaque.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },

    focusConfig: {
      control: 'object',
      description:
        'Configuration for focus outline effects when the plot receives keyboard focus. Controls outline colors, widths, and spacing.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'FocusConfig' },
      },
    },

    // === INTERACTION BEHAVIOR ===
    hasHoverEffect: {
      control: 'boolean',
      description:
        'Enables hover effects for the plot point. When true, a scaled version appears behind on hover.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },

    // === CUSTOMIZATION ===
    hoverConfig: {
      control: 'object',
      description:
        'Configuration for hover effects. Properties: fill (color when hovered), stroke (border color), strokeWidth (border width), opacity (hover opacity, default 0.3), scale (size multiplier, default 1.3).',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: {
          summary:
            '{ fill?: string; stroke?: string; strokeWidth?: number; opacity?: number; scale?: number; }',
        },
      },
    },

    id: {
      control: 'text',
      description: 'Unique identifier for the plot point element.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    label: {
      control: 'text',
      description:
        'DEPRECATED: Use aria-label instead. Accessible label for the plot point for screen readers.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'string' },
      },
    },

    onBlur: {
      action: 'plot-blurred',
      description: 'Blur handler for keyboard navigation. Called when the plot point loses focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.FocusEventHandler<SVGElement>' },
      },
    },

    // === EVENT HANDLERS ===
    onClick: {
      action: 'plot-clicked',
      description:
        'Click handler for plot point interaction. Receives the standard React mouse event.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.MouseEventHandler<SVGElement>' },
      },
    },

    onFocus: {
      action: 'plot-focused',
      description:
        'Focus handler for keyboard navigation. Called when the plot point receives focus.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.FocusEventHandler<SVGElement>' },
      },
    },

    onKeyDown: {
      action: 'plot-key-pressed',
      description:
        'Keyboard interaction handler for the plot point. Useful for handling Enter/Space keys.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.KeyboardEventHandler<SVGElement>' },
      },
    },

    onMouseEnter: {
      action: 'plot-mouse-enter',
      description: 'Mouse enter handler for hover effects. Called when mouse enters the plot area.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.MouseEventHandler<SVGElement>' },
      },
    },

    onMouseLeave: {
      action: 'plot-mouse-leave',
      description: 'Mouse leave handler for hover effects. Called when mouse leaves the plot area.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: 'React.MouseEventHandler<SVGElement>' },
      },
    },

    opacity: {
      control: { max: 1, min: 0, step: 0.1, type: 'range' },
      description: 'Overall opacity of the entire plot point element.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },

    position: {
      control: false, // Complex object, better to control via story
      description:
        'REQUIRED: The position of the plot point on the SVG coordinate system. Determines where the plot appears.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: '{ x: number; y: number }' },
      },
    },

    size: {
      control: { type: 'select' },
      description:
        'Size of the plot point. Can use predefined sizes (EXTRA_SMALL=8px, SMALL=16px, MEDIUM=24px, LARGE=32px, EXTRA_LARGE=40px) or a custom pixel value.',
      options: Object.values(PlotSize),
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: PlotSize.MEDIUM },
        type: { summary: 'PlotSize | number' },
      },
    },

    stroke: {
      control: 'color',
      description: 'Stroke (border) color of the plot point.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'transparent' },
        type: { summary: 'string' },
      },
    },

    strokeWidth: {
      control: { max: 10, min: 0, step: 0.5, type: 'number' },
      description: 'Width of the stroke (border) in pixels.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },

    tabIndex: {
      control: { max: 10, min: -1, step: 1, type: 'number' },
      description:
        'Tab index for keyboard navigation. Set to -1 to remove from tab order but allow programmatic focus.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },

    // === PLOT APPEARANCE ===
    type: {
      control: { type: 'select' },
      description:
        'The geometric shape type of the plot point. Choose between circle, square, or triangle.',
      options: Object.values(PlotType),
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: PlotType.CIRCLE },
        type: { summary: 'PlotType' },
      },
    },
  };
};
