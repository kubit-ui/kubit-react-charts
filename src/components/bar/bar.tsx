import type { FC, ReactElement } from 'react';

import { Path } from '../path/path';
import type { BarProps } from './bar.type';
import { buildD } from './utils/buildD';
import { getSegments } from './utils/getSegments';

export const Bar: FC<BarProps> = ({
  barConfig,
  currentBars,
  endRounded,
  extraSpacing = 0,
  order = 1,
  orientation,
  startRounded,
  x1,
  x2,
  y1,
  y2,
}): ReactElement => {
  const { barWidth, singleConfig } = barConfig;
  const segments = getSegments({ barConfig, orientation, x1, x2, y1, y2 });
  return (
    <g>
      {singleConfig.map((single, index) => {
        const [segmentX1, segmentX2] = orientation === 'HORIZONTAL' ? segments[index] : [x1, x2];
        const [segmentY1, segmentY2] = orientation === 'VERTICAL' ? segments[index] : [y1, y2];
        const d = buildD({
          barWidth,
          currentBars,
          endRounded: index === singleConfig.length - 1 && endRounded ? endRounded : undefined,
          extraSpacing,
          order,
          orientation,
          startRounded: index === 0 && startRounded ? startRounded : undefined,
          x1: segmentX1,
          x2: segmentX2,
          y1: segmentY1,
          y2: segmentY2,
        });
        return (
          <Path
            key={`${single.title}-${index.toString()}`}
            d={d}
            fill={single.color}
            hoverConfig={{
              stroke: 'transparent',
              strokeWidth: '0',
            }}
            stroke="transparent"
            tabIndex={0}
            title={single.title}
          />
        );
      })}
    </g>
  );
};
