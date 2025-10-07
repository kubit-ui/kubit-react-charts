import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment } from 'react/jsx-runtime';

import { XAxis } from '@/components/axisChart/xAxis/xAxis';
import { YAxis } from '@/components/axisChart/yAxis/yAxis';
import { type PlotProps, PlotSize, PlotType } from '@/components/plot/plot.types';
import { Note } from '@/storybook/components/note/note';
import { Positions } from '@/types/position.enum';

import { Plot as PlotStory } from '../plot';
import { argtypes } from './argtypes';

// Explicitly typing as Plot<number> to maintain consistency
const meta = {
  argTypes: argtypes(),
  component: PlotStory,
  render: ({ ...args }) => {
    return (
      <svg height="150" width="150">
        <PlotStory {...args} />
      </svg>
    );
  },
  tags: ['autodocs'],
  title: 'Components/Plot',
} satisfies Meta<typeof PlotStory>;

export default meta;

// We modify the Story definition to include the specific generic type
type Story = StoryObj<typeof meta> & {
  args: {
    themeArgs?: object;
    source?: string;
  };
};

// The component implements generic type for data value, using PlotProps<unknown> for stories
// as how storybook works with generics made it too tricky to use PlotProps<number> for example
// and we don't need to be that strict in the stories
const args: PlotProps<unknown> = {
  data: {
    category: 'Example',
    value: 42, // This will be a number by our generic <number>
  },
  fill: '#0074d9',
  // Complete focusConfig with all available fields for better Storybook controls
  focusConfig: {
    gap: undefined,
    innerColor: undefined,
    innerStrokeWidth: undefined,
    outlineColor: undefined,
    outlineStrokeWidth: undefined,
  },
  hasHoverEffect: true,
  // Complete hoverConfig with all available fields for better Storybook controls
  hoverConfig: {
    fill: undefined,
    opacity: undefined,
    scale: undefined,
    stroke: undefined,
    strokeWidth: undefined,
  },
  label: 'Data point',
  onClick: () => {
    alert('Plot clicked');
  },
  position: { x: 75, y: 75 },
  size: PlotSize.EXTRA_LARGE,
  stroke: '#FFFFFF',
  strokeWidth: 2,
  tabIndex: 0,
  type: PlotType.CIRCLE,
};

export const Plot: Story = {
  args: {
    ...args,
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="📍 Plot Component Overview"
            text={[
              <div key="plot-overview">
                <p>
                  The <strong>Plot</strong> component is a building block of the charts library that
                  renders interactive data points in SVG visualizations.
                </p>
                <ul>
                  <li>
                    <strong>Multiple shapes:</strong> Support for circles, squares, and triangles
                  </li>
                  <li>
                    <strong>Full interactivity:</strong> Hover effects with scale, color, and
                    opacity customization
                  </li>
                  <li>
                    <strong>Focus management:</strong> Complete focus ring configuration with
                    outline and inner stroke controls
                  </li>
                  <li>
                    <strong>Accessibility:</strong> WCAG compliant with screen reader support and
                    keyboard navigation
                  </li>
                  <li>
                    <strong>Generic typing:</strong> Type-safe data association with TypeScript
                  </li>
                  <li>
                    <strong>Flexible sizing:</strong> Predefined sizes or custom pixel values
                  </li>
                </ul>
                <p>
                  <em>💡 Context:</em> Plot acts as a building block for creating complex charts
                  like scatter plots, bubble charts, and other visualizations. Use{' '}
                  <code>hoverConfig</code> and <code>focusConfig</code> in the controls below to
                  customize interaction states.
                </p>
              </div>,
            ]}
            variant="information"
          />
          <Story />
        </>
      );
    },
  ],
};

