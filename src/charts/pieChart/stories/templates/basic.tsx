import { PieChart } from '../../pieChart';

// Shared focusConfig for visual comparison across charts
const FOCUS_CONFIG = {
  stroke: '#0078D4',
  strokeWidth: 2,
};

export const BASIC_TEMPLATE = [
  <PieChart.Path
    key="1"
    aria-label="{{dataKey}} - {{groupName}} with value {{groupValue}}"
    dataKey="groups"
    fill="red"
    focusConfig={FOCUS_CONFIG}
    gap={0}
    innerRadius={20}
    radius={100}
    stroke="transparent"
    strokeWidth="0.1"
    tabIndex={0}
  />,
];
