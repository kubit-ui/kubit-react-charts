import { render } from '@testing-library/react';

import type { NodeProps } from '@/components/node/node.types';

import { Straight } from '../straight';

describe('Straight Component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<Straight dataTestId="test" />);
    const pathElement = getByTestId('test-straight');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute('d', 'M -0.5 0 H 0.5 M 0 -0.5 V 0.5');
    expect(pathElement).toHaveAttribute('stroke-width', '2');
  });

  it('renders with custom props', () => {
    const customProps: NodeProps = {
      dataTestId: 'custom',
      position: { x: 10, y: 20 },
      size: 5,
    };
    const { getByTestId } = render(<Straight {...customProps} />);
    const pathElement = getByTestId('custom-straight');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute('d', 'M 7.5 20 H 12.5 M 10 17.5 V 22.5');
    expect(pathElement).toHaveAttribute('stroke-width', '2');
  });
});
