import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { FocusRing } from '../focusRing';
import { focusRingArgtypes } from './argtypes';

// Common style to disable browser's native focus outline
const noOutlineStyle = { outline: 'none' } as const;

// Standard decorator for simple SVG stories
const svgDecorator = (Story: React.ComponentType): JSX.Element => (
  <div style={{ padding: '20px' }}>
    <svg height="200" style={{ border: '1px solid #ccc' }} width="200">
      <Story />
    </svg>
  </div>
);

const meta: Meta<typeof FocusRing> = {
  argTypes: focusRingArgtypes,
  component: FocusRing,
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
- **Reuses Logic**: Leverages focus ring utilities for precise calculations
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
  decorators: [svgDecorator],
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
          style={noOutlineStyle}
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
  decorators: [svgDecorator],
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
          style={noOutlineStyle}
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
  decorators: [svgDecorator],
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
          style={noOutlineStyle}
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
  decorators: [svgDecorator],
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
          style={noOutlineStyle}
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
  decorators: [svgDecorator],
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
          style={noOutlineStyle}
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
  decorators: [svgDecorator],
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
            style={noOutlineStyle}
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
            style={noOutlineStyle}
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
            style={noOutlineStyle}
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
  decorators: [svgDecorator],
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
            style={noOutlineStyle}
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

/**
 * Interactive playground with different SVG shapes and real-time controls.
 * Test adaptive vs bounding-box variants with various complex shapes.
 */
export const InteractivePlayground: Story = {
  decorators: [], // Override global decorator
  parameters: {
    layout: 'padded',
  },
  render: function InteractivePlaygroundRender() {
    const [focusedShape, setFocusedShape] = useState<string | null>(null);

    return (
      <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '40px' }}>
        <h1 style={{ marginBottom: '30px' }}>FocusRing Interactive Playground</h1>

        <div
          style={{
            background: 'white',
            borderRadius: '8px',
            marginBottom: '30px',
            padding: '20px',
          }}
        >
          <h2>Elements WITHOUT stroke (strokeWidth=0)</h2>
          <p>
            Click on shapes to see focus rings. The focus rings appear perfectly visible because
            there's no element stroke to cover them.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
            {/* Circle without stroke */}
            <div
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() =>
                setFocusedShape(focusedShape === 'circle-no-stroke' ? null : 'circle-no-stroke')
              }
            >
              <svg height="150" style={{ border: '1px solid #ddd', display: 'block' }} width="150">
                <FocusRing isFocused={focusedShape === 'circle-no-stroke'}>
                  <circle
                    cx={75}
                    cy={75}
                    fill="#ff6b6b"
                    r={30}
                    strokeWidth={0}
                    style={noOutlineStyle}
                  />
                </FocusRing>
              </svg>
              <p>Circle (no stroke)</p>
            </div>

            {/* Rectangle without stroke */}
            <div
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() =>
                setFocusedShape(focusedShape === 'rect-no-stroke' ? null : 'rect-no-stroke')
              }
            >
              <svg height="150" style={{ border: '1px solid #ddd', display: 'block' }} width="150">
                <FocusRing isFocused={focusedShape === 'rect-no-stroke'}>
                  <rect
                    fill="#51cf66"
                    height={50}
                    strokeWidth={0}
                    style={noOutlineStyle}
                    width={60}
                    x={45}
                    y={50}
                  />
                </FocusRing>
              </svg>
              <p>Rectangle (no stroke)</p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: '8px',
            marginBottom: '30px',
            padding: '20px',
          }}
        >
          <h2>Elements WITH stroke (strokeWidth={'>'} 0)</h2>
          <p>
            The FocusRing automatically accounts for the element's stroke width to ensure focus
            rings appear outside the stroke, preventing them from being covered.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
            {/* Circle WITH stroke */}
            <div
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => setFocusedShape(focusedShape === 'circle' ? null : 'circle')}
            >
              <svg height="150" style={{ border: '1px solid #ddd', display: 'block' }} width="150">
                <FocusRing isFocused={focusedShape === 'circle'}>
                  <circle
                    cx={75}
                    cy={75}
                    fill="#ff6b6b"
                    r={30}
                    stroke="#c92a2a"
                    strokeWidth={3}
                    style={noOutlineStyle}
                  />
                </FocusRing>
              </svg>
              <p>Circle (stroke: 3px)</p>
            </div>

            {/* Rectangle WITH stroke */}
            <div
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => setFocusedShape(focusedShape === 'rect' ? null : 'rect')}
            >
              <svg height="150" style={{ border: '1px solid #ddd', display: 'block' }} width="150">
                <FocusRing isFocused={focusedShape === 'rect'}>
                  <rect
                    fill="#51cf66"
                    height={50}
                    stroke="#2f9e44"
                    strokeWidth={2}
                    style={noOutlineStyle}
                    width={60}
                    x={45}
                    y={50}
                  />
                </FocusRing>
              </svg>
              <p>Rectangle (stroke: 2px)</p>
            </div>

            {/* Pentagon WITH stroke */}
            <div
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => setFocusedShape(focusedShape === 'pentagon' ? null : 'pentagon')}
            >
              <svg height="150" style={{ border: '1px solid #ddd', display: 'block' }} width="150">
                <FocusRing isFocused={focusedShape === 'pentagon'}>
                  <polygon
                    fill="#ff8787"
                    points="75,40 105,65 95,100 55,100 45,65"
                    stroke="#c92a2a"
                    strokeWidth={2}
                    style={noOutlineStyle}
                  />
                </FocusRing>
              </svg>
              <p>Pentagon (stroke: 2px)</p>
            </div>

            {/* Path (Line Chart) WITH stroke */}
            <div
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => setFocusedShape(focusedShape === 'path' ? null : 'path')}
            >
              <svg height="150" style={{ border: '1px solid #ddd', display: 'block' }} width="150">
                <FocusRing isFocused={focusedShape === 'path'}>
                  <path
                    d="M 20,75 Q 50,30 75,75 T 130,75"
                    fill="none"
                    stroke="#339af0"
                    strokeLinecap="round"
                    strokeWidth={3}
                    style={noOutlineStyle}
                  />
                </FocusRing>
              </svg>
              <p>Line Path (stroke: 3px)</p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            marginBottom: '30px',
            padding: '20px',
          }}
        >
          <h3>💡 Technical Note</h3>
          <p style={{ marginBottom: '10px' }}>
            <strong>How it works:</strong> The FocusRing uses the "Clone & Scale" technique. It
            clones your element and scales its stroke-width to create focus rings that perfectly
            match the shape.
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Stroke width calculation:</strong>
          </p>
          <ul style={{ marginLeft: '20px' }}>
            <li>
              <code>outerStrokeWidth = originalStroke + (outlineStroke + innerStroke) * 2</code>
            </li>
            <li>
              <code>innerStrokeWidth = originalStroke + innerStroke * 2</code>
            </li>
          </ul>
          <p style={{ marginTop: '10px' }}>
            This ensures the focus rings are always visible outside the element's stroke, even when
            the element has a thick border.
          </p>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <h3>Current Focus: {focusedShape || 'None'}</h3>
        </div>
      </div>
    );
  },
};

