import type { Meta, StoryObj } from '@storybook/react-vite';

import { Note } from '@/storybook/components/note/note';

import { LineChartSeparator } from '../../../fragments/lineChartSeparator';
import { LineChart } from '../../../lineChart';
import type { LineChartSeparatorProps } from '../../../lineChart.type';
import { FULL_CUSTOM_DATA } from '../../templates/data';
import { separatorArgTypes } from './separator.argtypes';

const meta = {
  argTypes: separatorArgTypes(),
  component: LineChartSeparator,
  decorators: [
    (Story: React.ComponentType): JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="LineChart.Separator Subcomponent Customization"
          text={[
            <>
              Multiple specialized stories demonstrate different separator patterns and use cases.
              Each story focuses on a specific separator configuration.
            </>,
            <></>,
            <>
              <strong>📊 Available Stories:</strong>
            </>,
            <>
              • <strong>HorizontalSeparator</strong> - topSeparator + yBreakAxis for baseline
              divisions
            </>,
            <>
              • <strong>VerticalSeparator</strong> - rightSeparator + xBreakAxis for timeline
              markers
            </>,
            <>
              • <strong>CombinedSeparators</strong> - Both types together for chart quadrants
            </>,
            <></>,
            <>
              <strong>Key Features:</strong>
            </>,
            <>
              • <strong>Visual separators</strong> - topSeparator, rightSeparator, areaSeparator
              with full StyleProps control
            </>,
            <>
              • <strong>Break points</strong> - xBreakAxis/yBreakAxis must match exact data values
            </>,
            <>
              • <strong>Valid breakAxis values</strong>: xBreakAxis → "step 1" to "step 6" |
              yBreakAxis → "0", "30", "-30", "60", "-60"
            </>,
            <></>,
            <>
              <strong>Note:</strong> Other components provide visual context while you focus on
              Separator behavior.
            </>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],
  tags: ['autodocs'],
  title: 'Charts/LineChart/Child Components/LineChartSeparator',
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// === STORIES ===

export const HorizontalSeparator: Story = {
  args: {
    areaSeparator: {
      fill: 'rgba(255, 107, 107, 0.1)',
    },
    dataTestId: 'horizontal-separator',
    topSeparator: {
      stroke: '#ff6b6b',
      strokeDasharray: '5,5',
      strokeWidth: '0.5',
    },
    yBreakAxis: '0',
  },

  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates **horizontal separators** using `topSeparator` and `yBreakAxis`. The separator creates a horizontal line at y=0 (baseline) with a dashed red style and subtle background fill. Perfect for highlighting baseline values or creating horizontal zones.',
      },
    },
  },

  render: (args: LineChartSeparatorProps) => {
    return (
      <LineChart data={FULL_CUSTOM_DATA} xKey="step">
        {/* PROTAGONIST - receives args from controls */}
        <LineChart.Separator {...args} />

        {/* VISUAL SUPPORT - fixed props for context */}
        <LineChart.Path dataKey="dogs" stroke="#0074d9" strokeWidth="0.2" tabIndex={0} />
        <LineChart.Path dataKey="cats" stroke="green" strokeWidth="0.2" tabIndex={0} />
        <LineChart.Path dataKey="lions" stroke="pink" strokeWidth="0.2" tabIndex={0} />
        <LineChart.XAxis
          position="BOTTOM"
          showTickLines={true}
          stroke="black"
          strokeWidth="0.1"
          tickValues={{
            custom: { values: ['step 1', 'step 2', 'step 3', 'step 4', 'step 5', 'step 6'] },
          }}
        />
        <LineChart.YAxis
          position="LEFT"
          showTickLines={true}
          stroke="black"
          strokeWidth="0.1"
          tickValues={{ numeric: { max: 120, min: -120, step: 30 } }}
        />
      </LineChart>
    );
  },
};

export const VerticalSeparator: Story = {
  args: {
    areaSeparator: {
      fill: 'rgba(78, 205, 196, 0.1)',
    },
    dataTestId: 'vertical-separator',
    rightSeparator: {
      stroke: '#4ecdc4',
      strokeDasharray: '3,3',
      strokeWidth: '0.5',
    },
    xBreakAxis: 'step 3',
  },

  render: (args: LineChartSeparatorProps) => {
    return (
      <LineChart data={FULL_CUSTOM_DATA} xKey="step">
        <LineChart.Separator {...args} />

        <LineChart.Path dataKey="dogs" stroke="#0074d9" strokeWidth="0.2" tabIndex={0} />
        <LineChart.Path dataKey="cats" stroke="green" strokeWidth="0.2" tabIndex={0} />
        <LineChart.Path dataKey="lions" stroke="pink" strokeWidth="0.2" tabIndex={0} />
        <LineChart.XAxis
          position="BOTTOM"
          showTickLines={true}
          stroke="black"
          strokeWidth="0.1"
          tickValues={{
            custom: { values: ['step 1', 'step 2', 'step 3', 'step 4', 'step 5', 'step 6'] },
          }}
        />
        <LineChart.YAxis
          position="LEFT"
          showTickLines={true}
          stroke="black"
          strokeWidth="0.1"
          tickValues={{ numeric: { max: 120, min: -120, step: 30 } }}
        />
      </LineChart>
    );
  },
};

export const CombinedSeparators: Story = {
  args: {
    areaSeparator: {
      fill: 'rgba(136, 132, 216, 0.15)',
    },
    dataTestId: 'combined-separators',
    rightSeparator: {
      stroke: '#82ca9d',
      strokeWidth: '1',
    },
    topSeparator: {
      stroke: '#8884d8',
      strokeWidth: '1',
    },
    xBreakAxis: 'step 4',
    yBreakAxis: '60',
  },

  render: (args: LineChartSeparatorProps) => {
    return (
      <LineChart data={FULL_CUSTOM_DATA} xKey="step">
        <LineChart.Separator {...args} />

        <LineChart.Path dataKey="dogs" stroke="#0074d9" strokeWidth="0.2" tabIndex={0} />
        <LineChart.Path dataKey="cats" stroke="green" strokeWidth="0.2" tabIndex={0} />
        <LineChart.Path dataKey="lions" stroke="pink" strokeWidth="0.2" tabIndex={0} />
        <LineChart.XAxis
          position="BOTTOM"
          showTickLines={true}
          stroke="black"
          strokeWidth="0.1"
          tickValues={{
            custom: { values: ['step 1', 'step 2', 'step 3', 'step 4', 'step 5', 'step 6'] },
          }}
        />
        <LineChart.YAxis
          position="LEFT"
          showTickLines={true}
          stroke="black"
          strokeWidth="0.1"
          tickValues={{ numeric: { max: 120, min: -120, step: 30 } }}
        />
      </LineChart>
    );
  },
};
