import type { Meta, StoryObj } from '@storybook/react';

import { BarOrientation } from '@/components/bar/bar.type';
import { Note } from '@/storybook/components/note/note';
import { DefaultCanvasConfig } from '@/types/canvas.type';

import { BarChart as BarChartStory } from '../barChart';
import { argtypes } from './parent/argtypes';
import { AXIS_HORIZONTAL_MIXED_BARS } from './templates/axisHorizontalMixedBars';
import { AXIS_VERTICAL_MIXED_BARS } from './templates/axisVerticalMixedBars';
import { AXIS_WITH_HORIZONTAL_BARS } from './templates/axisWithHorizontalBars';
import { AXIS_WITH_VERTICAL_BARS } from './templates/axisWithVericalBars';
import { COMPARATIVE_DATA, MIXED_DATA } from './templates/data';
import { BarChartWithErrorHandlingWithHooks } from './templates/withErrorHandling';

const meta = {
  argTypes: argtypes(),
  component: BarChartStory,
  tags: ['autodocs'],
  title: 'Charts/BarChart/BarChart Examples',
} satisfies Meta<typeof BarChartStory>;

export default meta;

type Story = StoryObj<typeof meta> & { args: { themeArgs?: object } } & {
  args: { source?: string };
};

const complexArgs = {
  canvasConfig: DefaultCanvasConfig,
  caption: 'Bar chart',
  gapBetweenBars: 1,
  height: '100%',
  pKey: 'year',
  width: '70%',
};

// Reusable decorator for customization examples
const withCustomizationNote = (Story: React.ComponentType): JSX.Element => {
  return (
    <>
      <Note
        collapsible={true}
        defaultCollapsed={true}
        heading="🎨 BarChart Customization Example"
        text={[
          <div key="customization-explanation">
            <p>
              This example demonstrates various customization options available for{' '}
              <strong>BarChart</strong> child components including bars, axes, orientations, and
              visual styling.
            </p>
            <p>
              For detailed customization options and comprehensive examples, explore the individual
              component stories:
            </p>
            <ul>
              <li>
                <strong>BarChart.Path</strong> - Bar styling, stacking, colors, and interactions
              </li>
              <li>
                <strong>BarChart.XAxis</strong> - Horizontal axis configuration and styling
              </li>
              <li>
                <strong>BarChart.YAxis</strong> - Vertical axis configuration and styling
              </li>
              <li>
                <strong>BarChart.Separator</strong> - Visual separators and backgrounds
              </li>
            </ul>
            <p>
              <strong>⚠️ Important:</strong> Always declare <code>BarChart.Path</code> components{' '}
              <em>before</em> axis components for proper <code>gapBetweenBars</code> functionality.
            </p>
          </div>,
        ]}
        variant="information"
      />
      <Story />
    </>
  );
};

export const AxisWithVerticalBars: Story = {
  args: {
    ...complexArgs,
    children: AXIS_WITH_VERTICAL_BARS,
    data: COMPARATIVE_DATA,
    orientation: BarOrientation.VERTICAL,
  },
  decorators: [withCustomizationNote],
};

export const AxisWithHorizontalBars: Story = {
  args: {
    ...complexArgs,
    children: AXIS_WITH_HORIZONTAL_BARS,
    data: COMPARATIVE_DATA,
    orientation: BarOrientation.HORIZONTAL,
  },
  decorators: [withCustomizationNote],
};

export const AxisHorizontalMixedBars: Story = {
  args: {
    ...complexArgs,
    children: AXIS_HORIZONTAL_MIXED_BARS,
    data: MIXED_DATA,
    orientation: BarOrientation.HORIZONTAL,
  },
  decorators: [withCustomizationNote],
};

export const AxisVertcialMixedBars: Story = {
  args: {
    ...complexArgs,
    children: AXIS_VERTICAL_MIXED_BARS,
    data: MIXED_DATA,
    orientation: BarOrientation.VERTICAL,
  },
  decorators: [withCustomizationNote],
};

export const BarChartWithErrorHandling: Story = {
  args: {
    ...complexArgs,
    children: <></>,
    data: [],
    orientation: BarOrientation.VERTICAL,
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={true}
            heading="Error Handling in BarChart"
            text={[
              <div key="error-handling-explanation">
                <p>
                  The <strong>BarChart</strong> includes a comprehensive error accumulator that
                  detects and reports validation issues across all its subcomponents in real-time.
                </p>
                <h4>🎯 Key Features:</h4>
                <ul>
                  <li>
                    <strong>Component Validation:</strong> Each fragment (Path, Axes, Separator)
                    validates its configuration and data
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
                  This example demonstrates multiple error types simultaneously: insufficient data,
                  invalid configurations, and coordinate validation failures. The error panel shows
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
  parameters: {
    docs: {
      source: {
        code: 'See withErrorHandling.tsx template for complete implementation',
      },
    },
  },
  render: () => <BarChartWithErrorHandlingWithHooks />,
};
