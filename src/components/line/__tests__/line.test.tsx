import { render } from '@/tests/render/render';

import { Line } from '../line';

describe('Line component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<Line dataTestId="line" />);
    const line = getByTestId('line');

    expect(line).toHaveClass('line');
  });

  it('renders with custom props', () => {
    const { getByTestId } = render(<Line className="custom-line" dataTestId="line" tabIndex={0} />);
    const line = getByTestId('line');

    expect(line).toHaveClass('custom-line');
  });
});
