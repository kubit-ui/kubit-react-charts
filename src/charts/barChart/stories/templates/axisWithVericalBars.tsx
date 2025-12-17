import type { ReactElement } from 'react';

import { Positions } from '@/types/position.enum';

import { BarChart } from '../../barChart';
import { COMPARATIVE_DATA } from './data';

const rabbitsBarConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    { color: 'pink', coverage: 45 },
    { color: 'red', coverage: 25 },
    { color: 'blue', coverage: 30 },
  ],
};
const dogsBarConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    { color: 'yellow', coverage: 20 },
    { color: 'orange', coverage: 25 },
    { color: 'green', coverage: 55 },
  ],
};
const birdsBarConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    { color: 'gray', coverage: 10 },
    { color: 'grey', coverage: 30 },
    { color: 'black', coverage: 60 },
  ],
};

const BAR_CHART_PATHS = COMPARATIVE_DATA.reduce((acc, _, index) => {
  const paths = [
    <BarChart.Path
      key={`bar-chart-${Math.random() + index}`}
      barConfig={rabbitsBarConfig}
      dataIdx={index}
      dataKey="rabbits"
      order={1}
    />,
    <BarChart.Path
      key={`bar-chart-${Math.random() + index}`}
      barConfig={dogsBarConfig}
      dataIdx={index}
      dataKey="dogs"
      order={2}
    />,
    <BarChart.Path
      key={`bar-chart-${Math.random() + index}`}
      barConfig={birdsBarConfig}
      dataIdx={index}
      dataKey="birds"
      order={3}
    />,
  ];
  return [...acc, ...paths];
}, [] as ReactElement[]);

export const AXIS_WITH_VERTICAL_BARS = [
  ...BAR_CHART_PATHS,
  <BarChart.XAxis
    key="4"
    ariaLabel="X Axis"
    position={Positions.BOTTOM}
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickLine={{
      ariaLabel: undefined,
      className: undefined,
      dataTestId: undefined,
      opacity: 1,
      stroke: '#999999',
      strokeDasharray: '1,1',
      strokeDashoffset: undefined,
      strokeLinecap: undefined,
      strokeLinejoin: undefined,
      strokeOpacity: 1,
      strokeWidth: 0.25,
      style: undefined,
      tabIndex: undefined,
      transform: undefined,
    }}
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
    }}
    tickValues={{ numeric: { max: 2005, min: 2000, step: 1 } }}
  />,
  <BarChart.YAxis
    key="5"
    ariaLabel="Y Axis"
    position={Positions.LEFT}
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickLine={{
      ariaLabel: undefined,
      className: undefined,
      dataTestId: undefined,
      opacity: 1,
      stroke: '#999999',
      strokeDasharray: '1,1',
      strokeDashoffset: undefined,
      strokeLinecap: undefined,
      strokeLinejoin: undefined,
      strokeOpacity: 1,
      strokeWidth: 0.25,
      style: undefined,
      tabIndex: undefined,
      transform: undefined,
    }}
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
    }}
    tickValues={{ numeric: { max: 120, min: -120, step: 30 } }}
  />,
  <BarChart.Separator
    key="7"
    areaSeparator={{ fill: 'rgba(0,0,0,0.4)' }}
    topSeparator={{ stroke: 'black', strokeWidth: '0.3' }}
    yBreakAxis="0"
  />,
];
