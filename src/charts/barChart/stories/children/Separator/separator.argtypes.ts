import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { BarChartSeparatorProps } from '../../../barChart.type';

export const separatorArgTypes = (): ArgTypes<BarChartSeparatorProps> => {
  return {
    areaSeparator: {
      control: { type: 'object' },
      description:
        'Styling configuration for background areas between separators. Accepts StyleProps with fill properties for backgrounds or stroke properties for borders. Creates rectangular zones when combined with break axes. Example: { fill: "rgba(255, 107, 107, 0.1)" } or { stroke: "#f0f0f0", strokeWidth: "0.5" }',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'StyleProps' },
      },
    },

    dataTestId: {
      control: { type: 'text' },
      description:
        'Test identifier for separator elements. Automatically appends suffixes: "Area", "Top", and "Right" for different separator types. Example: "my-separator" becomes "my-separatorArea", "my-separatorTop", "my-separatorRight".',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    rightSeparator: {
      control: { type: 'object' },
      description:
        'Styling configuration for vertical separator lines. Accepts StyleProps including stroke, strokeWidth, strokeDasharray, opacity, etc. Combines with xBreakAxis to position the line at specific X values. Example: { stroke: "#4ecdc4", strokeWidth: "0.5", strokeDasharray: "3,3" }',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'StyleProps' },
      },
    },

    topSeparator: {
      control: { type: 'object' },
      description:
        'Styling configuration for horizontal separator lines. Accepts StyleProps including stroke, strokeWidth, strokeDasharray, opacity, etc. Combines with yBreakAxis to position the line at specific Y values. Example: { stroke: "#ff6b6b", strokeWidth: "0.5", strokeDasharray: "5,5" }',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'StyleProps' },
      },
    },

    xBreakAxis: {
      control: { type: 'text' },
      description:
        'X-axis value where the vertical separator line should be positioned. Must match exact data values (e.g., years: "2001", "2002", "2003"). Works with rightSeparator styling to control line appearance.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    yBreakAxis: {
      control: { type: 'text' },
      description:
        'Y-axis value where the horizontal separator line should be positioned. Must match exact data values (e.g., values: "30", "50", "70"). Works with topSeparator styling to control line appearance.',
      table: {
        category: CATEGORY_CONTROL.DATA,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
  };
};
