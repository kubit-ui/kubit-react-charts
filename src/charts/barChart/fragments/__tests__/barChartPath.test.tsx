import { render } from '@testing-library/react';

import { BarOrientation } from '@/components/bar/bar.type';

import { BarChart } from '../../barChart';
import { BarChartContext } from '../../context/barChartContext';
import { CONTEXT } from '../fixture/barContextData';

const singleConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [{ color: 'pink', coverage: 100 }],
};
const mockRabbitsBarConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    { color: 'pink', coverage: 45 },
    { color: 'red', coverage: 25 },
    { color: 'blue', coverage: 30 },
  ],
};
const mockDogsBarConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    { color: 'yellow', coverage: 20 },
    { color: 'orange', coverage: 25 },
    { color: 'green', coverage: 55 },
  ],
};
const mockBirdsBarConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    { color: 'gray', coverage: 10 },
    { color: 'grey', coverage: 30 },
    { color: 'black', coverage: 60 },
  ],
};

describe('BarChartPath', () => {
  it('renders correctly with vertical orientation and a single draw, when the data is not stacked', () => {
    const { container } = render(
      <BarChartContext.Provider value={{ ...CONTEXT, orientation: BarOrientation.VERTICAL }}>
        <BarChart.Path
          key={`bar-chart-${Math.random() + 0}`}
          barConfig={singleConfig}
          dataIdx={0}
          dataKey="rabbits"
        />
      </BarChartContext.Provider>
    );
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(1);
  });
  it('render correctly with vertical orientation and a multiple draw, when the data is stacked', () => {
    const { container } = render(
      <BarChartContext.Provider value={{ ...CONTEXT, orientation: BarOrientation.VERTICAL }}>
        <BarChart.Path
          key={`bar-chart-${Math.random() + 0}`}
          barConfig={mockRabbitsBarConfig}
          dataIdx={0}
          dataKey="rabbits"
        />
      </BarChartContext.Provider>
    );
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(3);
  });

  it('renders correctly with horizontal orientation and a single draw, when the data is not stacked', () => {
    const { container } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.Path
          key={`bar-chart-${Math.random() + 0}`}
          barConfig={singleConfig}
          dataIdx={0}
          dataKey="dogs"
        />
      </BarChartContext.Provider>
    );
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(1);
  });

  it('renders correctly with horizontal orientation and a multiple draw, when the data is not stacked', () => {
    const { container } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.Path
          key={`bar-chart-${Math.random() + 0}`}
          barConfig={mockDogsBarConfig}
          dataIdx={0}
          dataKey="dogs"
        />
      </BarChartContext.Provider>
    );
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(3);
  });

  it('renders correctly multiple bars simultaneously', () => {
    const { container } = render(
      <BarChartContext.Provider value={CONTEXT}>
        <BarChart.Path
          key={`bar-chart-${Math.random() + 0}`}
          barConfig={mockRabbitsBarConfig}
          dataIdx={0}
          dataKey="rabbits"
        />
        <BarChart.Path
          key={`bar-chart-${Math.random() + 0}`}
          barConfig={mockDogsBarConfig}
          dataIdx={0}
          dataKey="dogs"
        />
        <BarChart.Path
          key={`bar-chart-${Math.random() + 0}`}
          barConfig={mockBirdsBarConfig}
          dataIdx={0}
          dataKey="birds"
        />
      </BarChartContext.Provider>
    );
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(9);
  });
});
