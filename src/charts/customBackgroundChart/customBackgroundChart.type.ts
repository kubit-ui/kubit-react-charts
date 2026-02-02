import type { PlotProps } from '@/components/plot/plot.types';
import type { ChartError, ChartErrorCollection, ErrorType } from '@/types/errors.type';

export interface CustomBackgroundDataPoint<T = number> {
  x: number;
  y: number;
  value: T;
  name?: string;
}

export type CustomBackgroundData<T = number> = Record<string, CustomBackgroundDataPoint<T>>;

export interface ViewBoxDimensions {
  width: number;
  height: number;
}

export interface CustomBackgroundChartProps<T = number> {
  data: CustomBackgroundData<T>;
  backgroundUrl: string;
  viewBox: ViewBoxDimensions;
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  ariaLabel?: string;
  ariaHidden?: boolean;
  role?: string;
  tabIndex?: number;
  caption?: string;
  className?: string;
  dataTestId?: string;
  onErrors?: (errors: ChartErrorCollection) => void;
  onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onDoubleClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<SVGElement>) => void;
  onBlur?: (event: React.FocusEvent<SVGElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
}

export interface CustomBackgroundChartPlotProps<T = number>
  extends Omit<PlotProps<T>, 'position' | 'data' | 'label'> {
  dataKey: string;
  /** Supports placeholders: {{dataKey}}, {{name}}, {{value}}, {{x}}, {{y}} */
  ariaLabel?: string;
  formatAriaValue?: (value: T) => string;
}

export interface CustomBackgroundChartContextType<T = number> {
  data: CustomBackgroundData<T>;
  viewBox: ViewBoxDimensions;
  dataTestId: string;
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}
