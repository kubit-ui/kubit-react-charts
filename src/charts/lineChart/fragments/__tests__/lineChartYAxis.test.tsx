import { render } from '@testing-library/react';

import { LineChartContext } from '../../context/lineChartContext';
import { LineChart } from '../../lineChart';
import { CONTEXT } from '../fixture/contextData';

describe('LineChartYAxis', () => {
  it('renders correctly with context', () => {
    const { getByTestId } = render(
      <LineChartContext.Provider value={CONTEXT}>
        <LineChart.YAxis tickLine={{}} tickText={{ fontSize: 12 }} />
      </LineChartContext.Provider>
    );

    const yAxis = getByTestId('testyAxis');
    expect(yAxis).toBeInTheDocument();
  });
});