/**
 * Comparison: Element WITH stroke vs WITHOUT stroke.
 * Shows how FocusRing adapts to elements with different stroke widths.
 */
export const WithAndWithoutStroke: Story = {
  decorators: [], // Override global decorator
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [focusedWithStroke, setFocusedWithStroke] = useState(false);
    const [focusedWithoutStroke, setFocusedWithoutStroke] = useState(false);

    return (
      <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
        {/* Element WITHOUT stroke */}
        <div style={{ textAlign: 'center' }}>
          <h3>Without Stroke</h3>
          <svg height="200" style={{ border: '1px solid #ccc' }} width="200">
            <FocusRing isFocused={focusedWithoutStroke}>
              <circle
                aria-label="Circle without stroke"
                cx={100}
                cy={100}
                fill="#4c6ef5"
                r={40}
                role="button"
                strokeWidth={0}
                style={noOutlineStyle}
                tabIndex={0}
                onBlur={() => setFocusedWithoutStroke(false)}
                onFocus={() => setFocusedWithoutStroke(true)}
              />
            </FocusRing>
          </svg>
          <p>strokeWidth: 0</p>
          <p style={{ color: '#666', fontSize: '12px' }}>
            Focus ring appears directly around the shape
          </p>
        </div>

        {/* Element WITH stroke */}
        <div style={{ textAlign: 'center' }}>
          <h3>With Stroke</h3>
          <svg height="200" style={{ border: '1px solid #ccc' }} width="200">
            <FocusRing isFocused={focusedWithStroke}>
              <circle
                aria-label="Circle with stroke"
                cx={100}
                cy={100}
                fill="#4c6ef5"
                r={40}
                role="button"
                stroke="#1c7ed6"
                strokeWidth={6}
                style={noOutlineStyle}
                tabIndex={0}
                onBlur={() => setFocusedWithStroke(false)}
                onFocus={() => setFocusedWithStroke(true)}
              />
            </FocusRing>
          </svg>
          <p>strokeWidth: 6</p>
          <p style={{ color: '#666', fontSize: '12px' }}>
            Focus ring accounts for stroke, appears outside
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Line path example showing how FocusRing creates a halo around open paths.
 * The focus ring preserves strokeLinecap for smooth line endings.
 */
export const LinePathExample: Story = {
  decorators: [svgDecorator],
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FocusRing isFocused={isFocused}>
        <path
          aria-label="Line chart path"
          d="M 20,100 L 60,50 L 100,80 L 140,40 L 180,90"
          fill="none"
          role="button"
          stroke="#12b886"
          strokeLinecap="round"
          strokeWidth={3}
          style={noOutlineStyle}
          tabIndex={0}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </FocusRing>
    );
  },
};

