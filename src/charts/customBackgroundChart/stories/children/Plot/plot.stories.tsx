import type { Meta, StoryObj } from '@storybook/react';

import { Note } from '@/storybook/components/note/note';

import { CustomBackgroundChart } from '../../../customBackgroundChart';
import type { CustomBackgroundChartPlotProps } from '../../../customBackgroundChart.type';
import { CustomBackgroundChartPlot } from '../../../fragments/customBackgroundChartPlot';
import { GRID_BACKGROUND_URL } from '../../templates/backgrounds';
import { GRID_DATA } from '../../templates/data';
import { plotArgtypes } from './plot.argtypes';

const meta = {
  argTypes: plotArgtypes(),
  component: CustomBackgroundChartPlot,
  tags: ['autodocs'],
  title: 'Charts/CustomBackgroundChart/Child Components/CustomBackgroundChartPlot',
} satisfies Meta<typeof CustomBackgroundChartPlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlotCustomization: Story = {
  args: {
    // === DATA ===
    dataKey: 'point-h',

    // === ACCESSIBILITY ===
    ariaLabel: '{{name}}: {{value}}',

    // === APPEARANCE ===
    fill: '#0074D9',
    size: 32,
    stroke: '#ffffff',
    strokeWidth: 1,
    type: 'CIRCLE',

    // === INTERACTION ===
    hasHoverEffect: true,
    hoverConfig: { opacity: 0.5, scale: 1.3 },
    tabIndex: 0,
  },

  decorators: [
    (Story: React.ComponentType): React.JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="📐 Plot Position"
          text={[
            <div key="plot-explanation">
              <p>
                <strong>Position via dataKey</strong> — Plot looks up <code>x</code>,<code>y</code>{' '}
                from parent&apos;s <code>data</code> object.
              </p>
              <pre
                style={{
                  background: '#f5f5f5',
                  borderRadius: '4px',
                  fontSize: '0.8em',
                  padding: '8px',
                  margin: '8px 0',
                }}
              >
                {`data={{ 'point-h': { x: 280, y: 60, value: 2100 } }}

<Plot dataKey="point-h" />  // renders at (280, 60)`}
              </pre>
              <p>
                <strong>Props:</strong> fill, stroke, size, type (CIRCLE|SQUARE|TRIANGLE)
              </p>
            </div>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],

  render: (args: CustomBackgroundChartPlotProps): React.JSX.Element => {
    return (
      <CustomBackgroundChart
        backgroundUrl={GRID_BACKGROUND_URL}
        data={GRID_DATA}
        height="400px"
        viewBox={{ height: 400, width: 500 }}
        width="100%"
      >
        {/* Plot protagonist - receives args from controls */}
        <CustomBackgroundChart.Plot {...args} />

        {/* Static reference plots for context */}
        <CustomBackgroundChart.Plot
          dataKey="point-a"
          fill="#cccccc"
          size={16}
          stroke="#999999"
          strokeWidth={1}
          type="CIRCLE"
        />
        <CustomBackgroundChart.Plot
          dataKey="point-c"
          fill="#cccccc"
          size={16}
          stroke="#999999"
          strokeWidth={1}
          type="SQUARE"
        />
        <CustomBackgroundChart.Plot
          dataKey="point-e"
          fill="#cccccc"
          size={16}
          stroke="#999999"
          strokeWidth={1}
          type="TRIANGLE"
        />
      </CustomBackgroundChart>
    );
  },
};
