import { fireEvent, render } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { FocusRing } from '../focusRing';

describe('FocusRing Component', () => {
  const defaultProps = {
    elementPosition: { x: 50, y: 50 },
    elementSize: 32,
    elementStrokeWidth: 2,
  };

  const manualProps = {
    autoDetect: false,
    ...defaultProps,
  };

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <svg>
        <FocusRing {...defaultProps}>
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
        <FocusRing {...defaultProps}>
          <rect data-testid="test-rect" fill="blue" height={20} width={20} x={40} y={40} />
        </FocusRing>
      </svg>
    );

    expect(queryByTestId('focus-ring-focus-outer')).not.toBeInTheDocument();
    expect(queryByTestId('focus-ring-focus-inner')).not.toBeInTheDocument();
  });

  it('shows focus ring when element is focused', () => {
    const { getByTestId, queryByTestId } = render(
      <svg>
        <FocusRing {...defaultProps}>
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

    const rect = getByTestId('test-rect');
    fireEvent.focus(rect);

    expect(queryByTestId('focus-ring-focus-outer')).toBeInTheDocument();
    expect(queryByTestId('focus-ring-focus-inner')).toBeInTheDocument();
  });

  it('hides focus ring when element loses focus', () => {
    const { getByTestId, queryByTestId } = render(
      <svg>
        <FocusRing {...defaultProps}>
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

    const rect = getByTestId('test-rect');

    // Focus the element
    fireEvent.focus(rect);
    expect(queryByTestId('focus-ring-focus-outer')).toBeInTheDocument();

    // Blur the element
    fireEvent.blur(rect);
    expect(queryByTestId('focus-ring-focus-outer')).not.toBeInTheDocument();
  });

  it('calls onFocusChange callback when focus state changes', () => {
    const onFocusChange = vi.fn();

    const { getByTestId } = render(
      <svg>
        <FocusRing {...defaultProps} onFocusChange={onFocusChange}>
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

    const rect = getByTestId('test-rect');

    // Focus the element
    fireEvent.focus(rect);
    expect(onFocusChange).toHaveBeenCalledWith(true);

    // Blur the element
    fireEvent.blur(rect);
    expect(onFocusChange).toHaveBeenCalledWith(false);
  });

  it('calls original onFocus and onBlur handlers', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const { getByTestId } = render(
      <svg>
        <FocusRing {...defaultProps} onBlur={onBlur} onFocus={onFocus}>
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

    const rect = getByTestId('test-rect');

    // Focus the element
    fireEvent.focus(rect);
    expect(onFocus).toHaveBeenCalled();

    // Blur the element
    fireEvent.blur(rect);
    expect(onBlur).toHaveBeenCalled();
  });

  it('does not show focus ring when disabled', () => {
    const { getByTestId, queryByTestId } = render(
      <svg>
        <FocusRing {...defaultProps} disabled={true}>
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

    const rect = getByTestId('test-rect');
    fireEvent.focus(rect);

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
        <FocusRing {...defaultProps} focusConfig={customFocusConfig}>
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

    const rect = getByTestId('test-rect');
    fireEvent.focus(rect);

    const outerRing = getByTestId('focus-ring-focus-outer');
    const innerRing = getByTestId('focus-ring-focus-inner');

    expect(outerRing).toHaveAttribute('stroke', '#ff0000');
    expect(outerRing).toHaveAttribute('stroke-width', '4');
    expect(innerRing).toHaveAttribute('stroke', '#00ff00');
    expect(innerRing).toHaveAttribute('stroke-width', '3');
  });

  it('uses custom dataTestId', () => {
    const { getByTestId } = render(
      <svg>
        <FocusRing {...defaultProps} dataTestId="custom-focus">
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

    const rect = getByTestId('test-rect');
    fireEvent.focus(rect);

    expect(getByTestId('custom-focus-focus-outer')).toBeInTheDocument();
    expect(getByTestId('custom-focus-focus-inner')).toBeInTheDocument();
  });

  it('preserves children props and event handlers', () => {
    const childOnFocus = vi.fn();
    const childOnBlur = vi.fn();

    const { getByTestId } = render(
      <svg>
        <FocusRing {...defaultProps}>
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

    // Focus the element
    fireEvent.focus(rect);
    expect(childOnFocus).toHaveBeenCalled();

    // Blur the element
    fireEvent.blur(rect);
    expect(childOnBlur).toHaveBeenCalled();
  });

  describe('Automatic Element Detection', () => {
    it('automatically detects rect element properties', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing>
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

      const rect = getByTestId('test-rect');
      fireEvent.focus(rect);

      // Focus ring should appear based on detected properties
      expect(getByTestId('focus-ring-focus-outer')).toBeInTheDocument();
      expect(getByTestId('focus-ring-focus-inner')).toBeInTheDocument();
    });

    it('automatically detects circle element properties', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing>
            <circle cx={100} cy={100} data-testid="test-circle" fill="red" r={25} tabIndex={0} />
          </FocusRing>
        </svg>
      );

      const circle = getByTestId('test-circle');
      fireEvent.focus(circle);

      // Focus ring should appear based on detected circle properties
      expect(getByTestId('focus-ring-focus-outer')).toBeInTheDocument();
      expect(getByTestId('focus-ring-focus-inner')).toBeInTheDocument();
    });

    it('allows manual override of auto-detected properties', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing elementSize={100}>
            <rect
              data-testid="test-rect"
              fill="blue"
              height={20}
              tabIndex={0}
              width={20}
              x={10}
              y={10}
            />
          </FocusRing>
        </svg>
      );

      const rect = getByTestId('test-rect');
      fireEvent.focus(rect);

      // Focus ring should appear with manual override size
      const outerRing = getByTestId('focus-ring-focus-outer');
      expect(outerRing).toBeInTheDocument();

      // The focus ring should be larger than the element due to manual override
      expect(parseFloat(outerRing.getAttribute('width') || '0')).toBeGreaterThan(20);
    });

    it('can disable auto-detection and use manual props only', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing {...manualProps}>
            <rect
              data-testid="test-rect"
              fill="blue"
              height={20}
              tabIndex={0}
              width={20}
              x={10}
              y={10}
            />
          </FocusRing>
        </svg>
      );

      const rect = getByTestId('test-rect');
      fireEvent.focus(rect);

      // Focus ring should appear based only on manual props
      expect(getByTestId('focus-ring-focus-outer')).toBeInTheDocument();
    });

    it('handles unknown element types gracefully with defaults', () => {
      const { getByTestId } = render(
        <svg>
          <FocusRing>
            <text data-testid="test-text" tabIndex={0} x={10} y={10}>
              Unknown Element
            </text>
          </FocusRing>
        </svg>
      );

      const text = getByTestId('test-text');
      fireEvent.focus(text);

      // Focus ring should still work with default fallback values
      expect(getByTestId('focus-ring-focus-outer')).toBeInTheDocument();
    });
  });
});
