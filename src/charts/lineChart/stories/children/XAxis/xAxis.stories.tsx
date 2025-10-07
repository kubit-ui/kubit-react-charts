import type { Meta, StoryObj } from '@storybook/react-vite';

import { Note } from '@/storybook/components/note/note';

import { LineChart } from '../../../lineChart';
import type { LineChartXAxisProps } from '../../../lineChart.type';
import { SUBCOMPONENT_DEMO_DATA } from '../../templates/data';
import { xAxisArgTypes } from './xAxis.argtypes';
import type { XAxisStoryArgs } from './xAxis.types';

const meta = {
  argTypes: xAxisArgTypes(),
  decorators: [
    (Story: React.ComponentType): JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="LineChart.XAxis Subcomponent Customization"
          text={[
            <>
              This story focuses specifically on the XAxis subcomponent of LineChart, allowing you
              to experiment with all its available properties.
            </>,
            <></>,
            <>
              <strong>Key Features:</strong>
            </>,
            <>
              • <strong>tickValues</strong> - Define custom tick positions using numeric or custom
              format
            </>,
            <>
              • <strong>valueFormatter</strong> - Format tick labels using a callback function{' '}
              <code>(val) =&gt; string</code>. The dropdown below shows preset examples, but in your
              code you'll pass actual functions.
            </>,
            <>
              • <strong>tickText</strong> - Complete text styling control including font, color, and
              positioning
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
              context while you focus on XAxis behavior.
            </>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],
  tags: ['autodocs'],
  title: 'Charts/LineChart/Child Components/LineChartXAxis',
} satisfies Meta<XAxisStoryArgs<LineChartXAxisProps>>;

export default meta;
type Story = StoryObj<XAxisStoryArgs<LineChartXAxisProps>>;

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

export const XAxisCustomization: Story = {
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

    // === POSITIONING & LAYOUT ===
    position: 'BOTTOM',
    // === TICK CONFIGURATION ===
    showTickLines: true,
    // === AXIS LINE STYLING ===
    stroke: '#666666',

    strokeDasharray: '5,5', // e.g., "5,5" for dashed line

    strokeOpacity: 1,

    strokeWidth: 0.5,

    style: undefined,
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
      bottom: undefined, // XAxis specific: distance above axis line
      children: undefined,
      className: undefined,
      direction: undefined,

      // Color and appearance
      fill: '#333333',
      fillOpacity: undefined,
      fontFamily: undefined,
      // Font properties
      fontSize: 2.5,
      fontStyle: undefined,
      fontWeight: undefined,

      kerning: undefined,
      lengthAdjust: undefined,
      letterSpacing: undefined,
      opacity: undefined,

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
      top: 0.5, // XAxis specific: distance below axis line

      transform: undefined, // XAxis specific: can be 'rotate' for rotated labels
      unicodeBidi: undefined,
      wordSpacing: undefined,
      writingMode: undefined,
    },

    // === DATA CONFIGURATION ===
    tickValues: { custom: { values: ['0', '1', '3', '5'] } }, // Custom tick positions - shows only x values: 0, 2, and 4 from data range [0-5]
    valueFormatter: 'thousands', // Default to "Thousands (K)" formatter - user can change via dropdown
  },
  render: (args: XAxisStoryArgs<LineChartXAxisProps>) => {
    // Convert the formatter string to actual function and filter out Storybook-only props
    const actualArgs = {
      ...args,
      valueFormatter: getValueFormatter(args.valueFormatter as string),
    };

    return (
      <LineChart data={SUBCOMPONENT_DEMO_DATA} xKey="x">
        <LineChart.XAxis {...actualArgs} />

        <LineChart.Path dataKey="y" stroke="#0078D4" strokeWidth={1} />
      </LineChart>
    );
  },
};
