import type { AriaAttributes, HTMLAttributes } from 'react';

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
