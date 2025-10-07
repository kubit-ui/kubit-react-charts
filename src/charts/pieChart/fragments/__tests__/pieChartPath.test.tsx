import { render } from '@testing-library/react';

import { PieChartContext } from '../../context/pieChartContext';
import { PieChart } from '../../pieChart';

describe('PieChartPath', () => {
  it('renders correctly with data', () => {
    const data = {
      testKey: [
        { name: '', value: 10 },
        { name: '', value: 20 },
        { name: '', value: 30 },
      ],
    };

    const { getAllByTestId } = render(
      <PieChartContext.Provider
        value={{ canvasHeight: 500, canvasWidth: 500, data, dataTestId: 'test' }}
      >
        <PieChart.Path dataKey="testKey" gap={5} innerRadius={50} radius={100} />
      </PieChartContext.Provider>
    );

    const segments = getAllByTestId(/^testpath-/);
    expect(segments).toHaveLength(3);
  });

  it('renders nothing when no data', () => {
    const data = {};

    const { queryByTestId } = render(
      <PieChartContext.Provider
        value={{ canvasHeight: 500, canvasWidth: 500, data, dataTestId: 'test' }}
      >
        <PieChart.Path dataKey="testKey" gap={5} innerRadius={50} radius={100} />
      </PieChartContext.Provider>
    );

    const segment = queryByTestId(/^testpath-/);
    expect(segment).not.toBeInTheDocument();
  });
});
