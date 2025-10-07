import type { ArgTypes } from 'storybook/internal/types';

import { CATEGORY_CONTROL } from '@/storybook';

import type { LineChartSeparatorProps } from '../../../lineChart.type';

export const separatorArgTypes = (): ArgTypes<LineChartSeparatorProps> => {
  return {
    areaSeparator: {
      control: { type: 'object' },
      description:
        'Configuration for the background area fill of the entire chart region. Accepts StyleProps with fill properties: fill (color), fillOpacity, opacity. Perfect for creating subtle background highlights or visual zones. The area is bounded by the chart dimensions and any active breakAxis values. Example: { fill: "rgba(255,0,0,0.1)", fillOpacity: 0.5 }',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'StyleProps' },
      },
    },

    dataTestId: {
      control: { type: 'text' },
      description:
        'Test ID for the separator component group. Used to identify separator elements in automated tests.',
      table: {
        category: CATEGORY_CONTROL.TESTING,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    rightSeparator: {
      control: { type: 'object' },
      description:
        'Configuration for the vertical separator line at the right edge of the chart area. Accepts StyleProps for complete control: stroke (color), strokeWidth (thickness), opacity, strokeDasharray (for dashed lines), etc. Works together with xBreakAxis to create vertical separators at specific data points. Example: { stroke: "blue", strokeWidth: "0.3", opacity: 0.7 }',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'StyleProps' },
      },
    },

    topSeparator: {
      control: { type: 'object' },
      description:
        'Configuration for the horizontal separator line at the top edge of the chart area. Accepts StyleProps for complete control: stroke (color), strokeWidth (thickness), opacity, strokeDasharray (for dashed lines), etc. Works together with yBreakAxis to create horizontal separators at specific data values. Example: { stroke: "red", strokeWidth: "0.5", strokeDasharray: "5,5" }',
      table: {
        category: CATEGORY_CONTROL.CUSTOMIZATION,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'StyleProps' },
      },
    },

    xBreakAxis: {
      control: { type: 'text' },
      description:
        'X-axis break point value that MUST match an exact data label from your dataset. Separators will only extend up to this X value instead of the full chart width. In this demo, valid values are: "step 1", "step 2", "step 3", "step 4", "step 5", "step 6" (exactly as they appear in FULL_CUSTOM_DATA). Example: Set "step 3" to create a vertical line that stops at the third data point.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },

    yBreakAxis: {
      control: { type: 'text' },
      description:
        'Y-axis break point value that MUST match an exact data value from your dataset. Separators will only extend up to this Y value instead of the full chart height. In this demo, you can use numeric values like "0", "30", "-30", "60", "-60", etc. (values that exist in the cats/dogs/lions/rabbits data). Example: Set "0" to create a horizontal baseline separator that cuts through the zero line.',
      table: {
        category: CATEGORY_CONTROL.MODIFIERS,
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
  };
};
