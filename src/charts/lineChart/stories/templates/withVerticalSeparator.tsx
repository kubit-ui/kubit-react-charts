import { Positions } from '@/types/position.enum';

import { LineChart } from '../../lineChart';

export const WITH_VERTICAL_SEPARATOR = [
  <LineChart.Separator
    key="1"
    areaSeparator={{ fill: 'rgba(0,0,0,0.1)' }}
    rightSeparator={{ stroke: 'black', strokeWidth: '0.3' }}
    xBreakAxis="step 3"
  />,
  <LineChart.Path
    key="2"
    aria-label="Line chart for lions data series"
    curved={true}
    dataKey="lions"
    stroke="pink"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="3"
    aria-label="Line chart for cats data series"
    curved={false}
    dataKey="cats"
    stroke="green"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="4"
    aria-label="Line chart for dogs data series"
    dataKey="dogs"
    stroke="#0074d9"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="5"
    aria-label="Line chart for rabbits data series"
    curved={true}
    dataKey="rabbits"
    stroke="red"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.XAxis
    key="6"
    aria-label="X Axis"
    position={Positions.BOTTOM}
    role="img"
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
    key="7"
    aria-label="Y Axis"
    position={Positions.LEFT}
    role="img"
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
