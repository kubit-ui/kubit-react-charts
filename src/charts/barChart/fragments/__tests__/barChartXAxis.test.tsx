import { render } from '@testing-library/react';

import { BarChart } from '../../barChart';
import { BarChartContext } from '../../context/barChartContext';
import { CONTEXT } from '../fixture/barContextData';

describe('LineChartXAxis', () => {
  it('renders correctly with context', () => {
    const { getByTestId } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.XAxis tickLine={{}} tickText={{ fontSize: 12 }} />
      </BarChartContext.Provider>
    );

    const xAxis = getByTestId('testxAxis');
    expect(xAxis).toBeInTheDocument();
  });
});
