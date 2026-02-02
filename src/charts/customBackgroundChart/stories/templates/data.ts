import type { CustomBackgroundData } from '../../customBackgroundChart.type';

/**
 * Example data for CustomBackgroundChart stories.
 */

export const GRID_DATA: CustomBackgroundData<number> = {
  'point-a': { name: 'Alpha Station', value: 850, x: 100, y: 80 },
  'point-b': { name: 'Beta Hub', value: 320, x: 250, y: 180 },
  'point-c': { name: 'Gamma Center', value: 1200, x: 420, y: 120 },
  'point-d': { name: 'Delta Node', value: 150, x: 80, y: 280 },
  'point-e': { name: 'Epsilon Base', value: 580, x: 350, y: 320 },
  'point-f': { name: 'Zeta Point', value: 95, x: 180, y: 350 },
  'point-g': { name: 'Eta Complex', value: 720, x: 450, y: 280 },
  'point-h': { name: 'Theta Site', value: 2100, x: 280, y: 60 },
};

export const WORLD_MAP_LOCATIONS: CustomBackgroundData<number> = {
  'beijing': { name: 'Beijing', value: 21540000, x: 1580, y: 280 },
  'berlin': { name: 'Berlin', value: 3645000, x: 1055, y: 175 },
  'london': { name: 'London', value: 8982000, x: 975, y: 165 },
  'madrid': { name: 'Madrid', value: 3223000, x: 970, y: 245 },
  'new-york': { name: 'New York', value: 8336000, x: 560, y: 250 },
  'paris': { name: 'Paris', value: 2161000, x: 1010, y: 195 },
  'sao-paulo': { name: 'São Paulo', value: 12330000, x: 670, y: 590 },
  'sydney': { name: 'Sydney', value: 5312000, x: 1810, y: 680 },
  'tokyo': { name: 'Tokyo', value: 13960000, x: 1730, y: 270 },
};

export interface ProjectMetrics {
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  team: string;
  deadline: string;
  budget: number;
  status: 'planned' | 'in-progress' | 'completed';
}

export const PROJECT_PRIORITY_DATA: CustomBackgroundData<ProjectMetrics> = {
  'quick-wins': {
    name: 'Quick Wins Campaign',
    x: 80,
    y: 70,
    value: {
      effort: 'low',
      impact: 'high',
      team: 'Marketing',
      deadline: '2024-Q1',
      budget: 15000,
      status: 'in-progress',
    },
  },
  'mobile-app': {
    name: 'Mobile App Redesign',
    x: 320,
    y: 60,
    value: {
      effort: 'high',
      impact: 'high',
      team: 'Product',
      deadline: '2024-Q3',
      budget: 250000,
      status: 'planned',
    },
  },
  'api-v2': {
    name: 'API v2 Migration',
    x: 280,
    y: 120,
    value: {
      effort: 'high',
      impact: 'high',
      team: 'Engineering',
      deadline: '2024-Q2',
      budget: 180000,
      status: 'in-progress',
    },
  },
  'docs-update': {
    name: 'Documentation Update',
    x: 60,
    y: 140,
    value: {
      effort: 'low',
      impact: 'medium',
      team: 'DevRel',
      deadline: '2024-Q1',
      budget: 8000,
      status: 'completed',
    },
  },
  'analytics': {
    name: 'Analytics Dashboard',
    x: 150,
    y: 90,
    value: {
      effort: 'medium',
      impact: 'high',
      team: 'Data',
      deadline: '2024-Q2',
      budget: 45000,
      status: 'in-progress',
    },
  },
  'legacy-cleanup': {
    name: 'Legacy Code Cleanup',
    x: 350,
    y: 280,
    value: {
      effort: 'high',
      impact: 'low',
      team: 'Engineering',
      deadline: '2024-Q4',
      budget: 120000,
      status: 'planned',
    },
  },
  'minor-fixes': {
    name: 'Minor Bug Fixes',
    x: 100,
    y: 300,
    value: {
      effort: 'low',
      impact: 'low',
      team: 'Support',
      deadline: '2024-Q1',
      budget: 5000,
      status: 'completed',
    },
  },
  'infra-upgrade': {
    name: 'Infrastructure Upgrade',
    x: 300,
    y: 320,
    value: {
      effort: 'high',
      impact: 'medium',
      team: 'DevOps',
      deadline: '2024-Q3',
      budget: 95000,
      status: 'planned',
    },
  },
};
