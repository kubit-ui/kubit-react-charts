import { createElement } from 'react';

import type { FocusRingRendererProps } from '../focusRing.types';

/**
 * Internal component that renders the actual focus ring elements.
 * Supports both adaptive (from DOM layers) and bounding-box strategies.
 *
 * This is a pure presentational component that receives pre-calculated data
 * and renders the appropriate SVG elements.
 *
 * @param props - FocusRingRendererProps
 * @returns JSX element with focus ring SVG elements, or null if no valid strategy
 */
export const FocusRingRenderer: React.FC<FocusRingRendererProps> = ({
  dataTestId,
  focusConfig,
  layers,
  outline,
}) => {
  // Strategy 1: Adaptive mode with pre-computed layers from DOM
  if (layers && focusConfig.variant === 'adaptive' && layers.canRender) {
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
  }

  // Strategy 2: Bounding-box mode with outline (calculateFocusOutline)
  if (outline && outline.type === 'rectangle') {
    return (
      <g className="focus-ring-container" pointerEvents="none">
        {/* Outer focus ring */}
        <rect
          className="focus-ring-outer"
          data-testid={`${dataTestId}-focus-outer`}
          fill="none"
          height={outline.outer.height}
          stroke={focusConfig.outlineColor}
          strokeWidth={focusConfig.outlineStrokeWidth}
          width={outline.outer.width}
          x={outline.outer.x}
          y={outline.outer.y}
        />

        {/* Inner focus ring */}
        <rect
          className="focus-ring-inner"
          data-testid={`${dataTestId}-focus-inner`}
          fill="none"
          height={outline.inner.height}
          stroke={focusConfig.innerColor}
          strokeWidth={focusConfig.innerStrokeWidth}
          width={outline.inner.width}
          x={outline.inner.x}
          y={outline.inner.y}
        />
      </g>
    );
  }

  // No valid rendering strategy
  return null;
};
