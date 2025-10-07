import { render } from '@testing-library/react';

import { LineChartContext } from '../../context/lineChartContext';
import { LineChart } from '../../lineChart';
import { CONTEXT } from '../fixture/contextData';

describe('LineChartSeparator', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <LineChartContext.Provider value={CONTEXT}>
        <LineChart.Separator />
      </LineChartContext.Provider>
    );
    expect(container).toBeInTheDocument();
  });

  it('renders the square path when areaSeparator is provided', () => {
    const { getByTestId } = render(
      <LineChartContext.Provider value={CONTEXT}>
        <LineChart.Separator areaSeparator={{}} dataTestId="test" />
      </LineChartContext.Provider>
    );
    const squarePath = getByTestId('testArea');
    expect(squarePath).toBeInTheDocument();
  });

  it('renders the top line when topSeparator is provided', () => {
    const { getByTestId } = render(
      <LineChartContext.Provider value={CONTEXT}>
        <LineChart.Separator dataTestId="test" topSeparator={{}} />
      </LineChartContext.Provider>
    );
    const lineTop = getByTestId('testTop');
    expect(lineTop).toBeInTheDocument();
  });

  it('renders the right line when rightSeparator is provided', () => {
    const { getByTestId } = render(
      <LineChartContext.Provider value={CONTEXT}>
        <LineChart.Separator dataTestId="test" rightSeparator={{}} />
      </LineChartContext.Provider>
    );
    const lineRight = getByTestId('testRight');
    expect(lineRight).toBeInTheDocument();
  });

  it('render the area even is cross axis', () => {
    const { getByTestId } = render(
      <LineChartContext.Provider value={{ ...CONTEXT, crossXAxis: true, crossYAxis: true }}>
        <LineChart.Separator areaSeparator={{}} dataTestId="test" />
      </LineChartContext.Provider>
    );
    const squarePath = getByTestId('testArea');
    expect(squarePath).toBeInTheDocument();
  });
});
