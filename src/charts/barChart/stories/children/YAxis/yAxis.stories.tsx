import type { Meta, StoryObj } from '@storybook/react';

import { BarOrientation } from '@/components/bar/bar.type';
import { Note } from '@/storybook/components/note/note';
import { DefaultCanvasConfig } from '@/types/canvas.type';
import { Positions } from '@/types/position.enum';

import { BarChart } from '../../../barChart';
import type { BarChartYAxisProps } from '../../../barChart.type';
import { BarChartYAxis } from '../../../fragments/barChartYAxis';
import { simplifiedData } from '../../templates/data';
import { yAxisArgTypes } from './yAxis.argtypes';

const meta = {
  argTypes: yAxisArgTypes(),
  component: BarChartYAxis,
  decorators: [
    (Story: React.ComponentType) => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="BarChart.YAxis Subcomponent Customization"
          text={[
            <>
              This story focuses specifically on the YAxis subcomponent of BarChart, allowing you to
              experiment with all its available properties.
            </>,
            <></>,
            <>
              <strong>Key Features:</strong>
            </>,
            <>
              • <strong>position</strong> - Axis placement (left or right, refresh story after
              setting in controls)
            </>,
            <>
              • <strong>tickValues</strong> - Numeric scale generation with min, max, and step or
              custom values array
            </>,
            <>
              • <strong>tickText</strong> - Complete text styling control including font, color, and
              positioning (left/right spacing)
            </>,
            <>
              • <strong>tickLine</strong> - Style tick marks and lines
            </>,
            <>
              • <strong>extraSpace</strong> - Fine-tune positioning with additional spacing
            </>,
            <></>,
            <>
              <strong>Value Features:</strong> Automatic scaling, custom ranges, seamless adaptation
              between vertical and horizontal bar orientations, and coordinated spacing with chart
              content.
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
  title: 'Charts/BarChart/Child Components/BarChartYAxis',
} satisfies Meta<typeof BarChartYAxis>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    // === POSITIONING & LAYOUT ===
    position: Positions.LEFT,
    // === TICK CONFIGURATION ===
    showTickLines: true,
    // === AXIS LINE STYLING ===
    stroke: '#666666',
    strokeDasharray: '3,3',
    strokeDashoffset: undefined,
    strokeLinecap: undefined,
    strokeLinejoin: undefined,
    strokeOpacity: 1,
    strokeWidth: 0.5,

    // === INTERACTION ===
    tabIndex: undefined,

    // === TICK LINE STYLING ===
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
    // === TICK TEXT STYLING ===
    tickText: {
      children: undefined,
      className: undefined,
      direction: undefined,
      // Color and appearance
      fill: '#333333',
      fillOpacity: undefined,
      // Font properties
      fontFamily: undefined,
      fontSize: 2.5,
      fontStyle: undefined,
      fontWeight: undefined,
      kerning: undefined,
      // YAxis specific: distance from axis line
      left: 2,
      lengthAdjust: undefined,
      letterSpacing: undefined,
      opacity: undefined,
      right: 2,
      rotate: undefined,
      stroke: undefined,
      strokeOpacity: undefined,
      strokeWidth: undefined,
      // React/DOM properties
      style: undefined,
      tabIndex: undefined,
      textAnchor: 'middle',
      textDecoration: undefined,
      textLength: undefined,
      unicodeBidi: undefined,
      wordSpacing: undefined,
      writingMode: undefined,
    },

    // === DATA CONFIGURATION ===
    tickValues: {
      numeric: {
        max: 2003,
        min: 2000,
        step: 1,
      },
    },

    transform: undefined,
  },

  render: (args: BarChartYAxisProps) => {
    const chartData = simplifiedData;

    const barConfigs = [
      { color: '#FFB366', coverage: 100, title: '2001' },
      { color: '#66B3FF', coverage: 100, title: '2002' },
      { color: '#66D9B3', coverage: 100, title: '2003' },
      { color: '#B366FF', coverage: 100, title: '2004' },
    ];

    return (
      <BarChart
        canvasConfig={DefaultCanvasConfig}
        data={chartData}
        gapBetweenBars={7}
        orientation={BarOrientation.HORIZONTAL}
        pKey="year"
      >
        <BarChart.YAxis {...args} />

        {chartData.map((dataPoint, index) => (
          <BarChart.Path
            key={`bar-${dataPoint.year}`}
            barConfig={{
              barWidth: 12,
              gap: 1,
              singleConfig: [barConfigs[index]],
            }}
            dataIdx={index}
            dataKey="rabbits"
            order={1}
          />
        ))}

        <BarChart.XAxis
          ariaLabel="XAxis"
          position={Positions.BOTTOM}
          showTickLines={false}
          stroke="transparent"
          strokeWidth={0.1}
          tickValues={{ numeric: { max: 120, min: -120, step: 30 } }}
        />
      </BarChart>
    );
  },
};
