export const DATA = [
  { birds: 45, cats: 30, dogs: 20, fish: 100, lions: 2, rabbits: 50, year: 2000 },
  { birds: 50, cats: 30, dogs: 30, fish: 120, lions: 3, rabbits: 60, year: 2001 },
  { birds: 55, cats: 55, dogs: 22, fish: 110, lions: 100, rabbits: 40, year: 2002 },
  { birds: 60, cats: 1, dogs: 25, fish: 90, lions: 20, rabbits: 30, year: 2003 },
  { birds: 65, cats: 10, dogs: 31, fish: 95, lions: 5, rabbits: 70, year: 2004 },
  { birds: 70, cats: 30, dogs: 20, fish: 85, lions: 3, rabbits: 60, year: 2005 },
];

export const FULL_CUSTOM_DATA = [
  { cats: 30, dogs: -20, lions: 2, rabbits: -50, step: 'step 1' },
  { cats: -30, dogs: -30, lions: 3, rabbits: 60, step: 'step 2' },
  { cats: 55, dogs: -22, lions: 100, rabbits: 40, step: 'step 3' },
  { cats: 1, dogs: 25, lions: 20, rabbits: 30, step: 'step 4' },
  { cats: 10, dogs: 31, lions: 5, rabbits: -70, step: 'step 5' },
  { cats: -30, dogs: 20, lions: 3, rabbits: -60, step: 'step 6' },
];

export const FULL_CUSTOM_DATA_NEGATIVE = [
  { cats: 30, dogs: -20, lions: 2, rabbits: -10, step: -5 },
  { cats: -30, dogs: -30, lions: 3, rabbits: 60, step: -3 },
  { cats: -30, dogs: 20, lions: 3, rabbits: -16, step: 0 },
  { cats: 55, dogs: -22, lions: 100, rabbits: 40, step: 2 },
  { cats: 1, dogs: 25, lions: 20, rabbits: 30, step: 5 },
  { cats: 10, dogs: 35, lions: 5, rabbits: -20, step: 10 },
];

export const SUBCOMPONENT_DEMO_DATA = [
  { label: 'Jan', x: 0, y: 10 },
  { label: 'Feb', x: 1, y: 25 },
  { label: 'Mar', x: 2, y: 15 },
  { label: 'Apr', x: 3, y: 30 },
  { label: 'May', x: 4, y: 20 },
  { label: 'Jun', x: 5, y: 35 },
];

export const PROJECTION_DEMO_DATA = [
  { x: 2000, y: 0 },
  { x: 2001, y: 40 },
];

export const MULTIPLE_SERIES_DEMO_DATA = [
  { expenses: 80, month: 'Jan', profit: 20, revenue: 100, x: 0 },
  { expenses: 85, month: 'Feb', profit: 35, revenue: 120, x: 1 },
  { expenses: 80, month: 'Mar', profit: 10, revenue: 90, x: 2 },
  { expenses: 100, month: 'Apr', profit: 50, revenue: 150, x: 3 },
  { expenses: 90, month: 'May', profit: 40, revenue: 130, x: 4 },
];

export const ZOOM_INTEGRATION_DATA = Array.from({ length: 50 }, (_, i) => ({
  timestamp: new Date(2024, 0, i + 1).toISOString(),
  x: i,
  y: Math.sin(i * 0.2) * 20 + 50 + Math.random() * 10,
}));

export const FORECAST_DATA = [
  // Historical data
  { date: '2024-01', type: 'historical', x: 0, y: 100 },
  { date: '2024-02', type: 'historical', x: 1, y: 120 },
  { date: '2024-03', type: 'historical', x: 2, y: 90 },
  { date: '2024-04', type: 'historical', x: 3, y: 150 },
  // Data with projections (forecast)
  { date: '2024-05', lower: 110, type: 'forecast', upper: 150, x: 4, y: 130 },
  { date: '2024-06', lower: 115, type: 'forecast', upper: 165, x: 5, y: 140 },
  { date: '2024-07', lower: 110, type: 'forecast', upper: 160, x: 6, y: 135 },
];
