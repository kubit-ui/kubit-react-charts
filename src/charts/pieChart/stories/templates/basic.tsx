import { PieChart } from '../../pieChart';

export const BASIC_TEMPLATE = [
  <PieChart.Path
    key="1"
    aria-label="{{dataKey}} - {{groupName}} with value {{groupValue}}"
    dataKey="groups"
    fill="red"
    gap={0}
    innerRadius={20}
    radius={100}
    stroke="transparent"
    strokeWidth="0.1"
    tabIndex={0}
  />,
];
