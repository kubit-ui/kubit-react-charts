import { render } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { FocusRing } from '../focusRing';

// Mock getBBox for SVG elements since jsdom doesn't implement it properly
if (!SVGElement.prototype.getBBox) {
  SVGElement.prototype.getBBox = function () {
    // Return reasonable defaults based on element type and attributes
    const element = this as SVGElement;
    const tagName = element.tagName.toLowerCase();

    // For text elements, estimate based on content
    if (tagName === 'text') {
      const fontSize = parseFloat(element.getAttribute('font-size') || '16');
      const textContent = element.textContent || '';
      const width = textContent.length * fontSize * 0.6;
      const x = parseFloat(element.getAttribute('x') || '0');
      const y = parseFloat(element.getAttribute('y') || '0');
      return {
        height: fontSize,
        width,
        x,
        y: y - fontSize,
      };
    }

    // For other elements, use their attributes or defaults
    const x = parseFloat(element.getAttribute('x') || element.getAttribute('cx') || '0');
    const y = parseFloat(element.getAttribute('y') || element.getAttribute('cy') || '0');
    const width = parseFloat(element.getAttribute('width') || element.getAttribute('r') || '0') * 2;
    const height =
      parseFloat(element.getAttribute('height') || element.getAttribute('r') || '0') * 2;

    return { height, width, x, y };
  };
}

