export const BarOrientation = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
} as const;

export interface BarChartColor {
  color: string;
  coverage: number;
  title?: string;
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
}

export interface BarChartSegmentProps extends Omit<BarProps, 'colorPalette'> {
  color: string;
}