/**
 * Children Mode: The element is wrapped directly inside FocusRing.
 * This is the simplest usage pattern for most cases.
 */
export const ChildrenMode: Story = {
  decorators: [svgDecorator],
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FocusRing isFocused={isFocused}>
        <rect
          aria-label="Rectangle using children mode"
          fill="#7950f2"
          height={60}
          role="button"
          stroke="#5f3dc4"
          strokeWidth={2}
          style={noOutlineStyle}
          tabIndex={0}
          width={80}
          x={60}
          y={70}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </FocusRing>
    );
  },
};

/**
 * TargetRef Mode: The element and FocusRing are rendered separately.
 * Useful when you need precise control over z-order or can't wrap the element.
 */
export const TargetRefMode: Story = {
  decorators: [svgDecorator],
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const ref = useRef<SVGRectElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    return (
      <>
        <FocusRing isFocused={isFocused} targetRef={ref} />
        <rect
          ref={ref}
          aria-label="Rectangle using targetRef mode"
          fill="#7950f2"
          height={60}
          role="button"
          stroke="#5f3dc4"
          strokeWidth={2}
          style={noOutlineStyle}
          tabIndex={0}
          width={80}
          x={60}
          y={70}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </>
    );
  },
};

/**
 * Bounding-Box variant with irregular polygon.
 * The focus ring is always rectangular, using getBBox() dimensions.
 */
export const BoundingBoxVariant: Story = {
  decorators: [svgDecorator],
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FocusRing focusConfig={{ variant: 'bounding-box' }} isFocused={isFocused}>
        <polygon
          aria-label="Star using bounding-box variant"
          fill="#f59f00"
          points="100,30 115,70 155,70 125,95 135,135 100,110 65,135 75,95 45,70 85,70"
          role="button"
          stroke="#f08c00"
          strokeWidth={2}
          style={noOutlineStyle}
          tabIndex={0}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
      </FocusRing>
    );
  },
};

/**
 * Adaptive variant with irregular polygon.
 * The focus ring follows the exact shape of the star.
 */
export const AdaptiveVariant: Story = {
  decorators: [svgDecorator],
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <FocusRing focusConfig={{ variant: 'adaptive' }} isFocused={isFocused}>
        <polygon
          aria-label="Star using adaptive variant"
          fill="#f59f00"
          points="100,30 115,70 155,70 125,95 135,135 100,110 65,135 75,95 45,70 85,70"
          role="button"
          stroke="#f08c00"
          strokeWidth={2}
          style={noOutlineStyle}
          tabIndex={0}
          onBlur={() => setIsFocused(false)}
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
  decorators: [], // Override global decorator
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [focusedAdaptive, setFocusedAdaptive] = useState(false);
    const [focusedBoundingBox, setFocusedBoundingBox] = useState(false);

    const starPoints = '100,30 115,70 155,70 125,95 135,135 100,110 65,135 75,95 45,70 85,70';

    return (
      <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
        {/* Adaptive Variant */}
        <div style={{ textAlign: 'center' }}>
          <h3>Adaptive Variant</h3>
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
          <p style={{ color: '#666', fontSize: '12px' }}>Focus ring follows the exact star shape</p>
        </div>

        {/* Bounding-Box Variant */}
        <div style={{ textAlign: 'center' }}>
          <h3>Bounding-Box Variant</h3>
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
          <p style={{ color: '#666', fontSize: '12px' }}>Focus ring is always rectangular</p>
        </div>
      </div>
    );
  },
};

