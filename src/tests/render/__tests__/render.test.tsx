import { screen } from '@testing-library/react';

import { render } from '../render';

describe('render function', () => {
  it('should render children without svg wrapper when withSvg is false', () => {
    const { container } = render(<div data-testid="test">Test</div>, false);
    expect(container.querySelector('svg')).toBeNull();
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('should render children with svg wrapper when withSvg is true', () => {
    const { container } = render(<div data-testid="test">Test</div>, true);
    expect(container.querySelector('svg')).not.toBeNull();
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
