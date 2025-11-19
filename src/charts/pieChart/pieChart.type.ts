import type { ReactElement, ReactNode } from 'react';

import type { PathProps } from '@/components/path/path.types';
import type { CanvasConfig } from '@/types/canvas.type';
import type { ChartError, ChartErrorCollection, ErrorType } from '@/types/errors.type';

interface Group {
  name: string;
  value: number;
  color?: string;
}

export interface DataItem {
  [key: string]: Group[];
}

export type PieChartChildrenType = ReactNode | ReactElement<PathProps>[];

export interface PieChartProps {
  role?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  caption?: string;
  canvasConfig?: CanvasConfig;
  dataTestId?: string;
  width?: string;
  height?: string;
  radius?: string;
  children?: PieChartChildrenType;
  data: DataItem;
  classNames?: string;
  segmentClassNames?: string;
  tabIndex?: number;
  halfChart?: boolean;
  onClick?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onDoubleClick?: (eevent: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<SVGElement>) => void;
  onBlur?: (event: React.FocusEvent<SVGElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
  onErrors?: (errors: ChartErrorCollection) => void;
}

export interface PieChartContextType {
  foreignObject?: {
    height?: number;
    width?: number;
    x: number;
    y: number;
  };
  canvasWidth: number;
  canvasHeight: number;
  data: DataItem;
  dataTestId?: string;
  halfChart?: boolean;
  error?: ChartError;
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}

export type PieChartSegmentProps = PathProps & {
  total: number;
  startAngle: React.MutableRefObject<number>;
  canvasWidth: number;
  canvasHeight: number;
  innerRadius?: number;
  gap?: number;
  radius?: number;
  value: number;
  color?: string;
  name?: string;
  singleStroke: boolean;
  halfChart?: boolean;
  dataKey?: string;
  index?: number;
};
