import type { Meta, StoryObj } from '@storybook/react-vite';

import { type NodeProps, NodeType } from '@/components/node/node.types';
import { Note } from '@/storybook/components/note/note';

import { Node as NodeStory } from '../node';
import { argtypes } from './argtypes';

const meta = {
  argTypes: argtypes(),
  component: NodeStory,
  render: (args: NodeProps) => {
    return (
      <svg>
        <NodeStory
          fill={args.stroke}
          haloConfig={args.haloConfig}
          hasHalo={args.hasHalo}
          position={{ x: 50, y: 50 }}
          size={args.size && args.size + args.size / 2}
          type={args.type}
        />

        {/* <NodeStory className="node-focus-border" position={{ x: 50, y: 50 }} {...args} /> */}
      </svg>
    );
  },
  tags: ['autodocs'],
  title: 'Components/Node',
} satisfies Meta<typeof NodeStory>;

export default meta;

type Story = StoryObj<typeof meta> & { args: { themeArgs?: object } } & {
  args: { source?: string };
};

const args: NodeProps = {
  fill: '#FFFFFF',
  // Complete haloConfig with all available fields for better Storybook controls
  haloConfig: {
    fill: undefined,
    fillOpacity: undefined,
    opacity: undefined,
    stroke: undefined,
    strokeWidth: undefined,
  },
  hasHalo: true,
  size: 20,
  stroke: '#09A182',
  tabIndex: 0,
  type: NodeType.Circle,
};

export const Node: Story = {
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
            heading="🔸 Node Component Overview"
            text={[
              <div key="node-overview">
                <p>
                  The <strong>Node</strong> component is a versatile building block for data
                  visualization that renders interactive geometric shapes with advanced visual
                  effects.
                </p>
                <ul>
                  <li>
                    <strong>Rich shape variety:</strong> Support for circles, squares, triangles,
                    stars, pentagons, hexagons, and straight lines
                  </li>
                  <li>
                    <strong>Halo effects:</strong> Configurable glow effects with customizable fill,
                    stroke, opacity, and dimensions
                  </li>
                  <li>
                    <strong>Full interactivity:</strong> Click, double-click, focus, blur, and
                    keyboard event handling
                  </li>
                  <li>
                    <strong>Data association:</strong> Built-in data binding for index, values,
                    keys, and positions
                  </li>
                  <li>
                    <strong>Accessibility:</strong> ARIA labels, keyboard navigation, and screen
                    reader support
                  </li>
                </ul>
                <p>
                  <em>💡 Context:</em> Node components are primarily used internally within{' '}
                  <strong>LineChart</strong> as interactive data points through the{' '}
                  <code>nodeConfig</code> property. They provide visual markers on line paths with
                  configurable shapes, hover effects, and event handling for enhanced user
                  interaction.
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
