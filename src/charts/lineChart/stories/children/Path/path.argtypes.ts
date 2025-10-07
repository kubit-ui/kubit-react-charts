import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { LineChartPathProps } from '../../../lineChart.type';

export const pathArgTypes = (): ArgTypes<LineChartPathProps> => {
  return {
    'aria-hidden': {
      control: { type: 'boolean' },
      description: 'When true, hides the path from screen readers. Use sparingly.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },

    'aria-label': {
      control: { type: 'text' },
      description: 'Accessibility label describing the path content for screen readers.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'string' },
      },
    },
    'ariaLabel': {
      control: { type: 'text' },
      description: 'DEPRECATED: Use aria-label instead for better accessibility standards.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'string' },
      },
    },
    'classNames': {
      control: { type: 'text' },
      description: 'Additional CSS class names for custom styling.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    'closestClick': {
      control: { type: 'boolean' },
      description:
        "When enabled, clicks anywhere on the chart area will snap to the closest data point node. Improves UX by expanding the clickable area - users don't need to click precisely on small nodes.",
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'curved': {
      control: { type: 'boolean' },
      description:
        'Render smooth curved lines vs straight line segments. Affects both main path and projections.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'data-testid': {
      control: { type: 'text' },
      description: 'Test identifier for automated testing frameworks.',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        type: { summary: 'string' },
      },
    },
    'dataKey': {
      control: { type: 'text' },
      description:
        'Data property key to use for Y-axis values. Must match a property in your data objects.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'string' },
      },
    },
    'fill': {
      control: { type: 'color' },
      description: 'Fill color for areas under the path. Use "transparent" for no fill.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'transparent' },
        type: { summary: 'string' },
      },
    },
    'fillOpacity': {
      control: { max: 1, min: 0, step: 0.1, type: 'range' },
      description: 'Opacity of the fill color.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '1' },
        type: { summary: 'number | string' },
      },
    },
    'fillRule': {
      control: { type: 'select' },
      description:
        'Defines how overlapping areas in complex paths are filled. "nonzero" (default): fills all enclosed areas. "evenodd": alternates filled/unfilled areas when shapes overlap, creating holes in overlapping regions. Most useful for paths with self-intersections or multiple nested shapes.',
      options: ['nonzero', 'evenodd'],
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'nonzero' },
        type: { summary: '"nonzero" | "evenodd"' },
      },
    },
    'focusConfig': {
      control: { type: 'object' },
      description: 'Styling applied when the path is focused.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'StyleProps' },
      },
    },
    'getNodeFocusInfo': {
      action: 'node-focus-info',
      description: 'Callback that receives focus information when interactive nodes are focused.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(info: { x: string; y: string }) => void' },
      },
    },

    'getNodesCoords': {
      action: 'nodes-coords-calculated',
      description: 'Callback that receives calculated node coordinates as [x, y] pairs.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(coords: [number, number][]) => void' },
      },
    },
    'gradient': {
      control: { type: 'text' },
      description:
        'CSS linear gradient string converted to SVG gradient for filling area under the path. Format: "angle, color1, color2 offset%, ...". Supported angles: 90° (left to right), 180° (top to bottom), 270° (right to left). Examples: "180, #ff0000, #0000ff 50%" (red to blue top-down), "90, rgba(255,0,0,0.5), transparent 100%" (red fade left-right). Requires fill to be set for visibility.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    'hoverConfig': {
      control: { type: 'object' },
      description: 'Styling applied when the path is hovered.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'StyleProps' },
      },
    },
    'indicatorConfig': {
      control: { type: 'object' },
      description:
        'Configuration for interactive nodes and hover indicators on data points. Includes `autoClick` property: when true, automatically triggers node clicks as the user moves their cursor over the chart (no manual clicking needed) - perfect for fluid tooltip experiences. Also configures node appearance, hover lines, and halos. Set to undefined/null to disable indicators.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'NodePathProps & { autoClick?: boolean; lineIndicator?: LineProps }' },
      },
    },
    'lineProjection': {
      control: { type: 'object' },
      description:
        'Configuration for upper/lower projection bounds. Each projection can have its own styling (stroke, strokeWidth, etc.).',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'LineChartProjections' },
      },
    },
    'nodeConfig': {
      control: { type: 'object' },
      description:
        'Configuration for visible nodes on data points. REQUIRED for closestClick and autoClick features to work properly. Defines node appearance (type, size, colors) and basic interactions. Supports template placeholders in aria-label for dynamic accessibility: {{dataKey}} (data series key), {{xValue}} (X-axis value), {{yValue}} (Y-axis value), {{index}} (1-based point index). Example: "Data point {{index}}: {{yValue}} cats in year {{xValue}}"',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'NodePathProps' },
      },
    },
    'onBlur': {
      action: 'path-blurred',
      description: 'Blur handler for keyboard navigation.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },
    'onClick': {
      action: 'path-clicked',
      description:
        'Click handler for path interaction. Receives the data value of the clicked point.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(dataValue?: DataValueType) => void' },
      },
    },

    'onDoubleClick': {
      action: 'path-double-clicked',
      description: 'Double click handler for path interaction.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent, dataValue?: DataValueType) => void' },
      },
    },
    'onFocus': {
      action: 'path-focused',
      description: 'Focus handler for keyboard navigation.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },
    'onKeyDown': {
      action: 'path-key-pressed',
      description: 'Keyboard interaction handler.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(dataValue?: DataValueType) => void' },
      },
    },
    'onMouseEnter': {
      action: 'path-mouse-enter',
      description: 'Mouse enter handler for path hover effects.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    'onMouseLeave': {
      action: 'path-mouse-leave',
      description: 'Mouse leave handler for path hover effects.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },
    'role': {
      control: { type: 'text' },
      description: 'ARIA role for the path element.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'img' },
        type: { summary: 'string' },
      },
    },
    'shadowSvgConfig': {
      control: { type: 'object' },
      description: 'Configuration for drop shadow effects.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'ShadowSvgConfig' },
      },
    },

    'stroke': {
      control: { type: 'color' },
      description: 'Main line color for the path.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '#0000FF' },
        type: { summary: 'string' },
      },
    },
    'strokeDasharray': {
      control: { type: 'text' },
      description:
        'Dash pattern for the line. Format: "dash,gap,dash,gap...". Numbers represent pixel lengths - first number is dash length, second is gap length, and so on. Examples: "5,5" (5px dash + 5px gap), "2,2" (2px dash + 2px gap = dotted), "8,4,2,4" (8px dash + 4px gap + 2px dash + 4px gap = dash-dot pattern), "16,8" (16px dash + 8px gap = long dashes). Leave empty for solid line.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string | number' },
      },
    },

    'strokeLinecap': {
      control: { type: 'select' },
      description: 'Shape of line endpoints.',
      options: ['butt', 'round', 'square'],
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'butt' },
        type: { summary: '"butt" | "round" | "square"' },
      },
    },
    'strokeLinejoin': {
      control: { type: 'select' },
      description: 'Shape of line joins.',
      options: ['miter', 'round', 'bevel'],
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'miter' },
        type: { summary: '"miter" | "round" | "bevel"' },
      },
    },
    'strokeOpacity': {
      control: { max: 1, min: 0, step: 0.1, type: 'range' },
      description: 'Opacity of the stroke color.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '1' },
        type: { summary: 'number | string' },
      },
    },
    'strokeWidth': {
      control: { max: 10, min: 0.5, step: 0.5, type: 'number' },
      description: 'Line thickness in pixels.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '1' },
        type: { summary: 'number | string' },
      },
    },
    'tabIndex': {
      control: { max: 10, min: -1, type: 'number' },
      description: 'Tab index for keyboard navigation.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'number' },
      },
    },
    'title': {
      control: { type: 'text' },
      description: 'Title element for accessibility and tooltips.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'string' },
      },
    },

    'transform': {
      control: { type: 'text' },
      description:
        'SVG transform attribute for geometric transformations. Supports multiple operations: translate(x,y) - move position, scale(x,y) - resize, rotate(degrees [x y]) - rotate around point, skewX/Y(degrees) - skew. Examples: "translate(10, 20)" (move 10px right, 20px down), "scale(1.5)" (150% size), "rotate(45 50 50)" (45° rotation around center), "translate(10,0) scale(0.8)" (combined transforms).',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    'visibility': {
      control: { type: 'select' },
      description: 'Controls visibility of the path.',
      options: ['visible', 'hidden', 'collapse'],
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'visible' },
        type: { summary: 'number | string' },
      },
    },
  };
};
