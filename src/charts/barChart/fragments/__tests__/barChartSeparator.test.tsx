import { render } from '@testing-library/react';

import { BarChart } from '../../barChart';
import { BarChartContext } from '../../context/barChartContext';
import { CONTEXT } from '../fixture/barContextData';

describe('LineChartSeparator', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.Separator />
      </BarChartContext.Provider>
    );
    expect(container).toBeInTheDocument();
  });

  it('renders the square path when areaSeparator is provided', () => {
    const { getByTestId } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.Separator areaSeparator={{}} dataTestId="test" />
      </BarChartContext.Provider>
    );
    const squarePath = getByTestId('testArea');
    expect(squarePath).toBeInTheDocument();
  });

  it('renders the top line when topSeparator is provided', () => {
    const { getByTestId } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.Separator dataTestId="test" topSeparator={{}} />
      </BarChartContext.Provider>
    );
    const lineTop = getByTestId('testTop');
    expect(lineTop).toBeInTheDocument();
  });

  it('renders the right line when rightSeparator is provided', () => {
    const { getByTestId } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.Separator dataTestId="test" rightSeparator={{}} />
      </BarChartContext.Provider>
    );
    const lineRight = getByTestId('testRight');
    expect(lineRight).toBeInTheDocument();
  });

  it('render the area even is cross axis', () => {
    const { getByTestId } = render(
      <BarChartContext.Provider value={{ ...CONTEXT, crossXAxis: true, crossYAxis: true }}>
        <BarChart.Separator areaSeparator={{}} dataTestId="test" />
      </BarChartContext.Provider>
    );
    const squarePath = getByTestId('testArea');
    expect(squarePath).toBeInTheDocument();
  });
});
