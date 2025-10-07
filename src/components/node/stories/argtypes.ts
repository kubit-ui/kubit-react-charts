import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import { type NodeProps, NodeType } from '../node.types';

// Specific ArgTypes for Node - Interactive geometric component
// Categorized following CATEGORY_CONTROL categories
export const argtypes = (): ArgTypes<NodeProps> => {
  return {
    // === ACCESSIBILITY ===
    ariaLabel: {
      control: 'text',
      description:
        'Accessibility label for screen readers providing descriptive context for the node.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'string' },
      },
    },

    // === STYLING CLASSES ===
    className: {
      control: 'text',
      description:
        'Additional CSS class names for custom styling. Applied alongside the default "node" class.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    // === DATA PROPERTIES ===
    data: {
      control: 'object',
      description:
        'Data object containing chart-related information like index, dataValue, dataKey, xKey, and nodePosition. Used internally by chart components and passed to event handlers.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: {
          summary:
            '{ index?: number; dataValue?: any; dataKey?: string; xKey?: string; nodePosition?: {x: number; y: number} }',
        },
      },
    },

    // === TESTING ===
    dataTestId: {
      control: 'text',
      description: 'Test identifier for automated testing frameworks and component identification.',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        defaultValue: { summary: 'node' },
        type: { summary: 'string' },
      },
    },

    // === VISUAL STYLING ===
    fill: {
      control: 'color',
      description: 'Fill color for the node shape interior.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'transparent' },
        type: { summary: 'string' },
      },
    },

    fillOpacity: {
      control: { max: 1, min: 0, step: 0.1, type: 'range' },
      description: 'Opacity level for the fill color. 0 is fully transparent, 1 is fully opaque.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },

    haloConfig: {
      control: 'object',
      description:
        'Configuration object for halo appearance including fill, fillOpacity, stroke, strokeWidth, and opacity properties.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: {
          summary:
            '{ fill?: string; fillOpacity?: number; stroke?: string; strokeWidth?: number; opacity?: number }',
        },
      },
    },

    hasHalo: {
      control: 'boolean',
      description:
        'Whether the node displays a halo effect behind the main shape for enhanced visibility or emphasis.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },

    id: {
      control: 'text',
      description:
        'Unique identifier for the node element. Used for accessibility and DOM references.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'string' },
      },
    },

    onBlur: {
      action: 'node-blurred',
      description: 'Blur handler for keyboard navigation. Receives the focus event.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },

    // === EVENT HANDLERS ===
    onClick: {
      action: 'node-clicked',
      description:
        'Click handler for node interaction. Receives the mouse event, data object, and autoClick boolean parameter.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: {
          summary: '(event: React.MouseEvent, data?: DataObject, autoClick?: boolean) => void',
        },
      },
    },

    onDoubleClick: {
      action: 'node-double-clicked',
      description:
        'Double click handler for node interaction. Receives the mouse event and data object.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent, data?: DataObject) => void' },
      },
    },

    onFocus: {
      action: 'node-focused',
      description:
        'Focus handler for keyboard navigation. Receives the focus event and data object.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent, data?: DataObject) => void' },
      },
    },

    onKeyDown: {
      action: 'node-key-pressed',
      description:
        'Keyboard interaction handler. Triggers on Enter key press. Receives the keyboard event and data object.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.KeyboardEvent, data?: DataObject) => void' },
      },
    },

    onMouseEnter: {
      action: 'node-mouse-enter',
      description:
        'Mouse enter handler for hover effects. Receives the mouse event and data object.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent, data?: DataObject) => void' },
      },
    },

    onMouseLeave: {
      action: 'node-mouse-leave',
      description: 'Mouse leave handler for hover effects. Receives the mouse event.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },

    opacity: {
      control: { max: 1, min: 0, step: 0.1, type: 'range' },
      description: 'Overall opacity of the entire node element.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },

    position: {
      control: 'object',
      description:
        'Position coordinates for the node in the SVG coordinate system. Object with x and y numeric properties.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '{ x: 0, y: 0 }' },
        type: { summary: '{ x: number; y: number }' },
      },
    },

    size: {
      control: { max: 100, min: 1, step: 1, type: 'number' },
      description:
        'Size of the node in pixels. Affects the overall dimensions of the geometric shape.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },

    stroke: {
      control: 'color',
      description: 'Stroke color for the node shape border/outline.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    strokeWidth: {
      control: { max: 10, min: 0, step: 0.5, type: 'number' },
      description: 'Width of the stroke border in pixels.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '1' },
        type: { summary: 'number | string' },
      },
    },

    tabIndex: {
      control: { max: 10, min: -1, type: 'number' },
      description:
        'Tab index for keyboard navigation. Use -1 to exclude from tab order, 0 for natural order.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'number' },
      },
    },

    // === NODE SPECIFIC PROPERTIES ===
    type: {
      control: {
        type: 'select',
      },
      description:
        'Geometric shape type for the node. Each type renders a different SVG shape with specific characteristics.',
      options: Object.values(NodeType),
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: NodeType.Circle },
        type: { summary: 'NodeType' },
      },
    },
  };
};
