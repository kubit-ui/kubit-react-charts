import type { StyleProps } from '@/components/path/path.types';
import type { FocusConfig } from '@/types/focusConfig.type';

/**
 * Adapts legacy StyleProps focusConfig to the new FocusConfig format.
 *
 * Only maps properties that have semantic equivalence:
 * - `stroke` → `outlineColor` (color of the focus ring outline)
 * - `strokeWidth` → `outlineStrokeWidth` and `innerStrokeWidth` (width of both focus rings)
 *
 * Other StyleProps properties (fill, fillOpacity, strokeDasharray, etc.) are ignored
 * as they don't have meaningful equivalents in the new FocusRing component.
 *
 * @deprecated This adapter exists for backward compatibility only.
 * It will be removed in the next major version along with the legacy focusConfig prop.
 *
 * @param legacy - Legacy focusConfig using StyleProps interface
 * @returns FocusConfig compatible object, or undefined if no legacy config provided
 */
export const adaptLegacyFocusConfig = (legacy?: StyleProps): FocusConfig | undefined => {
  if (!legacy) {return undefined;}

  const strokeWidth = legacy.strokeWidth ? Number(legacy.strokeWidth) : undefined;

  return {
    innerStrokeWidth: strokeWidth,
    outlineColor: legacy.stroke,
    outlineStrokeWidth: strokeWidth,
  };
};
