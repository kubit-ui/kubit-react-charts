import type { Meta, StoryObj } from '@storybook/react';

import { Note } from '@/storybook/components/note/note';

import { LineChartPath } from '../../../fragments/lineChartPath';
import { LineChart } from '../../../lineChart';
import type { LineChartPathProps } from '../../../lineChart.type';
import { PROJECTION_DEMO_DATA, SUBCOMPONENT_DEMO_DATA } from '../../templates/data';
import { pathArgTypes } from './path.argtypes';

const meta = {
  argTypes: pathArgTypes(),
  component: LineChartPath,
  tags: ['autodocs'],
  title: 'Charts/LineChart/Child Components/LineChartPath',
} satisfies Meta<typeof LineChartPath>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PathCustomization: Story = {
  args: {
    'aria-hidden': false,

    // === ACCESSIBILITY ===
    'aria-label': 'Data trend line',

    'classNames': '',

    'closestClick': false,

    // === PATH BEHAVIOR ===
    'curved': true,
    // === TESTING ===
    'data-testid': 'line-path',
    // === PATH CORE PROPERTIES ===
    'dataKey': 'y',
    'fill': '#fabada', // Required for gradient to be visible
    'fillOpacity': 0.8,
    'fillRule': 'nonzero',
    // === ADVANCED CONFIGURATION OBJECTS ===
    'gradient': '180, #fabada 0%, #FFF 100%', // Vertical fade from fabada to white
    'hoverConfig': {
      fill: '#15bedc89',
      fillOpacity: 1,
      fillRule: 'nonzero',
      opacity: 1,
      orientation: '',
      rotate: '',
      stroke: '#0078D4',
      strokeDasharray: '',
      strokeDashoffset: '',
      strokeLinecap: 'butt',
      strokeLinejoin: 'miter',
      strokeMiterlimit: 4,
      strokeOpacity: 1,
      strokeWidth: 1,
      transform: '',
      visibility: 'visible',
    },

    // === INTERACTIVE FEATURES ===
    'indicatorConfig': {
      autoClick: false,
      className: '',
      fill: '#0078D4',
      fillOpacity: 1,
      haloConfig: {
        fill: '',
        fillOpacity: 0,
        opacity: 0,
        stroke: '',
        strokeWidth: 0,
      },
      hasHalo: false,
      id: '',
      lineIndicator: {
        ariaLabel: '',
        className: '',
        opacity: 1,
        stroke: '#666',
        strokeDasharray: '',
        strokeDashoffset: 0,
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeOpacity: 1,
        strokeWidth: 0.5,
        tabIndex: -1,
        transform: '',
      },
      opacity: 1,
      size: 3,
      stroke: '#fff',
      strokeWidth: 0.5,
      tabIndex: -1,
      type: 'circle',
    },

    // === NODE CONFIGURATION (Required for closestClick and autoClick to work) ===
    'nodeConfig': {
      className: '',
      fill: '#0078D4',
      fillOpacity: 1,
      hasHalo: false,
      id: '',
      onClick: undefined,
      opacity: 1,
      size: 3,
      stroke: '#fff',
      strokeWidth: 0.5,
      tabIndex: -1,
      type: 'circle',
    },

    'role': 'img',

    'shadowSvgConfig': {
      dx: 1,
      dy: 1,
      floodColor: '#000000',
      floodOpacity: 0.3,
      stdDeviation: 2,
    },

    // === VISUAL STYLING ===
    'stroke': '#0078D4',

    // Direct string input for dash patterns like "5,5", "2,2", etc.
    // Example: 5px dash + 3px gap
    'strokeDasharray': '5,3',

    'strokeLinecap': 'butt',

    'strokeLinejoin': 'miter',

    'strokeOpacity': 1,
    'strokeWidth': 1,
    'tabIndex': 0,
    'title': '',

    'transform': '', // Example: 'translate(0, -5)' to move up 5px

    'visibility': 'visible',
  },

  decorators: [
    (Story: React.ComponentType): React.JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="LineChart.Path Subcomponent Customization"
          text={[
            <>
              This story focuses specifically on the Path subcomponent of LineChart, allowing you to
              experiment with all its available properties.
            </>,
            <></>,
            <>
              <strong>Key Features:</strong>
            </>,
            <>
              • <strong>stroke & strokeWidth</strong> - Control line appearance and thickness
            </>,
            <>
              • <strong>curved</strong> - Switch between smooth curves and straight line segments
            </>,
            <>
              • <strong>strokeDasharray</strong> - Create dashed, dotted, or custom line patterns
            </>,
            <>
              • <strong>nodeConfig</strong> - Configure visible nodes with dynamic accessibility
              labels using template placeholders ({'{{dataKey}}, {{xValue}}, {{yValue}}, {{index}}'}
              )
            </>,
            <>
              • <strong>lineProjection</strong> - Add upper and lower projection bounds for
              uncertainty visualization
            </>,
            <>
              • <strong>indicatorConfig</strong> - Enable interactive nodes and hover indicators
            </>,
            <>
              • <strong>fill & gradient</strong> - Fill areas under the line with solid colors or
              CSS gradients (requires fill to be set)
            </>,
            <>
              • <strong>transform</strong> - Apply geometric transformations (translate, scale,
              rotate)
            </>,
            <></>,
            <>
              <strong>Accessibility Template Placeholders:</strong> Node labels support dynamic text
              replacement using: <code>{'{{dataKey}}'}</code> (data series),{' '}
              <code>{'{{xValue}}'}</code> (X-axis value), <code>{'{{yValue}}'}</code> (Y-axis
              value), <code>{'{{index}}'}</code> (1-based point index).
            </>,
            <></>,
            <>
              <strong>Note:</strong> Other components (XAxis, YAxis) are kept static to provide
              visual context while you focus on Path behavior.
            </>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],

  render: (args: LineChartPathProps): React.JSX.Element => {
    return (
      <LineChart data={SUBCOMPONENT_DEMO_DATA} xKey="x">
        {/* Path protagonist - receives args from controls */}
        <LineChart.Path {...args} />

        <LineChart.XAxis
          position="BOTTOM"
          stroke="#666"
          strokeWidth={0.5}
          tickLine={{ stroke: '#999', strokeWidth: 0.25 }}
        />
        <LineChart.YAxis
          position="LEFT"
          stroke="#666"
          strokeWidth={0.5}
          tickLine={{ stroke: '#999', strokeWidth: 0.25 }}
        />
      </LineChart>
    );
  },
};

export const PathWithProjections: Story = {
  args: {
    ...PathCustomization.args,
    'aria-hidden': false,
    // === ACCESSIBILITY ===
    'aria-label': 'Data trend line with projections',
    'classNames': '',
    'closestClick': false,
    'curved': true,
    // === TESTING ===
    'data-testid': 'line-path-projections',
    'dataKey': 'y',
    'fill': 'none',
    'fillOpacity': 1,
    'fillRule': 'nonzero',
    'gradient': '',
    'lineProjection': {
      lower: {
        fill: 'transparent',
        fillOpacity: 1,
        fillRule: 'nonzero',
        orientation: '',
        rotate: '',
        stroke: '#FFB6C1',
        strokeDasharray: '4,2',
        strokeDashoffset: '',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 4,
        strokeOpacity: 0.8,
        strokeWidth: 0.2,
        transform: '',
        visibility: 'visible',
        xProjection: 0,
        yProjection: 10,
      },
      shapeColor: 'rgba(0, 100, 200, 0.15)',
      upper: {
        fill: 'transparent',
        fillOpacity: 1,
        fillRule: 'nonzero',
        orientation: '',
        rotate: '',
        stroke: '#90EE90',
        strokeDasharray: '4,2',
        strokeDashoffset: '',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 4,
        strokeOpacity: 0.8,
        strokeWidth: 0.2,
        transform: '',
        visibility: 'visible',
        xProjection: 0,
        yProjection: 10,
      },
    },
    'role': 'img',
    'shadowSvgConfig': {
      dx: 1,
      dy: 1,
      floodColor: '#000000',
      floodOpacity: 0.3,
      stdDeviation: 2,
    },
    'stroke': '#e19c13ff',
    'strokeDasharray': '', // Solid main line, projections have their own dash patterns

    'strokeLinecap': 'butt',
    'strokeLinejoin': 'miter',
    'strokeOpacity': 1,
    'strokeWidth': 0.5,
    'tabIndex': 0,
    'title': 'Line chart with upper and lower projection bounds',
    'transform': '',
    'visibility': 'visible',
  },

  decorators: [
    (Story: React.ComponentType): React.JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="🎯 Path Projections Feature"
          text={[
            <>
              Projections allow you to visualize uncertainty bands or confidence intervals around
              your main data line using percentage-based offsets.
            </>,
            <></>,
            <>
              <strong>How it works:</strong>
            </>,
            <>
              • <strong>xProjection & yProjection</strong> - Percentage offsets from the main line
              data points
            </>,
            <>
              • <strong>shapeColor</strong> - Fills the area between upper and lower projection
              bounds
            </>,
            <>
              • <strong>Independent styling</strong> - Each projection line can have its own stroke,
              width, dash pattern, and opacity
            </>,
            <></>,
            <>
              <strong>Example Configuration:</strong>
            </>,
            <>
              • <code>shapeColor</code> fills the uncertainty band between them
            </>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],

  render: (args: LineChartPathProps): React.JSX.Element => {
    return (
      <LineChart data={PROJECTION_DEMO_DATA} xKey="x">
        <LineChart.Path {...args} />
        <LineChart.XAxis
          position="BOTTOM"
          stroke="#666"
          strokeWidth={0.5}
          valueFormatter={(val: string | number) => `Q${parseInt(String(val)) + 1}`}
        />
        <LineChart.YAxis position="LEFT" stroke="#666" strokeWidth={0.5} />
      </LineChart>
    );
  },
};