export const ScatterChart: Story = {
  args: {
    ...args,
    source: 'Scatter Chart with Different Plot Types',
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="📊 Scatter Chart Example"
            text={[
              <div key="scatter-chart-example">
                <p>
                  This example demonstrates how <strong>Plot components</strong> can be combined to
                  create a complete scatter chart visualization.
                </p>
                <ul>
                  <li>
                    <strong>Multiple shapes:</strong> Circles, squares, and triangles representing
                    different data categories
                  </li>
                  <li>
                    <strong>Interactive axes:</strong> Combined with XAxis and YAxis components for
                    complete chart structure
                  </li>
                  <li>
                    <strong>Varied styling:</strong> Different sizes, colors, and stroke
                    configurations for visual distinction
                  </li>
                  <li>
                    <strong>Accessibility:</strong> Each plot point is keyboard navigable with
                    proper tab indexing
                  </li>
                </ul>
                <p>
                  <em>💡 Usage:</em> Plot components act as individual data points that can be
                  dynamically positioned and styled based on your data values.
                </p>
              </div>,
            ]}
            variant="success"
          />
          <Story />
        </>
      );
    },
  ],
  render: () => {
    // Create tick values for the axes
    const xTickValues = [
      { position: 50, value: '0' },
      { position: 100, value: '10' },
      { position: 150, value: '20' },
      { position: 200, value: '30' },
      { position: 250, value: '40' },
      { position: 300, value: '50' },
    ];

    const yTickValues = [
      { position: 50, value: '50' },
      { position: 100, value: '40' },
      { position: 150, value: '30' },
      { position: 200, value: '20' },
      { position: 250, value: '10' },
    ];

    return (
      <svg height="350" width="400">
        <g transform="translate(50, 20)">
          {/* Y-Axis */}
          <YAxis
            position={Positions.LEFT}
            showTickLines={true}
            stroke="#000"
            strokeWidth={2}
            tickLine={{
              stroke: '#000',
              strokeWidth: 1,
              x1: 0,
              x2: -5,
            }}
            tickLineHover={{
              stroke: '#000',
              strokeWidth: 2,
            }}
            tickText={{
              fill: '#000',
              fontSize: 12,
              textAnchor: 'end',
              x: -10,
            }}
            tickValues={yTickValues}
            x1={0}
            x2={0}
            y1={0}
            y2={250}
          />

          {/* X-Axis */}
          <XAxis
            position={Positions.BOTTOM}
            showTickLines={true}
            stroke="#000"
            strokeWidth={2}
            tickLine={{
              stroke: '#000',
              strokeWidth: 1,
              y1: 250,
              y2: 255,
            }}
            tickLineHover={{
              stroke: '#ff4136',
              strokeWidth: 2,
            }}
            tickText={{
              fill: '#000',
              fontSize: 12,
              textAnchor: 'middle',
              y: 270,
            }}
            tickValues={xTickValues}
            x1={0}
            x2={300}
            y1={250}
            y2={250}
          />

          {/* Plot Points with different shapes and colors */}
          <PlotStory
            data={{ value: 80 }}
            fill="#0074d9"
            hasHoverEffect={true}
            position={{ x: 80, y: 100 }}
            size={PlotSize.EXTRA_SMALL}
            tabIndex={0}
            type={PlotType.CIRCLE}
          />
          <PlotStory
            data={{ value: 120 }}
            fill="#ff4136"
            hasHoverEffect={true}
            position={{ x: 120, y: 180 }}
            size={PlotSize.SMALL}
            stroke="#007900"
            strokeWidth={1}
            tabIndex={0}
            type={PlotType.SQUARE}
          />
          <PlotStory
            data={{ value: 160 }}
            fill="#2ecc40"
            hasHoverEffect={true}
            position={{ x: 160, y: 80 }}
            size={PlotSize.EXTRA_SMALL}
            tabIndex={0}
            type={PlotType.TRIANGLE}
          />
          <PlotStory
            data={{ value: 200 }}
            fill="#b10dc9"
            hasHoverEffect={true}
            position={{ x: 200, y: 130 }}
            size={PlotSize.SMALL}
            stroke="#FFFFFF"
            strokeWidth={1}
            tabIndex={0}
            type={PlotType.CIRCLE}
          />
          <PlotStory
            data={{ value: 240 }}
            fill="#ffdc00"
            hasHoverEffect={true}
            position={{ x: 240, y: 60 }}
            size={PlotSize.MEDIUM}
            stroke="#b10dc9"
            strokeWidth={1}
            tabIndex={0}
            type={PlotType.SQUARE}
          />
          <PlotStory
            data={{ value: 280 }}
            fill="#001f3f"
            hasHoverEffect={true}
            position={{ x: 280, y: 200 }}
            size={PlotSize.MEDIUM}
            stroke="#FFFFFF"
            strokeWidth={1}
            tabIndex={0}
            type={PlotType.TRIANGLE}
          />
        </g>
      </svg>
    );
  },
};

