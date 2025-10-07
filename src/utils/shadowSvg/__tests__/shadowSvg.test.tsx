import { render } from '@testing-library/react';

import { ShadowSvg } from '../shadowSvg';
import type { ShadowSvgConfig, ShadowSvgProps } from '../shadowSvg.types';

const shadowSvgConfig: ShadowSvgConfig = {
  dx: 2,
  dy: 2,
  floodColor: 'black',
  floodOpacity: 1,
  stdDeviation: 4,
};

const mockProps: ShadowSvgProps = {
  id: 'ID',
  shadowSvgConfig,
};

describe('ShadowSvg', () => {
  it('renders the ShadowSvg component and check <filter> props', () => {
    const { container } = render(<ShadowSvg {...mockProps} />);

    const filterElement = container.querySelector('filter');

    expect(filterElement).toBeInTheDocument();
    expect(filterElement).toHaveAttribute('x', '-20%');
    expect(filterElement).toHaveAttribute('y', '-20%');
    expect(filterElement).toHaveAttribute('width', '140%');
    expect(filterElement).toHaveAttribute('height', '140%');
  });

  it('renders the ShadowSvg component with custom props and check <filter> and <feDropShadow> props', () => {
    const customProps = {
      height: '120%',
      id: 'custom-shadow',
      shadowSvgConfig,
      width: '120%',
      x: '-10%',
      y: '-10%',
    };
    const { container } = render(<ShadowSvg {...customProps} />);
    const filterElement = container.querySelector('filter');
    expect(filterElement).toBeInTheDocument();
    expect(filterElement).toHaveAttribute('x', '-10%');
    expect(filterElement).toHaveAttribute('y', '-10%');
    expect(filterElement).toHaveAttribute('width', '120%');
    expect(filterElement).toHaveAttribute('height', '120%');
    expect(filterElement).toHaveAttribute('id', 'custom-shadow');
    const feDropShadowElement = container.querySelector('feDropShadow');
    expect(feDropShadowElement).toBeInTheDocument();
    expect(feDropShadowElement).toHaveAttribute('dx', '2');
    expect(feDropShadowElement).toHaveAttribute('dy', '2');
    expect(feDropShadowElement).toHaveAttribute('stdDeviation', '4');
  });
});
