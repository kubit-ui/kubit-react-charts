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

  it('renders consistent path data after re-render with halfChart enabled', () => {
    const data = {
      testKey: [
        { name: 'A', value: 50 },
        { name: 'B', value: 50 },
      ],
    };

    const { getAllByTestId, rerender } = render(
      <PieChartContext.Provider
        value={{
          canvasHeight: 100,
          canvasWidth: 200,
          data,
          dataTestId: 'test',
          halfChart: true,
        }}
      >
        <PieChart.Path dataKey="testKey" gap={3} innerRadius={50} radius={100} />
      </PieChartContext.Provider>
    );

    const segmentsBefore = getAllByTestId(/^testpath-/);
    const pathsBefore = segmentsBefore.map(s => s.getAttribute('d'));

    // Simulate re-render triggered by resolution change (new canvas dimensions)
    rerender(
      <PieChartContext.Provider
        value={{
          canvasHeight: 120,
          canvasWidth: 220,
          data,
          dataTestId: 'test',
          halfChart: true,
        }}
      >
        <PieChart.Path dataKey="testKey" gap={3} innerRadius={50} radius={100} />
      </PieChartContext.Provider>
    );

    const segmentsAfter = getAllByTestId(/^testpath-/);
    expect(segmentsAfter).toHaveLength(segmentsBefore.length);

    // Verify segments still have valid path data (not empty or undefined)
    segmentsAfter.forEach(segment => {
      const d = segment.getAttribute('d');
      expect(d).toBeTruthy();
      expect(d).not.toBe('');
    });

    // Re-render back to original dimensions should produce same paths
    rerender(
      <PieChartContext.Provider
        value={{
          canvasHeight: 100,
          canvasWidth: 200,
          data,
          dataTestId: 'test',
          halfChart: true,
        }}
      >
        <PieChart.Path dataKey="testKey" gap={3} innerRadius={50} radius={100} />
      </PieChartContext.Provider>
    );

    const segmentsFinal = getAllByTestId(/^testpath-/);
    const pathsFinal = segmentsFinal.map(s => s.getAttribute('d'));
    expect(pathsFinal).toEqual(pathsBefore);
  });
});