/**
 * ⚠️ CRITICAL: Z-Order demonstration with targetRef mode and adaptive variant.
 *
 * When using adaptive variant with targetRef mode, the FocusRing MUST be rendered
 * BEFORE the target element. Otherwise, the focus ring strokes will appear on top
 * of the element, covering it.
 *
 * This story demonstrates both correct and incorrect rendering order.
 */
export const ZOrderWithTargetRef: Story = {
  decorators: [], // Override global decorator
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const correctRef = useRef<SVGCircleElement>(null);
    const incorrectRef = useRef<SVGCircleElement>(null);
    const [focusedCorrect, setFocusedCorrect] = useState(false);
    const [focusedIncorrect, setFocusedIncorrect] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        <div
          style={{
            background: '#d4edda',
            border: '2px solid #28a745',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <h2 style={{ color: '#155724', marginTop: 0 }}>✅ CORRECT: FocusRing Before Element</h2>
          <p style={{ color: '#155724' }}>
            The FocusRing is rendered BEFORE the circle element. The focus ring appears behind the
            element, which is the correct behavior.
          </p>
          <svg height="200" style={{ border: '1px solid #28a745', display: 'block' }} width="200">
            {/* ✅ FocusRing BEFORE element */}
            <FocusRing isFocused={focusedCorrect} targetRef={correctRef} />
            <circle
              ref={correctRef}
              aria-label="Correct z-order circle"
              cx={100}
              cy={100}
              fill="#51cf66"
              r={40}
              role="button"
              stroke="#2f9e44"
              strokeWidth={3}
              style={noOutlineStyle}
              tabIndex={0}
              onBlur={() => setFocusedCorrect(false)}
              onFocus={() => setFocusedCorrect(true)}
            />
          </svg>
          <p style={{ color: '#155724', fontSize: '14px', marginBottom: 0, marginTop: '10px' }}>
            <strong>Code:</strong>
          </p>
          <pre
            style={{
              background: '#f8f9fa',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
              padding: '10px',
            }}
          >
            {`<>
  <FocusRing targetRef={ref} isFocused={focused} />
  <circle ref={ref} ... />
</>`}
          </pre>
        </div>

        <div
          style={{
            background: '#f8d7da',
            border: '2px solid #dc3545',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <h2 style={{ color: '#721c24', marginTop: 0 }}>❌ INCORRECT: Element Before FocusRing</h2>
          <p style={{ color: '#721c24' }}>
            The circle element is rendered BEFORE the FocusRing. The focus ring strokes cover the
            element, which is incorrect behavior. Notice how the element appears dimmer/covered.
          </p>
          <svg height="200" style={{ border: '1px solid #dc3545', display: 'block' }} width="200">
            {/* ❌ Element BEFORE FocusRing */}
            <circle
              ref={incorrectRef}
              aria-label="Incorrect z-order circle"
              cx={100}
              cy={100}
              fill="#ff6b6b"
              r={40}
              role="button"
              stroke="#c92a2a"
              strokeWidth={3}
              style={noOutlineStyle}
              tabIndex={0}
              onBlur={() => setFocusedIncorrect(false)}
              onFocus={() => setFocusedIncorrect(true)}
            />
            <FocusRing isFocused={focusedIncorrect} targetRef={incorrectRef} />
          </svg>
          <p style={{ color: '#721c24', fontSize: '14px', marginBottom: 0, marginTop: '10px' }}>
            <strong>Code (WRONG):</strong>
          </p>
          <pre
            style={{
              background: '#f8f9fa',
              borderRadius: '4px',
              fontSize: '12px',
              overflow: 'auto',
              padding: '10px',
            }}
          >
            {`<>
  <circle ref={ref} ... />
  <FocusRing targetRef={ref} isFocused={focused} />
</>`}
          </pre>
        </div>

        <div
          style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <h3 style={{ marginTop: 0 }}>📝 Key Takeaways</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>
              <strong>SVG paint order is sequential</strong>: Elements are painted in the order they
              appear in the DOM
            </li>
            <li>
              <strong>targetRef mode requires manual z-order management</strong>: You must ensure
              FocusRing comes before the element
            </li>
            <li>
              <strong>children mode handles this automatically</strong>: The component internally
              renders the focus ring before the child element
            </li>
            <li>
              <strong>This only affects adaptive variant</strong>: bounding-box variant can be
              rendered in any order
            </li>
          </ul>
        </div>
      </div>
    );
  },
};
