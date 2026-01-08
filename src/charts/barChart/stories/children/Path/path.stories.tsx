import type { Meta, StoryObj } from '@storybook/react';

import { BarOrientation } from '@/components/bar/bar.type';
import { Note } from '@/storybook/components/note/note';
import { Positions } from '@/types/position.enum';

import { BarChart } from '../../../barChart';
import type { BarChartPathProps } from '../../../barChart.type';
import { BarChartPath } from '../../../fragments/barChartPath';
import { COMPARATIVE_DATA } from '../../templates/data';
import { pathArgTypes } from './path.argtypes';

const meta = {
  argTypes: pathArgTypes(),
  component: BarChartPath,
  tags: ['autodocs'],
  title: 'Charts/BarChart/Child Components/BarChartPath',
} satisfies Meta<typeof BarChartPath>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseBarConfig = {
  barWidth: 15,
  singleConfig: [
    {
      color: '#0078D4',
      coverage: 100,
      ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
      role: 'img',
    },
  ],
};

export const PathCustomization: Story = {
  args: {
    // === BAR CONFIGURATION ===
    barConfig: baseBarConfig,
    dataIdx: 3,
    // === PATH CORE PROPERTIES ===
    dataKey: 'birds',

    endRounded: 4,
    order: 0,

    // === BAR STYLING ===
    startRounded: 0,
  },

  decorators: [
    (Story: React.ComponentType): JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="BarChart.Path Subcomponent Customization"
          text={[
            <>
              This story focuses specifically on the Path subcomponent of BarChart, allowing you to
              experiment with all its available properties for creating single bars.
            </>,
            <></>,
            <>
              <strong>Key Features:</strong>
            </>,
            <>
              • <strong>dataKey</strong> - Specifies which data field to visualize as bars
            </>,
            <>
              • <strong>barConfig</strong> - Controls bar appearance, width, colors, and styling
              options. Perfect for creating clean, modern bar visualizations
            </>,
            <>
              • <strong>startRounded/endRounded</strong> - Apply rounded corners to bar edges
            </>,
            <>
              • <strong>order</strong> - Determines positioning for grouped bars (multiple series)
            </>,
            <>
              • <strong>dataIdx</strong> - Index for accessing specific data points in datasets
            </>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],

  render: (args: BarChartPathProps): JSX.Element => (
    <div style={{ height: '400px', width: '600px' }}>
      <BarChart
        data={COMPARATIVE_DATA}
        height="100%"
        orientation={BarOrientation.VERTICAL}
        pKey="year"
        width="100%"
      >
        <BarChart.Path
          barConfig={args.barConfig}
          dataIdx={args.dataIdx}
          dataKey={args.dataKey}
          endRounded={args.endRounded}
          order={args.order}
          startRounded={args.startRounded}
        />
        <BarChart.XAxis
          aria-label="X Axis"
          position={Positions.BOTTOM}
          role="img"
          showTickLines={false}
          stroke="#666"
          strokeWidth={0.5}
          tickText={{ fontSize: 0 }}
        />
        <BarChart.YAxis
          aria-label="Y Axis"
          position={Positions.LEFT}
          role="img"
          showTickLines={false}
          stroke="#666"
          strokeWidth={0.5}
          tickText={{ fontSize: 0 }}
        />
      </BarChart>
    </div>
  ),
};

export const StackedBars: Story = {
  args: {
    barConfig: {
      barWidth: 18,
      gap: 2,
      singleConfig: [
        {
          color: '#0078D4',
          coverage: 50,
          ['aria-label']:
            '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
          role: 'img',
        },
        {
          color: '#107C10',
          coverage: 30,
          ['aria-label']:
            '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
          role: 'img',
        },
        {
          color: '#FFB900',
          coverage: 20,
          ['aria-label']:
            '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
          role: 'img',
        },
      ],
    },
    dataIdx: 3,
    dataKey: 'birds',
    endRounded: 6,
    order: 0,
    startRounded: 0,
  },

  decorators: [
    (Story: React.ComponentType): JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="📊 Stacked Bars with Three Segments"
          text={[
            <>
              Demonstrates how to create stacked bars with three colored segments within a single
              bar, perfect for showing data composition.
            </>,
            <></>,
            <>
              <strong>Key Features:</strong>
            </>,
            <>
              • <strong>Three segments</strong> - singleConfig array with three color segments
            </>,
            <>
              • <strong>Coverage percentages</strong> - Each segment's coverage determines its
              proportion (50%, 30%, 20%)
            </>,
            <>
              • <strong>Gap spacing</strong> - Visual separation between stacked segments for
              clarity
            </>,
            <>
              • <strong>Rounded corners</strong> - Subtle rounding for modern appearance
            </>,
            <>
              • <strong>Color coordination</strong> - Blue, Green, Yellow for clear differentiation
            </>,
            <></>,
            <>
              <strong>Use Cases:</strong> Perfect for showing budget breakdowns, market share
              analysis, or any data that can be divided into three main components.
            </>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],

  render: (args: BarChartPathProps): JSX.Element => (
    <div style={{ height: '400px', width: '600px' }}>
      <BarChart
        data={COMPARATIVE_DATA}
        height="100%"
        orientation={BarOrientation.VERTICAL}
        pKey="year"
        width="100%"
      >
        <BarChart.Path
          barConfig={args.barConfig}
          dataIdx={args.dataIdx}
          dataKey={args.dataKey}
          endRounded={args.endRounded}
          order={args.order}
          startRounded={args.startRounded}
        />
        <BarChart.XAxis
          aria-label="X Axis"
          position={Positions.BOTTOM}
          role="img"
          showTickLines={false}
          stroke="#666"
          strokeWidth={1}
          tickText={{ fontSize: 0 }}
        />
        <BarChart.YAxis
          aria-label="Y Axis"
          position={Positions.LEFT}
          role="img"
          showTickLines={false}
          stroke="#666"
          strokeWidth={1}
          tickText={{ fontSize: 0 }}
        />
      </BarChart>
    </div>
  ),
};
