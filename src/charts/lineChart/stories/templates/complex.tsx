import { NodeType } from '@/components/node/node.types';
import { Positions } from '@/types/position.enum';

import { LineChart } from '../../lineChart';

export const COMPLEX_TEMPLATE = [
  <LineChart.Path key="1" dataKey="dogs" stroke="#0074d9" strokeWidth="0.1" tabIndex={0} />,
  <LineChart.Path
    key="2"
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
    key="2"
    curved={true}
    dataKey="lions"
    stroke="pink"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="2"
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
    key="3"
    ariaLabel="XAxis"
    position={Positions.BOTTOM}
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
      textAnchor: 'middle',
      top: 0,
    }}
  />,
  <LineChart.YAxis
    key="4"
    ariaLabel="ariaLabel Yaxis"
    position={Positions.LEFT}
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
      textAnchor: 'middle',
    }}
  />,
];
