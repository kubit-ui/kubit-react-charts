import { fireEvent, render } from '@testing-library/react';

import { Plot } from '../plot';
import { PLOT_SIZE_MAP, type PlotProps, PlotSize, PlotType } from '../plot.types';

describe('Plot Component', () => {
  const defaultProps: PlotProps = {
    dataTestId: 'test-plot',
    position: { x: 50, y: 50 },
  };

  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <svg>
        <Plot {...defaultProps} />
      </svg>
    );
    // Circle is the default shape, and the component adds "Circle" to the dataTestId
    const plotElement = getByTestId('test-plot-circle');

    expect(plotElement).toBeInTheDocument();
    expect(plotElement).toHaveAttribute('cx', '50');
    expect(plotElement).toHaveAttribute('cy', '50');
    expect(plotElement).toHaveAttribute('r', String(PLOT_SIZE_MAP[PlotSize.MEDIUM] / 2)); // Default size is MEDIUM, radius is half the size
    expect(plotElement).toHaveAttribute('role', 'button'); // Accessibility role
  });

  it('renders correctly with custom props', () => {
    const customProps: PlotProps = {
      ...defaultProps,
      fill: 'red',
      label: 'Test Plot Point',
      opacity: 0.8,
      size: PlotSize.EXTRA_SMALL,
      stroke: 'blue',
      strokeWidth: 2,
    };

    const { getByTestId } = render(
      <svg>
        <Plot {...customProps} />
      </svg>
    );
    const plotElement = getByTestId('test-plot-circle');

    expect(plotElement).toHaveAttribute('r', String(PLOT_SIZE_MAP[PlotSize.EXTRA_SMALL] / 2));
    expect(plotElement).toHaveAttribute('fill', 'red');
    expect(plotElement).toHaveAttribute('stroke', 'blue');
    expect(plotElement).toHaveAttribute('stroke-width', '2');
    expect(plotElement).toHaveAttribute('opacity', '0.8');
    expect(plotElement).toHaveAttribute('aria-label', 'Test Plot Point');
  });

  it('renders different shapes correctly', () => {
    // Test square
    const { getByTestId: getSquare } = render(
      <svg>
        <Plot type={PlotType.SQUARE} {...defaultProps} dataTestId="square-plot" />
      </svg>
    );
    const squareElement = getSquare('square-plot-square');
    expect(squareElement).toBeInTheDocument();
    expect(squareElement.tagName).toBe('rect');

    // Test triangle
    const { getByTestId: getTriangle } = render(
      <svg>
        <Plot type={PlotType.TRIANGLE} {...defaultProps} dataTestId="triangle-plot" />
      </svg>
    );
    const triangleElement = getTriangle('triangle-plot-triangle');
    expect(triangleElement).toBeInTheDocument();
    expect(triangleElement.tagName).toBe('polygon');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByTestId } = render(
      <svg>
        <Plot {...defaultProps} onClick={handleClick} />
      </svg>
    );

    const plotElement = getByTestId('test-plot-circle');
    fireEvent.click(plotElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyDown when Enter key is pressed', () => {
    const handleKeyDown = vi.fn();
    const { getByTestId } = render(
      <svg>
        <Plot {...defaultProps} onKeyDown={handleKeyDown} />
      </svg>
    );

    const plotElement = getByTestId('test-plot-circle');
    fireEvent.keyDown(plotElement, { code: 'Enter', key: 'Enter' });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('calls onFocus when focused', () => {
    const handleFocus = vi.fn();
    const { getByTestId } = render(
      <svg>
        <Plot {...defaultProps} onFocus={handleFocus} />
      </svg>
    );

    const plotElement = getByTestId('test-plot-circle');
    fireEvent.focus(plotElement);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when blurred', () => {
    const handleBlur = vi.fn();
    const { getByTestId } = render(
      <svg>
        <Plot {...defaultProps} onBlur={handleBlur} />
      </svg>
    );

    const plotElement = getByTestId('test-plot-circle');
    fireEvent.blur(plotElement);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('renders hover effect when mouse enters and not focused', () => {
    const { getByTestId, queryByTestId } = render(
      <svg>
        <Plot {...defaultProps} hasHoverEffect={true} />
      </svg>
    );
    const plotElement = getByTestId('test-plot-circle');

    // Before hover, there should be no hover element
    expect(queryByTestId('test-plot-hover-circle')).not.toBeInTheDocument();

    // After mouse enter, hover element should appear
    fireEvent.mouseEnter(plotElement);
    expect(queryByTestId('test-plot-hover-circle')).toBeInTheDocument();

    // After mouse leave, hover element should disappear
    fireEvent.mouseLeave(plotElement);
    expect(queryByTestId('test-plot-hover-circle')).not.toBeInTheDocument();
  });

  it('disables hover effect when hasHoverEffect is false', () => {
    const { getByTestId, queryByTestId } = render(
      <svg>
        <Plot {...defaultProps} hasHoverEffect={false} />
      </svg>
    );
    const plotElement = getByTestId('test-plot-circle');

    fireEvent.mouseEnter(plotElement);
    expect(queryByTestId('test-plot-hover-circle')).not.toBeInTheDocument();
  });

  it('renders focus outlines when focused', () => {
    const { getByTestId, queryByTestId } = render(
      <svg>
        <Plot {...defaultProps} />
      </svg>
    );
    const plotElement = getByTestId('test-plot-circle');

    // Before focus, there should be no focus outline elements
    expect(queryByTestId('test-plot-focus-outer')).not.toBeInTheDocument();
    expect(queryByTestId('test-plot-focus-inner')).not.toBeInTheDocument();

    // After focus, focus outline elements should appear
    fireEvent.focus(plotElement);
    expect(queryByTestId('test-plot-focus-outer')).toBeInTheDocument();
    expect(queryByTestId('test-plot-focus-inner')).toBeInTheDocument();

    // After blur, focus outline elements should disappear
    fireEvent.blur(plotElement);
    expect(queryByTestId('test-plot-focus-outer')).not.toBeInTheDocument();
    expect(queryByTestId('test-plot-focus-inner')).not.toBeInTheDocument();
  });

  it('uses custom hover configuration', () => {
    const hoverConfig = {
      fill: 'yellow',
      opacity: 0.5,
      scale: 1.5,
      stroke: 'green',
      strokeWidth: 3,
    };

    const { getByTestId, queryByTestId } = render(
      <svg>
        <Plot {...defaultProps} hasHoverEffect={true} hoverConfig={hoverConfig} />
      </svg>
    );
    const plotElement = getByTestId('test-plot-circle');

    fireEvent.mouseEnter(plotElement);

    const hoverElement = queryByTestId('test-plot-hover-circle');
    expect(hoverElement).toBeInTheDocument();
    expect(hoverElement).toHaveAttribute('fill', 'yellow');
    expect(hoverElement).toHaveAttribute('stroke', 'green');
    expect(hoverElement).toHaveAttribute('stroke-width', '3');
    expect(hoverElement).toHaveAttribute('opacity', '0.5');
    // The size attribute should be scaled by 1.5
    const defaultSize = PLOT_SIZE_MAP[PlotSize.MEDIUM];
    expect(hoverElement).toHaveAttribute('r', String((defaultSize * 1.5) / 2));
  });

  it('uses custom focus configuration', () => {
    const focusConfig = {
      gap: 4,
      innerColor: 'orange',
      innerStrokeWidth: 2,
      outlineColor: 'purple',
      outlineStrokeWidth: 3,
    };

    const { getByTestId, queryByTestId } = render(
      <svg>
        <Plot {...defaultProps} focusConfig={focusConfig} />
      </svg>
    );
    const plotElement = getByTestId('test-plot-circle');

    fireEvent.focus(plotElement);

    const outerFocusElement = queryByTestId('test-plot-focus-outer');
    const innerFocusElement = queryByTestId('test-plot-focus-inner');

    expect(outerFocusElement).toBeInTheDocument();
    expect(innerFocusElement).toBeInTheDocument();

    expect(outerFocusElement).toHaveAttribute('stroke', 'purple');
    expect(outerFocusElement).toHaveAttribute('stroke-width', '3');
    expect(innerFocusElement).toHaveAttribute('stroke', 'orange');
    expect(innerFocusElement).toHaveAttribute('stroke-width', '2');
  });

  it('hover effect is not shown when element is focused', () => {
    const { getByTestId, queryByTestId } = render(
      <svg>
        <Plot {...defaultProps} hasHoverEffect={true} />
      </svg>
    );
    const plotElement = getByTestId('test-plot-circle');

    // Focus the element
    fireEvent.focus(plotElement);

    // Even when we trigger mouseEnter, the hover should not appear because element is focused
    fireEvent.mouseEnter(plotElement);
    expect(queryByTestId('test-plot-hover-circle')).not.toBeInTheDocument();

    // Focus outlines should still be visible
    expect(queryByTestId('test-plot-focus-outer')).toBeInTheDocument();
    expect(queryByTestId('test-plot-focus-inner')).toBeInTheDocument();
  });
});
