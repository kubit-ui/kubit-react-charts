import type { Meta, StoryObj } from '@storybook/react';

import { Note } from '@/storybook/components/note/note';

import { PieChart as StoryPieChart } from '../pieChart';
import { argtypes } from './argtypes';
import { BASIC_TEMPLATE } from './templates/basic';
import { DATA, SINGLE_DATA } from './templates/data';
import { HALF_CHART_TEMPLATE } from './templates/halfChart';
import { MULTIPLE_TEMPLATE } from './templates/multiple';
import { SINGLE_TEMPLATE } from './templates/onlyOneValue';
import './templates/styles.css';
import { PieChartWithErrorHandlingWithHooks } from './templates/withErrorHandling';

const meta = {
  argTypes: argtypes(),
  component: StoryPieChart,
  tags: ['autodocs'],
  title: 'Charts/PieChart/PieChart Examples',
} satisfies Meta<typeof StoryPieChart>;

export default meta;

type Story = StoryObj<typeof meta> & { args: { themeArgs?: object } } & {
  args: { source?: string };
};

const args = {
  canvasConfig: { extraSpace: 0, height: 200, width: 200 },
  caption: 'Pie chart',
  height: '100%',
  width: '500px',
};

// Reusable decorator for customization examples
const withCustomizationNote = (Story: React.ComponentType): JSX.Element => {
  return (
    <>
      <Note
        collapsible={true}
        defaultCollapsed={true}
        heading="🎨 PieChart Customization Example"
        text={[
          <div key="customization-explanation">
            <p>
              This example demonstrates a basic <strong>PieChart</strong> with its child components
              defined.
            </p>
            <p>
              For detailed customization options and comprehensive examples of its child components,
              explore the individual component stories:
            </p>
            <ul>
              <li>
                <strong>PieChart.Path</strong> - Segment styling, radius, gaps, colors, and
                interactions
              </li>
              <li>
                <strong>PieChart.Foreign</strong> - Foreign object content for center icons, text,
                or custom HTML elements
              </li>
            </ul>
          </div>,
        ]}
        variant="information"
      />
      <Story />
    </>
  );
};

export const PieChartBasic: Story = {
  args: {
    ...args,
    children: BASIC_TEMPLATE,
    data: DATA,
  },
  decorators: [withCustomizationNote],
};

export const PieChartMultiple: Story = {
  args: {
    ...args,
    children: MULTIPLE_TEMPLATE,
    data: DATA,
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={true}
            heading="🎯 Multiple Concentric Pie Charts"
            text={[
              <div key="multiple-explanation">
                <p>
                  This example demonstrates <strong>multiple concentric pie charts</strong> using
                  several <code>PieChart.Path</code> components with coordinated radius properties.
                </p>
                <h4>🔧 Radius Coordination:</h4>
                <ul>
                  <li>
                    <strong>Outer ring</strong>:{' '}
                    <code>
                      innerRadius={80}, radius={100}
                    </code>
                  </li>
                  <li>
                    <strong>Middle ring</strong>:{' '}
                    <code>
                      innerRadius={60}, radius={70}
                    </code>
                  </li>
                  <li>
                    <strong>Inner ring</strong>:{' '}
                    <code>
                      innerRadius={40}, radius={50}
                    </code>
                  </li>
                </ul>
                <h4>⚠️ Key Requirements:</h4>
                <ul>
                  <li>
                    Each ring's <code>innerRadius</code> must be larger than the previous ring's{' '}
                    <code>radius</code>
                  </li>
                  <li>
                    Different <code>dataKey</code> values for each <code>PieChart.Path</code>
                  </li>
                  <li>
                    Adjust <code>gap</code> values for visual separation between segments
                  </li>
                </ul>
              </div>,
            ]}
            variant="warning"
          />
          <Story />
        </>
      );
    },
  ],
};

