import type { ReactNode } from 'react';

export interface ForeignObjectProps {
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
  x?: string | number;
  y?: string | number;
  dataTestId?: string;
}
