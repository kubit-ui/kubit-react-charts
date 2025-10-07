import { createContext } from 'react';

import type { LineChartContextType } from '../lineChart.type';

export const LineChartContext = createContext({} as LineChartContextType);
