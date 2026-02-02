import type { Meta, StoryObj } from '@storybook/react';

import { Note } from '@/storybook/components/note/note';

import { CustomBackgroundChart } from '../customBackgroundChart';
import { argtypes } from './parent/argtypes';
import {
  GRID_BACKGROUND_URL,
  QUADRANT_BACKGROUND_URL,
  WORLD_MAP_BACKGROUND_URL,
} from './templates/backgrounds';
import {
  GRID_DATA,
  PROJECT_PRIORITY_DATA,
  type ProjectMetrics,
  WORLD_MAP_LOCATIONS,
} from './templates/data';

const meta = {
  argTypes: argtypes(),
  component: CustomBackgroundChart,
  tags: ['autodocs'],
  title: 'Charts/CustomBackgroundChart/CustomBackgroundChart Examples',
} satisfies Meta<typeof CustomBackgroundChart>;

export default meta;

type Story = StoryObj<typeof meta>;

const handlePlotClick = (dataKey: string, data: { name?: string; value: number }) => {
  alert(`📍 ${data.name ?? dataKey}\n\nKey: ${dataKey}\nValue: ${data.value.toLocaleString()}`);
};

const defaultArgs = {
  backgroundUrl: GRID_BACKGROUND_URL,
  caption: 'Custom background chart',
  data: GRID_DATA,
  height: '400px',
  viewBox: { height: 400, width: 500 },
  width: '100%',
};

const withBasicNote = (Story: React.ComponentType): JSX.Element => {
  return (
    <>
      <Note
        collapsible={true}
        defaultCollapsed={false}
        heading="📐 Coordinate System"
        text={[
          <div key="basic-explanation">
            <p>
              <strong>SVG coordinates</strong> — Origin (0,0) at <strong>top-left</strong>. Y
              increases <strong>downward</strong> (opposite to Cartesian).
            </p>
            <pre
              style={{
                background: '#f5f5f5',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '0.75em',
                padding: '8px',
                margin: '8px 0',
                whiteSpace: 'pre',
              }}
            >
              {`(0,0) ──────► X
  │
  │  • (100,80)   top-left
  │      • (350,200)  center
  ▼
  Y        • (450,350)  bottom-right`}
            </pre>
            <p>
              <strong>viewBox</strong> defines coordinate space. Plot <code>x</code>,<code>y</code>{' '}
              must be within bounds:
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
              {`viewBox={{ width: 500, height: 400 }}
// Valid: x ∈ [0, 500], y ∈ [0, 400]
// Plot at (600, 100) → outside, won't show correctly`}
            </pre>
          </div>,
        ]}
        variant="information"
      />
      <Story />
    </>
  );
};

export const Basic: Story = {
  args: {
    ...defaultArgs,
    children: (
      <>
        {/* Large plots - prominent data points */}
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}: {{value}}"
          dataKey="point-h"
          fill="#0074D9"
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.3 }}
          size={48}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() => handlePlotClick('point-h', GRID_DATA['point-h'])}
        />
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}: {{value}}"
          dataKey="point-c"
          fill="#FF4136"
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.3 }}
          size={40}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="SQUARE"
          onClick={() => handlePlotClick('point-c', GRID_DATA['point-c'])}
        />
        {/* Medium plots */}
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}: {{value}}"
          dataKey="point-a"
          fill="#2ECC40"
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.4 }}
          size={32}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() => handlePlotClick('point-a', GRID_DATA['point-a'])}
        />
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}: {{value}}"
          dataKey="point-g"
          fill="#FF851B"
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.4 }}
          size={28}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="TRIANGLE"
          onClick={() => handlePlotClick('point-g', GRID_DATA['point-g'])}
        />
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}: {{value}}"
          dataKey="point-e"
          fill="#B10DC9"
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.4 }}
          size={24}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() => handlePlotClick('point-e', GRID_DATA['point-e'])}
        />
        {/* Small plots - minor data points */}
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}: {{value}}"
          dataKey="point-b"
          fill="#39CCCC"
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.4, scale: 1.5 }}
          size={18}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="SQUARE"
          onClick={() => handlePlotClick('point-b', GRID_DATA['point-b'])}
        />
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}: {{value}}"
          dataKey="point-d"
          fill="#FFDC00"
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.4, scale: 1.5 }}
          size={14}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="TRIANGLE"
          onClick={() => handlePlotClick('point-d', GRID_DATA['point-d'])}
        />
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}: {{value}}"
          dataKey="point-f"
          fill="#F012BE"
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.4, scale: 1.6 }}
          size={12}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() => handlePlotClick('point-f', GRID_DATA['point-f'])}
        />
      </>
    ),
  },
  decorators: [withBasicNote],
};

