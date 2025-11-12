import { render, screen } from '@testing-library/react';

import { type Mock, vi } from 'vitest';

import type { NodeProps } from '@/components/node/node.types';
import { calculateShapePoints } from '@/components/node/utils/calculateShapePoints/calculateShapePoints';

import { Pentagon } from '../pentagon';

vi.mock('@/components/node/utils/calculateShapePoints/calculateShapePoints');

describe('Pentagon component', () => {
  it('renders correctly with given props', () => {
    const props: NodeProps = {
      dataTestId: 'test-pentagon',
      position: { x: 50, y: 50 },
      size: 10,
    };

    (calculateShapePoints as Mock).mockReturnValue('50,50 60,60 70,70 80,80 90,90');

    render(<Pentagon {...props} />);

    const pentagonElement = screen.getByTestId('test-pentagon-pentagon');
    expect(pentagonElement).toBeInTheDocument();
    expect(pentagonElement).toHaveAttribute('points', '50,50 60,60 70,70 80,80 90,90');
  });

  it('renders correctly with default props', () => {
    (calculateShapePoints as Mock).mockReturnValue('0,0 1,1 2,2 3,3 4,4');

    render(<Pentagon dataTestId="default-pentagon" />);

    const pentagonElement = screen.getByTestId('default-pentagon-pentagon');
    expect(pentagonElement).toBeInTheDocument();
    expect(pentagonElement).toHaveAttribute('points', '0,0 1,1 2,2 3,3 4,4');
  });
});
