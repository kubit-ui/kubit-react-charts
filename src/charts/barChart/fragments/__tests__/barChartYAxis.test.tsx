import { render } from '@testing-library/react';

import { BarChart } from '../../barChart';
import { BarChartContext } from '../../context/barChartContext';
import { CONTEXT } from '../fixture/barContextData';

describe('LineChartYAxis', () => {
  it('renders correctly with context', () => {
    const { getByTestId } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.YAxis tickLine={{}} tickText={{ fontSize: 12 }} />
      </BarChartContext.Provider>
    );

    const yAxis = getByTestId('testyAxis');
    expect(yAxis).toBeInTheDocument();
  });
});
