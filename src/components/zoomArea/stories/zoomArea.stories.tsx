import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Note } from '@/storybook/components/note/note';

import { ZoomArea } from '../zoomArea';
import type { IZoomAreaDataPoint, ZoomAreaProps } from '../zoomArea.type';
import { argtypes } from './argtypes';
import { COMPLEX_DATA, SAMPLE_DATA } from './data';

const meta = {
  argTypes: argtypes(),
  component: ZoomArea,
  tags: ['autodocs'],
  title: 'Components/ZoomArea',
} satisfies Meta<typeof ZoomArea>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs: ZoomAreaProps = {
  ariaLabel: 'Zoom area chart',
  caption: 'Interactive zoom area for data selection',
  data: SAMPLE_DATA,
  focusConfig: {
    gap: undefined,
    innerColor: undefined,
    innerStrokeWidth: undefined,
    outlineColor: undefined,
    outlineStrokeWidth: undefined,
  },
  // Configurations with all available fields for better documentation in Storybook
  handlerConfig: {
    fill: undefined,
    // Icon customization
    iconColor: undefined,
    radius: undefined,
    // Circle customization
    stroke: undefined,
    strokeWidth: undefined,
    // Vertical line customization
    verticalLineStroke: undefined,
    verticalLineStrokeWidth: undefined,
  },
  height: '60',
  initialRange: { end: 8, start: 2 },
  interactionConfig: {
    keyboardFastStep: undefined,
    keyboardStep: undefined,
    minHandlerDistance: undefined,
  },
  lines: [
    {
      curved: false,
      dataKey: 'main-line',
      fill: '#0078D4',
      fillOpacity: 0.2,
      stroke: '#0078D4',
      strokeWidth: 1,
      yKey: 'value',
    },
  ],
  screenReaderTextConfig: {
    endHandler: 'Custom screenreader {{endValue}}',
    selectionArea: 'Custom screenreader from {{startValue}} to {{endValue}}',
    startHandler: 'Custom screenreader {{startValue}}',
  },
  selectionConfig: {
    fill: undefined,
    fillOpacity: undefined,
    hideOverlayOnFullRange: undefined,
  },
  width: '60%',
  xKey: 'year',
};

export const Basic: Story = {
  args: {
    ...defaultArgs,
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="🎯 Summary of features"
            text={[
              <ul key="base-functionality-list">
                <li key="base-functionality">
                  <strong>ZoomArea</strong> provides interactive range selection with keyboard and
                  mouse support. Drag handlers to adjust the range, or use arrow keys when focusing
                  handlers or selection area rectangle for precise control.
                </li>
                <li key="data-callback">
                  The component{' '}
                  <strong>
                    automatically returns filtered data on its <code>onDataChange</code> callback
                  </strong>{' '}
                  when range changes and provides accessibility features.
                </li>
                <li key="responsive-behaviour">
                  Define responsive dimensions by setting percentage values for <code>width</code>{' '}
                  and <code>height</code> props, no need to use <code>canvasConfig</code>
                </li>
                <li key="screenreader-custom">
                  Define <strong>custom screenreader text</strong> by setting the{' '}
                  <code>screenReaderTextConfig</code> prop with <code>startHandler</code>,{' '}
                  <code>endHandler</code>, and <code>selectionArea</code> keys.
                </li>
              </ul>,
            ]}
            variant="information"
          />
          <Story />
        </>
      );
    },
  ],
};

