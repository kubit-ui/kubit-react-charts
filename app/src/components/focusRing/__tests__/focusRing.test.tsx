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
    expect(outerRing).toHaveAttribute('stroke-width', '4');
    expect(innerRing).toHaveAttribute('stroke', '#00ff00');
    expect(innerRing).toHaveAttribute('stroke-width', '3');
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
          <FocusRing isFocused={true}>
            <text data-testid="test-text" tabIndex={0} x={10} y={10}>
              Unknown Element
            </text>
          </FocusRing>
        </svg>
      );

      // Focus ring should still work with default fallback values
      expect(getByTestId('focus-ring-focus-outer')).toBeInTheDocument();
    });
  });
});
