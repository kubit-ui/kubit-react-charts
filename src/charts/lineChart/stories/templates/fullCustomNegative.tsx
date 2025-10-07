import { Positions } from '@/types/position.enum';

import { LineChart } from '../../lineChart';

export const FULL_CUSTOM_TEMPLATE_NEGATIVE = [
  <LineChart.Separator key="7" areaSeparator={{ fill: 'rgba(0,0,0,0.1)' }} />,
  <LineChart.Path
    key="2"
    ariaLabel="XAxis"
    curved={false}
    dataKey="cats"
    stroke="green"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="3"
    ariaLabel="YAxis"
    curved={true}
    dataKey="lions"
    stroke="pink"
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
    position={Positions.CUSTOM}
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
      top: 0,
    }}
    tickValues={{ numeric: { breakAxis: 0, max: 10, min: -6, step: 2 } }}
  />,
  <LineChart.YAxis
    key="6"
    ariaLabel="YAxis"
    position={Positions.CUSTOM}
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
    }}
    tickValues={{ numeric: { breakAxis: 0, max: 120, min: -30, step: 30 } }}
  />,
];
