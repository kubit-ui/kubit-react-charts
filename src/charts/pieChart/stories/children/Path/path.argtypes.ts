import type { ArgTypes } from 'storybook/internal/types';

import type { PathProps } from '@/components/path/path.types';
import { CATEGORY_CONTROL } from '@/storybook';

// TODO: Create specific interfaces for each chart type (PieChartPathProps, LineChartPathProps, etc.)
// to avoid exposing irrelevant props and improve the development experience.
// Currently we inherit generic PathProps which includes props from all chart types.

// Specific ArgTypes for Path - Only PieChart.Path props
// Categorized following CATEGORY_CONTROL categories
export const pathArgTypes = (): ArgTypes<PathProps> => {
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
      description: 'Accessibility label describing the pie segments content for screen readers.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'string' },
      },
    },

    'ariaHidden': {
      control: { type: 'boolean' },
      description: 'DEPRECATED: Use aria-hidden instead for better accessibility standards.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'boolean' },
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

    'curved': {
      control: false, // Disable control in Storybook
      description: '[IGNORE]: This prop is specific to LineChart paths. Has no effect in PieChart.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'boolean' },
      },
    },

    'd': {
      control: false, // Disable control in Storybook
      description:
        '[IGNORE]: This prop is automatically calculated and set by PieChart internal logic. The SVG path data for pie segments is generated based on radius, angles, and data values.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    'dataKey': {
      control: { type: 'text' },
      description:
        'Data property key to use for pie chart values. Must match a property in your data objects.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'string' },
      },
    },

    'dataTestId': {
      control: { type: 'text' },
      description: 'Test identifier for automated testing frameworks.',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        type: { summary: 'string' },
      },
    },

    'dataValue': {
      control: false, // Disable control in Storybook
      description:
        '[IGNORE]: This prop is automatically set by PieChart internal logic. The value represents the numeric data of each segment and is used internally for event handlers.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'string | number | IDataPoint[]' },
      },
    },

    'dFill': {
      control: false, // Disable control in Storybook
      description:
        '[IGNORE]: This prop is specific to LineChart for creating filled areas under lines. PieChart segments are already closed shapes and use direct fill properties.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    'fill': {
      control: { type: 'color' },
      description:
        'Fill color for the pie segments. Can be overridden by individual segment colors.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'blue' },
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
        'Defines how overlapping areas in complex paths are filled. "nonzero" (default): fills all enclosed areas. "evenodd": alternates filled/unfilled areas when shapes overlap.',
      options: ['nonzero', 'evenodd'],
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'nonzero' },
        type: { summary: '"nonzero" | "evenodd"' },
      },
    },

    'focusConfig': {
      control: { type: 'object' },
      description: 'Styling applied when pie segments are focused via keyboard navigation.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'StyleProps' },
      },
    },

    'gap': {
      control: { max: 20, min: 0, step: 1, type: 'number' },
      description:
        'Gap between pie chart segments in pixels. Creates visual separation between slices.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },

    'gradient': {
      control: { type: 'text' },
      description:
        'CSS linear gradient string converted to SVG gradient for filling pie segments. Format: "angle, color1, color2 offset%, ...". Supported angles: 90° (left to right), 180° (top to bottom), 270° (right to left). Examples: "180, #ff0000, #0000ff 50%" (red to blue top-down).',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    'hoverConfig': {
      control: { type: 'object' },
      description: 'Styling applied when pie segments are hovered.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'StyleProps' },
      },
    },

    'innerRadius': {
      control: { max: 200, min: 0, step: 5, type: 'number' },
      description: 'The inner radius of the pie chart. Use values > 0 to create donut charts.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '0' },
        type: { summary: 'number | string' },
      },
    },

    'nodeConfig': {
      control: false, // Disable control in Storybook
      description:
        '[IGNORE]: This prop is specific to LineChart for rendering nodes/points. Not used in PieChart.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'NodePathProps' },
      },
    },

    'onBlur': {
      action: 'segment-blurred',
      description: 'Blur handler for keyboard navigation of segments.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },

    'onClick': {
      action: 'segment-clicked',
      description:
        'Click handler for segment interaction. Receives the data value of the clicked segment.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(dataValue?: DataValueType) => void' },
      },
    },

    'onDoubleClick': {
      action: 'segment-double-clicked',
      description: 'Double click handler for segment interaction.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent, dataValue?: DataValueType) => void' },
      },
    },

    'onFocus': {
      action: 'segment-focused',
      description: 'Focus handler for keyboard navigation of segments.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent) => void' },
      },
    },

    'onKeyDown': {
      action: 'segment-key-pressed',
      description: 'Keyboard interaction handler for segments.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(dataValue?: DataValueType) => void' },
      },
    },

    'onMouseEnter': {
      action: 'segment-mouse-enter',
      description: 'Mouse enter handler for segment hover effects.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },

    'onMouseLeave': {
      action: 'segment-mouse-leave',
      description: 'Mouse leave handler for segment hover effects.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent) => void' },
      },
    },

    'opacity': {
      control: { max: 1, min: 0, step: 0.1, type: 'range' },
      description: 'Overall opacity of the path element.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '1' },
        type: { summary: 'number | string' },
      },
    },

    'orientation': {
      control: false, // Disable control in Storybook
      description:
        '[IGNORE]: This prop has no effect in PieChart segments. Orientation is determined by arc angles.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'number | string' },
      },
    },

    'points': {
      control: false, // Disable control in Storybook
      description:
        '[IGNORE]: This prop is specific to LineChart paths. PieChart uses calculated arc paths.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: '[number, number][]' },
      },
    },

    'radius': {
      control: { max: 300, min: 10, step: 5, type: 'number' },
      description: 'The outer radius of the pie chart segments.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'number | string' },
      },
    },

    'role': {
      control: { type: 'text' },
      description: 'ARIA role for the pie chart segments.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'img' },
        type: { summary: 'string' },
      },
    },

    'rotate': {
      control: { max: 360, min: 0, step: 1, type: 'number' },
      description: 'Rotation angle for the path element.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'number | string' },
      },
    },

    'shadowSvgConfig': {
      control: { type: 'object' },
      description: 'Configuration for drop shadow effects on pie segments.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'ShadowSvgConfig' },
      },
    },

    'stroke': {
      control: { type: 'color' },
      description: 'Stroke color for the pie segment borders.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    'strokeDasharray': {
      control: { type: 'text' },
      description:
        'Dash pattern for the segment borders. Format: "dash,gap,dash,gap...". Examples: "5,5" (dashed), "2,2" (dotted). Leave empty for solid borders.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string | number' },
      },
    },

    'strokeDashoffset': {
      control: { type: 'text' },
      description: 'Offset for the dash pattern. Used to animate dashed strokes.',
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

    'strokeMiterlimit': {
      control: { max: 10, min: 1, step: 0.1, type: 'number' },
      description: 'Limit for miter joins. Higher values create sharper corners.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '4' },
        type: { summary: 'number | string' },
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
      control: { max: 10, min: 0, step: 0.5, type: 'number' },
      description: 'Width of the stroke border in pixels.',
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
        'SVG transform attribute for geometric transformations. Supports translate(x,y), scale(x,y), rotate(degrees [x y]), skewX/Y(degrees). Examples: "translate(10, 20)" (move position), "scale(1.5)" (150% size), "rotate(45 50 50)" (45° rotation around center).',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },

    'visibility': {
      control: { type: 'select' },
      description: 'Controls visibility of the pie segments.',
      options: ['visible', 'hidden', 'collapse'],
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'visible' },
        type: { summary: 'number | string' },
      },
    },

    'xKey': {
      control: false, // Disable control in Storybook
      description:
        '[IGNORE]: This prop is specific to charts with X-axis data. PieChart uses dataKey only.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'string' },
      },
    },
  };
};
