import type { Meta, StoryObj } from '@storybook/react';

import type { PathProps } from '@/components/path/path.types';
import { Note } from '@/storybook/components/note/note';

import { PieChartPath } from '../../../fragments/pieChartPath';
import { PieChart } from '../../../pieChart';
import { DATA } from '../../templates/data';
import { pathArgTypes } from './path.argtypes';

const meta = {
  argTypes: pathArgTypes(),
  component: PieChartPath,
  tags: ['autodocs'],
  title: 'Charts/PieChart/Child Components/PieChartPath',
} satisfies Meta<typeof PieChartPath>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PathCustomization: Story = {
  args: {
    // === ACCESSIBILITY ===
    'aria-hidden': false,

    'aria-label': '{{dataKey}} - {{groupName}} with value {{groupValue}}',

    // === STYLING CLASSES ===
    'classNames': '',
    // === DATA PROPERTIES ===
    'dataKey': 'groups',
    // === TESTING ===
    'dataTestId': 'pie-chart-path-demo',

    // === VISUAL STYLING ===
    'fill': '#5c4147',

    'fillOpacity': 0.9,

    'fillRule': 'nonzero',
    // === INTERACTION STYLING ===
    'focusConfig': {
      stroke: '#0078D4',
      strokeWidth: 3,
    },

    'gap': 2,

    // === ADVANCED STYLING ===
    'gradient': '',
    'hoverConfig': {
      fillOpacity: 0.8,
      transform: 'scale(1.05)',
    },
    // === PIE CHART SPECIFIC PROPERTIES ===
    'innerRadius': 20,
    'opacity': 1,
    'radius': 80,
    'role': 'img',
    'shadowSvgConfig': {
      dx: 1,
      dy: -4,
      floodColor: '#000000',
      floodOpacity: 1,
      stdDeviation: 1,
    },
    'stroke': '#FFFFFF',

    'strokeDasharray': '5,3',

    'strokeLinecap': 'square',

    'strokeLinejoin': 'miter',
    'strokeOpacity': 1,

    'strokeWidth': 1,

    'tabIndex': undefined,

    'title': 'Interactive pie chart segments',

    'transform': '',
    'visibility': 'visible',
  },

  decorators: [
    (Story: React.ComponentType): React.JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="PieChart.Path Subcomponent Customization"
          text={[
            <>
              This story focuses specifically on the Path subcomponent of PieChart, allowing you to
              experiment with all its available properties for creating pie chart segments.
            </>,
            <></>,
            <>
              <strong>Key Features:</strong>
            </>,
            <>
              • <strong>dataKey</strong> - Specifies which data field to visualize as pie segments
            </>,
            <>
              • <strong>radius & innerRadius</strong> - Control outer and inner radius for full or
              donut charts. Set innerRadius &gt; 0 to create donut charts
            </>,
            <>
              • <strong>gap</strong> - Add visual separation between segments for clarity
            </>,
            <>
              • <strong>fill & stroke</strong> - Default colors and borders. Note: Individual
              segment colors are defined in your data objects (data.color property)
            </>,
            <>
              • <strong>shadowSvgConfig</strong> - Add drop shadow effects for depth and visual
              enhancement
            </>,
            <>
              • <strong>focusConfig & hoverConfig</strong> - Custom styling for interactive user
              experiences
            </>,
            <>
              • <strong>Accessibility support</strong> - Full ARIA attributes and keyboard
              navigation with tabIndex
            </>,
            <></>,
            <>
              <strong>Important:</strong> Segment colors are primarily controlled by the{' '}
              <code>color</code> property in your data array. The <code>fill</code> prop serves as a
              fallback for segments without individual colors.
            </>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],

  render: (args: PathProps) => (
    <div style={{ height: '300px', width: '300px' }}>
      <PieChart data={DATA} dataTestId="pie-chart-path-demo" height="100%" width="100%">
        <PieChartPath {...args} />
      </PieChart>
    </div>
  ),
};
