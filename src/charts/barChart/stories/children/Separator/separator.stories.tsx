import type { Meta, StoryObj } from '@storybook/react';

import { BarOrientation } from '@/components/bar/bar.type';
import { Note } from '@/storybook/components/note/note';
import { DefaultCanvasConfig } from '@/types/canvas.type';
import { Positions } from '@/types/position.enum';

import { BarChart } from '../../../barChart';
import type { BarChartSeparatorProps } from '../../../barChart.type';
import { BarChartSeparator } from '../../../fragments/barChartSeparator';
import { separatorArgTypes } from './separator.argtypes';

const meta = {
  argTypes: separatorArgTypes(),
  component: BarChartSeparator,
  decorators: [
    (Story: React.ComponentType) => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="BarChart.Separator Subcomponent Customization"
          text={[
            <>
              Multiple specialized stories demonstrate different separator patterns and use cases.
              Each story focuses on a specific separator configuration for bar charts.
            </>,
            <></>,
            <>
              <strong>📊 Available Stories:</strong>
            </>,
            <>
              • <strong>HorizontalSeparator</strong> - topSeparator + yBreakAxis for baseline
              divisions and thresholds
            </>,
            <>
              • <strong>VerticalSeparator</strong> - rightSeparator + xBreakAxis for timeline
              markers and periods
            </>,
            <>
              • <strong>CombinedSeparators</strong> - Both types together for chart quadrants and
              grid zones
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
              • <strong>Valid breakAxis values</strong>: xBreakAxis → 2001-2004 years | yBreakAxis →
              data range values (40, 50, 60, 70)
            </>,
            <></>,
            <>
              <strong>StyleProps Options:</strong>
            </>,
            <>
              • <strong>Lines</strong>: stroke, strokeWidth, strokeDasharray, strokeOpacity
            </>,
            <>
              • <strong>Areas</strong>: fill, fillOpacity for background zones
            </>,
            <>
              • <strong>General</strong>: opacity, visibility, transform
            </>,
            <></>,
            <>
              <strong>Test IDs:</strong> Automatically appends "Area", "Top", "Right" suffixes to
              dataTestId
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
  title: 'Charts/BarChart/Child Components/BarChartSeparator',
} satisfies Meta<typeof BarChart>;

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
    yBreakAxis: '50',
  },

  render: (args: BarChartSeparatorProps) => {
    const simplifiedData = [
      { value: 50, year: 2001 },
      { value: 60, year: 2002 },
      { value: 40, year: 2003 },
      { value: 70, year: 2004 },
    ];

    const barConfigs = [
      {
        color: '#FFB366',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
      {
        color: '#66B3FF',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
      {
        color: '#66D9B3',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
      {
        color: '#B366FF',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
    ];

    return (
      <BarChart
        canvasConfig={DefaultCanvasConfig}
        data={simplifiedData}
        gapBetweenBars={2}
        orientation={BarOrientation.VERTICAL}
        pKey="year"
      >
        {simplifiedData.map((data, index) => (
          <BarChart.Path
            key={`bar-${data.year}`}
            barConfig={{
              barWidth: 12,
              gap: 1,
              singleConfig: [barConfigs[index]],
            }}
            dataIdx={index}
            dataKey="value"
            order={1}
          />
        ))}

        <BarChart.Separator {...args} />

        <BarChart.XAxis
          aria-label="X Axis"
          position={Positions.BOTTOM}
          role="img"
          showTickLines={false}
          stroke="black"
          strokeWidth="0.1"
          tickText={{
            fontSize: 1,
            textAnchor: 'middle',
          }}
          tickValues={{ numeric: { max: 2004, min: 2001, step: 1 } }}
        />
        <BarChart.YAxis
          aria-label="Y Axis"
          position={Positions.LEFT}
          role="img"
          showTickLines={false}
          stroke="black"
          strokeWidth="0.1"
          tickText={{
            fontSize: 1,
            textAnchor: 'middle',
          }}
          tickValues={{ numeric: { max: 80, min: 0, step: 20 } }}
        />
      </BarChart>
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
    xBreakAxis: '2003',
  },

  render: (args: BarChartSeparatorProps) => {
    const simplifiedData = [
      { value: 50, year: 2001 },
      { value: 60, year: 2002 },
      { value: 40, year: 2003 },
      { value: 70, year: 2004 },
    ];

    const barConfigs = [
      {
        color: '#FF9999',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
      {
        color: '#99D6FF',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
      {
        color: '#99FFB3',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
      {
        color: '#E699FF',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
    ];

    return (
      <BarChart
        canvasConfig={DefaultCanvasConfig}
        data={simplifiedData}
        gapBetweenBars={2}
        orientation={BarOrientation.VERTICAL}
        pKey="year"
      >
        {simplifiedData.map((data, index) => (
          <BarChart.Path
            key={`bar-${data.year}`}
            barConfig={{
              barWidth: 12,
              gap: 1,
              singleConfig: [barConfigs[index]],
            }}
            dataIdx={index}
            dataKey="value"
            order={1}
          />
        ))}

        <BarChart.Separator {...args} />

        <BarChart.XAxis
          aria-label="X Axis"
          position={Positions.BOTTOM}
          role="img"
          showTickLines={false}
          stroke="black"
          strokeWidth="0.1"
          tickText={{
            fontSize: 1,
            textAnchor: 'middle',
          }}
          tickValues={{ numeric: { max: 2004, min: 2001, step: 1 } }}
        />
        <BarChart.YAxis
          aria-label="Y Axis"
          position={Positions.LEFT}
          role="img"
          showTickLines={false}
          stroke="black"
          strokeWidth="0.1"
          tickText={{
            fontSize: 1,
            textAnchor: 'middle',
          }}
          tickValues={{ numeric: { max: 80, min: 0, step: 20 } }}
        />
      </BarChart>
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
    xBreakAxis: '2002',
    yBreakAxis: '60',
  },

  render: (args: BarChartSeparatorProps) => {
    const simplifiedData = [
      { value: 50, year: 2001 },
      { value: 60, year: 2002 },
      { value: 40, year: 2003 },
      { value: 70, year: 2004 },
    ];

    const barConfigs = [
      {
        color: '#FFCC99',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
      {
        color: '#99CCFF',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
      {
        color: '#B3FFB3',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
      {
        color: '#D9B3FF',
        coverage: 100,
        ['aria-label']: '{{xKey}}:{{xData}} - {{yData}}',
        role: 'img',
      },
    ];

    return (
      <BarChart
        canvasConfig={DefaultCanvasConfig}
        data={simplifiedData}
        gapBetweenBars={2}
        orientation={BarOrientation.VERTICAL}
        pKey="year"
      >
        {simplifiedData.map((data, index) => (
          <BarChart.Path
            key={`bar-${data.year}`}
            barConfig={{
              barWidth: 12,
              gap: 1,
              singleConfig: [barConfigs[index]],
            }}
            dataIdx={index}
            dataKey="value"
            order={1}
          />
        ))}

        <BarChart.Separator {...args} />

        <BarChart.XAxis
          aria-label="X Axis"
          position={Positions.BOTTOM}
          role="img"
          showTickLines={false}
          stroke="black"
          strokeWidth="0.1"
          tickText={{
            fontSize: 1,
            textAnchor: 'middle',
          }}
          tickValues={{ numeric: { max: 2004, min: 2001, step: 1 } }}
        />
        <BarChart.YAxis
          aria-label="Y Axis"
          position={Positions.LEFT}
          role="img"
          showTickLines={false}
          stroke="black"
          strokeWidth="0.1"
          tickText={{
            fontSize: 1,
            textAnchor: 'middle',
          }}
          tickValues={{ numeric: { max: 80, min: 0, step: 20 } }}
        />
      </BarChart>
    );
  },
};
