import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';

import { Node } from '../node';
import { NodeType } from '../node.types';

describe('Node Component', () => {
  it('renders a circle with the correct attributes', () => {
    const { getByTestId } = render(
      <Node fill="red" position={{ x: 50, y: 50 }} size={100} type={NodeType.Circle} />
    );
    const circle = getByTestId('node-circle');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('cx', '50');
    expect(circle).toHaveAttribute('cy', '50');
    expect(circle).toHaveAttribute('r', '50');
    expect(circle).toHaveAttribute('fill', 'red');
  });

  it('renders a square with the correct attributes', () => {
    const { getByTestId } = render(
      <Node fill="green" position={{ x: 50, y: 50 }} size={100} type={NodeType.Square} />
    );
    const rect = getByTestId('node-square');
    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute('x', '0');
    expect(rect).toHaveAttribute('y', '0');
    expect(rect).toHaveAttribute('width', '100');
    expect(rect).toHaveAttribute('height', '100');
    expect(rect).toHaveAttribute('fill', 'green');
  });

  it('renders a triangle with the correct attributes', () => {
    const { getByTestId } = render(
      <Node fill="blue" position={{ x: 50, y: 50 }} size={100} type={NodeType.Triangle} />
    );
    const polygon = getByTestId('node-triangle');
    expect(polygon).toBeInTheDocument();
  });
  it('renders a star with the correct attributes', () => {
    const { getByTestId } = render(
      <Node fill="yellow" position={{ x: 50, y: 50 }} size={100} type={NodeType.Star} />
    );
    const polygon = getByTestId('node-star');
    expect(polygon).toBeInTheDocument();
  });
  it('renders a hexagon with the correct attributes', () => {
    const { getByTestId } = render(
      <Node fill="purple" position={{ x: 50, y: 50 }} size={100} type={NodeType.Hexagon} />
    );
    const polygon = getByTestId('node-hexagon');
    expect(polygon).toBeInTheDocument();
  });
  it('renders a pentagon with the correct attributes', () => {
    const { getByTestId } = render(
      <Node fill="orange" position={{ x: 50, y: 50 }} size={100} type={NodeType.Pentagon} />
    );
    const polygon = getByTestId('node-pentagon');
    expect(polygon).toBeInTheDocument();
  });
  it('renders a straight with the correct attributes', () => {
    const { getByTestId } = render(
      <Node fill="pink" position={{ x: 50, y: 50 }} size={100} type={NodeType.Straight} />
    );
    const polygon = getByTestId('node-straight');
    expect(polygon).toBeInTheDocument();
  });

  it('returns null when type is not recognized', () => {
    const { queryByTestId } = render(<Node type={undefined} />);
    const polygon = queryByTestId('node-straight');
    expect(polygon).toBeNull();
  });

  it('renders circle when not sent props', () => {
    const { getByTestId } = render(<Node />);
    const circle = getByTestId('node-circle');
    expect(circle).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = vi.fn();
    const { getByTestId } = render(
      <Node
        fill="red"
        position={{ x: 50, y: 50 }}
        size={100}
        type={NodeType.Circle}
        onClick={mockOnClick}
      />
    );
    const circle = getByTestId('node-circle');
    fireEvent.click(circle);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should call onKeyDown when key pressed', () => {
    const mockOnKeyDown = vi.fn();
    const { getByTestId } = render(
      <Node
        fill="red"
        position={{ x: 50, y: 50 }}
        size={100}
        type={NodeType.Circle}
        onKeyDown={mockOnKeyDown}
      />
    );
    const circle = getByTestId('node-circle');
    fireEvent.keyDown(circle, { code: 'Enter', key: 'Enter' });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  it('should call onFocus when focused', () => {
    const mockOnFocus = vi.fn();
    const { getByTestId } = render(
      <Node
        fill="red"
        position={{ x: 50, y: 50 }}
        size={100}
        type={NodeType.Circle}
        onFocus={mockOnFocus}
      />
    );
    const circle = getByTestId('node-circle');
    fireEvent.focus(circle);
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it('should call onBlur when blurred', () => {
    const mockOnBlur = vi.fn();
    const { getByTestId } = render(
      <Node
        fill="red"
        position={{ x: 50, y: 50 }}
        size={100}
        type={NodeType.Circle}
        onBlur={mockOnBlur}
      />
    );
    const circle = getByTestId('node-circle');
    fireEvent.blur(circle);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('should call onMouseEnter when mouse enters', () => {
    const mockOnMouseEnter = vi.fn();
    const { getByTestId } = render(
      <Node
        fill="red"
        position={{ x: 50, y: 50 }}
        size={100}
        type={NodeType.Circle}
        onMouseEnter={mockOnMouseEnter}
      />
    );
    const circle = getByTestId('node-circle');
    fireEvent.mouseEnter(circle);
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  it('should call onMouseLeave when mouse leaves', () => {
    const mockOnMouseLeave = vi.fn();
    const { getByTestId } = render(
      <Node
        fill="red"
        position={{ x: 50, y: 50 }}
        size={100}
        type={NodeType.Circle}
        onMouseLeave={mockOnMouseLeave}
      />
    );
    const circle = getByTestId('node-circle');
    fireEvent.mouseLeave(circle);
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });
  it('should handle accessibility correctly with halo and main node', () => {
    const { getByTestId } = render(
      <Node
        aria-label="Main node label"
        hasHalo={true}
        position={{ x: 50, y: 50 }}
        size={100}
        type={NodeType.Circle}
      />
    );
    const haloCircle = getByTestId('node-halo-circle');
    const mainCircle = getByTestId('node-circle');

    // Halo should be hidden from screen readers and not have aria-label
    expect(haloCircle).toHaveAttribute('aria-hidden', 'true');
    expect(haloCircle).not.toHaveAttribute('aria-label');

    // Main node should have the aria-label
    expect(mainCircle).toHaveAttribute('aria-label', 'Main node label');
  });
});
