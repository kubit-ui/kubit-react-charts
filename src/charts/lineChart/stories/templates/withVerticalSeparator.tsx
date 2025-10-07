import { Positions } from '@/types/position.enum';

import { LineChart } from '../../lineChart';

export const WITH_VERTICAL_SEPARATOR = [
  <LineChart.Separator
    key="7"
    areaSeparator={{ fill: 'rgba(0,0,0,0.1)' }}
    rightSeparator={{ stroke: 'black', strokeWidth: '0.3' }}
    xBreakAxis="step 3"
  />,
  <LineChart.Path
    key="3"
    ariaLabel="XAxis"
    curved={true}
    dataKey="lions"
    stroke="pink"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="2"
    curved={false}
    dataKey="cats"
    stroke="green"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path key="1" dataKey="dogs" stroke="#0074d9" strokeWidth="0.1" tabIndex={0} />,
  <LineChart.Path
    key="4"
    curved={true}
    dataKey="rabbits"
    stroke="red"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.XAxis
    key="5"
    ariaLabel="XAxis"
    position={Positions.BOTTOM}
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
      top: 0,
    }}
    tickValues={{
      custom: { values: ['step 1', 'step 2', 'step 3', 'step 4', 'step 5', 'step 6'] },
    }}
  />,
  <LineChart.YAxis
    key="6"
    ariaLabel="YAxis"
    position={Positions.LEFT}
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
    }}
    tickValues={{ numeric: { max: 120, min: -120, step: 30 } }}
  />,
];
