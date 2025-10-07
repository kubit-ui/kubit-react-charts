import { render } from '@testing-library/react';

import type { NodeProps } from '@/components/node/node.types';

import { Triangle } from '../triangle';

describe('Triangle Component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<Triangle dataTestId="test" />);
    const polygonElement = getByTestId('test-triangle');
    expect(polygonElement).toBeInTheDocument();
    expect(polygonElement).toHaveAttribute('points', '0,-0.5 -0.5,0.5 0.5,0.5');
  });

  it('renders with custom props', () => {
    const customProps: NodeProps = {
      dataTestId: 'custom',
      position: { x: 10, y: 20 },
      size: 5,
    };
    const { getByTestId } = render(<Triangle {...customProps} />);
    const polygonElement = getByTestId('custom-triangle');
    expect(polygonElement).toBeInTheDocument();
    expect(polygonElement).toHaveAttribute('points', '10,17.5 7.5,22.5 12.5,22.5');
  });
});
