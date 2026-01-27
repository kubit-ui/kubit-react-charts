import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { BarChartPathProps } from '../../../barChart.type';

export const pathArgTypes = (): ArgTypes<BarChartPathProps> => {
  return {
    barConfig: {
      control: { type: 'object' },
      description:
        'Configuration object for bar appearance. Contains: barWidth (number - width of the bar), gap (optional number - spacing between segments in stacked bars), and singleConfig (array of BarChartColor objects with color, coverage percentage, optional title, and accessibility properties). Each segment in singleConfig can include: color (string), coverage (number), title (optional string), aria-label (optional string with template support), aria-describedby, aria-labelledby, data attributes, role (string), and tabIndex (number). Templates available for aria-label: {{dataKey}} (data series key), {{xKey}} (x-axis key), {{yKey}} (y-axis key), {{xData}} (x-axis value), {{yData}} (y-axis value), {{coverage}} (segment percentage), {{index}} (segment index). Example: { barWidth: 15, gap: 2, singleConfig: [{ color: "#107C10", coverage: 60, "aria-label": "{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})", role: "img" }] }',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'BarChartStyles' },
      },
    },
    dataIdx: {
      control: { type: 'number' },
      description: 'Index of the data point in the data array.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    dataKey: {
      control: { type: 'text' },
      description: 'Key to be used as the data value from the data points.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    endRounded: {
      control: { type: 'number' },
      description: 'Border radius for the end of the bar.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },

    focusConfig: {
      control: { type: 'object' },
      description:
        'Configuration for the focus ring appearance and behavior. Includes properties like outlineStrokeWidth and innerStrokeWidth to customize the focus indicator. Defaults to adaptive variant with outlineStrokeWidth: 0.2 and innerStrokeWidth: 1.5.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: '{ outlineStrokeWidth: 0.2, innerStrokeWidth: 1.5 }' },
        type: { summary: 'FocusConfig' },
      },
    },

    onBlur: {
      action: 'blur',
      description: 'Function executed when removing focus from the bar.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent<SVGPathElement>) => void' },
      },
    },

    onFocus: {
      action: 'focus',
      description: 'Function executed when focusing the bar.',
      table: {
        category: CATEGORY_CONTROL.FUNCTIONS,
        type: { summary: '(event: React.FocusEvent<SVGPathElement>) => void' },
      },
    },

    order: {
      control: { type: 'number' },
      description:
        'Order of the bar in the group when multiple BarChart.Path components are used. Lower numbers render first. Essential for grouped bars where order determines visual layering and positioning. Example: Use order={0} for the first bar series, order={1} for the second series, etc.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },

    startRounded: {
      control: { type: 'number' },
      description: 'Border radius for the start of the bar.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },

    tabIndex: {
      control: { type: 'number' },
      description:
        'Tab index for keyboard navigation. Defaults to 0 (focusable and included in tab order). Set to -1 to exclude from tab order but allow programmatic focus.',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
  };
};
