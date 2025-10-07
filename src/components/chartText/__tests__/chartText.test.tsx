import { render } from '@/tests/render/render';

import { ChartText } from '../chartText';

describe('ChartText', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<ChartText data-testid="chart-text" />);
    const text = getByTestId('chart-text');
    expect(text).toHaveClass('circle');
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <ChartText className="custom-text" data-testid="chart-text" fill="red" x={50} y={50} />
    );
    const text = getByTestId('chart-text');
    expect(text).toHaveClass('custom-text');
    expect(text).toHaveAttribute('x', '50');
    expect(text).toHaveAttribute('y', '50');
    expect(text).toHaveAttribute('fill', 'red');
  });
});
