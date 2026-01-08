import type { ReactElement, ReactNode } from 'react';

import type { XAxisProps } from '@/components/axisChart/xAxis/xAxis.types';
import type { YAxisProps } from '@/components/axisChart/yAxis/yAxis.types';
import type { BarChartStyles, BarOrientation } from '@/components/bar/bar.type';
import type { PathProps, StyleProps } from '@/components/path/path.types';
import type { TickData } from '@/components/tick/tick.types';
import type { CanvasConfig } from '@/types/canvas.type';
import type { ChartError, ChartErrorCollection, ErrorType } from '@/types/errors.type';
import type { Positions } from '@/types/position.enum';

export type BarChartChildrenType = ReactNode | ReactElement<PathProps | XAxisProps | YAxisProps>;

export interface BarChartIDataPoint {
  [key: string]: string | number;
}

export interface BarChartCoordinates {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface BarChartCoordinatesData {
  coordinates: BarChartCoordinates;
  tickValues: TickData[];
}

export interface BarChartExtraSpacings {
  extraSpaceBottomY: number;
  extraSpaceTopY: number;
  extraSpaceLeftX: number;
  extraSpaceRightX: number;
  securityXSpace: number;
  securityYSpace: number;
  barChartXPosition: (typeof Positions)[keyof typeof Positions];
  barChartYPosition: (typeof Positions)[keyof typeof Positions];
  xData: string[];
  yData: string[];
  xBreakAxis?: number;
  yBreakAxis?: number;
  xAxisText: number;
  yAxisText: number;
}

type OmitLineProps =
  | 'barChartXPosition'
  | 'barChartYPosition'
  | 'xData'
  | 'yData'
  | 'xBreakAxis'
  | 'yBreakAxis';

export type BarChartContextType = Omit<BarChartExtraSpacings, OmitLineProps> & {
  data: BarChartIDataPoint[];
  pKey: string;
  canvasWidth: string | number;
  canvasHeight: string | number;
  canvasExtraSpace: number | undefined;
  dataTestId?: string;
  xAxisCoordinates: BarChartCoordinatesData;
  yAxisCoordinates: BarChartCoordinatesData;
  crossYAxis: boolean;
  crossXAxis: boolean;
  barChildrenCount: number;
  gapBetweenBars?: number;
  orientation: (typeof BarOrientation)[keyof typeof BarOrientation];
  error?: ChartError;
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
};

export interface BarChartProps {
  children: BarChartChildrenType;
  role?: string;
  width?: string | number;
  height?: string | number;
  data: BarChartIDataPoint[];
  pKey: string;
  canvasConfig?: CanvasConfig;
  dataTestId?: string;
  caption?: string;
  tabIndex?: number;
  classNames?: string;
  gapBetweenBars?: number;
  orientation: (typeof BarOrientation)[keyof typeof BarOrientation];
  onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onDoubleClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<SVGElement>) => void;
  onBlur?: (event: React.FocusEvent<SVGElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
  onErrors?: (errors: ChartErrorCollection) => void;
}

export interface BarChartTickNumeric {
  max: number;
  step: number;
  min?: number;
  breakAxis?: number;
}

export interface BarChartTickCustom {
  values: string[];
  breakAxis?: string;
}

export interface BarChartTickValuesAxisProps {
  custom?: BarChartTickCustom;
  numeric?: BarChartTickNumeric;
}
type OmitProps = 'x1' | 'x2' | 'y1' | 'y2' | 'tickValues' | 'cursor' | 'ariaLabel';
export interface BarChartXAxisProps extends Omit<XAxisProps, OmitProps>, React.AriaAttributes {
  /**
   * @deprecated Use aria-label instead for better accessibility standards
   */
  ariaLabel?: string;
  tickValues?: BarChartTickValuesAxisProps;
}
export interface BarChartYAxisProps extends Omit<YAxisProps, OmitProps>, React.AriaAttributes {
  /**
   * @deprecated Use aria-label instead for better accessibility standards
   */
  ariaLabel?: string;
  tickValues?: BarChartTickValuesAxisProps;
}
export interface BarChartSeparatorProps {
  topSeparator?: StyleProps;
  rightSeparator?: StyleProps;
  areaSeparator?: StyleProps;
  dataTestId?: string;
  xBreakAxis?: string;
  yBreakAxis?: string;
}

export interface BarChartPathProps {
  dataKey: string;
  order?: number;
  barConfig: BarChartStyles;
  dataIdx: number;
  startRounded?: number;
  endRounded?: number;
}
