import { render, screen } from '@testing-library/react';

import type { Mock } from 'vitest';

import type { NodeProps } from '@/components/node/node.types';
import { calculateShapePoints } from '@/components/node/utils/calculateShapePoints/calculateShapePoints';

import { Hexagon } from '../hexagon';

vi.mock('@/components/node/utils/calculateShapePoints/calculateShapePoints');

describe('Hexagon component', () => {
  it('renders correctly with given props', () => {
    const props: NodeProps = {
      dataTestId: 'test-hexagon',
      position: { x: 50, y: 50 },
      size: 10,
    };

    (calculateShapePoints as Mock).mockReturnValue('50,50 60,60 70,70');

    render(<Hexagon {...props} />);

    const hexagonElement = screen.getByTestId('test-hexagon-hexagon');
    expect(hexagonElement).toBeInTheDocument();
    expect(hexagonElement).toHaveAttribute('points', '50,50 60,60 70,70');
  });

  it('renders correctly with default props', () => {
    (calculateShapePoints as Mock).mockReturnValue('0,0 1,1 2,2');

    render(<Hexagon dataTestId="default-hexagon" />);

    const hexagonElement = screen.getByTestId('default-hexagon-hexagon');
    expect(hexagonElement).toBeInTheDocument();
    expect(hexagonElement).toHaveAttribute('points', '0,0 1,1 2,2');
  });
});