export const Advanced: Story = {
  args: {
    ...defaultArgs,
    caption: 'Advanced ZoomArea with multiple data series and mixed line styles',
    data: COMPLEX_DATA,
    initialRange: { end: 9, start: 1 },
    lines: [
      {
        curved: true,
        dataKey: 'sales-line',
        fill: '#0078D4',
        fillOpacity: 0.15,
        stroke: '#0078D4',
        strokeWidth: 2,
        yKey: 'sales',
      },
      {
        dataKey: 'profit-line',
        fill: '#E74C3C',
        fillOpacity: 0.1,
        stroke: '#E74C3C',
        strokeWidth: 2,
        yKey: 'profit',
      },
      {
        dataKey: 'expenses-line',
        fill: '#F1C40F',
        fillOpacity: 0.08,
        stroke: '#F1C40F',
        strokeWidth: 2,
        yKey: 'expenses',
      },
    ],
    xKey: 'month',
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="📊 Multiple Series"
            text={[
              <div key="multiple-series-content">
                <p>
                  This example shows <strong>multiple data series</strong> with mixed line styles.
                  Notice the <strong>curved vs straight lines</strong> and different opacities for
                  visual hierarchy.
                </p>
                <ul>
                  <li>
                    <strong>Sales Line:</strong> Uses curved interpolation for smooth appearance
                  </li>
                  <li>
                    <strong>Profit Line:</strong> Uses straight lines for direct comparison
                  </li>
                  <li>
                    <strong>Expenses Line:</strong> Lower opacity to show supporting data
                  </li>
                </ul>
                <p>
                  <em>💡 Tip:</em> Expand this note to see all the technical details about the
                  implementation. Click the arrow to collapse it again.
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

// Interactive story with state management
const InteractiveZoomArea = () => {
  const [currentData, setCurrentData] = useState<IZoomAreaDataPoint[]>(SAMPLE_DATA);

  const handleDataChange = (filteredData: IZoomAreaDataPoint[]) => {
    setCurrentData(filteredData);
  };

  // Calculate display info from filtered data
  const startYear = currentData[0]?.year;
  const endYear = currentData[currentData.length - 1]?.year;
  const selectedValues = currentData.map(d => d.value);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Interactive Zoom Area</h3>
      <p>
        Filtered range: {startYear} to {endYear}
      </p>
      <p>Selected data points: {currentData.map(d => d.year).join(', ')}</p>
      <p>Selected values: {selectedValues.join(', ')}</p>

      <ZoomArea
        ariaLabel="Interactive zoom area chart"
        caption="Use keyboard or mouse to adjust zoom range"
        data={SAMPLE_DATA}
        height={60}
        initialRange={{ end: 8, start: 2 }}
        lines={[
          {
            dataKey: 'main-line',
            fill: '#0078D4',
            fillOpacity: 0.2,
            stroke: '#0078D4',
            strokeWidth: 1,
            yKey: 'value',
          },
        ]}
        width="70%"
        xKey="year"
        onDataChange={handleDataChange}
      />
    </div>
  );
};

export const Interactive: Story = {
  args: defaultArgs,
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="🎉 Interactive Callback"
            text={[
              <ul key="interactive-callback-list">
                <li key="interactive-callback-filter">
                  This example demonstrates <code>onDataChange</code> callback that shows filtered
                  data based on the range selected. Watch the values update as you adjust the range
                  selection.
                </li>
                <li key="interactive-callback-line-chart">
                  Pass filtered data directly to the chart components <code>data</code> prop. You
                  can see an integration with charts in{' '}
                  <strong>LineChart With ZoomArea story</strong>
                </li>
              </ul>,
            ]}
            variant="success"
          />
          <Story />
        </>
      );
    },
  ],
  parameters: {
    docs: {
      source: {
        code: `// Interactive story with state management
const InteractiveZoomArea = () => {
  const [currentData, setCurrentData] = useState<IZoomAreaDataPoint[]>(SAMPLE_DATA);

  const handleDataChange = (filteredData: IZoomAreaDataPoint[]) => {
    setCurrentData(filteredData);
  };

  // Calculate display info from filtered data
  const startYear = currentData[0]?.year;
  const endYear = currentData[currentData.length - 1]?.year;
  const selectedValues = currentData.map(d => d.value);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Interactive Zoom Area</h3>
      <p>
        Filtered range: {startYear} to {endYear}
      </p>
      <p>Selected data points: {currentData.map(d => d.year).join(', ')}</p>
      <p>Selected values: {selectedValues.join(', ')}</p>

      <ZoomArea
        ariaLabel="Interactive zoom area chart"
        caption="Use keyboard or mouse to adjust zoom range"
        data={SAMPLE_DATA}
        height={60}
        initialRange={{ start: 2, end: 8 }}
        lines={[
          {
            yKey: 'value',
            stroke: '#0078D4',
            strokeWidth: 1,
            fill: '#0078D4',
            fillOpacity: 0.2,
            dataKey: 'main-line',
          },
        ]}
        width="70%"
        xKey="year"
        onDataChange={handleDataChange}
      />
    </div>
  );
};`,
      },
    },
  },
  render: () => <InteractiveZoomArea />,
};