export const PieChartWithCustomAnimation: Story = {
  args: {
    ...args,
    children: BASIC_TEMPLATE,
    classNames: 'pie-chart-styles',
    data: DATA,
    segmentClassNames: 'custom-animation',
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={true}
            heading="🎨 Custom Animation Classes"
            text={[
              <div key="custom-animation-explanation">
                <p>
                  This example demonstrates how to create and apply{' '}
                  <strong>custom CSS animation classes</strong> for more personalized chart
                  interactions.
                </p>
                <h4>🎯 Custom Classes Used:</h4>
                <ul>
                  <li>
                    <strong>pie-chart-styles</strong> - Applied to the main chart container via{' '}
                    <code>classNames</code> prop
                  </li>
                  <li>
                    <strong>custom-animation</strong> - Applied to individual segments via{' '}
                    <code>segmentClassNames</code> prop
                  </li>
                </ul>
                <h4>💻 Implementation:</h4>
                <p>
                  The custom styles are defined in the <code>styles.css</code> file and include
                  custom hover effects.
                </p>
                <h4>🔧 How to Create Custom Animations:</h4>
                <ol>
                  <li>Define your CSS classes with desired animations</li>
                  <li>
                    Use <code>classNames</code> for chart-level styling
                  </li>
                  <li>
                    Use <code>segmentClassNames</code> for segment-specific styling
                  </li>
                </ol>
                <h4>🎮 Try it:</h4>
                <p>Hover over the segments to see the custom animation in action!</p>
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

export const OnlySingleDataValue: Story = {
  args: {
    ...args,
    children: SINGLE_TEMPLATE,
    data: SINGLE_DATA,
  },
};

export const HalfChart: Story = {
  args: {
    ...args,
    canvasConfig: { extraSpace: 0, height: 100, width: 200 },
    children: HALF_CHART_TEMPLATE,
    data: DATA,
    halfChart: true,
    radius: '0%',
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={true}
            heading="📊 Half Chart (Semi-Circle) Configuration"
            text={[
              <div key="half-chart-explanation">
                <p>
                  This example demonstrates how to create a{' '}
                  <strong>half chart (semi-circle)</strong> using the PieChart component. This is
                  useful for gauge-like visualizations or when you need to save vertical space.
                </p>
                <h4>🎯 Key Configuration:</h4>
                <ul>
                  <li>
                    <strong>halfChart: true</strong> - Enables semi-circle mode
                  </li>
                  <li>
                    <strong>canvasConfig height</strong> - Reduced to 100px to fit the half chart
                  </li>
                  <li>
                    <strong>canvasConfig width</strong> - Set to 200px for proper proportions
                  </li>
                  <li>
                    <strong>radius: "0%"</strong> - Optional radius override for specific sizing
                  </li>
                </ul>
                <h4>💻 Implementation:</h4>
                <pre
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    fontSize: '0.85em',
                    padding: '12px',
                  }}
                >
                  {`<PieChart
  halfChart={true}
  canvasConfig={{ extraSpace: 0, height: 100, width: 200 }}
  data={data}
>
  <PieChart.Path dataKey="groups" />
</PieChart>`}
                </pre>
                <h4>🎮 Use Cases:</h4>
                <ul>
                  <li>Dashboard gauges and meters</li>
                  <li>Progress indicators</li>
                  <li>Space-efficient data visualization</li>
                  <li>Semi-circular progress bars</li>
                </ul>
              </div>,
            ]}
            variant="success"
          />
          <Story />
        </>
      );
    },
  ],
};

export const PieChartWithErrorHandling: Story = {
  args: {
    data: {},
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={true}
            heading="Error Handling in PieChart"
            text={[
              <div key="error-handling-explanation">
                <p>
                  The <strong>PieChart</strong> includes a comprehensive error accumulator that
                  detects and reports validation issues across all its subcomponents in real-time.
                </p>
                <h4>🎯 Key Features:</h4>
                <ul>
                  <li>
                    <strong>Component Validation:</strong> Each fragment (Path, Segment) validates
                    its configuration and data
                  </li>
                  <li>
                    <strong>Error Accumulation:</strong> Multiple errors are collected and reported
                    together via the <code>onErrors</code> callback
                  </li>
                  <li>
                    <strong>Developer Control:</strong> You decide how to handle errors - display
                    them, log them, or provide fallback UI
                  </li>
                </ul>
                <h4>⚠️ Interactive Example:</h4>
                <p>
                  This example demonstrates multiple error types simultaneously: invalid data keys,
                  missing names, negative values, and zero total values. The error panel shows
                  real-time detection and categorization.
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
  render: () => <PieChartWithErrorHandlingWithHooks />,
};
