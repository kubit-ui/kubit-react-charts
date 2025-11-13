import type { Meta, StoryObj } from '@storybook/react';

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

A reusable component that wraps SVG elements and automatically handles focus ring rendering. This is the basic implementation that always renders rectangular focus rings.

### Features

- **Automatic Focus Management**: Uses the \`useFocus\` hook internally to manage focus state
- **Reuses Existing Logic**: Leverages \`calculateFocusOutline\` utility for precise calculations
- **Consistent Styling**: Maintains existing \`FocusConfig\` API for uniform appearance
- **Event Preservation**: Preserves original event handlers on wrapped children
- **Configurable**: Supports disabled state and focus change callbacks

### Basic Implementation Limitations

- **Rectangular Only**: Always renders rectangular focus rings regardless of element shape
- **Manual Props**: Requires explicit \`elementSize\`, \`elementPosition\`, etc.
- **Single Child**: Supports only one SVG element at a time

### Usage

This component significantly reduces focus ring implementation from ~30 lines to ~3 lines:

\`\`\`tsx
// Before (30+ lines of manual implementation)
const focusOutline = calculateFocusOutline({...});
{isFocused && focusOutline.type === 'rectangle' && (
  <g>
    <rect {...focusOutline.outer} />
    <rect {...focusOutline.inner} />
  </g>
)}

// After (3 lines with FocusRing)
<FocusRing elementSize={32} elementPosition={{x: 50, y: 50}}>
  <YourSVGElement />
</FocusRing>
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
 * Basic usage of FocusRing with automatic element detection.
 * The component automatically detects the rectangle's properties.
 * Click on the rectangle and use Tab to see the focus ring in action.
 */
export const BasicUsage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <FocusRing>
      <rect
        aria-label="Interactive rectangle with auto-detection"
        fill="blue"
        height={32}
        role="button"
        tabIndex={0}
        width={32}
        x={84}
        y={84}
      />
    </FocusRing>
  ),
};

/**
 * Manual configuration mode (legacy/compatibility mode).
 * Use this when you need precise control or when working with custom components.
 */
export const ManualConfiguration: Story = {
  args: {
    autoDetect: false,
    elementPosition: { x: 100, y: 100 },
    elementSize: 32,
    elementStrokeWidth: 0,
  },
  render: args => (
    <FocusRing {...args}>
      <rect
        aria-label="Interactive rectangle with manual config"
        fill="purple"
        height={args.elementSize}
        role="button"
        tabIndex={0}
        width={args.elementSize}
        x={(args.elementPosition?.x ?? 100) - (args.elementSize ?? 32) / 2}
        y={(args.elementPosition?.y ?? 100) - (args.elementSize ?? 32) / 2}
      />
    </FocusRing>
  ),
};

/**
 * Automatic detection with different SVG elements.
 * Demonstrates how FocusRing automatically detects properties from various element types.
 */
export const AutomaticDetection: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <>
      {/* Rectangle - automatically detected */}
      <FocusRing>
        <rect
          aria-label="Auto-detected rectangle"
          fill="blue"
          height={30}
          role="button"
          stroke="darkblue"
          strokeWidth={1}
          tabIndex={0}
          width={50}
          x={30}
          y={30}
        />
      </FocusRing>

      {/* Circle - automatically detected */}
      <FocusRing>
        <circle
          aria-label="Auto-detected circle"
          cx={140}
          cy={45}
          fill="red"
          r={20}
          role="button"
          stroke="darkred"
          strokeWidth={2}
          tabIndex={0}
        />
      </FocusRing>

      {/* Ellipse - automatically detected */}
      <FocusRing>
        <ellipse
          aria-label="Auto-detected ellipse"
          cx={100}
          cy={120}
          fill="green"
          role="button"
          rx={30}
          ry={15}
          stroke="darkgreen"
          strokeWidth={1}
          tabIndex={0}
        />
      </FocusRing>

      {/* Polygon - automatically detected */}
      <FocusRing>
        <polygon
          aria-label="Auto-detected triangle"
          fill="orange"
          points="50,150 75,180 25,180"
          role="button"
          stroke="darkorange"
          strokeWidth={2}
          tabIndex={0}
        />
      </FocusRing>
    </>
  ),
};

/**
 * Manual override of auto-detected properties.
 * Shows how you can override specific properties while still using auto-detection.
 */
export const WithManualOverride: Story = {
  args: {
    elementSize: 60, // Override the detected size
  },
  render: args => (
    <FocusRing {...args}>
      <circle
        aria-label="Circle with size override"
        cx={100}
        cy={100}
        fill="purple"
        r={20}
        role="button"
        stroke="indigo"
        strokeWidth={2}
        tabIndex={0}
      />
    </FocusRing>
  ),
};

/**
 * FocusRing with custom focus configuration.
 * Demonstrates how to customize colors, stroke widths, and gaps.
 */
export const CustomFocusConfig: Story = {
  args: {
    elementPosition: { x: 100, y: 100 },
    elementSize: 48,
    elementStrokeWidth: 3,
    focusConfig: {
      gap: 3,
      innerColor: '#ffffff',
      innerStrokeWidth: 2,
      outlineColor: '#ff6b35',
      outlineStrokeWidth: 4,
    },
  },
  render: args => (
    <FocusRing {...args}>
      <rect
        aria-label="Interactive rectangle with custom focus"
        fill="purple"
        height={args.elementSize}
        role="button"
        stroke="darkpurple"
        strokeWidth={args.elementStrokeWidth}
        tabIndex={0}
        width={args.elementSize}
        x={(args.elementPosition?.x ?? 100) - (args.elementSize ?? 48) / 2}
        y={(args.elementPosition?.y ?? 100) - (args.elementSize ?? 48) / 2}
      />
    </FocusRing>
  ),
};

/**
 * Disabled FocusRing example.
 * Even when focused, no focus ring will appear.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    elementPosition: { x: 100, y: 100 },
    elementSize: 36,
    elementStrokeWidth: 1,
  },
  render: args => (
    <FocusRing {...args}>
      <rect
        aria-label="Disabled focus ring rectangle"
        fill="gray"
        height={args.elementSize}
        role="button"
        stroke="darkgray"
        strokeWidth={args.elementStrokeWidth}
        style={{ opacity: 0.6 }}
        tabIndex={0}
        width={args.elementSize}
        x={(args.elementPosition?.x ?? 100) - (args.elementSize ?? 36) / 2}
        y={(args.elementPosition?.y ?? 100) - (args.elementSize ?? 36) / 2}
      />
    </FocusRing>
  ),
};

/**
 * Multiple FocusRing elements to demonstrate independent behavior.
 * Each element has its own focus ring that appears/disappears independently.
 */
export const MultiplElements: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <>
      <FocusRing
        elementPosition={{ x: 60, y: 60 }}
        elementSize={24}
        elementStrokeWidth={0}
        focusConfig={{ outlineColor: '#0078d4' }}
      >
        <rect
          aria-label="Blue square"
          fill="blue"
          height={24}
          role="button"
          tabIndex={0}
          width={24}
          x={48}
          y={48}
        />
      </FocusRing>

      <FocusRing
        elementPosition={{ x: 140, y: 60 }}
        elementSize={32}
        elementStrokeWidth={1}
        focusConfig={{ outlineColor: '#d13438' }}
      >
        <circle
          aria-label="Red circle"
          cx={140}
          cy={60}
          fill="red"
          r={16}
          role="button"
          stroke="darkred"
          strokeWidth={1}
          tabIndex={0}
        />
      </FocusRing>

      <FocusRing
        elementPosition={{ x: 100, y: 120 }}
        elementSize={28}
        elementStrokeWidth={2}
        focusConfig={{ outlineColor: '#107c10' }}
      >
        <polygon
          aria-label="Green triangle"
          fill="green"
          points="86,134 100,106 114,134"
          role="button"
          stroke="darkgreen"
          strokeWidth={2}
          tabIndex={0}
        />
      </FocusRing>
    </>
  ),
};

/**
 * Integration example showing FocusRing with event handlers.
 * Demonstrates preservation of original event handlers and focus change callback.
 */
export const WithEventHandlers: Story = {
  args: {
    elementPosition: { x: 100, y: 100 },
    elementSize: 40,
    elementStrokeWidth: 2,
  },
  render: args => (
    <FocusRing
      {...args}
      onBlur={() => alert('FocusRing onBlur')}
      onFocus={() => alert('FocusRing onFocus')}
      onFocusChange={focused => alert(`Focus changed: ${focused}`)}
    >
      <rect
        aria-label="Interactive rectangle with event handlers"
        fill="orange"
        height={args.elementSize}
        role="button"
        stroke="darkorange"
        strokeWidth={args.elementStrokeWidth}
        tabIndex={0}
        width={args.elementSize}
        x={(args.elementPosition?.x ?? 100) - (args.elementSize ?? 32) / 2}
        y={(args.elementPosition?.y ?? 100) - (args.elementSize ?? 32) / 2}
        onBlur={() => alert('Child onBlur')}
        onClick={() => alert('Rectangle clicked!')}
        onFocus={() => alert('Child onFocus')}
      />
    </FocusRing>
  ),
};
