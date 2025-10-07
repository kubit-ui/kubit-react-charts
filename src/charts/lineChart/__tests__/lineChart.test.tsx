import { screen } from '@testing-library/react';

import { render } from '@/tests/render/render';

import { LineChart } from '../lineChart';

declare global {
  interface SVGElement {
    getBBox: () => { x: number; y: number; width: number; height: number };
  }
}

describe('LineChart component', () => {
  beforeEach(() => {
    SVGElement.prototype.getBBox = vi.fn(() => ({
      height: 50,
      width: 100,
      x: 0,
      y: 0,
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should render correctly with default props', () => {
    render(
      <LineChart data={[]} role="img" xKey="x">
        <div />
      </LineChart>,
      false
    );

    const svgContainer = screen.getByRole('img');
    expect(svgContainer).toHaveAttribute('width', '100%');
    expect(svgContainer).toHaveAttribute('height', '100%');
  });
});
