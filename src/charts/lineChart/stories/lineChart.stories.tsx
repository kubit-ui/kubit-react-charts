import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Line } from '@/components/line/line';
import { Node } from '@/components/node/node';
import { NodeType } from '@/components/node/node.types';
import { Note } from '@/storybook/components/note/note';

import { type LineChartCoordinates, LineChart as LineChartStory } from '../lineChart';
import { argtypes } from './parent/argtypes';
import { BASIC_NODES_TEMPLATE } from './templates/basicNodes';
import { COMPLEX_TEMPLATE } from './templates/complex';
import { DATA, FULL_CUSTOM_DATA, FULL_CUSTOM_DATA_NEGATIVE } from './templates/data';
import { divergentTemplate } from './templates/divergentTemplate';
import { FULL_CUSTOM_TEMPLATE } from './templates/fullCustom';
import { FULL_CUSTOM_TEMPLATE_NEGATIVE } from './templates/fullCustomNegative';
import { LineChartWithErrorHandlingWithHooks } from './templates/withErrorHandling';
import { WITH_INDICATORS } from './templates/withIndicators';
import { WITH_ZOOM_AREA_TEMPLATE, ZOOM_INTEGRATION_DATA } from './templates/withZoomArea';

const meta = {
  argTypes: argtypes(),
  component: LineChartStory,
  tags: ['autodocs'],
  title: 'Charts/LineChart/LineChart Examples',
} satisfies Meta<typeof LineChartStory>;

export default meta;

type Story = StoryObj<typeof meta> & { args: { themeArgs?: object } } & {
  args: { source?: string };
};

const args = {
  ariaHidden: false,
  ariaLabel: 'Line chart showing data trends over time',

  // === CANVAS CONFIGURATION ===
  canvasConfig: {
    extraSpace: 0,
    height: 80,
    width: 100,
  },

  caption: 'Line chart',
  classNames: undefined,
  // === FUNDAMENTAL DATA ===
  data: DATA,

  // === TESTING IDENTIFIERS ===
  dataTestId: 'line-chart',
  height: '100%',
  // === ACCESSIBILITY AND SEMANTICS ===
  role: 'img',
  tabIndex: 0,
  // === DIMENSIONS AND LAYOUT ===
  width: '70%',

  xKey: 'year',
};

