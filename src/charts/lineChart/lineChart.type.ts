import type { ReactElement, ReactNode } from 'react';

import type { XAxisProps } from '@/components/axisChart/xAxis/xAxis.types';
import type { YAxisProps } from '@/components/axisChart/yAxis/yAxis.types';
import type { LineProps } from '@/components/line/line.types';
import type { NodePathProps, PathProps, StyleProps } from '@/components/path/path.types';
import type { TickData } from '@/components/tick/tick.types';
import type { CanvasConfig } from '@/types/canvas.type';
import type { ChartError, ChartErrorCollection, ErrorType } from '@/types/errors.type';
import type { Positions } from '@/types/position.enum';
import type { ValueFormatter } from '@/types/valueFormatter.type';

export type ChildrenType = ReactNode | ReactElement<PathProps | XAxisProps | YAxisProps>;

export interface IDataPoint {
  [key: string]: any;
}

export interface LineChartCoordinates {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface LineChartCoordinatesData {
  coordinates: LineChartCoordinates;
  tickValues: TickData[];
}

export interface LineChartExtraSpacings {
  xAxisLeftSpacing: number;
  xAxisTopSpacing: number;
  xAxisRightSpacing: number;
  xAxisBottomSpacing: number;
  yAxisLeftSpacing: number;
  yAxisTopSpacing: number;
  yAxisRightSpacing: number;
  yAxisBottomSpacing: number;
  lineChartXPosition: (typeof Positions)[keyof typeof Positions];
  lineChartYPosition: (typeof Positions)[keyof typeof Positions];
  xData: string[];
  yData: string[];
  xBreakAxis?: number;
  yBreakAxis?: number;
  xAxisText: number;
  yAxisText: number;
}

type OmitLineProps =
  | 'lineChartXPosition'
  | 'lineChartYPosition'
  | 'xData'
  | 'yData'
  | 'xBreakAxis'
  | 'yBreakAxis';

export type LineChartContextType = Omit<LineChartExtraSpacings, OmitLineProps> & {
  data: IDataPoint[];
  xKey: string;
  canvasWidth: string | number;
  canvasHeight: string | number;
  canvasExtraSpace: number | undefined;
  dataTestId?: string;
  xAxisCoordinates: LineChartCoordinatesData;
  yAxisCoordinates: LineChartCoordinatesData;
  crossYAxis: boolean;
  crossXAxis: boolean;
  xCursor: number;
  yCursor: number;
  error?: ChartError;
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
};

export interface LineChartProps {
  children: ChildrenType;
  role?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  width?: string | number;
  height?: string | number;
  data: IDataPoint[];
  xKey: string;
  /**
   * @deprecated Use `width` and `height` props instead to define chart dimensions.
   */
  canvasConfig?: CanvasConfig;
  dataTestId?: string;
  caption?: string;
  tabIndex?: number;
  classNames?: string;
  onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onDoubleClick?: (eevent: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<SVGElement>) => void;
  onBlur?: (event: React.FocusEvent<SVGElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
  getPathArea?: (coordinates: LineChartCoordinates) => void;
  onErrors?: (errors: ChartErrorCollection) => void;
}

export interface TickNumeric {
  max: number;
  step: number;
  min?: number;
  breakAxis?: number;
}

export interface TickCustom {
  values: string[];
  breakAxis?: string;
}

export interface TickValuesAxisProps {
  custom?: TickCustom;
  numeric?: TickNumeric;
}

type OmitProps = 'x1' | 'x2' | 'y1' | 'y2' | 'tickValues' | 'cursor';

export interface LineChartXAxisProps
  extends Omit<XAxisProps, OmitProps | 'ariaLabel'>,
    React.AriaAttributes {
  tickValues?: TickValuesAxisProps;
  valueFormatter?: ValueFormatter;
  /**
   * @deprecated Use aria-label instead for better accessibility standards
   */
  ariaLabel?: string;
  // Support for custom data-* attributes
  [key: `data-${string}`]: string | number | boolean | undefined;
}
export interface LineChartYAxisProps
  extends Omit<YAxisProps, OmitProps | 'ariaLabel' | 'tickText'>,
    React.AriaAttributes {
  /**
   * TODO: This prop is defined in the interface but NOT IMPLEMENTED in LineChartYAxis component.
   * The component currently ignores this prop and uses auto-generated tick values from context.
   * Implementation needed in lineChartYAxis.tsx to properly handle custom tick values.
   */
  tickValues?: TickValuesAxisProps;
  tickText?: YAxisProps['tickText'] & {
    useAxisAsOrigin?: boolean;
  };
  valueFormatter?: ValueFormatter;
  /**
   * @deprecated Use aria-label instead for better accessibility standards
   */
  ariaLabel?: string;
  // Support for custom data-* attributes
  [key: `data-${string}`]: string | number | boolean | undefined;
}

export interface LineChartSeparatorProps {
  topSeparator?: StyleProps;
  rightSeparator?: StyleProps;
  areaSeparator?: StyleProps;
  dataTestId?: string;
  xBreakAxis?: string;
  yBreakAxis?: string;
}

export interface LineChartProjectionProps {
  curved?: boolean;
  dataKey: string;
  points: [number, number][];
  lineProjection: LineChartProjections;
  svgHeight: number;
}

export interface LineChartProjection extends StyleProps {
  xProjection?: number;
  yProjection?: number;
}

export interface LineChartProjections {
  shapeColor: string;
  upper?: LineChartProjection;
  lower?: LineChartProjection;
}

type IndicatorOmitProps =
  | 'onClick'
  | 'onKeyDown'
  | 'onFocus'
  | 'onBlur'
  | 'onMouseEnter'
  | 'onMouseLeave';

export interface LineChartPathProps extends Omit<PathProps, 'ariaLabel'>, React.AriaAttributes {
  indicatorConfig?: Omit<NodePathProps, IndicatorOmitProps> & {
    autoClick?: boolean;
    lineIndicator?: Omit<LineProps, 'x1' | 'x2' | 'y1' | 'y2'>;
  };
  lineProjection?: LineChartProjections;
  closestClick?: boolean;
  getNodesCoords?: (coords: [number, number][]) => void;
  getNodeFocusInfo?: (info: { x: string; y: string }) => void;
  /**
   * @deprecated Use aria-label instead for better accessibility standards
   */
  ariaLabel?: string;
  // Support for custom data-* attributes
  [key: `data-${string}`]: string | number | boolean | undefined;
}