export const Customization: Story = {
  args: {
    ...defaultArgs,
    backgroundColor: '#F8F9FA', // Light background to showcase the chart
    caption: 'Fully customized ZoomArea with purple theme',
    // Custom focus ring styling for all focusable elements
    focusConfig: {
      gap: 5,
      innerColor: '#FFFFFF',
      innerStrokeWidth: 2,
      outlineColor: '#9B59B6',
      outlineStrokeWidth: 3,
    },
    // Custom handler appearance
    handlerConfig: {
      fill: '#333333',
      // Icon customization
      iconColor: '#949494',
      radius: 22,
      // Circle customization
      stroke: '#F5F5F5',
      strokeWidth: 1,
      // Vertical line customization
      verticalLineStroke: '#F5F5F5',
      verticalLineStrokeWidth: 4,
    },
    lines: [
      {
        dataKey: 'purple-line',
        fill: '#9B59B6',
        fillOpacity: 0.25,
        stroke: '#9B59B6', // Custom purple color
        strokeWidth: 3,
        yKey: 'value',
      },
    ],
    // Custom selection area styling
    selectionConfig: {
      fill: '#9B59B6',
      fillOpacity: 0.2,
    },
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="🎨 Customization Features"
            text={[
              <span key="customization-features">
                This example demonstrates <strong>complete visual customization</strong> including{' '}
                <code>selectionConfig</code>, <code>focusConfig</code>, and{' '}
                <code>handlerConfig</code> properties.
              </span>,
            ]}
            variant="success"
          />
          <Story />
        </>
      );
    },
  ],
};

export const CustomInteraction: Story = {
  args: {
    ...defaultArgs,
    interactionConfig: {
      keyboardFastStep: 4, // Fast keyboard navigation with Shift key (4 data points)
      keyboardStep: 2, // Precise keyboard navigation step (2 data points)
      // Custom interaction behavior for enhanced usability
      minHandlerDistance: 2, // Minimum distance between handlers (2 data points)
    },
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="⌨️ Keyboard Navigation"
            text={[
              <span key="keyboard-navigation">
                Use <code>interactionConfig</code> to customize keyboard navigation steps and
                minimum handler distance. Try <strong>Arrow keys</strong> and{' '}
                <strong>Shift + Arrow keys</strong> for different movement speeds.
              </span>,
            ]}
            variant="information"
          />
          <Note
            text={[
              <span key="handler-distance">
                The <code>minHandlerDistance</code> prevents handlers from overlapping, ensuring
                data integrity in the selection.
              </span>,
            ]}
            variant="success"
          />
          <Story />
        </>
      );
    },
  ],
};

export const OverlayBehavior: Story = {
  args: {
    ...defaultArgs,
    caption: 'ZoomArea demonstrating conditional overlay visibility',
    initialRange: { end: defaultArgs.data.length - 1, start: 0 }, // Full range initially
    lines: [
      {
        dataKey: 'main-line',
        fill: '#0078D4',
        fillOpacity: 0.3,
        stroke: '#0078D4',
        strokeWidth: 2,
        yKey: 'value',
      },
    ],
    selectionConfig: {
      fill: '#FF6B6B',
      fillOpacity: 0.4,
      hideOverlayOnFullRange: true, // Default behavior
    },
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="👁️ Overlay Visibility"
            text={[
              <span key="overlay-visibility">
                Notice the overlay starts <strong>hidden</strong> (full range) and appears when you
                adjust handlers.
              </span>,
            ]}
            variant="information"
          />
          <Note
            text={[
              <span key="overlay-config">
                Set <code>hideOverlayOnFullRange: false</code> in <code>selectionConfig</code> to
                always show the overlay, even at full range.
              </span>,
            ]}
            variant="warning"
          />
          <Story />
        </>
      );
    },
  ],
};
