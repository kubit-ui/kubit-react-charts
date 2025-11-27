import type { FocusConfig } from '@/types/focusConfig.type';

import type { ElementBounds, FocusRingLayers, RectangleFocusOutline } from './utils.types';

/**
 * Calculates the dimensions of the focus outlines (outer and inner) for a bounding-box.
 * This function is used internally by createBoundingBoxFocusRings and always produces
 * rectangular focus rings.
 *
 * @param bounds - Element bounds information from DOM detection
 * @param config - Focus stroke configuration (widths and gap)
 * @returns Rectangle dimensions for outer and inner focus rings
 */
export const calculateBoundingBoxFocusRings = (
  bounds: ElementBounds,
  config: {
    outlineStrokeWidth: number;
    innerStrokeWidth: number;
    gap: number;
  }
): RectangleFocusOutline => {
  const { elementHeight, elementPosition, elementStrokeWidth, elementWidth } = bounds;
  const { gap, innerStrokeWidth, outlineStrokeWidth } = config;

  // Calculate inner rectangle dimensions
  // Height and width must grow on both sides to ensure the inner rectangle
  // is positioned correctly without gaps
  const innerWidth = elementWidth + elementStrokeWidth + innerStrokeWidth + gap * 2;
  const innerHeight = elementHeight + elementStrokeWidth + innerStrokeWidth + gap * 2;
  const innerX = elementPosition.x - innerWidth / 2;
  const innerY = elementPosition.y - innerHeight / 2;

  // Calculate outer rectangle dimensions
  // Must account for the fact that both inner and outer strokes extend outward from their borders
  // Inner stroke extends innerStrokeWidth/2 on each side, outer stroke extends outlineStrokeWidth/2 on each side
  const outerWidth = innerWidth + innerStrokeWidth + outlineStrokeWidth;
  const outerHeight = innerHeight + innerStrokeWidth + outlineStrokeWidth;
  const outerX = elementPosition.x - outerWidth / 2;
  const outerY = elementPosition.y - outerHeight / 2;

  return {
    inner: {
      height: innerHeight,
      width: innerWidth,
      x: innerX,
      y: innerY,
    },
    outer: {
      height: outerHeight,
      width: outerWidth,
      x: outerX,
      y: outerY,
    },
  };
};

/**
 * Helper function to detect element bounds from the DOM.
 * Uses getBBox() for accurate measurements including transforms.
 *
 * @param element - SVG element to detect
 * @returns Element bounds information or null if detection fails
 */
function detectElementBoundsFromDOM(element: SVGGraphicsElement): ElementBounds | null {
  try {
    const bbox = element.getBBox();
    if (bbox.width <= 0 || bbox.height <= 0) {
      return null;
    }

    const computedStyle = window.getComputedStyle(element);
    const strokeWidth = parseFloat(computedStyle.strokeWidth || '0');

    return {
      elementHeight: bbox.height,
      elementPosition: {
        x: bbox.x + bbox.width / 2,
        y: bbox.y + bbox.height / 2,
      },
      elementStrokeWidth: strokeWidth,
      elementWidth: bbox.width,
    };
  } catch {
    return null;
  }
}

/**
 * Creates bounding-box focus ring layers with calculated dimensions.
 *
 * This function:
 * 1. Detects element bounds from DOM using getBBox()
 * 2. Calculates geometric dimensions using calculateBoundingBoxFocusRings
 * 3. Wraps the result in the same FocusRingLayers structure as createAdaptiveFocusRings
 * 4. Includes all rendering props (colors, strokes, etc.)
 *
 * This provides a unified API for both adaptive and bounding-box strategies.
 *
 * @param element - The SVG graphics element to create focus rings for
 * @param focusConfig - Focus ring configuration (colors, widths, gap)
 * @returns Focus ring layers in the same format as createAdaptiveFocusRings, or null if detection fails
 */
export function createBoundingBoxFocusRings(
  element: SVGGraphicsElement,
  focusConfig: Required<FocusConfig>
): FocusRingLayers | null {
  // Detect element bounds from DOM
  const bounds = detectElementBoundsFromDOM(element);
  if (!bounds) {
    return null;
  }

  // Calculate dimensions using the existing utility
  const dimensions = calculateBoundingBoxFocusRings(bounds, {
    gap: focusConfig.gap,
    innerStrokeWidth: focusConfig.innerStrokeWidth,
    outlineStrokeWidth: focusConfig.outlineStrokeWidth,
  });

  // Convert to FocusRingLayers format (same as createAdaptiveFocusRings)
  return {
    innerRing: {
      props: {
        className: 'focus-ring-inner',
        fill: 'none',
        height: dimensions.inner.height,
        stroke: focusConfig.innerColor,
        strokeWidth: focusConfig.innerStrokeWidth,
        width: dimensions.inner.width,
        x: dimensions.inner.x,
        y: dimensions.inner.y,
      },
      type: 'rect',
    },
    outerRing: {
      props: {
        className: 'focus-ring-outer',
        fill: 'none',
        height: dimensions.outer.height,
        stroke: focusConfig.outlineColor,
        strokeWidth: focusConfig.outlineStrokeWidth,
        width: dimensions.outer.width,
        x: dimensions.outer.x,
        y: dimensions.outer.y,
      },
      type: 'rect',
    },
    variant: 'bounding-box',
  };
}
