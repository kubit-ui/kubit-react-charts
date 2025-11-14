import type { Meta, StoryObj } from '@storybook/react';

import { BarOrientation } from '@/components/bar/bar.type';
import { Note } from '@/storybook/components/note/note';
import { DefaultCanvasConfig } from '@/types/canvas.type';
import { Positions } from '@/types/position.enum';

import { BarChart } from '../../../barChart';
import type { BarChartXAxisProps } from '../../../barChart.type';
import { BarChartXAxis } from '../../../fragments/barChartXAxis';
import { xAxisArgTypes } from './xAxis.argtypes';

const meta = {
  argTypes: xAxisArgTypes(),
  component: BarChartXAxis,
  decorators: [
    (Story: React.ComponentType) => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="BarChart.XAxis Subcomponent Customization"
          text={[
            <>
              This story focuses specifically on the XAxis subcomponent of BarChart, allowing you to
              experiment with all its available properties.
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
              • <strong>tickText</strong> - Complete text styling control including font, color, and
              positioning
            </>,
            <>
              • <strong>tickLine</strong> - Style tick marks and lines
            </>,
            <>
              • <strong>position</strong> - Control axis placement (top or bottom, refresh story
              after setting in controls)
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
  title: 'Charts/BarChart/Child Components/BarChartXAxis',
} satisfies Meta<typeof BarChartXAxis>;

export default meta;
type Story = StoryObj<typeof meta>;

export const XAxisCustomization: Story = {
  args: {
    // === ADVANCED STYLING ===
    className: undefined,

    // === DATA CONFIGURATION ===
    // Custom tick positions for years

    // === SPACING ADJUSTMENTS ===
    extraSpace: {
      bottom: undefined,
      left: undefined,
      right: undefined,
      top: undefined,
    },

    // === POSITIONING & LAYOUT ===
    position: Positions.BOTTOM,

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
      bottom: undefined,
      children: undefined,
      className: undefined,
      direction: undefined,
      // Font properties
      fill: '#333333',
      fillOpacity: undefined,
      fontFamily: undefined,
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
      textLength: undefined,
      top: 0.5,
      transform: undefined,
      unicodeBidi: undefined,
      wordSpacing: undefined,
      writingMode: undefined,
    },

    tickValues: {
      custom: {
        values: ['2001', '2002', '2003', '2004'],
      },
    },

    transform: undefined,
  },

  render: (args: BarChartXAxisProps) => {
    // Simplified data for better visualization (single series per year)
    const simplifiedData = [
      { value: 50, year: 2001 },
      { value: 60, year: 2002 },
      { value: 40, year: 2003 },
      { value: 70, year: 2004 },
    ];

    // Solid bar configurations with unique soft colors per year
    const barConfigs = [
      { color: '#FFB366', coverage: 100, title: '2001' },
      { color: '#66B3FF', coverage: 100, title: '2002' },
      { color: '#66D9B3', coverage: 100, title: '2003' },
      { color: '#B366FF', coverage: 100, title: '2004' },
    ];

    return (
      <BarChart
        canvasConfig={DefaultCanvasConfig}
        data={simplifiedData}
        gapBetweenBars={7}
        orientation={BarOrientation.VERTICAL}
        pKey="year"
      >
        <BarChart.XAxis {...args} />
        {simplifiedData.map((dataPoint, index) => (
          <BarChart.Path
            key={`bar-${dataPoint.year}`}
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

        <BarChart.YAxis
          position={Positions.LEFT}
          stroke="transparent"
          strokeWidth={0.5}
          tickValues={{ numeric: { max: 80, min: 0, step: 20 } }}
        />
      </BarChart>
    );
  },
};