// Reusable decorator for customization examples
const withCustomizationNote = (Story: React.ComponentType): JSX.Element => {
  return (
    <>
      <Note
        collapsible={true}
        defaultCollapsed={true}
        heading="🎨 LineChart Customization Example"
        text={[
          <div key="customization-explanation">
            <p>
              This example demonstrates various customization options available for{' '}
              <strong>LineChart</strong> child components including paths, axes, and visual styling.
            </p>
            <p>
              For detailed customization options and comprehensive examples, explore the individual
              component stories:
            </p>
            <ul>
              <li>
                <strong>LineChart.Path</strong> - Line styling, nodes, curves, and interactions
              </li>
              <li>
                <strong>LineChart.XAxis</strong> - Horizontal axis configuration and styling
              </li>
              <li>
                <strong>LineChart.YAxis</strong> - Vertical axis configuration and styling
              </li>
              <li>
                <strong>LineChart.Separator</strong> - Visual separators and backgrounds
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

export const LineChartAccessibility: Story = {
  args: {
    ...args,
    children: BASIC_NODES_TEMPLATE,
    data: DATA,
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={true}
            heading="Accessibility Features"
            text={[
              <div key="accessibility-explanation">
                <p>
                  This example demonstrates <strong>LineChart</strong> accessibility features with
                  customizable screen reader labels, custom attributes, and enhanced navigation for
                  paths, nodes, and axes.
                </p>
                <h4> 🎯 Key Features:</h4>
                <ul>
                  <li>
                    <strong>Path Labels:</strong> Custom aria-labels for focusable chart paths
                  </li>
                  <li>
                    <strong>Node Labels:</strong> Dynamic accessibility text for each data point
                    with template placeholders
                  </li>
                  <li>
                    <strong>Axis Labels:</strong> Custom aria-labels for X and Y axes
                  </li>
                  <li>
                    <strong>Custom Attributes:</strong> Both paths and nodes accept all{' '}
                    <code>aria-*</code> and <code>data-*</code> attributes for enhanced
                    accessibility and testing
                  </li>
                  <li>
                    <strong>Keyboard Navigation:</strong> Use Tab to focus on the path, then arrow
                    keys to navigate between nodes
                  </li>
                </ul>
                <h4> 📒 Template Placeholders for Node Labels:</h4>
                <ul>
                  <li>
                    <code>{'{{dataKey}}'}</code> - Data series key (e.g., &quot;cats&quot;)
                  </li>
                  <li>
                    <code>{'{{xValue}}'}</code> - X-axis value for the data point
                  </li>
                  <li>
                    <code>{'{{yValue}}'}</code> - Y-axis value for the data point
                  </li>
                  <li>
                    <code>{'{{index}}'}</code> - Index of the data point (1-based)
                  </li>
                </ul>
                <h4>🔧 Custom Attributes Support:</h4>
                <ul>
                  <li>
                    <strong>Path level:</strong> Pass any <code>aria-*</code> or <code>data-*</code>{' '}
                    attributes directly to <code>LineChart.Path</code>
                  </li>
                  <li>
                    <strong>Node level:</strong> Pass any <code>aria-*</code> or <code>data-*</code>{' '}
                    attributes within the <code>nodeConfig</code> object
                  </li>
                </ul>

                <h4>💻 Code Example:</h4>
                <pre
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    fontSize: '0.85em',
                    padding: '12px',
                  }}
                >
                  {`<LineChart.Path
  aria-label="Line chart showing evolution of cats"
  dataKey="cats"
  // Custom attributes for the path
  aria-describedby="chart-description"
  data-chart-type="line"
  data-test-id="cats-line-chart"
  nodeConfig={{
    'aria-label': 'Data point {{index}}: {{yValue}} cats in year {{xValue}}',
    // Custom attributes for nodes
    'aria-level': 1,
    'data-series': 'cats',
    'data-test-id': 'line-chart-node'
  }}
  tabIndex={0}
/>`}
                </pre>
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

export const LineChartComplex: Story = {
  args: {
    ...args,
    children: COMPLEX_TEMPLATE,
    data: DATA,
  },
  decorators: [withCustomizationNote],
};

export const LineChartFullCustom: Story = {
  args: {
    ...args,
    children: FULL_CUSTOM_TEMPLATE,
    data: FULL_CUSTOM_DATA,
    xKey: 'step',
  },
  decorators: [withCustomizationNote],
};

export const LineChartFullCustomNegative: Story = {
  args: {
    ...args,
    children: FULL_CUSTOM_TEMPLATE_NEGATIVE,
    data: FULL_CUSTOM_DATA_NEGATIVE,
    xKey: 'step',
  },
  decorators: [withCustomizationNote],
};

export const LineChartWithIndicator: Story = {
  args: {
    ...args,
    children: WITH_INDICATORS,
    data: FULL_CUSTOM_DATA,
    xKey: 'step',
  },
  decorators: [withCustomizationNote],
};

const LineChartWithNodeDivergentWithHooks = () => {
  const [coordinates, setCoordinates] = useState<{ x: number; y: number } | undefined>(undefined);
  const [viewCoord, setViewCoord] = useState<LineChartCoordinates | undefined>(undefined);

  const nodeProps = {
    fill: 'white',
    hasHalo: true,
    size: 1.3,
    stroke: 'red',
    strokeWidth: '0.2',
    type: NodeType.Circle,
  };

  const handleChange = (active: { x: number; y: number } | undefined) => {
    setCoordinates(active);
  };

  const handleViewCoord = (viewCoordinates: LineChartCoordinates) => {
    setViewCoord(viewCoordinates);
  };

  return (
    <LineChartStory
      {...args}
      data={DATA}
      getPathArea={handleViewCoord}
      onDoubleClick={() => handleChange(undefined)}
    >
      {...divergentTemplate({ cb: handleChange })},
      {coordinates && (
        <>
          {viewCoord && (
            <Line
              stroke="black"
              strokeDasharray="0.3"
              strokeWidth="0.1"
              x1={coordinates.x}
              x2={coordinates.x}
              y1={viewCoord.y1}
              y2={viewCoord.y2}
            />
          )}
          <Node {...nodeProps} position={coordinates} />
        </>
      )}
    </LineChartStory>
  );
};

export const LineChartWithNodeDivergent: Story = {
  args: {
    ...args,
    children: <></>,
    data: [],
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="Interactive Node Selection with Reference Lines"
            text={[
              <div key="divergent-explanation">
                <p>
                  This demonstration shows how to create{' '}
                  <strong>interactive reference lines</strong> that appear dynamically when clicking
                  on chart nodes.
                </p>
                <h4>🎯 Key Features:</h4>
                <ul>
                  <li>
                    <strong>Node Clicking:</strong> Click on any point of the line to display a
                    vertical dashed reference line
                  </li>
                  <li>
                    <strong>Highlighted Node:</strong> The clicked point is marked with a special
                    node (white circle with red border)
                  </li>
                  <li>
                    <strong>Reference Line:</strong> A vertical line connects the selected point to
                    both axes to facilitate reading values
                  </li>
                  <li>
                    <strong>Clear Selection:</strong> Double click anywhere on the chart to hide the
                    line and node
                  </li>
                </ul>
                <h4>🔧 Use Case:</h4>
                <p>
                  Useful for allowing users to <strong>examine exact values</strong> of specific
                  points with visual aid for reading coordinates on the X and Y axes.
                </p>
                <h4>💻 Try it:</h4>
                <ol>
                  <li>
                    <strong>Click</strong> on any point of the blue line
                  </li>
                  <li>Observe how the reference line and highlighted node appear</li>
                  <li>
                    <strong>Double click</strong> on the chart to clear the selection
                  </li>
                </ol>
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
        code: `
  const LineChatWithNodeDivergentWithHooks = () => {
    const [coordinates, setCoordinates] = useState<{ x: number; y: number } | undefined>(
        undefined
      );

      const nodeProps = {
        type: NodeType.Circle,
        fill: 'white',
        stroke: 'red',
        strokeWidth: '0.2',
        size: 1.3,
        hasHalo: true,
      };

      const handleChange = (active: { x: number; y: number } | undefined) => {
        setCoordinates(active);
      };
        const handleViewCoord = (coordinates: LineChartCoordinates) => {
        setViewCoord(coordinates);
      };
      return (
        <LineChartStory {...args} data={DATA} onDoubleClick={() => handleChange(undefined)}>
          <LineChart.Path
            key={'1'}
            closestClick
            dataKey="cats"
            nodeConfig={{
              type: NodeType.Circle,
              fill: 'white',
              stroke: 'red',
              strokeWidth: '0.2',
              size: 0,
              hasHalo: true,
              onClick: (e, data) => {
                handleChange(data?.nodePosition);
              },
            }}
            stroke="#0074d9"
            strokeWidth="0.1"
            tabIndex={0}
          />,
          <LineChart.XAxis
            key={'3'}
            showTickLines
            aria-label="XAxis"
            position={Positions.BOTTOM}
            stroke="black"
            strokeWidth="0.1"
            tickText={{
              fontSize: 1,
              textAnchor: 'middle',
              top: 1,
            }}
          />,
          <LineChart.YAxis
            key={'4'}
            showTickLines
            aria-label="Yaxis"
            position={Positions.LEFT}
            stroke="black"
            strokeWidth="0.1"
            tickText={{
              fontSize: 1,
              textAnchor: 'middle',
              right: 1,
            }}
          />,
          {coordinates && <Node {...nodeProps} position={coordinates} />}
        </LineChartStory>
      );
    }`,
      },
    },
  },
  render: () => <LineChartWithNodeDivergentWithHooks />,
};

export const LineChartWithErrorHandling: Story = {
  args: {
    ...args,
    children: <></>,
    data: [],
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="🚨 Error Handling in LineChart"
            text={[
              <div key="error-handling-explanation">
                <p>
                  The <strong>LineChart</strong> includes a robust error handling system that
                  automatically detects issues during data processing and rendering, enabling
                  resilient interfaces.
                </p>
                <h4>🎯 Key Features:</h4>
                <ul>
                  <li>
                    <strong>Automatic Detection:</strong> Validates data and coordinate calculations
                  </li>
                  <li>
                    <strong>Error Callback:</strong> Use <code>onErrors</code> prop to handle errors
                    gracefully
                  </li>
                  <li>
                    <strong>Graceful Fallback:</strong> Provides default values to maintain
                    component stability
                  </li>
                </ul>
                <h4>⚠️ This Example:</h4>
                <p>
                  Uses a single data point (<code>[{"{ year: '2023', cats: 20 }"}]</code>) which
                  triggers an <code>INVALID_X_TICK</code> error due to insufficient data for X-axis
                  coordinate calculations.
                </p>
                <h4>� Continuous Improvement:</h4>
                <p>
                  Our error detection system is continuously evolving to catch more edge cases. We
                  welcome reports of unhandled errors that result in exceptions or broken component
                  displays, as they help us improve the robustness of the chart library.
                </p>
              </div>,
            ]}
            variant="warning"
          />
          <Story />
        </>
      );
    },
  ],
  parameters: {
    docs: {
      source: {
        code: `
        const [errorInfo, setErrorInfo] = useState<{
      hasErrors: boolean;
      errors: ChartErrorCollection;
    }>({
      hasErrors: false,
      errors: {},
    });

    // Problematic data, just one entry to trigger an error
    const PROBLEMATIC_DATA = [{ year: '2023', cats: 20 }];

    const handleChartError = useCallback((errors: ChartErrorCollection) => {
      setErrorInfo({
        hasErrors: true,
        errors,
      });
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '600px' }}>
        {/* Content based on error state */}
        {errorInfo.hasErrors ? '⚠️ Detected Error' : '✅ No errors detected'}

        {/* Chart */}
        <LineChart data={PROBLEMATIC_DATA} xKey="year" onErrors={handleChartError}>
          <LineChart.Path dataKey="cats" stroke="#0078D4" strokeWidth="0.3" tabIndex={0} />
          <LineChart.XAxis
            ariaLabel="XAxis"
            position={Positions.BOTTOM}
            showTickLines={false}
            stroke="black"
            strokeWidth="0.1"
          />
          <LineChart.YAxis
            ariaLabel="YAxis"
            position={Positions.LEFT}
            showTickLines={false}
            stroke="black"
            strokeWidth="0.1"
          />
        </LineChart>
      </div>
    );`,
      },
    },
  },
  render: () => <LineChartWithErrorHandlingWithHooks />,
};

export const LineChartWithZoomArea: Story = {
  args: {
    ...args,
    children: WITH_ZOOM_AREA_TEMPLATE,
    data: ZOOM_INTEGRATION_DATA,
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="LineChart + ZoomArea Integration"
            text={[
              <span key="integration-explanation">
                This example demonstrates seamless integration between <code>LineChart</code> and{' '}
                <code>ZoomArea</code>. The <code>ZoomArea</code> automatically filters the data and
                passes it to the <code>LineChart</code> through the <code>onDataChange</code>{' '}
                callback. Drag the handlers in the zoom area below to see real-time updates in the
                main chart.
              </span>,
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
        code: `export const LineChartWithZoomAreaTemplate: FC = () => {
          // State for filtered data - initially all data
          const [filteredData, setFilteredData] = useState<IZoomAreaDataPoint[]>(ZOOM_INTEGRATION_DATA);

          // Handler for changes in filtered data
          const handleDataChange = (newFilteredData: IZoomAreaDataPoint[]) => {
            setFilteredData(newFilteredData);
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* LineChart that receives filtered data */}
              <LineChart
                caption="Line Chart with Zoom Integration"
                data={filteredData}
                dataTestId="main-line-chart"
                width="50%"
                xKey="year"
              >
                {LINE_CONFIGS.map(config => (
                  <LineChart.Path
                    key={config.dataKey}
                    curved={config.curved}
                    dataKey={config.dataKey}
                    nodeConfig={{
                      type: NodeType.Circle,
                      fill: config.stroke,
                      stroke: 'white',
                      strokeWidth: '0.2',
                      size: 1.2,
                      hasHalo: true,
                    }}
                    stroke={config.stroke}
                    strokeWidth="0.15"
                    tabIndex={0}
                  />
                ))}
                <LineChart.XAxis
                  ariaLabel="Year"
                  position={Positions.BOTTOM}
                  showTickLines={true}
                  stroke="#666"
                  strokeWidth="0.1"
                  tickText={{
                    fontSize: 1,
                    textAnchor: 'middle',
                    top: 1,
                  }}
                />

                <LineChart.YAxis
                  ariaLabel="Cantidad"
                  position={Positions.LEFT}
                  showTickLines={true}
                  stroke="#666"
                  strokeWidth="0.1"
                  tickText={{
                    fontSize: 1,
                    textAnchor: 'middle',
                    left: 1,
                  }}
                />
              </LineChart>

              {/* ZoomArea for range selection */}
              <ZoomArea
                ariaLabel="Zoom area for data selection"
                caption="Drag handlers to select date range"
                data={ZOOM_INTEGRATION_DATA}
                dataTestId="zoom-area"
                height="70px"
                initialRange={{ start: 2, end: ZOOM_INTEGRATION_DATA.length - 3 }}
                lines={LINE_CONFIGS.map(config => ({
                  yKey: config.yKey,
                  stroke: config.stroke,
                  strokeWidth: 1.5,
                  fillOpacity: config.fillOpacity,
                  curved: config.curved,
                  dataKey: config.dataKey,
                }))}
                width="50%"
                xKey="year"
                onDataChange={handleDataChange}
              />
            </div>
          );
        };`,
        language: 'tsx',
      },
    },
  },
  render: () => WITH_ZOOM_AREA_TEMPLATE,
};
