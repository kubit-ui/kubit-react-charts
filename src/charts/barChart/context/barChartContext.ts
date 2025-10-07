import { createContext } from 'react';

import type { BarChartContextType } from '../barChart.type';

export const BarChartContext = createContext({} as BarChartContextType);
