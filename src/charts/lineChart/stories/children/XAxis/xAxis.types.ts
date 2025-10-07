/**
 * Types specific to XAxis stories for enhanced valueFormatter control
 * These props are only used in XAxis stories to provide dropdown formatting options
 *
 * ⚠️ NOTE: This type definition is IDENTICAL to YAxis/yAxis.types.ts (except for the name)
 * Consider creating a shared AxisStoryTypes file if more axis stories are added.
 * Currently duplicated to maintain co-location with specific story usage.
 */
import type { ValueFormatter } from '@/types/valueFormatter.type';

/**
 * Enhanced props for XAxis stories to support valueFormatter dropdown controls
 * Used in XAxis stories to provide preset formatting options
 */
export interface XAxisStoryOverrides {
  // Enhanced formatter props (for dropdown controls)
  valueFormatter?: ValueFormatter | string; // Allow string for dropdown control, converted to function in render
}

/**
 * Utility type for XAxis stories
 * Overrides valueFormatter to support dropdown control
 */
export type XAxisStoryArgs<TComponentProps> = Omit<TComponentProps, keyof XAxisStoryOverrides> &
  XAxisStoryOverrides;
