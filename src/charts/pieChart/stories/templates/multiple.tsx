import { PieChart } from '../../pieChart';

export const MULTIPLE_TEMPLATE = [
  <PieChart.Path
    key="1"
    aria-label="{{dataKey}} - {{groupName}} with value {{groupValue}}"
    dataKey="groups"
    fill="red"
    gap={10}
    innerRadius={80}
    radius={100}
    stroke="transparent"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <PieChart.Path
    key="3"
    aria-label="{{dataKey}} - {{groupName}} with value {{groupValue}}"
    dataKey="animals"
    fill="red"
    gap={8}
    innerRadius={60}
    radius={70}
    stroke="transparent"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <PieChart.Path
    key="2"
    aria-label="{{dataKey}} - {{groupName}} with value {{groupValue}}"
    dataKey="vehicles"
    fill="red"
    gap={2}
    innerRadius={40}
    radius={50}
    stroke="transparent"
    strokeWidth="0.1"
    tabIndex={0}
  />,
];