describe('FocusRing Component', () => {
  it('renders children and shows/hides focus ring based on isFocused prop', () => {
    const { getByTestId, queryByTestId, rerender } = render(
      <svg>
        <FocusRing isFocused={false}>
          <rect data-testid="test-rect" fill="blue" height={20} width={20} x={40} y={40} />
        </FocusRing>
      </svg>
    );

    // Children should render
    const rect = getByTestId('test-rect');
    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute('fill', 'blue');

    // No focus ring when isFocused=false
    expect(queryByTestId('focus-ring-focus-outer')).not.toBeInTheDocument();

    // Focus ring appears when isFocused=true
    rerender(
      <svg>
        <FocusRing isFocused={true}>
          <rect
            data-testid="test-rect"
            fill="blue"
            height={20}
            tabIndex={0}
            width={20}
            x={40}
            y={40}
          />
        </FocusRing>
      </svg>
    );
    expect(queryByTestId('focus-ring-focus-outer')).toBeInTheDocument();
    expect(queryByTestId('focus-ring-focus-inner')).toBeInTheDocument();
  });

  it('respects disabled prop and does not show focus ring', () => {
    const { queryByTestId } = render(
      <svg>
        <FocusRing disabled={true} isFocused={true}>
          <rect data-testid="test-rect" height={20} tabIndex={0} width={20} x={40} y={40} />
        </FocusRing>
      </svg>
    );

    expect(queryByTestId('focus-ring-focus-outer')).not.toBeInTheDocument();
    expect(queryByTestId('focus-ring-focus-inner')).not.toBeInTheDocument();
  });

  it('applies custom focus configuration and dataTestId', () => {
    const customFocusConfig = {
      gap: 2,
      innerColor: '#00ff00',
      innerStrokeWidth: 3,
      outlineColor: '#ff0000',
      outlineStrokeWidth: 4,
    };

    const { getByTestId } = render(
      <svg>
        <FocusRing dataTestId="custom-focus" focusConfig={customFocusConfig} isFocused={true}>
          <rect data-testid="test-rect" height={20} tabIndex={0} width={20} x={40} y={40} />
        </FocusRing>
      </svg>
    );

    const outerRing = getByTestId('custom-focus-focus-outer');
    const innerRing = getByTestId('custom-focus-focus-inner');

    expect(outerRing).toHaveAttribute('stroke', '#ff0000');
    expect(outerRing).toHaveAttribute('stroke-width', '14'); // (4 + 3) * 2
    expect(innerRing).toHaveAttribute('stroke', '#00ff00');
    expect(innerRing).toHaveAttribute('stroke-width', '6'); // 3 * 2
  });

  it('returns null when neither children nor targetRef are provided', () => {
    const { container } = render(
      <svg>
        <FocusRing isFocused={true} />
      </svg>
    );

    // Should not render anything
    expect(container.querySelector('[data-testid*="focus-ring"]')).not.toBeInTheDocument();
    expect(container.querySelector('.focus-ring-container')).not.toBeInTheDocument();
  });

  describe('Shape Adaptation (Adaptive Mode)', () => {
    it('adapts to circle shapes correctly', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <circle cx={50} cy={50} data-testid="test-circle" r={30} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const circleOuter = getByTestId('focus-ring-focus-outer');
      const circleInner = getByTestId('focus-ring-focus-inner');

      expect(circleOuter.tagName.toLowerCase()).toBe('circle');
      expect(circleInner.tagName.toLowerCase()).toBe('circle');
      expect(circleOuter).toHaveAttribute('cx', '50');
      expect(circleOuter).toHaveAttribute('cy', '50');
      expect(circleOuter).toHaveAttribute('r', '30');
    });

    it('adapts to ellipse shapes correctly', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <ellipse cx={100} cy={80} data-testid="test-ellipse" rx={60} ry={40} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const ellipseOuter = getByTestId('focus-ring-focus-outer');
      expect(ellipseOuter.tagName.toLowerCase()).toBe('ellipse');
      expect(ellipseOuter).toHaveAttribute('cx', '100');
      expect(ellipseOuter).toHaveAttribute('rx', '60');
    });

    it('adapts to rect shapes correctly', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <rect data-testid="test-rect" height={50} tabIndex={0} width={100} x={10} y={20} />
          </FocusRing>
        </svg>
      );

      const rectOuter = getByTestId('focus-ring-focus-outer');
      expect(rectOuter.tagName.toLowerCase()).toBe('rect');
      expect(rectOuter).toHaveAttribute('stroke-linejoin', 'miter');
    });

    it('adapts to path shapes', () => {
      const pathD = 'M 10 10 L 90 90 L 10 90 Z';
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <path d={pathD} data-testid="test-path" tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const pathOuter = getByTestId('focus-ring-focus-outer');
      expect(pathOuter.tagName.toLowerCase()).toBe('path');
      expect(pathOuter).toHaveAttribute('d', pathD);
    });

    it('adapts to polygon shapes', () => {
      const points = '10,10 90,10 50,90';
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <polygon data-testid="test-polygon" points={points} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const polygonOuter = getByTestId('focus-ring-focus-outer');
      expect(polygonOuter.tagName.toLowerCase()).toBe('polygon');
      expect(polygonOuter).toHaveAttribute('points', points);
    });

    it('applies halo technique to line elements', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <line
              data-testid="test-line"
              strokeWidth={2}
              tabIndex={0}
              x1={10}
              x2={90}
              y1={20}
              y2={80}
            />
          </FocusRing>
        </svg>
      );

      const lineOuter = getByTestId('focus-ring-focus-outer');
      expect(lineOuter.tagName.toLowerCase()).toBe('line');
      expect(lineOuter).toHaveAttribute('x1', '10');
      expect(lineOuter).toHaveAttribute('stroke-width', '10'); // (2 + (2 + 2)) * 2
      expect(lineOuter).toHaveAttribute('stroke-linecap', 'round');
    });

    it('applies halo technique to polyline elements', () => {
      const points = '10,10 50,50 90,10';
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <polyline data-testid="test-polyline" points={points} strokeWidth={3} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const polylineOuter = getByTestId('focus-ring-focus-outer');
      expect(polylineOuter.tagName.toLowerCase()).toBe('polyline');
      expect(polylineOuter).toHaveAttribute('points', points);
      expect(polylineOuter).toHaveAttribute('stroke-width', '11'); // (3 + (2 + 2)) * 2
      expect(polylineOuter).toHaveAttribute('stroke-linecap', 'round');
    });
  });

  describe('Separate Mode (targetRef)', () => {
    it('renders focus ring using targetRef without wrapping element', () => {
      const ref = { current: null } as React.RefObject<SVGCircleElement>;

      const { container, getByTestId } = render(
        <svg>
          <FocusRing isFocused={true} targetRef={ref}>
            {/* Should not render children in targetRef mode */}
          </FocusRing>
          <circle ref={ref as any} cx={50} cy={50} data-testid="test-circle" r={30} tabIndex={0} />
        </svg>
      );

      const circle = getByTestId('test-circle');
      expect(circle).toBeInTheDocument();

      // Focus rings should be rendered
      expect(getByTestId('focus-ring-focus-outer')).toBeInTheDocument();
      expect(getByTestId('focus-ring-focus-inner')).toBeInTheDocument();

      // Should not have a wrapper g element
      const wrapperGroups = container.querySelectorAll('g[data-testid="focus-ring-wrapper"]');
      expect(wrapperGroups).toHaveLength(0);
    });

    it('respects disabled and isFocused in targetRef mode', () => {
      const ref = { current: null } as React.RefObject<SVGCircleElement>;

      const { queryByTestId, rerender } = render(
        <svg>
          <FocusRing isFocused={false} targetRef={ref} />
          <circle ref={ref as any} cx={50} cy={50} r={30} />
        </svg>
      );

      // Not focused
      expect(queryByTestId('focus-ring-focus-outer')).not.toBeInTheDocument();

      // Disabled
      rerender(
        <svg>
          <FocusRing disabled={true} isFocused={true} targetRef={ref} />
          <circle ref={ref as any} cx={50} cy={50} r={30} />
        </svg>
      );
      expect(queryByTestId('focus-ring-focus-outer')).not.toBeInTheDocument();
    });

    it('adapts to circle in targetRef mode with adaptive variant', () => {
      const circleRef = { current: null } as React.RefObject<SVGCircleElement>;
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true} targetRef={circleRef} />
          <circle ref={circleRef as any} cx={50} cy={50} r={30} />
        </svg>
      );

      const circleOuter = getByTestId('focus-ring-focus-outer');
      expect(circleOuter.tagName.toLowerCase()).toBe('circle');
    });

    it('adapts to rect in targetRef mode with bounding-box variant', () => {
      const rectRef = { current: null } as React.RefObject<SVGRectElement>;
      const { getByTestId } = render(
        <svg>
          <FocusRing
            focusConfig={{ variant: 'bounding-box' }}
            isFocused={true}
            targetRef={rectRef}
          />
          <rect ref={rectRef as any} height={50} width={100} x={10} y={20} />
        </svg>
      );

      const rectOuter = getByTestId('focus-ring-focus-outer');
      expect(rectOuter.tagName.toLowerCase()).toBe('rect');
    });
  });

  describe('Bounding Box Variant', () => {
    it('always renders rectangles and uses getBBox for calculations', () => {
      // Circle should be rect in bounding-box mode
      const { container } = render(
        <svg>
          <FocusRing focusConfig={{ variant: 'bounding-box' }} isFocused={true}>
            <circle cx={50} cy={50} r={30} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const circleOuter = container.querySelector('[data-testid="focus-ring-focus-outer"]');
      const circleInner = container.querySelector('[data-testid="focus-ring-focus-inner"]');

      expect(circleOuter?.tagName.toLowerCase()).toBe('rect');
      expect(circleInner?.tagName.toLowerCase()).toBe('rect');

      // Should have calculated dimensions
      expect(circleOuter).toHaveAttribute('width');
      expect(circleOuter).toHaveAttribute('height');

      const width = parseFloat(circleOuter?.getAttribute('width') || '0');
      const height = parseFloat(circleOuter?.getAttribute('height') || '0');
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    });

    it('works with text elements and applies gap configuration', () => {
      const { container: containerWithGap, getByTestId } = render(
        <svg>
          <FocusRing focusConfig={{ gap: 4, variant: 'bounding-box' }} isFocused={true}>
            <text data-testid="test-text" tabIndex={0} x={50} y={50}>
              Text Element
            </text>
          </FocusRing>
        </svg>
      );

      // Should render for text elements
      expect(getByTestId('focus-ring-focus-outer')).toBeInTheDocument();

      // Compare with no gap
      const { container: containerNoGap } = render(
        <svg>
          <FocusRing focusConfig={{ gap: 0, variant: 'bounding-box' }} isFocused={true}>
            <circle cx={50} cy={50} r={30} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const innerWithGap = containerWithGap.querySelector('[data-testid="focus-ring-focus-inner"]');
      const innerNoGap = containerNoGap.querySelector('[data-testid="focus-ring-focus-inner"]');

      const widthWithGap = parseFloat(innerWithGap?.getAttribute('width') || '0');
      const widthNoGap = parseFloat(innerNoGap?.getAttribute('width') || '0');

      // Inner ring with gap should be larger
      expect(widthWithGap).toBeGreaterThan(widthNoGap);
    });

    it('comparison: same element with adaptive vs bounding-box variants', () => {
      const { container: containerAdaptive } = render(
        <svg>
          <FocusRing focusConfig={{ variant: 'adaptive' }} isFocused={true}>
            <circle cx={50} cy={50} r={30} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const { container: containerBbox } = render(
        <svg>
          <FocusRing focusConfig={{ variant: 'bounding-box' }} isFocused={true}>
            <circle cx={50} cy={50} r={30} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const adaptiveOuter = containerAdaptive.querySelector(
        '[data-testid="focus-ring-focus-outer"]'
      );
      const bboxOuter = containerBbox.querySelector('[data-testid="focus-ring-focus-outer"]');

      // Adaptive preserves circle shape
      expect(adaptiveOuter?.tagName.toLowerCase()).toBe('circle');

      // Bounding-box uses rect
      expect(bboxOuter?.tagName.toLowerCase()).toBe('rect');
    });

    it('updates focus ring when element attributes change (MutationObserver)', async () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <rect data-testid="test-rect" height={50} tabIndex={0} width={100} x={10} y={20} />
          </FocusRing>
        </svg>
      );

      // Get initial focus ring
      const initialOuter = getByTestId('focus-ring-focus-outer');
      const initialX = initialOuter.getAttribute('x');

      // Change the underlying element's position
      const rect = getByTestId('test-rect');
      rect.setAttribute('x', '50');

      // MutationObserver should trigger and update the focus ring
      // Wait a tick for the observer callback to execute
      await new Promise(resolve => setTimeout(resolve, 0));

      // Get updated focus ring
      const updatedOuter = getByTestId('focus-ring-focus-outer');
      const updatedX = updatedOuter.getAttribute('x');

      // Verify that position changed
      expect(updatedX).not.toBe(initialX);
    });
  });
});
