import { render } from '@testing-library/react';

import { PieChart } from '../../pieChart';

describe('PieChartForeign', () => {
  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <PieChart.Foreign dataTestId="custom-foreign-object" height={500} width={500} x={100} y={100}>
        <div data-testid="child-component">Child Component</div>
      </PieChart.Foreign>
    );

    const foreignObject = getByTestId('custom-foreign-object');
    expect(foreignObject).toBeInTheDocument();
    expect(foreignObject).toHaveAttribute('width', '500');
    expect(foreignObject).toHaveAttribute('height', '500');
    expect(foreignObject).toHaveAttribute('x', '100');
    expect(foreignObject).toHaveAttribute('y', '100');

    const childComponent = getByTestId('child-component');
    expect(childComponent).toBeInTheDocument();
  });
  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <PieChart.Foreign dataTestId="foreign-object">
        <div data-testid="child-component">Child Component</div>
      </PieChart.Foreign>
    );

    const foreignObject = getByTestId('foreign-object');
    expect(foreignObject).toBeInTheDocument();
  });
});
