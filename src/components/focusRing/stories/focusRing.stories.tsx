import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Note } from '@/storybook/components/note/note';

import { FocusRing } from '../focusRing';
import type { FocusRingProps } from '../focusRing.types';
import { argtypes } from './argtypes';

// Common style to disable browser's native focus outline
const noOutlineStyle = { outline: 'none' } as const;

const meta: Meta<typeof FocusRing> = {
  argTypes: argtypes(),
  component: FocusRing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Internal Components/FocusRing',
};

export default meta;
type Story = StoryObj<typeof FocusRing>;

// Default args for the component
const defaultArgs: Partial<FocusRingProps> = {
  dataTestId: 'focus-ring',
  disabled: false,
  focusConfig: {
    gap: 0,
    innerColor: '#ffffff',
    innerStrokeWidth: 2,
    outlineColor: '#0078D4',
    outlineStrokeWidth: 2,
    variant: 'adaptive',
  },
  isFocused: true,
};

/**
 * Interactive playground to experiment with FocusRing configurations.
 * Use the controls panel to test different colors, stroke widths, and variants.
 * Edit the focusConfig object to change the variant between "adaptive" and "bounding-box".
 */
export const Playground: Story = {
  args: {
    ...defaultArgs,
  },
  decorators: [
    (Story: React.ComponentType): JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="Usage Modes"
          text={[
            <div key="usage-modes">
              <h4>1. Children Mode (Inline Rendering)</h4>
              <p>
                Wrap the SVG element directly as a child. The component handles rendering order
                automatically.
              </p>
              <pre style={{ background: '#f5f5f5', borderRadius: '4px', padding: '10px' }}>
                {`<FocusRing isFocused={focused}>
  <circle cx={50} cy={50} r={20} />
</FocusRing>`}
              </pre>
              <h4>2. TargetRef Mode (External Reference)</h4>
              <p>Use a ref when you need the element and focus ring rendered separately.</p>
              <pre style={{ background: '#f5f5f5', borderRadius: '4px', padding: '10px' }}>
                {`const elementRef = useRef<SVGCircleElement>(null);

<FocusRing targetRef={elementRef} isFocused={focused} />
<circle ref={elementRef} cx={50} cy={50} r={20} />`}
              </pre>
              <p style={{ marginTop: '15px' }}>
                <strong>💡 Tip:</strong> To change the variant, edit the <code>focusConfig</code>{' '}
                object in the controls and set <code>variant</code> to either{' '}
                <code>"adaptive"</code> or <code>"bounding-box"</code>.
              </p>
            </div>,
          ]}
          variant="information"
        />
        <div style={{ padding: '20px' }}>
          <svg height="200" style={{ border: '1px solid #ccc' }} width="200">
            <Story />
          </svg>
        </div>
      </>
    ),
  ],
  render: args => {
    const [isFocused, setIsFocused] = useState(args.isFocused);

    return (
      <FocusRing {...args} isFocused={isFocused}>
        <circle
          aria-label="Interactive circle"
          cx={100}
          cy={100}
          fill="#4c6ef5"
          r={40}
          role="button"
          stroke="#1c7ed6"
          strokeWidth={3}
          style={noOutlineStyle}
          tabIndex={0}
          onBlur={() => setIsFocused(false)}
          onClick={() => setIsFocused(!isFocused)}
          onFocus={() => setIsFocused(true)}
        />
      </FocusRing>
    );
  },
};

/**
 * Side-by-side comparison of Adaptive vs Bounding-Box variants.
 * Shows the visual difference on the same irregular shape (star).
 */
export const VariantComparison: Story = {
  decorators: [
    (Story: React.ComponentType): JSX.Element => (
      <>
        <Note
          collapsible={true}
          defaultCollapsed={false}
          heading="Focus Ring Variants"
          text={[
            <div key="variants-info">
              <p>The FocusRing component supports two variants to adapt to different use cases:</p>
              <h4>Adaptive Variant (Default)</h4>
              <ul>
                <li>
                  <strong>Follows the exact shape</strong> of the element using the "Clone & Scale"
                  technique
                </li>
                <li>Perfect for complex shapes like polygons, paths, and pie chart segments</li>
                <li>Creates a natural, shape-conforming focus indicator</li>
                <li>
                  <strong>⚠️ Z-order consideration (targetRef mode only):</strong> The FocusRing{' '}
                  <strong>must be rendered before</strong> the target element. This is critical
                  because the adaptive variant generates strokes that grow both{' '}
                  <strong>outward and inward</strong> from the element's path. If rendered after,
                  these inner strokes will overlay and visually cover the element itself, making it
                  appear dimmed or obscured. By rendering the FocusRing first, the element is
                  painted on top, ensuring it remains fully visible with the focus ring behind it.
                </li>
              </ul>
              <h4>Bounding-Box Variant</h4>
              <ul>
                <li>
                  <strong>Always rectangular</strong>, using the element's bounding box dimensions
                </li>
                <li>Simpler and more predictable for irregular shapes</li>
                <li>Better performance for complex paths</li>
                <li>
                  <strong>No z-order constraints</strong> - Can be rendered in any order. Unlike
                  adaptive, this variant generates rectangular borders that are positioned{' '}
                  <strong>outside the element's bounds</strong>, with no overlap. The element and
                  focus ring occupy separate spaces, so rendering order doesn't affect visibility.
                </li>
              </ul>
            </div>,
          ]}
          variant="information"
        />
        <Story />
      </>
    ),
  ],
  parameters: {
    controls: { disable: true },
    layout: 'padded',
  },
  render: () => {
    const [focusedAdaptive, setFocusedAdaptive] = useState(false);
    const [focusedBoundingBox, setFocusedBoundingBox] = useState(false);

    const starPoints = '100,30 115,70 155,70 125,95 135,135 100,110 65,135 75,95 45,70 85,70';

    return (
      <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
        {/* Adaptive Variant */}
        <div style={{ textAlign: 'center' }}>
          <h3>Adaptive</h3>
          <svg height="200" style={{ border: '1px solid #ccc' }} width="200">
            <FocusRing focusConfig={{ variant: 'adaptive' }} isFocused={focusedAdaptive}>
              <polygon
                aria-label="Star with adaptive variant"
                fill="#f59f00"
                points={starPoints}
                role="button"
                stroke="#f08c00"
                strokeWidth={2}
                style={noOutlineStyle}
                tabIndex={0}
                onBlur={() => setFocusedAdaptive(false)}
                onFocus={() => setFocusedAdaptive(true)}
              />
            </FocusRing>
          </svg>
        </div>

        {/* Bounding-Box Variant */}
        <div style={{ textAlign: 'center' }}>
          <h3>Bounding-Box</h3>
          <svg height="200" style={{ border: '1px solid #ccc' }} width="200">
            <FocusRing focusConfig={{ variant: 'bounding-box' }} isFocused={focusedBoundingBox}>
              <polygon
                aria-label="Star with bounding-box variant"
                fill="#f59f00"
                points={starPoints}
                role="button"
                stroke="#f08c00"
                strokeWidth={2}
                style={noOutlineStyle}
                tabIndex={0}
                onBlur={() => setFocusedBoundingBox(false)}
                onFocus={() => setFocusedBoundingBox(true)}
              />
            </FocusRing>
          </svg>
        </div>
      </div>
    );
  },
};
