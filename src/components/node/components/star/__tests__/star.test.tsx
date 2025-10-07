import { render } from '@testing-library/react';

import { Star } from '../star';

describe('Star Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Star dataTestId="test" />);
    const starElement = getByTestId('test-star');
    expect(starElement).toBeInTheDocument();
    expect(starElement).toHaveAttribute('points');
  });

  it('renders correctly with custom props', () => {
    const customProps = {
      dataTestId: 'custom-test',
      fill: 'red',
      position: { x: 50, y: 50 },
      size: 10,
    };
    const { getByTestId } = render(<Star {...customProps} />);
    const starElement = getByTestId('custom-test-star');
    expect(starElement).toBeInTheDocument();
    expect(starElement).toHaveAttribute('points');
    expect(starElement).toHaveAttribute('fill', 'red');
  });
});
