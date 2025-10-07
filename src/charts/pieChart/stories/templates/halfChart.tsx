import { ICONS } from '@/assets/storybook/icons/icons';

import { PieChart } from '../../pieChart';

export const HALF_CHART_TEMPLATE = [
  <PieChart.Path
    key="1"
    dataKey="groups"
    fill="red"
    gap={0}
    innerRadius={50}
    radius={100}
    stroke="transparent"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <PieChart.Foreign key="foreign-object">
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <svg
        aria-label="Foreing content example with kubit logo"
        role="img"
        style={{
          backgroundColor: '#001E30',
          height: '36px',
          maskImage: `url("${ICONS.ICON_PLACEHOLDER}")`,
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
          maskSize: 'contain',
          width: '36px',
        }}
      />
    </div>
  </PieChart.Foreign>,
];
