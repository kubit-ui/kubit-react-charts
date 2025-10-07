import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook/constants/categoryControl';

import type { ZoomAreaProps } from '../zoomArea.type';

export const argtypes = (): ArgTypes<ZoomAreaProps> => {
  return {
    ariaHidden: {
      control: { type: 'boolean' },
      description: 'ARIA hidden attribute.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'boolean' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'ARIA label for screen readers.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'Zoom area chart' },
        type: { summary: 'string' },
      },
    },
    backgroundColor: {
      control: { type: 'color' },
      description:
        'Background color for the chart area. If not specified, the background will be transparent.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        type: { summary: 'string' },
      },
    },
    canvasConfig: {
      control: { type: 'object' },
      description: 'Canvas configuration for dimensions and spacing.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'CanvasConfig' },
      },
    },
    caption: {
      control: { type: 'text' },
      description: 'Chart caption for accessibility.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'string' },
      },
    },
    classNames: {
      control: { type: 'text' },
      description: 'CSS class names.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'string' },
      },
    },
    data: {
      control: { type: 'object' },
      description: 'Data points for the chart.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'IZoomAreaDataPoint[]' },
      },
    },
    focusConfig: {
      control: { type: 'object' },
      description:
        'Custom configuration for focus effects applied to all focusable elements (handlers and selection area). Can include outline colors, stroke widths, and border radius.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'ZoomAreaFocusConfig' },
      },
    },
    handlerConfig: {
      control: { type: 'object' },
      description:
        'Custom configuration for zoom handlers. Can include custom colors for circle, vertical line, and icon, plus dimensions like radius and stroke widths.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'ZoomAreaHandlerConfig' },
      },
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the zoom area chart.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '40px' },
        type: { summary: 'number | string' },
      },
    },
    initialRange: {
      control: { type: 'object' },
      description: 'Initial zoom range selection.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'ZoomRange' },
      },
    },
    interactionConfig: {
      control: { type: 'object' },
      description:
        'Custom configuration for interaction behavior. Can include minHandlerDistance, keyboardStep, and keyboardFastStep for customizing keyboard and mouse interaction sensitivity.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'ZoomAreaInteractionConfig' },
      },
    },
    lines: {
      control: { type: 'object' },
      description:
        'Configuration for lines to display in the zoom area. Each line config can specify yKey, stroke, strokeWidth, fill, fillOpacity, and dataKey.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'ZoomAreaLineConfig[]' },
      },
    },
    onBlur: {
      action: 'blurred',
      description: 'SVG blur event handler.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent<SVGElement>) => void' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'SVG click event handler.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },
    onDataChange: {
      action: 'dataChanged',
      description:
        'Callback when filtered data changes based on zoom selection. Returns the filtered data points directly.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(filteredData: IZoomAreaDataPoint[]) => void' },
      },
    },
    onDoubleClick: {
      action: 'doubleClicked',
      description: 'SVG double click event handler.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },
    onFocus: {
      action: 'focused',
      description: 'SVG focus event handler.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent<SVGElement>) => void' },
      },
    },
    onKeyDown: {
      action: 'keyPressed',
      description: 'SVG key down event handler.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.KeyboardEvent<SVGSVGElement>) => void' },
      },
    },
    onKeyUp: {
      action: 'keyReleased',
      description: 'SVG key up event handler.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.KeyboardEvent<SVGSVGElement>) => void' },
      },
    },
    onMouseEnter: {
      action: 'mouseEntered',
      description: 'SVG mouse enter event handler.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },
    onMouseLeave: {
      action: 'mouseLeft',
      description: 'SVG mouse leave event handler.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.MouseEvent<SVGElement>) => void' },
      },
    },
    role: {
      control: { type: 'text' },
      description: 'Chart role for accessibility.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        defaultValue: { summary: 'img' },
        type: { summary: 'string' },
      },
    },
    screenReaderTextConfig: {
      control: { type: 'object' },
      description:
        'Configuration for accessibility label templates. Use {{startValue}} and {{endValue}} placeholders to customize screen reader text for handlers and selection area.',
      table: {
        category: CATEGORY_CONTROL.ACCESIBILITY,
        type: { summary: 'ScreenReaderConfig' },
      },
    },
    selectionConfig: {
      control: { type: 'object' },
      description:
        'Custom configuration for selection area appearance. Can include fill, stroke and their opacity. Also controls whether overlay is hidden when selection covers full range (hideOverlayOnFullRange).',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        type: { summary: 'ZoomAreaSelectionConfig' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the zoom area chart.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: '100%' },
        type: { summary: 'number | string' },
      },
    },
    xKey: {
      control: { type: 'text' },
      description: 'Key for x-axis values from data points.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        type: { summary: 'string' },
      },
    },
  };
};
