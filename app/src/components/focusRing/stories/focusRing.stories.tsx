import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { FocusRing } from '../focusRing';
import { focusRingArgtypes } from './argtypes';

const meta: Meta<typeof FocusRing> = {
  argTypes: focusRingArgtypes,
  component: FocusRing,
  decorators: [
    (Story: React.ComponentType): JSX.Element => (
      <div style={{ padding: '20px' }}>
        <svg height="200" style={{ border: '1px solid #ccc' }} width="200">
          <Story />
        </svg>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
## FocusRing Component

A reusable component that wraps SVG elements and provides a visual focus ring indicator. FocusRing is a **controlled component** that responds to the \`isFocused\` prop.

### Features

- **Controlled Component**: Accepts \`isFocused\` prop to control visibility
- **Automatic Detection**: Automatically detects element dimensions and position
- **Two Modes**: 
  - **Children Mode**: Wraps the element inline for simple cases
  - **TargetRef Mode**: Renders separately for z-order control
- **Reuses Logic**: Leverages \`calculateFocusOutline\` utility for precise calculations
- **Consistent Styling**: Maintains existing \`FocusConfig\` API for uniform appearance
- **Fully Customizable**: Supports custom focus configuration and disabled state

### Usage

#### Children Mode (Inline)
\`\`\`tsx
const [focused, setFocused] = useState(false);

<FocusRing isFocused={focused}>
  <rect
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    {...props}
  />
</FocusRing>
\`\`\`

#### TargetRef Mode (Separate Rendering)
\`\`\`tsx
const ref = useRef<SVGRectElement>(null);
const [focused, setFocused] = useState(false);

<rect
  ref={ref}
  onFocus={() => setFocused(true)}
  onBlur={() => setFocused(false)}
  {...props}
/>
<FocusRing targetRef={ref} isFocused={focused} />
\`\`\`
        `,
      },
    },
    layout: 'centered',
  },
  title: 'Components/FocusRing',
};

export default meta;
type Story = StoryObj<typeof FocusRing>;

/**
 * Basic usage showing controlled FocusRing behavior.
 * Click on the rectangle to see the focus ring appear.
 * Click outside to hide it.
 */
export const BasicUsage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FocusRing isFocused={isFocused}>
        <rect
          aria-label="Interactive rectangle"
          fill="blue"
          height={32}
          role="button"
          tabIndex={0}
          width={32}
          x={84}
          y={84}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </FocusRing>
    );
  },
};

/**
 * FocusRing automatically detects rectangle properties.
 */
export const AutomaticDetection: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FocusRing isFocused={isFocused}>
        <rect
          aria-label="Auto-detected rectangle"
          fill="green"
          height={40}
          role="button"
          tabIndex={0}
          width={60}
          x={70}
          y={80}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </FocusRing>
    );
  },
};

/**
 * FocusRing works with circles too.
 */
export const WithCircle: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FocusRing isFocused={isFocused}>
        <circle
          aria-label="Interactive circle"
          cx={100}
          cy={100}
          fill="red"
          r={25}
          role="button"
          tabIndex={0}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </FocusRing>
    );
  },
};

/**
 * Custom focus configuration for different visual styles.
 */
export const CustomFocusConfig: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [isFocused, setIsFocused] = useState(false);

    const customConfig = {
      gap: 4,
      innerColor: '#00ff00',
      innerStrokeWidth: 3,
      outlineColor: '#ff0000',
      outlineStrokeWidth: 5,
    };

    return (
      <FocusRing focusConfig={customConfig} isFocused={isFocused}>
        <rect
          aria-label="Custom styled focus ring"
          fill="purple"
          height={48}
          role="button"
          strokeWidth={2}
          tabIndex={0}
          width={48}
          x={76}
          y={76}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </FocusRing>
    );
  },
};

/**
 * Disabled state - focus ring won't appear even when focused.
 */
export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FocusRing disabled={true} isFocused={isFocused}>
        <rect
          aria-label="Disabled focus ring"
          fill="gray"
          height={36}
          role="button"
          tabIndex={0}
          width={36}
          x={82}
          y={82}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </FocusRing>
    );
  },
};

/**
 * Multiple elements with individual focus management.
 */
export const MultipleElements: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [focused1, setFocused1] = useState(false);
    const [focused2, setFocused2] = useState(false);
    const [focused3, setFocused3] = useState(false);

    return (
      <>
        <FocusRing focusConfig={{ outlineColor: '#0066cc' }} isFocused={focused1}>
          <rect
            aria-label="First element"
            fill="lightblue"
            height={32}
            role="button"
            tabIndex={0}
            width={32}
            x={44}
            y={84}
            onBlur={() => setFocused1(false)}
            onFocus={() => setFocused1(true)}
          />
        </FocusRing>

        <FocusRing focusConfig={{ outlineColor: '#cc6600' }} isFocused={focused2}>
          <rect
            aria-label="Second element"
            fill="orange"
            height={32}
            role="button"
            tabIndex={0}
            width={32}
            x={84}
            y={84}
            onBlur={() => setFocused2(false)}
            onFocus={() => setFocused2(true)}
          />
        </FocusRing>

        <FocusRing focusConfig={{ outlineColor: '#00cc66' }} isFocused={focused3}>
          <rect
            aria-label="Third element"
            fill="lightgreen"
            height={32}
            role="button"
            tabIndex={0}
            width={32}
            x={124}
            y={84}
            onBlur={() => setFocused3(false)}
            onFocus={() => setFocused3(true)}
          />
        </FocusRing>
      </>
    );
  },
};

/**
 * Focus ring preserves original event handlers on the child element.
 */
export const WithEventHandlers: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [isFocused, setIsFocused] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    return (
      <>
        <FocusRing isFocused={isFocused}>
          <rect
            aria-label={`Clickable rectangle (${clickCount} clicks)`}
            fill="teal"
            height={32}
            role="button"
            tabIndex={0}
            width={32}
            x={84}
            y={84}
            onBlur={() => {
              setIsFocused(false);
            }}
            onClick={() => {
              setClickCount(prev => prev + 1);
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
          />
        </FocusRing>
        <text fill="black" fontSize="12" x={84} y={130}>
          Clicks: {clickCount}
        </text>
      </>
    );
  },
};
