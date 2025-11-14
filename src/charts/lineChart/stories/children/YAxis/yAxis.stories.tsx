import type { Meta, StoryObj } from '@storybook/react';

import { Note } from '@/storybook/components/note/note';

import { LineChart } from '../../../lineChart';
import type { LineChartYAxisProps } from '../../../lineChart.type';
import { SUBCOMPONENT_DEMO_DATA } from '../../templates/data';
import { yAxisArgTypes } from './yAxis.argtypes';
import type { YAxisStoryArgs } from './yAxis.types';

const meta = {
  argTypes: yAxisArgTypes(),
  decorators: [
    (Story: React.ComponentType): JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="LineChart.YAxis Subcomponent Customization"
          text={[
            <>
              This story focuses specifically on the YAxis subcomponent of LineChart, allowing you
              to experiment with all its available properties.
            </>,
            <></>,
            <>
              <strong>Key Features:</strong>
            </>,
            <>
              • <strong>valueFormatter</strong> - Format tick labels using a callback function{' '}
              <code>(val) =&gt; string</code>. The dropdown below shows preset examples, but in your
              code you'll pass actual functions.
            </>,
            <>
              • <strong>position</strong> - LEFT/RIGHT positioning with automatic text alignment
            </>,
            <>
              • <strong>tickText</strong> - Complete text styling control including font, color, and
              positioning with left/right spacing
            </>,
            <>
              • <strong>tickLine & tickLineHover</strong> - Style tick marks and their hover states
            </>,
            <>
              • <strong>extraSpace</strong> - Fine-tune positioning with additional spacing
            </>,
            <></>,
            <>
              <strong>Note:</strong> Other components (Path) are kept static to provide visual
              context while you focus on YAxis behavior.
            </>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],
  tags: ['autodocs'],
  title: 'Charts/LineChart/Child Components/LineChartYAxis',
} satisfies Meta<YAxisStoryArgs<LineChartYAxisProps>>;

export default meta;
type Story = StoryObj<YAxisStoryArgs<LineChartYAxisProps>>;

// Helper function to convert string formatter option to actual function
// NOTE: This is only for Storybook convenience. In real code, you pass functions directly:
// <LineChart.XAxis valueFormatter={(val) => `$${val}`} />
const getValueFormatter = (formatterType: string) => {
  switch (formatterType) {
    case 'currency':
      return val => `$${val}`;
    case 'percentage':
      return val => `${val}%`;
    case 'thousands':
      return val => `${val}K`;
    case 'millions':
      return val => `${val}M`;
    case 'custom':
      return val => `[${val}]`;
    case 'none':
    default:
      return undefined;
  }
};

export const YAxisCustomization: Story = {
  args: {
    // === ADVANCED STYLING ===
    className: undefined,
    // === SPACING ADJUSTMENTS ===
    extraSpace: {
      bottom: undefined,
      left: undefined,
      right: undefined,
      top: undefined,
    },

    opacity: 1,
    // === POSITIONING & LAYOUT ===
    position: 'LEFT',
    // === TICK CONFIGURATION ===
    showTickLines: true,

    // === AXIS LINE STYLING ===
    stroke: '#666666',

    strokeDasharray: '5,3', // e.g., "5,5" for dashed line

    strokeLinecap: undefined,

    strokeLinejoin: undefined,
    strokeOpacity: 1,
    strokeWidth: 0.5,
    style: undefined,
    tabIndex: undefined,

    tickLine: {
      ariaLabel: undefined,
      className: undefined,
      dataTestId: undefined,
      opacity: 1,
      stroke: '#999999',
      strokeDasharray: '1,1',
      strokeDashoffset: undefined,
      strokeLinecap: undefined,
      strokeLinejoin: undefined,
      strokeOpacity: 1,
      strokeWidth: 0.25,
      style: undefined,
      tabIndex: undefined,
      transform: undefined,
    },

    tickLineHover: {
      ariaLabel: undefined,
      className: undefined,
      dataTestId: undefined,
      opacity: undefined,
      stroke: '#333333',
      strokeDasharray: undefined,
      strokeDashoffset: undefined,
      strokeLinecap: undefined,
      strokeLinejoin: undefined,
      strokeOpacity: undefined,
      strokeWidth: 0.25,
      style: undefined,
      tabIndex: undefined,
      transform: undefined,
    },
    // === TICK TEXT STYLING ===
    tickText: {
      children: undefined,
      className: undefined,
      direction: undefined,
      // Color and appearance
      fill: '#333333',

      fillOpacity: undefined,
      fontFamily: undefined,
      // Font properties
      fontSize: 1.5,
      fontStyle: undefined,
      fontWeight: undefined,
      kerning: undefined,

      left: undefined, // YAxis specific: distance from left side when position=RIGHT
      lengthAdjust: undefined,
      letterSpacing: undefined,
      opacity: undefined,

      right: 0.5, // YAxis specific: distance from right side when position=LEFT
      rotate: undefined,
      stroke: undefined,
      strokeOpacity: undefined,
      strokeWidth: undefined,
      // React/DOM properties
      style: undefined,
      tabIndex: undefined,
      // Text positioning and alignment
      textAnchor: 'middle',
      textDecoration: undefined,
      // Advanced text properties
      textLength: undefined,

      transform: undefined,
      unicodeBidi: undefined,
      wordSpacing: undefined,
      writingMode: undefined,
    },
    transform: undefined,
    // === DATA CONFIGURATION ===
    // NOTE: tickValues is NOT IMPLEMENTED for YAxis - component uses auto-generated values
    valueFormatter: 'currency', // Default to "Currency ($)" formatter - user can change via dropdown
  },

  render: (args: YAxisStoryArgs<LineChartYAxisProps>) => {
    const actualArgs = {
      ...args,
      valueFormatter: getValueFormatter(args.valueFormatter as string),
    };

    return (
      <LineChart data={SUBCOMPONENT_DEMO_DATA} xKey="x">
        <LineChart.YAxis {...actualArgs} />

        <LineChart.Path dataKey="y" stroke="#0078D4" strokeWidth={1} />
      </LineChart>
    );
  },
};
