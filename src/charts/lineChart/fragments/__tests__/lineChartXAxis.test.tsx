import { render } from '@testing-library/react';

import { LineChartContext } from '../../context/lineChartContext';
import { LineChart } from '../../lineChart';
import { CONTEXT } from '../fixture/contextData';

describe('LineChartXAxis', () => {
  it('renders correctly with context', () => {
    const { getByTestId } = render(
      <LineChartContext.Provider value={CONTEXT}>
        <LineChart.XAxis tickLine={{}} tickText={{ fontSize: 12 }} />
      </LineChartContext.Provider>
    );

    const xAxis = getByTestId('testxAxis');
    expect(xAxis).toBeInTheDocument();
  });
});
