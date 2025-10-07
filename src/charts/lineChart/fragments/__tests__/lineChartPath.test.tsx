import { render } from '@testing-library/react';

import { NodeType } from '@/components/node/node.types';

import { LineChartContext } from '../../context/lineChartContext';
import { LineChart } from '../../lineChart';
import { CONTEXT } from '../fixture/contextData';

const mockedNode = {
  fill: 'white',
  hasHalo: true,
  size: 1.3,
  stroke: 'red',
  strokeWidth: '0.2',
  type: NodeType.Circle,
};

describe('LineChartPath', () => {
  it('renders correctly with data', () => {
    const { getByTestId } = render(
      <LineChartContext.Provider value={CONTEXT}>
        <LineChart.Path dataKey="testKey" />
      </LineChartContext.Provider>
    );

    const path = getByTestId('testpath');
    expect(path).toBeInTheDocument();
  });
  it('can handle xCursor with nodes and indicator value', () => {
    const { getByTestId } = render(
      <LineChartContext.Provider value={{ ...CONTEXT }}>
        <LineChart.Path
          dataKey="testKey"
          indicatorConfig={{ ...mockedNode, autoClick: true }}
          nodeConfig={mockedNode}
        />
      </LineChartContext.Provider>
    );

    const path = getByTestId('testpath');
    expect(path).toBeInTheDocument();
  });

  it('can handle xCursor missmatch', () => {
    const { getByTestId } = render(
      <LineChartContext.Provider value={{ ...CONTEXT, xCursor: 5 }}>
        <LineChart.Path dataKey="testKey" indicatorConfig={mockedNode} nodeConfig={mockedNode} />
      </LineChartContext.Provider>
    );

    const path = getByTestId('testpath');
    expect(path).toBeInTheDocument();
  });

  it('should prioritize custom aria-label over generated accessibility labels', () => {
    const { container } = render(
      <LineChartContext.Provider value={CONTEXT}>
        <LineChart.Path ariaLabel="Custom label overrides generated" dataKey="testKey" />
      </LineChartContext.Provider>
    );

    const pathElement = container.querySelector('[aria-label*="Custom label overrides generated"]');
    expect(pathElement).toBeInTheDocument();
  });
  it('should process aria-label templates in nodeConfig', () => {
    const mockedNodeWithAriaLabel = {
      ...mockedNode,
      'aria-label': 'Data point {{index}}: {{dataKey}} = {{yValue}}',
    };

    const { container } = render(
      <LineChartContext.Provider value={CONTEXT}>
        <LineChart.Path dataKey="testKey" nodeConfig={mockedNodeWithAriaLabel} />
      </LineChartContext.Provider>
    );

    // Should find a node with processed aria-label (index should be 1-based, so "Data point 1: testKey = ...")
    const nodeElement = container.querySelector('[aria-label*="Data point 1: testKey"]');
    expect(nodeElement).toBeInTheDocument();
  });
});
