/**
 * Types specific to YAxis stories for enhanced valueFormatter control
 * These props are only used in YAxis stories to provide dropdown formatting options
 *
 * ⚠️ NOTE: This type definition is IDENTICAL to XAxis/xAxis.types.ts (except the name)
 * Consider creating a shared AxisStoryTypes file if more axis stories are added.
 * Currently duplicated to maintain co-location with specific story usage.
 */
import type { ValueFormatter } from '@/types/valueFormatter.type';

/**
 * Enhanced props for YAxis stories to support valueFormatter dropdown controls
 * Used in YAxis stories to provide preset formatting options
 */
export interface YAxisStoryOverrides {
  // Enhanced formatter props (for dropdown controls)
  valueFormatter?: ValueFormatter | string; // Allow string for dropdown control, converted to function in render
}

/**
 * Utility type for YAxis stories
 * Overrides valueFormatter to support dropdown control
 */
export type YAxisStoryArgs<TComponentProps> = Omit<TComponentProps, keyof YAxisStoryOverrides> &
  YAxisStoryOverrides;
