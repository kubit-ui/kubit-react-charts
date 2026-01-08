import type { ReactElement } from 'react';

import { Positions } from '@/types/position.enum';

import { BarChart } from '../../barChart';
import { MIXED_DATA } from './data';

const rabbitsBarConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    {
      color: 'pink',
      coverage: 45,
      ['aria-label']:
        '{{yKey}}:{{yData}} - Segment {{index}} - {{coverage}}% of the total ({{xData}})',
      role: 'img',
    },
    {
      color: 'red',
      coverage: 25,
      ['aria-label']:
        '{{yKey}}:{{yData}} - Segment {{index}} - {{coverage}}% of the total ({{xData}})',
      role: 'img',
    },
    {
      color: 'blue',
      coverage: 30,
      ['aria-label']:
        '{{yKey}}:{{yData}} - Segment {{index}} - {{coverage}}% of the total ({{xData}})',
      role: 'img',
    },
  ],
};
const dogsBarConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    {
      color: 'yellow',
      coverage: 20,
      ['aria-label']:
        '{{yKey}}:{{yData}} - Segment {{index}} - {{coverage}}% of the total ({{xData}})',
      role: 'img',
    },
    {
      color: 'orange',
      coverage: 25,
      ['aria-label']:
        '{{yKey}}:{{yData}} - Segment {{index}} - {{coverage}}% of the total ({{xData}})',
      role: 'img',
    },
    {
      color: 'green',
      coverage: 55,
      ['aria-label']:
        '{{yKey}}:{{yData}} - Segment {{index}} - {{coverage}}% of the total ({{xData}})',
      role: 'img',
    },
  ],
};
const birdsBarConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    {
      color: 'gray',
      coverage: 10,
      ['aria-label']:
        '{{yKey}}:{{yData}} - Segment {{index}} - {{coverage}}% of the total ({{xData}})',
      role: 'img',
    },
    {
      color: 'grey',
      coverage: 30,
      ['aria-label']:
        '{{yKey}}:{{yData}} - Segment {{index}} - {{coverage}}% of the total ({{xData}})',
      role: 'img',
    },
    {
      color: 'black',
      coverage: 60,
      ['aria-label']:
        '{{yKey}}:{{yData}} - Segment {{index}} - {{coverage}}% of the total ({{xData}})',
      role: 'img',
    },
  ],
};

const BAR_CHART_PATHS = MIXED_DATA.reduce((acc, _, index) => {
  const paths = [
    <BarChart.Path
      key={`bar-chart-rabbits-${index.toString()}`}
      barConfig={rabbitsBarConfig}
      dataIdx={index}
      dataKey="rabbits"
      order={1}
    />,
    <BarChart.Path
      key={`bar-chart-dogs-${index.toString()}`}
      barConfig={dogsBarConfig}
      dataIdx={index}
      dataKey="dogs"
      order={2}
    />,
    <BarChart.Path
      key={`bar-chart-birds-${index.toString()}`}
      barConfig={birdsBarConfig}
      dataIdx={index}
      dataKey="birds"
      order={3}
    />,
  ];
  return [...acc, ...paths];
}, [] as ReactElement[]);

export const AXIS_HORIZONTAL_MIXED_BARS = [
  ...BAR_CHART_PATHS,
  <BarChart.XAxis
    key="4"
    aria-label="X Axis"
    position={Positions.BOTTOM}
    role="img"
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
    aria-label="Y Axis"
    position={Positions.CENTER}
    role="img"
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
