import { fireEvent, render } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { FocusRing } from '../focusRing';

describe('FocusRing Component', () => {
  it('renders children correctly', () => {
    const { getByTestId } = render(
      <svg>
        <FocusRing isFocused={false}>
          <rect data-testid="test-rect" fill="blue" height={20} width={20} x={40} y={40} />
        </FocusRing>
      </svg>
    );

    const rect = getByTestId('test-rect');
    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute('fill', 'blue');
  });

  it('does not show focus ring initially', () => {
    const { queryByTestId } = render(
      <svg>
        <FocusRing isFocused={false}>
          <rect data-testid="test-rect" fill="blue" height={20} width={20} x={40} y={40} />
        </FocusRing>
      </svg>
    );

    expect(queryByTestId('focus-ring-focus-outer')).not.toBeInTheDocument();
    expect(queryByTestId('focus-ring-focus-inner')).not.toBeInTheDocument();
  });

  it('shows focus ring when isFocused is true', () => {
    const { queryByTestId } = render(
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

  it('hides focus ring when isFocused is false', () => {
    const { queryByTestId } = render(
      <svg>
        <FocusRing isFocused={false}>
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

    expect(queryByTestId('focus-ring-focus-outer')).not.toBeInTheDocument();
  });

  it('does not show focus ring when disabled', () => {
    const { queryByTestId } = render(
      <svg>
        <FocusRing disabled={true} isFocused={true}>
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

    expect(queryByTestId('focus-ring-focus-outer')).not.toBeInTheDocument();
    expect(queryByTestId('focus-ring-focus-inner')).not.toBeInTheDocument();
  });

  it('applies custom focus configuration', () => {
    const customFocusConfig = {
      gap: 2,
      innerColor: '#00ff00',
      innerStrokeWidth: 3,
      outlineColor: '#ff0000',
      outlineStrokeWidth: 4,
    };

    const { getByTestId } = render(
      <svg>
        <FocusRing focusConfig={customFocusConfig} isFocused={true}>
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

    const outerRing = getByTestId('focus-ring-focus-outer');
    const innerRing = getByTestId('focus-ring-focus-inner');

    expect(outerRing).toHaveAttribute('stroke', '#ff0000');
    // In adaptive mode, stroke-width is (outlineStrokeWidth + innerStrokeWidth) * 2
    expect(outerRing).toHaveAttribute('stroke-width', '14'); // (4 + 3) * 2 = 14
    expect(innerRing).toHaveAttribute('stroke', '#00ff00');
    expect(innerRing).toHaveAttribute('stroke-width', '6'); // 3 * 2 = 6
  });

  it('uses custom dataTestId', () => {
    const { getByTestId } = render(
      <svg>
        <FocusRing dataTestId="custom-focus" isFocused={true}>
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

    expect(getByTestId('custom-focus-focus-outer')).toBeInTheDocument();
    expect(getByTestId('custom-focus-focus-inner')).toBeInTheDocument();
  });

  it('preserves children props and event handlers', () => {
    const childOnFocus = vi.fn();
    const childOnBlur = vi.fn();

    const { getByTestId } = render(
      <svg>
        <FocusRing isFocused={false}>
          <rect
            data-testid="test-rect"
            fill="blue"
            height={20}
            tabIndex={0}
            width={20}
            x={40}
            y={40}
            onBlur={childOnBlur}
            onFocus={childOnFocus}
          />
        </FocusRing>
      </svg>
    );

    const rect = getByTestId('test-rect');

    // Focus the element - handlers del hijo deben ejecutarse
    fireEvent.focus(rect);
    expect(childOnFocus).toHaveBeenCalled();

    // Blur the element - handlers del hijo deben ejecutarse
    fireEvent.blur(rect);
    expect(childOnBlur).toHaveBeenCalled();
  });

  describe('Automatic Element Detection', () => {
    it('automatically detects rect element properties', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <rect
              data-testid="test-rect"
              fill="blue"
              height={40}
              tabIndex={0}
              width={60}
              x={20}
              y={30}
            />
          </FocusRing>
        </svg>
      );

      // Focus ring should appear based on detected properties
      expect(getByTestId('focus-ring-focus-outer')).toBeInTheDocument();
      expect(getByTestId('focus-ring-focus-inner')).toBeInTheDocument();
    });

    it('automatically detects circle element properties', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <circle cx={100} cy={100} data-testid="test-circle" fill="red" r={25} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      // Focus ring should appear based on detected circle properties
      expect(getByTestId('focus-ring-focus-outer')).toBeInTheDocument();
      expect(getByTestId('focus-ring-focus-inner')).toBeInTheDocument();
    });

    it('handles unknown element types gracefully with defaults', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing focusConfig={{ variant: 'bounding-box' }} isFocused={true}>
            <text data-testid="test-text" tabIndex={0} x={10} y={10}>
              Unknown Element
            </text>
          </FocusRing>
        </svg>
      );

      // Focus ring should still work with bounding-box fallback
      expect(getByTestId('focus-ring-focus-outer')).toBeInTheDocument();
    });
  });

  describe('Shape Adaptation (Adaptive Mode)', () => {
    it('renders circular focus ring for circle element', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <circle cx={50} cy={50} data-testid="test-circle" r={30} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const outerRing = getByTestId('focus-ring-focus-outer');
      const innerRing = getByTestId('focus-ring-focus-inner');

      // Verify it's a circle element (not rect)
      expect(outerRing.tagName.toLowerCase()).toBe('circle');
      expect(innerRing.tagName.toLowerCase()).toBe('circle');

      // Verify circle attributes are preserved
      expect(outerRing).toHaveAttribute('cx', '50');
      expect(outerRing).toHaveAttribute('cy', '50');
      expect(outerRing).toHaveAttribute('r', '30');
    });

    it('renders ellipse focus ring for ellipse element', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <ellipse cx={100} cy={80} data-testid="test-ellipse" rx={60} ry={40} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const outerRing = getByTestId('focus-ring-focus-outer');

      expect(outerRing.tagName.toLowerCase()).toBe('ellipse');
      expect(outerRing).toHaveAttribute('cx', '100');
      expect(outerRing).toHaveAttribute('cy', '80');
      expect(outerRing).toHaveAttribute('rx', '60');
      expect(outerRing).toHaveAttribute('ry', '40');
    });

    it('renders path focus ring for path element', () => {
      const pathD = 'M 10 10 L 90 90 L 10 90 Z';
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <path d={pathD} data-testid="test-path" tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const outerRing = getByTestId('focus-ring-focus-outer');

      expect(outerRing.tagName.toLowerCase()).toBe('path');
      expect(outerRing).toHaveAttribute('d', pathD);
    });

    it('renders polygon focus ring for polygon element', () => {
      const points = '10,10 90,10 50,90';
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <polygon data-testid="test-polygon" points={points} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const outerRing = getByTestId('focus-ring-focus-outer');

      expect(outerRing.tagName.toLowerCase()).toBe('polygon');
      expect(outerRing).toHaveAttribute('points', points);
    });

    it('renders line focus ring for line element (halo technique)', () => {
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

      const outerRing = getByTestId('focus-ring-focus-outer');

      expect(outerRing.tagName.toLowerCase()).toBe('line');
      expect(outerRing).toHaveAttribute('x1', '10');
      expect(outerRing).toHaveAttribute('y1', '20');
      expect(outerRing).toHaveAttribute('x2', '90');
      expect(outerRing).toHaveAttribute('y2', '80');

      // Verify halo technique: stroke-width includes original width
      // (2 + (2 + 2)) * 2 = 10
      expect(outerRing).toHaveAttribute('stroke-width', '10');
    });

    it('renders polyline focus ring for polyline element (halo technique)', () => {
      const points = '10,10 50,50 90,10';
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <polyline data-testid="test-polyline" points={points} strokeWidth={3} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const outerRing = getByTestId('focus-ring-focus-outer');

      expect(outerRing.tagName.toLowerCase()).toBe('polyline');
      expect(outerRing).toHaveAttribute('points', points);

      // Verify halo technique for open lines
      // (3 + (2 + 2)) * 2 = 11
      expect(outerRing).toHaveAttribute('stroke-width', '11');
    });

    it('uses round stroke-linecap for line elements', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <line data-testid="test-line" tabIndex={0} x1={10} x2={90} y1={20} y2={80} />
          </FocusRing>
        </svg>
      );

      const outerRing = getByTestId('focus-ring-focus-outer');

      expect(outerRing).toHaveAttribute('stroke-linecap', 'round');
      expect(outerRing).toHaveAttribute('stroke-linejoin', 'round');
    });

    it('uses miter stroke-linejoin for closed shapes', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing isFocused={true}>
            <rect data-testid="test-rect" height={50} tabIndex={0} width={100} x={10} y={20} />
          </FocusRing>
        </svg>
      );

      const outerRing = getByTestId('focus-ring-focus-outer');

      expect(outerRing).toHaveAttribute('stroke-linejoin', 'miter');
      expect(outerRing).toHaveAttribute('stroke-miterlimit', '10');
    });
  });
});
