import { Positions } from '@/types/position.enum';

import { LineChart } from '../../lineChart';

export const FULL_CUSTOM_TEMPLATE = [
  <LineChart.Separator key="7" areaSeparator={{ fill: 'rgba(0,0,0,0.1)' }} />,
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
    position={Positions.CENTER}
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
      top: 1,
      transform: 'rotate',
    }}
    tickValues={{
      custom: { values: ['step 1', 'step 2', 'step 3', 'step 4', 'step 5', 'step 6'] },
    }}
  />,
  <LineChart.YAxis
    key="6"
    ariaLabel="YAxis"
    position={Positions.RIGHT}
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
