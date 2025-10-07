import { render } from '@testing-library/react';

import { cssGradientToSVG } from '../cssGradientToSvg';

describe('cssGradientToSVG', () => {
  it('renders a linear gradient for 90 degrees correctly', () => {
    const { container } = render(cssGradientToSVG('90, #000 0%, #fff 100%', 'testGradient'));
    expect(container.querySelector('linearGradient')).toHaveAttribute('id', 'testGradient');
    expect(container.querySelector('linearGradient')).toHaveAttribute('x2', '100%');
    expect(container.querySelector('linearGradient')).toHaveAttribute('y2', '0%');
  });

  it('renders a linear gradient for 180 degrees correctly', () => {
    const { container } = render(cssGradientToSVG('180, #000 0%, #fff 100%', 'testGradient'));
    expect(container.querySelector('linearGradient')).toHaveAttribute('y2', '100%');
  });

  it('renders a linear gradient for 270 degrees correctly', () => {
    const { container } = render(cssGradientToSVG('270, #000 0%, #fff 100%', 'testGradient'));
    expect(container.querySelector('linearGradient')).toHaveAttribute('x1', '100%');
  });

  it('returns null for unsupported angles', () => {
    const { container } = render(cssGradientToSVG('45, #000 0%, #fff 100%', 'testGradient'));
    expect(container.firstChild).toBeNull();
  });
});