export const WithWorldMapBackground: Story = {
  args: {
    backgroundUrl: WORLD_MAP_BACKGROUND_URL,
    caption: 'Global offices and population data',
    children: (
      <>
        {/* Very large - mega cities */}
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}, {{value}}"
          dataKey="beijing"
          fill="#FF4136"
          formatAriaValue={(v: number) => `population: ${v.toLocaleString()}`}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.3 }}
          size={44}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() => handlePlotClick('beijing', WORLD_MAP_LOCATIONS['beijing'])}
        />
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}, {{value}}"
          dataKey="tokyo"
          fill="#0074D9"
          formatAriaValue={(v: number) => `population: ${v.toLocaleString()}`}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.3 }}
          size={38}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() => handlePlotClick('tokyo', WORLD_MAP_LOCATIONS['tokyo'])}
        />
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}, {{value}}"
          dataKey="sao-paulo"
          fill="#2ECC40"
          formatAriaValue={(v: number) => `population: ${v.toLocaleString()}`}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.3 }}
          size={36}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="SQUARE"
          onClick={() => handlePlotClick('sao-paulo', WORLD_MAP_LOCATIONS['sao-paulo'])}
        />
        {/* Large cities */}
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}, {{value}}"
          dataKey="new-york"
          fill="#FF851B"
          formatAriaValue={(v: number) => `population: ${v.toLocaleString()}`}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.4 }}
          size={28}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() => handlePlotClick('new-york', WORLD_MAP_LOCATIONS['new-york'])}
        />
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}, {{value}}"
          dataKey="london"
          fill="#B10DC9"
          formatAriaValue={(v: number) => `population: ${v.toLocaleString()}`}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.4 }}
          size={26}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="TRIANGLE"
          onClick={() => handlePlotClick('london', WORLD_MAP_LOCATIONS['london'])}
        />
        {/* Medium cities */}
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}, {{value}}"
          dataKey="sydney"
          fill="#39CCCC"
          formatAriaValue={(v: number) => `population: ${v.toLocaleString()}`}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.4, scale: 1.5 }}
          size={20}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() => handlePlotClick('sydney', WORLD_MAP_LOCATIONS['sydney'])}
        />
        {/* Smaller European cities */}
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}, {{value}}"
          dataKey="berlin"
          fill="#FFDC00"
          formatAriaValue={(v: number) => `population: ${v.toLocaleString()}`}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.4, scale: 1.5 }}
          size={16}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="SQUARE"
          onClick={() => handlePlotClick('berlin', WORLD_MAP_LOCATIONS['berlin'])}
        />
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}, {{value}}"
          dataKey="madrid"
          fill="#01FF70"
          formatAriaValue={(v: number) => `population: ${v.toLocaleString()}`}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.4, scale: 1.5 }}
          size={14}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() => handlePlotClick('madrid', WORLD_MAP_LOCATIONS['madrid'])}
        />
        <CustomBackgroundChart.Plot
          ariaLabel="{{name}}, {{value}}"
          dataKey="paris"
          fill="#F012BE"
          formatAriaValue={(v: number) => `population: ${v.toLocaleString()}`}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.4, scale: 1.6 }}
          size={12}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="TRIANGLE"
          onClick={() => handlePlotClick('paris', WORLD_MAP_LOCATIONS['paris'])}
        />
      </>
    ),
    data: WORLD_MAP_LOCATIONS,
    height: '500px',
    viewBox: { height: 857, width: 2000 },
    width: '100%',
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="⚙️ Key Props"
            text={[
              <div key="worldmap-explanation">
                <p>
                  <strong>Required:</strong> <code>data</code>, <code>viewBox</code>,{' '}
                  <code>background</code>
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
                  {`<CustomBackgroundChart
  data={locationData}           // Record<string, DataPoint>
  viewBox={{ width, height }}   // Must match SVG
  background={<MySvg />}        // Any SVG/ReactNode
  onErrors={handleErrors}       // Error callback
  width="100%" height="500px"   // Container size
/>`}
                </pre>
                <p>
                  <strong>Plot props:</strong> dataKey, fill, size, type, hasHoverEffect, onClick,
                  tabIndex
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
};

const formatProjectMetrics = (metrics: ProjectMetrics): string => {
  const statusEmoji = {
    'planned': '📋',
    'in-progress': '🚧',
    'completed': '✅',
  };
  return `${statusEmoji[metrics.status]} ${metrics.team} · €${metrics.budget.toLocaleString()} · ${metrics.deadline}`;
};

const getStatusColor = (status: ProjectMetrics['status']): string => {
  const colors = {
    'planned': '#9e9e9e',
    'in-progress': '#ff9800',
    'completed': '#4caf50',
  };
  return colors[status];
};

export const WithGenericValueType: Story = {
  args: {
    backgroundUrl: QUADRANT_BACKGROUND_URL,
    caption: 'Project Priority Matrix',
    children: (
      <>
        <CustomBackgroundChart.Plot<ProjectMetrics>
          ariaLabel="{{name}}, {{value}}"
          dataKey="quick-wins"
          fill={getStatusColor(PROJECT_PRIORITY_DATA['quick-wins'].value.status)}
          formatAriaValue={formatProjectMetrics}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.4 }}
          size={32}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() =>
            alert(
              `📊 ${PROJECT_PRIORITY_DATA['quick-wins'].name}\n\n` +
                `Team: ${PROJECT_PRIORITY_DATA['quick-wins'].value.team}\n` +
                `Budget: €${PROJECT_PRIORITY_DATA['quick-wins'].value.budget.toLocaleString()}\n` +
                `Deadline: ${PROJECT_PRIORITY_DATA['quick-wins'].value.deadline}\n` +
                `Status: ${PROJECT_PRIORITY_DATA['quick-wins'].value.status}`
            )
          }
        />
        <CustomBackgroundChart.Plot<ProjectMetrics>
          ariaLabel="{{name}}, {{value}}"
          dataKey="mobile-app"
          fill={getStatusColor(PROJECT_PRIORITY_DATA['mobile-app'].value.status)}
          formatAriaValue={formatProjectMetrics}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.3 }}
          size={44}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="SQUARE"
          onClick={() =>
            alert(
              `📊 ${PROJECT_PRIORITY_DATA['mobile-app'].name}\n\n` +
                `Team: ${PROJECT_PRIORITY_DATA['mobile-app'].value.team}\n` +
                `Budget: €${PROJECT_PRIORITY_DATA['mobile-app'].value.budget.toLocaleString()}\n` +
                `Deadline: ${PROJECT_PRIORITY_DATA['mobile-app'].value.deadline}\n` +
                `Status: ${PROJECT_PRIORITY_DATA['mobile-app'].value.status}`
            )
          }
        />
        <CustomBackgroundChart.Plot<ProjectMetrics>
          ariaLabel="{{name}}, {{value}}"
          dataKey="api-v2"
          fill={getStatusColor(PROJECT_PRIORITY_DATA['api-v2'].value.status)}
          formatAriaValue={formatProjectMetrics}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.3 }}
          size={38}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() =>
            alert(
              `📊 ${PROJECT_PRIORITY_DATA['api-v2'].name}\n\n` +
                `Team: ${PROJECT_PRIORITY_DATA['api-v2'].value.team}\n` +
                `Budget: €${PROJECT_PRIORITY_DATA['api-v2'].value.budget.toLocaleString()}\n` +
                `Deadline: ${PROJECT_PRIORITY_DATA['api-v2'].value.deadline}\n` +
                `Status: ${PROJECT_PRIORITY_DATA['api-v2'].value.status}`
            )
          }
        />
        <CustomBackgroundChart.Plot<ProjectMetrics>
          ariaLabel="{{name}}, {{value}}"
          dataKey="docs-update"
          fill={getStatusColor(PROJECT_PRIORITY_DATA['docs-update'].value.status)}
          formatAriaValue={formatProjectMetrics}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.5 }}
          size={20}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="TRIANGLE"
          onClick={() =>
            alert(
              `📊 ${PROJECT_PRIORITY_DATA['docs-update'].name}\n\n` +
                `Team: ${PROJECT_PRIORITY_DATA['docs-update'].value.team}\n` +
                `Budget: €${PROJECT_PRIORITY_DATA['docs-update'].value.budget.toLocaleString()}\n` +
                `Deadline: ${PROJECT_PRIORITY_DATA['docs-update'].value.deadline}\n` +
                `Status: ${PROJECT_PRIORITY_DATA['docs-update'].value.status}`
            )
          }
        />
        <CustomBackgroundChart.Plot<ProjectMetrics>
          ariaLabel="{{name}}, {{value}}"
          dataKey="analytics"
          fill={getStatusColor(PROJECT_PRIORITY_DATA['analytics'].value.status)}
          formatAriaValue={formatProjectMetrics}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.4 }}
          size={28}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() =>
            alert(
              `📊 ${PROJECT_PRIORITY_DATA['analytics'].name}\n\n` +
                `Team: ${PROJECT_PRIORITY_DATA['analytics'].value.team}\n` +
                `Budget: €${PROJECT_PRIORITY_DATA['analytics'].value.budget.toLocaleString()}\n` +
                `Deadline: ${PROJECT_PRIORITY_DATA['analytics'].value.deadline}\n` +
                `Status: ${PROJECT_PRIORITY_DATA['analytics'].value.status}`
            )
          }
        />
        <CustomBackgroundChart.Plot<ProjectMetrics>
          ariaLabel="{{name}}, {{value}}"
          dataKey="legacy-cleanup"
          fill={getStatusColor(PROJECT_PRIORITY_DATA['legacy-cleanup'].value.status)}
          formatAriaValue={formatProjectMetrics}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.4 }}
          size={34}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="SQUARE"
          onClick={() =>
            alert(
              `📊 ${PROJECT_PRIORITY_DATA['legacy-cleanup'].name}\n\n` +
                `Team: ${PROJECT_PRIORITY_DATA['legacy-cleanup'].value.team}\n` +
                `Budget: €${PROJECT_PRIORITY_DATA['legacy-cleanup'].value.budget.toLocaleString()}\n` +
                `Deadline: ${PROJECT_PRIORITY_DATA['legacy-cleanup'].value.deadline}\n` +
                `Status: ${PROJECT_PRIORITY_DATA['legacy-cleanup'].value.status}`
            )
          }
        />
        <CustomBackgroundChart.Plot<ProjectMetrics>
          ariaLabel="{{name}}, {{value}}"
          dataKey="minor-fixes"
          fill={getStatusColor(PROJECT_PRIORITY_DATA['minor-fixes'].value.status)}
          formatAriaValue={formatProjectMetrics}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.6 }}
          size={16}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="CIRCLE"
          onClick={() =>
            alert(
              `📊 ${PROJECT_PRIORITY_DATA['minor-fixes'].name}\n\n` +
                `Team: ${PROJECT_PRIORITY_DATA['minor-fixes'].value.team}\n` +
                `Budget: €${PROJECT_PRIORITY_DATA['minor-fixes'].value.budget.toLocaleString()}\n` +
                `Deadline: ${PROJECT_PRIORITY_DATA['minor-fixes'].value.deadline}\n` +
                `Status: ${PROJECT_PRIORITY_DATA['minor-fixes'].value.status}`
            )
          }
        />
        {/* Example with custom ariaLabel template using coordinates */}
        <CustomBackgroundChart.Plot<ProjectMetrics>
          ariaLabel="{{name}} at position ({{x}}, {{y}}): {{value}}"
          dataKey="infra-upgrade"
          fill={getStatusColor(PROJECT_PRIORITY_DATA['infra-upgrade'].value.status)}
          formatAriaValue={formatProjectMetrics}
          hasHoverEffect={true}
          hoverConfig={{ opacity: 0.5, scale: 1.4 }}
          size={30}
          stroke="#FFFFFF"
          strokeWidth={1}
          tabIndex={0}
          type="TRIANGLE"
          onClick={() =>
            alert(
              `📊 ${PROJECT_PRIORITY_DATA['infra-upgrade'].name}\n\n` +
                `Team: ${PROJECT_PRIORITY_DATA['infra-upgrade'].value.team}\n` +
                `Budget: €${PROJECT_PRIORITY_DATA['infra-upgrade'].value.budget.toLocaleString()}\n` +
                `Deadline: ${PROJECT_PRIORITY_DATA['infra-upgrade'].value.deadline}\n` +
                `Status: ${PROJECT_PRIORITY_DATA['infra-upgrade'].value.status}`
            )
          }
        />
      </>
    ),
    data: PROJECT_PRIORITY_DATA,
    height: '450px',
    viewBox: { height: 400, width: 400 },
    width: '100%',
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      return (
        <>
          <Note
            collapsible={true}
            defaultCollapsed={false}
            heading="🔧 Generic Types + Aria Templates"
            text={[
              <div key="generic-explanation">
                <p>
                  <strong>Generic value type</strong> — Data can hold any shape, not just numbers.
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
                  {`<CustomBackgroundChart<ProjectMetrics>
  data={{ 'task-1': { x, y, value: { budget, team, status } } }}
>`}
                </pre>
                <p>
                  <strong>Aria template</strong> — Placeholders: <code>{'{{name}}'}</code>,{' '}
                  <code>{'{{value}}'}</code>, <code>{'{{x}}'}</code>, <code>{'{{y}}'}</code>,{' '}
                  <code>{'{{dataKey}}'}</code>
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
                  {`ariaLabel="{{name}}: {{value}}"
formatAriaValue={(v) => \`\${v.team} · €\${v.budget}\`}
// → "API Migration: Engineering · €180,000"`}
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
