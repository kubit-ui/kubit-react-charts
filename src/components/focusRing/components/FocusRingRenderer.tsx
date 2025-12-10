import { createElement } from 'react';

import type { FocusRingRendererProps } from '../focusRing.types';

/**
 * Internal component that renders the actual focus ring elements.
 * Supports both adaptive and bounding-box strategies with a unified rendering approach.
 *
 * This is a pure presentational component that receives pre-calculated FocusRingLayers
 * and renders the appropriate SVG elements using React.createElement.
 *
 * @param props - FocusRingRendererProps
 * @returns JSX element with focus ring SVG elements, or null if no valid data
 */
export const FocusRingRenderer: React.FC<FocusRingRendererProps> = ({ dataTestId, layers }) => {
  if (!layers) {
    return null;
  }

  // Unified rendering: both adaptive and bounding-box use the same structure
  return (
    <g className="focus-ring-container" pointerEvents="none">
      {createElement(layers.outerRing.type, {
        ...layers.outerRing.props,
        'data-testid': `${dataTestId}-focus-outer`,
      })}
      {createElement(layers.innerRing.type, {
        ...layers.innerRing.props,
        'data-testid': `${dataTestId}-focus-inner`,
      })}
    </g>
  );
};
