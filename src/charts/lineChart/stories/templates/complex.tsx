import { NodeType } from '@/components/node/node.types';
import { Positions } from '@/types/position.enum';

import { LineChart } from '../../lineChart';

export const COMPLEX_TEMPLATE = [
  <LineChart.Path
    key="1"
    aria-label="Line chart for dogs data series"
    dataKey="dogs"
    stroke="#0074d9"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="2"
    aria-label="Line chart for cats data series"
    curved={false}
    dataKey="cats"
    nodeConfig={{
      fill: 'white',
      hasHalo: true,
      size: 1.3,
      stroke: 'red',
      strokeWidth: '0.2',
      type: NodeType.Circle,
    }}
    stroke="green"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="3"
    aria-label="Line chart for lions data series"
    curved={true}
    dataKey="lions"
    stroke="pink"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="4"
    aria-label="Line chart for rabbits data series"
    curved={true}
    dataKey="rabbits"
    nodeConfig={{
      fill: 'white',
      hasHalo: true,
      size: 1.3,
      stroke: 'green',
      strokeWidth: '0.2',
      type: NodeType.Square,
    }}
    stroke="red"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.XAxis
    key="5"
    aria-label="X Axis"
    position={Positions.BOTTOM}
    role="img"
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickLine={{
      stroke: '#bbb',
      strokeDasharray: '0.3',
      strokeWidth: '0.1',
    }}
    tickLineHover={{
      stroke: '#000',
      strokeDasharray: '0',
    }}
    tickText={{
      fontSize: 1,
      textAnchor: 'start',
      top: 1,
    }}
  />,
  <LineChart.YAxis
    key="6"
    aria-label="Y Axis"
    position={Positions.LEFT}
    role="img"
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickLine={{
      stroke: '#bbb',
      strokeDasharray: '0.3',
      strokeWidth: '0.1',
    }}
    tickLineHover={{
      stroke: '#000',
      strokeDasharray: '0',
    }}
    tickText={{
      fontSize: 1,
      textAnchor: 'end',
      left: 0.3,
      useAxisAsOrigin: true,
    }}
  />,
];
