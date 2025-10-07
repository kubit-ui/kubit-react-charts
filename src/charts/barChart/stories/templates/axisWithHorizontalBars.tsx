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
      key={`bar-chart-rabbits-${index.toString()}`}
      barConfig={rabbitsBarConfig}
      dataIdx={index}
      dataKey="rabbits"
      endRounded={2}
      order={1}
    />,
    <BarChart.Path
      key={`bar-chart-dogs-${index.toString()}`}
      barConfig={dogsBarConfig}
      dataIdx={index}
      dataKey="dogs"
      endRounded={2}
      order={2}
    />,
    <BarChart.Path
      key={`bar-chart-birds-${index.toString()}`}
      barConfig={birdsBarConfig}
      dataIdx={index}
      dataKey="birds"
      endRounded={2}
      order={3}
    />,
  ];
  return [...acc, ...paths];
}, [] as ReactElement[]);

export const AXIS_WITH_HORIZONTAL_BARS = [
  ...BAR_CHART_PATHS,
  <BarChart.XAxis
    key="4"
    ariaLabel="XAxis"
    position={Positions.BOTTOM}
    showTickLines={false}
    stroke="black"
    strokeWidth="0.1"
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
    }}
    tickValues={{ numeric: { max: 120, min: -120, step: 30 } }}
  />,
  <BarChart.YAxis
    key="5"
    ariaLabel="ariaLabel Yaxis"
    position={Positions.LEFT}
    showTickLines={false}
    stroke="black"
    strokeWidth="0.1"
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
    }}
    tickValues={{ numeric: { max: 2005, min: 2000, step: 1 } }}
  />,
];
