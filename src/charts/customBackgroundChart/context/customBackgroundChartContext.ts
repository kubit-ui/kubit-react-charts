import { createContext } from 'react';

import type { CustomBackgroundChartContextType } from '../customBackgroundChart.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomBackgroundChartContext = createContext<CustomBackgroundChartContextType<any>>(
  {} as CustomBackgroundChartContextType<any>
);
