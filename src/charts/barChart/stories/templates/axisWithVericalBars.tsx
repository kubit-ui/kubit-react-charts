import type { ReactElement } from 'react';

import type { BarChartStyles } from '@/components/bar/bar.type';
import { Positions } from '@/types/position.enum';

import { BarChart } from '../../barChart';
import { COMPARATIVE_DATA } from './data';

const rabbitsBarConfig: BarChartStyles = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    {
      color: 'pink',
      coverage: 45,
      ['aria-label']:
        '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
      role: 'img',
    },
    {
      color: 'red',
      coverage: 25,
      ['aria-label']:
        '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
      role: 'img',
    },
    {
      color: 'blue',
      coverage: 30,
      ['aria-label']:
        '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
      role: 'img',
    },
  ],
};
const dogsBarConfig: BarChartStyles = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    {
      color: 'yellow',
      coverage: 20,
      ['aria-label']:
        '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
      role: 'img',
    },
    {
      color: 'orange',
      coverage: 25,
      ['aria-label']:
        '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
      role: 'img',
    },
    {
      color: 'green',
      coverage: 55,
      ['aria-label']:
        '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
      role: 'img',
    },
  ],
};
const birdsBarConfig: BarChartStyles = {
  barWidth: 3,
  gap: 1,
  singleConfig: [
    {
      color: 'gray',
      coverage: 10,
      ['aria-label']:
        '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
      role: 'img',
    },
    {
      color: 'grey',
      coverage: 30,
      ['aria-label']:
        '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
      role: 'img',
    },
    {
      color: 'black',
      coverage: 60,
      ['aria-label']:
        '{{xKey}}:{{xData}} - Segment {{index}} - {{coverage}}% of the total ({{yData}})',
      role: 'img',
    },
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
    aria-label="X Axis"
    position={Positions.BOTTOM}
    role="img"
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickLine={{
      opacity: 1,
      stroke: '#999999',
      strokeDasharray: '1,1',
      strokeOpacity: 1,
      strokeWidth: 0.25,
    }}
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
    }}
    tickValues={{ numeric: { max: 2005, min: 2000, step: 1 } }}
  />,
  <BarChart.YAxis
    key="5"
    aria-label="Y Axis"
    position={Positions.LEFT}
    role="img"
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickLine={{
      opacity: 1,
      stroke: '#999999',
      strokeDasharray: '1,1',

      strokeOpacity: 1,
      strokeWidth: 0.25,
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
