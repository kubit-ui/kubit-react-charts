import { render, screen } from '@testing-library/react';

import type { NodeProps } from '@/components/node/node.types';

import { Square } from '../square';

describe('Square component', () => {
  it('renders correctly with given props', () => {
    const props: NodeProps = {
      dataTestId: 'test-square',
      position: { x: 50, y: 50 },
      size: 10,
    };

    render(<Square {...props} />);

    const squareElement = screen.getByTestId('test-square-square');
    expect(squareElement).toBeInTheDocument();
    expect(squareElement).toHaveAttribute('height', '10');
    expect(squareElement).toHaveAttribute('width', '10');
    expect(squareElement).toHaveAttribute('x', '45');
    expect(squareElement).toHaveAttribute('y', '45');
  });

  it('renders correctly with default props', () => {
    render(<Square dataTestId="default-square" />);

    const squareElement = screen.getByTestId('default-square-square');
    expect(squareElement).toBeInTheDocument();
    expect(squareElement).toHaveAttribute('height', '1');
    expect(squareElement).toHaveAttribute('width', '1');
    expect(squareElement).toHaveAttribute('x', '-0.5');
    expect(squareElement).toHaveAttribute('y', '-0.5');
  });
});
