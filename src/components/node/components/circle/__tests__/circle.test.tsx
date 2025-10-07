import { render, screen } from '@testing-library/react';

import type { NodeProps } from '@/components/node/node.types';

import { Circle } from '../circle';

describe('Circle component', () => {
  it('renders correctly with given props', () => {
    const props: NodeProps = {
      dataTestId: 'test-circle',
      position: { x: 50, y: 50 },
      size: 10,
    };

    render(<Circle {...props} />);

    const circleElement = screen.getByTestId('test-circle-circle');
    expect(circleElement).toBeInTheDocument();
    expect(circleElement).toHaveAttribute('cx', '50');
    expect(circleElement).toHaveAttribute('cy', '50');
    expect(circleElement).toHaveAttribute('r', '5');
  });

  it('renders correctly with given props with default props', () => {
    const props: NodeProps = {
      dataTestId: 'test-circle',
      position: { x: 50, y: 50 },
    };

    render(<Circle {...props} />);

    const circleElement = screen.getByTestId('test-circle-circle');
    expect(circleElement).toBeInTheDocument();
    expect(circleElement).toHaveAttribute('cx', '50');
    expect(circleElement).toHaveAttribute('cy', '50');
    expect(circleElement).toHaveAttribute('r', '0.5');
  });
});
