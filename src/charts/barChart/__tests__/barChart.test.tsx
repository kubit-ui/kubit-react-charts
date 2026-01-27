import { screen } from '@testing-library/react';

import { BarOrientation } from '@/components/bar/bar.type';
import { render } from '@/tests/render/render';

import { BarChart } from '../barChart';

declare global {
  interface SVGElement {
    getBBox: () => { x: number; y: number; width: number; height: number };
  }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {
    // Mock implementation
  }
  unobserve() {
    // Mock implementation
  }
  disconnect() {
    // Mock implementation
  }
};

describe('BarChart component', () => {
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
  it('should render correctly with horizontal orientation', () => {
    render(
      <BarChart data={[]} orientation={BarOrientation.HORIZONTAL} pKey="x" role="img">
        <div />
      </BarChart>,
      false
    );

    const svgContainer = screen.getByRole('img');
    expect(svgContainer).toHaveAttribute('width', '100%');
    expect(svgContainer).toHaveAttribute('height', '100%');
  });
  it('should render correctly with vertical orientation', () => {
    render(
      <BarChart data={[]} orientation={BarOrientation.VERTICAL} pKey="x" role="img">
        <div />
      </BarChart>,
      false
    );

    const svgContainer = screen.getByRole('img');
    expect(svgContainer).toHaveAttribute('width', '100%');
    expect(svgContainer).toHaveAttribute('height', '100%');
  });
});