export const MultipleAxesChart: Story = {
  args: {
    ...args,
    source: 'Chart with Multiple Axes and Different Plot Types',
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="📈 Complex Chart Integration"
            text={[
              <div key="multiple-axes-example">
                <p>
                  This advanced example shows how <strong>Plot components</strong> integrate
                  seamlessly in complex chart scenarios with multiple datasets and axes.
                </p>
                <ul>
                  <li>
                    <strong>Dual datasets:</strong> Two separate data series rendered with different
                    Plot shapes (circles vs squares)
                  </li>
                  <li>
                    <strong>Multiple axes:</strong> Left and right Y-axes with different scales and
                    styling
                  </li>
                  <li>
                    <strong>Dynamic rendering:</strong> Plot points generated from data arrays with
                    map functions
                  </li>
                  <li>
                    <strong>Visual hierarchy:</strong> Color coordination between axes and
                    corresponding plot points
                  </li>
                </ul>
                <p>
                  <em>💡 Pattern:</em> This demonstrates the scalable approach where Plot components
                  can handle complex data visualization requirements through programmatic
                  generation.
                </p>
              </div>,
            ]}
            variant="information"
          />
          <Story />
        </>
      );
    },
  ],
  render: () => {
    // Data for the chart
    // First dataset - represents values against left y-axis (varying heights)
    const dataPointsA = [
      { value: 50, x: 50, y: 150 },
      { value: 100, x: 100, y: 80 },
      { value: 150, x: 150, y: 190 },
      { value: 200, x: 200, y: 40 },
      { value: 250, x: 250, y: 120 },
      { value: 300, x: 300, y: 70 },
    ];

    // Second dataset - represents values against right y-axis (more scattered)
    const dataPointsB = [
      { value: 75, x: 75, y: 60 },
      { value: 125, x: 125, y: 180 },
      { value: 175, x: 175, y: 100 },
      { value: 225, x: 225, y: 220 },
      { value: 275, x: 275, y: 30 },
      { value: 325, x: 325, y: 140 },
    ];

    // Tick values for the axes
    const xTickValues = [
      { position: 50, value: 'Jan' },
      { position: 100, value: 'Feb' },
      { position: 150, value: 'Mar' },
      { position: 200, value: 'Apr' },
      { position: 250, value: 'May' },
      { position: 300, value: 'Jun' },
    ];

    const yTickValuesLeft = [
      { position: 50, value: '100' },
      { position: 100, value: '80' },
      { position: 150, value: '60' },
      { position: 200, value: '40' },
      { position: 250, value: '20' },
    ];

    const yTickValuesRight = [
      { position: 50, value: '500' },
      { position: 100, value: '400' },
      { position: 150, value: '300' },
      { position: 200, value: '200' },
      { position: 250, value: '100' },
    ];

    return (
      <svg height="350" style={{ border: '1px solid #ccc' }} width="450">
        <g transform="translate(50, 20)">
          {/* Left Y-Axis */}
          <YAxis
            position={Positions.LEFT}
            showTickLines={true}
            stroke="#0074d9"
            strokeWidth={2}
            tickLine={{
              stroke: '#0074d9',
              strokeWidth: 1,
              x1: 0,
              x2: -5,
            }}
            tickLineHover={{
              stroke: '#0074d9',
              strokeWidth: 2,
            }}
            tickText={{
              fill: '#0074d9',
              fontSize: 12,
              textAnchor: 'end',
              x: -10,
            }}
            tickValues={yTickValuesLeft}
            x1={0}
            x2={0}
            y1={0}
            y2={250}
          />

          {/* Right Y-Axis */}
          <g transform="translate(350, 0)">
            <YAxis
              position={Positions.RIGHT}
              showTickLines={true}
              stroke="#ff4136"
              strokeWidth={2}
              tickLine={{
                stroke: '#ff4136',
                strokeWidth: 1,
                x1: 0,
                x2: 5,
              }}
              tickText={{
                fill: '#ff4136',
                fontSize: 12,
                textAnchor: 'start',
                x: 10,
              }}
              tickValues={yTickValuesRight}
              x1={0}
              x2={0}
              y1={0}
              y2={250}
            />
          </g>

          {/* X-Axis */}
          <XAxis
            position={Positions.BOTTOM}
            showTickLines={true}
            stroke="#000"
            strokeWidth={2}
            tickLine={{
              stroke: '#000',
              strokeWidth: 1,
              y1: 250,
              y2: 255,
            }}
            tickText={{
              fill: '#000',
              fontSize: 12,
              textAnchor: 'middle',
              transform: 'rotate',
              y: 270,
            }}
            tickValues={xTickValues}
            x1={0}
            x2={350}
            y1={250}
            y2={250}
          />

          {/* Plot Points for first dataset (circles) */}
          {dataPointsA.map((point, index) => (
            <Fragment key={`point-a-${index.toString()}`}>
              <PlotStory
                data={{ value: point.value }}
                fill="#0074d9"
                hasHoverEffect={true}
                position={{ x: point.x, y: point.y }}
                size={PlotSize.EXTRA_SMALL}
                stroke="#FFFFFF"
                strokeWidth={1}
                tabIndex={0}
                type={PlotType.CIRCLE}
              />
            </Fragment>
          ))}

          {/* Plot Points for second dataset (squares) */}
          {dataPointsB.map((point, index) => (
            <Fragment key={`point-b-${index.toString()}`}>
              <PlotStory
                data={{ value: point.value }}
                fill="#ff4136"
                hasHoverEffect={true}
                position={{ x: point.x, y: point.y }}
                size={PlotSize.EXTRA_SMALL}
                stroke="#FFFFFF"
                strokeWidth={1}
                tabIndex={0}
                type={PlotType.SQUARE}
              />
            </Fragment>
          ))}
        </g>
      </svg>
    );
  },
};
