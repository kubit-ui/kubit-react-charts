import { render } from '@/tests/render/render';

import { Tick } from '../tick';

describe('Tick', () => {
  it('renders correctly and displays the correct tick value', () => {
    const tickProps = {
      showTickLines: true,
      tick: { position: 1, value: '10' },
      tickLine: { x1: 0, x2: 10, y1: 0, y2: 10 },
      tickText: { x: 5, y: 5 },
      x: 5,
      y: 5,
    };

    const { getByText } = render(<Tick {...tickProps} />);

    expect(getByText('10')).toBeInTheDocument();
  });
});
