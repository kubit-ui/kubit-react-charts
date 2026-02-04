import type { FC, ReactElement } from 'react';

import { Path } from '../path/path';
import type { BarProps } from './bar.type';
import { buildAriaLabel } from './utils/accessibility';
import { buildD } from './utils/buildD';
import { getSegments } from './utils/getSegments';

export const Bar: FC<BarProps> = ({
  barConfig,
  currentBars,
  endRounded,
  extraSpacing = 0,
  focusConfig = {
    stroke: '#0078D4',
    strokeWidth: 0.2,
  },
  onBlur,
  onClick,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  order = 1,
  orientation,
  startRounded,
  tabIndex = 0,
  x1,
  x2,
  y1,
  y2,
  // Allow to build a11y aria-labels with templates
  dataKey,
  xKey,
  yKey,
  xData,
  yData,
}): ReactElement => {
  const { barWidth, singleConfig } = barConfig;
  const segments = getSegments({ barConfig, orientation, x1, x2, y1, y2 });
  
  // Create event handlers that match Path component signatures
  const handlePathMouseEnter = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    onMouseEnter?.(e);
  };
  
  const handlePathMouseLeave = (e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    onMouseLeave?.(e);
  };
  
  const handlePathClick = () => {
    // Path's onClick expects dataValue, but we'll trigger the bar's onClick with a synthetic event
    if (onClick) {
      const syntheticEvent = {} as React.MouseEvent<SVGPathElement, MouseEvent>;
      onClick(syntheticEvent);
    }
  };
  
  return (
    <g>
      {singleConfig.map(({ color, 'aria-label': ariaLabel, ...singleProps }, index) => {
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
            key={`${index.toString()}`}
            aria-label={buildAriaLabel({
              ariaLabel,
              dataKey,
              xKey,
              yKey,
              xData,
              yData,
              coverage: singleProps.coverage,
              index,
            })}
            d={d}
            fill={color}
            focusConfig={focusConfig}
            hoverConfig={{
              stroke: 'transparent',
              strokeWidth: '0',
            }}
            stroke="transparent"
            tabIndex={tabIndex}
            onBlur={onBlur}
            onClick={onClick ? handlePathClick : undefined}
            onFocus={onFocus}
            onMouseEnter={onMouseEnter ? handlePathMouseEnter : undefined}
            onMouseLeave={onMouseLeave ? handlePathMouseLeave : undefined}
            {...singleProps}
          />
        );
      })}
    </g>
  );
};
