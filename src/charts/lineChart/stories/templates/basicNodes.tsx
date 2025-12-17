import { NodeType } from '@/components/node/node.types';
import { Positions } from '@/types/position.enum';

import { LineChart } from '../../lineChart';

export const BASIC_NODES_TEMPLATE = [
  <LineChart.Path
    key="1"
    aria-label="Line chart for cats data series"
    dataKey="cats"
    nodeConfig={{
      // Example custom aria attributes
      'aria-label': 'Data point {{index}}: {{dataKey}} has value {{yValue}} at {{xValue}}',
      'role': 'img',
      // Example custom data attributes
      'data-chart-type': 'line',
      'data-series': 'cats',
      'data-test-id': 'line-chart-node',
      'fill': 'white',
      'hasHalo': true,
      'onClick': (_e, data) => {
        window.alert(
          data?.index !== undefined &&
            data?.dataKey &&
            data?.xKey &&
            `${data?.dataKey}: ${data?.dataValue[data?.index][data?.dataKey]} \n ${data?.xKey}: ${data?.dataValue[data?.index][data?.xKey]}`
        );
      },
      'onKeyDown': (_e, data) => {
        window.alert(
          data?.index !== undefined &&
            data?.dataKey &&
            data?.xKey &&
            `${data?.dataKey}: ${data?.dataValue[data?.index][data?.dataKey]} \n ${data?.xKey}: ${data?.dataValue[data?.index][data?.xKey]}`
        );
      },
      'size': 1.3,
      'stroke': 'red',
      'strokeWidth': '0.2',
      'type': NodeType.Circle,
    }}
    stroke="#0074d9"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.XAxis
    key="2"
    aria-label="X Axis"
    position={Positions.BOTTOM}
    role="img"
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
      top: 1,
    }}
  />,
  <LineChart.YAxis
    key="3"
    aria-label="Y Axis"
    position={Positions.LEFT}
    role="img"
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickText={{
      fontSize: 1,
      right: 1,
      textAnchor: 'middle',
    }}
  />,
];
