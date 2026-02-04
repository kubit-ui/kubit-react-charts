import type { AriaAttributes, HTMLAttributes } from 'react';

import type { StyleProps } from '@/components/path/path.types';

export const BarOrientation = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
} as const;

interface DataAttributes {
  [key: `data-${string}`]: string | number | boolean | undefined;
}

export interface BarChartColor extends AriaAttributes, DataAttributes {
  color: string;
  coverage: number;
  title?: string;
  role?: HTMLAttributes<SVGElement>['role'];
  tabIndex?: HTMLAttributes<SVGElement>['tabIndex'];
}

export interface BarChartStyles {
  gap?: number;
  barWidth: number;
  singleConfig: BarChartColor[];
}

export interface BarProps {
  orientation: (typeof BarOrientation)[keyof typeof BarOrientation];
  barConfig: BarChartStyles;
  order?: number;
  currentBars: number;
  extraSpacing?: number;
  parentIndex?: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  startRounded?: number;
  endRounded?: number;
  /**
   * @deprecated In the next major version, this prop will use a more restrictive interface
   * based on FocusConfig type. Other StyleProps fields are currently ignored.
   */
  focusConfig?: StyleProps;
  tabIndex?: number;
  onFocus?: (event: React.FocusEvent<SVGPathElement>) => void;
  onBlur?: (event: React.FocusEvent<SVGPathElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onClick?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  // Allow to build a11y aria-labels with templates
  dataKey?: string;
  xKey?: string;
  yKey?: string;
  xData?: string | number;
  yData?: string | number;
}

export interface BarChartSegmentProps extends Omit<BarProps, 'colorPalette'> {
  color: string;
}
