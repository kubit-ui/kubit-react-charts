import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { DefaultCanvasConfig } from '@/types/canvas.type';

import { PieChart } from '../pieChart';

const ResizeObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', ResizeObserverMock);
});

describe('PieChart', () => {
  const defaultProps = {
    canvasConfig: DefaultCanvasConfig,
    data: {
      groups: [
        {
          color: '#FF6384',
          name: 'Group A',
          value: 400,
        },
        {
          color: '#36A2EB',
          name: 'Group B',
          value: 300,
        },
      ],
    },
  };

  it('renders without errors', () => {
    render(<PieChart {...defaultProps} />);
    expect(screen.getByTestId('pie-chart0')).toBeInTheDocument();
  });

  it('passes correct properties to SvgContainer', () => {
    const { container } = render(
      <PieChart
        {...defaultProps}
        ariaLabel="Pie Chart"
        caption="Pie Chart"
        classNames="pie-chart"
      />
    );
    const svgContainer = container.querySelector('.pie-chart');
    expect(svgContainer).toHaveAttribute('data-testid', 'pie-chart1');
    expect(svgContainer).toHaveAttribute('aria-label', 'Pie Chart');
  });

  it('correctly modifies children with additional properties', () => {
    const childTestId = 'child-component';
    const ChildComponent = () => <div data-testid={childTestId}>Child</div>;
    render(
      <PieChart {...defaultProps}>
        <ChildComponent />
      </PieChart>
    );
    expect(screen.getByTestId(childTestId)).toBeInTheDocument();
  });

  it('Allows to use ForeignObject as inner children', () => {
    render(
      <PieChart {...defaultProps}>
        <PieChart.Foreign dataTestId="foreignObject" />
      </PieChart>
    );
    expect(screen.getByTestId('foreignObject')).toBeInTheDocument();
  });
});
