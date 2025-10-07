import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ForeignObjectProps } from '@/components/foreignObject/foreignObject.types';

import { ICONS } from '../../../../../assets/storybook/icons/icons';
import { Note } from '../../../../../storybook/components/note/note';
import { PieChartForeign } from '../../../fragments/pieChartForeign';
import { PieChart } from '../../../pieChart';
import { PERCENTAGE_DATA } from '../../templates/data';
import { foreignArgTypes } from './foreign.argtypes';
import type { ForeignStoryArgs } from './foreign.types';

const meta = {
  argTypes: foreignArgTypes(),
  tags: ['autodocs'],
  title: 'Charts/PieChart/Child Components/PieChartForeign',
} satisfies Meta<ForeignStoryArgs<ForeignObjectProps>>;

export default meta;
type Story = StoryObj<ForeignStoryArgs<ForeignObjectProps>>;

export const ForeignObjectCustomization: Story = {
  args: {
    // === CONTENT ===
    children: 'gif',
    // === TESTING ===
    dataTestId: 'pie-foreign-interactive',
    fontSize: 80,
    gifSize: 120,
    gifUrl: '/assets/KubitoJumping.gif',
    height: 400,
    iconColor: '#001E30',
    iconSize: 100,
    imageSize: 100,
    imageUrl: '/assets/kubito.png',
    textContent: '75%',
    width: 400,
    x: 50,

    y: 50,
  },

  decorators: [
    (Story: React.ComponentType): JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="PieChart.Foreign Interactive Content Demo"
          text={[
            <>
              This story demonstrates the flexibility of the PieChart.Foreign component by allowing
              you to experiment with different types of HTML content within SVG pie charts.
            </>,
            <></>,
            <>
              <strong>⚠️ Important:</strong> The content type selector (children) and related
              controls are specific to this story example for demonstration purposes. In real usage,
              PieChart.Foreign accepts any ReactNode as children.
            </>,
            <></>,
            <>
              <strong>Demo Content Types (Story Example Only):</strong>
            </>,
            <>
              • <strong>Text</strong> - Display custom text with adjustable font size
            </>,
            <>
              • <strong>Icon</strong> - Show SVG icons with customizable color and size
            </>,
            <>
              • <strong>Image</strong> - Embed external images from URLs
            </>,
            <>
              • <strong>GIF</strong> - Display animated GIFs for dynamic content
            </>,
            <></>,
            <>
              <strong>Real Usage Possibilities:</strong> Foreign objects are open and flexible,
              allowing any HTML content: forms, buttons, charts, videos, iframes, custom components,
              etc.
            </>,
            <></>,
            <>
              <strong>Usage:</strong> Use the controls panel to select a demo content type and
              customize its appearance. The foreign object will update in real-time.
            </>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],

  render: (args: ForeignStoryArgs<ForeignObjectProps>) => {
    // Helper function to render different content types based on children prop
    const renderContent = () => {
      switch (args.children) {
        case 'text':
          return (
            <div
              style={{
                alignItems: 'center',
                color: '#333',
                display: 'flex',
                fontSize: `${args.fontSize}px`,
                fontWeight: 'bold',
                height: '100%',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
              }}
            >
              <span>{args.textContent}</span>
            </div>
          );

        case 'icon':
          return (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <svg
                aria-label="Icon content example"
                role="img"
                style={{
                  backgroundColor: args.iconColor,
                  height: `${args.iconSize}px`,
                  maskImage: `url("${ICONS.ICON_PLACEHOLDER}")`,
                  maskPosition: 'center',
                  maskRepeat: 'no-repeat',
                  maskSize: 'contain',
                  width: `${args.iconSize}px`,
                }}
              />
            </div>
          );

        case 'image':
          return (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <img
                alt="Custom content"
                src={args.imageUrl || '/assets/kubito.png'}
                style={{
                  borderRadius: '8px',
                  height: `${args.imageSize}px`,
                  objectFit: 'cover',
                  width: `${args.imageSize}px`,
                }}
              />
            </div>
          );

        case 'gif':
          return (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <img
                alt="Animated GIF content"
                src={args.gifUrl || '/assets/KubitoJumping.gif'}
                style={{
                  borderRadius: '8px',
                  height: `${args.gifSize}px`,
                  objectFit: 'cover',
                  width: `${args.gifSize}px`,
                }}
              />
            </div>
          );

        default:
          return <></>;
      }
    };

    return (
      <PieChart
        canvasConfig={{ extraSpace: 0, height: 500, width: 500 }}
        data={PERCENTAGE_DATA}
        dataTestId="pie-chart-foreign-demo"
        height="100%"
        width="70%"
      >
        <PieChart.Path
          dataKey="groups"
          fill="red"
          gap={5}
          innerRadius={200}
          radius={250}
          stroke="transparent"
          strokeWidth="0.1"
          tabIndex={0}
        />
        <PieChartForeign
          dataTestId={args.dataTestId}
          height={args.height}
          width={args.width}
          x={args.x}
          y={args.y}
        >
          {renderContent()}
        </PieChartForeign>
      </PieChart>
    );
  },
};
