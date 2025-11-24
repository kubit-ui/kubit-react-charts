import React, { type ReactElement } from 'react';

import type { FocusConfig } from '@/types/focusConfig.type';

/**
 * Result of creating focus ring layers
 */
export interface FocusRingLayers {
  /** Outer focus ring element (blue) */
  outerRing: ReactElement;
  /** Inner focus ring element (white) */
  innerRing: ReactElement;
  /** Can this element be rendered with focus rings? */
  canRender: boolean;
  /** Variant used for rendering */
  variant: 'adaptive' | 'bounding-box';
}

/**
 * Creates adaptive focus ring layers from a DOM SVGElement.
 *
 * This is the ONLY implementation for creating focus rings.
 * It works by reading properties directly from the DOM element and creating
 * new SVG elements with scaled stroke-width for the focus rings.
 *
 * This unified approach works for both:
 * - children mode: reads from internalRef after element is mounted
 * - targetRef mode: reads from external ref after element is mounted
 *
 * @param element - The SVG DOM element to create focus rings for
 * @param focusConfig - Focus ring configuration (colors, widths, gap)
 * @returns Focus ring layers (outer and inner) or null if not supported
 */
export function createFocusRingLayers(
  element: SVGElement,
  focusConfig: Required<FocusConfig>
): FocusRingLayers | null {
  const elementType = element.tagName.toLowerCase();

  // Validate that we have a valid SVG element
  const supportedTypes = ['circle', 'rect', 'ellipse', 'path', 'polygon', 'polyline', 'line'];
  if (!supportedTypes.includes(elementType)) {
    return null;
  }

  // Read original stroke width from DOM
  const strokeWidthAttr =
    element.getAttribute('stroke-width') || element.getAttribute('strokeWidth');
  const originalStrokeWidth = parseFloat(strokeWidthAttr || '0');

  // Read fill attribute to detect open lines
  const fillAttr = element.getAttribute('fill');
  const isOpenLine =
    elementType === 'line' ||
    elementType === 'polyline' ||
    (elementType === 'path' && fillAttr === 'none');

  // Calculate stroke widths for focus rings
  // IMPORTANT: For ALL shapes, we need to account for the original stroke width
  // so that focus rings appear OUTSIDE the element's stroke, not covered by it
  const outerStrokeWidth =
    originalStrokeWidth + (focusConfig.outlineStrokeWidth + focusConfig.innerStrokeWidth) * 2;

  const innerStrokeWidth = originalStrokeWidth + focusConfig.innerStrokeWidth * 2;

  // Read stroke line props for open lines
  const strokeLinecap = isOpenLine ? element.getAttribute('stroke-linecap') || 'round' : undefined;
  const strokeLinejoin = isOpenLine ? element.getAttribute('stroke-linejoin') || 'round' : 'miter';
  const strokeMiterlimit = isOpenLine ? undefined : '10';

  // Extract geometric attributes from DOM element
  const geometricProps = extractGeometricAttributes(element, elementType);

  // Common props for focus rings
  const getFocusRingProps = (strokeWidth: number, strokeColor: string, className: string) => ({
    ...geometricProps,
    className,
    fill: 'none',
    stroke: strokeColor,
    strokeLinecap,
    strokeLinejoin,
    strokeMiterlimit,
    strokeWidth,
  });

  // Create outer ring (blue)
  const outerRing = React.createElement(
    elementType,
    getFocusRingProps(outerStrokeWidth, focusConfig.outlineColor, 'focus-ring-outer')
  );

  // Create inner ring (white)
  const innerRing = React.createElement(
    elementType,
    getFocusRingProps(innerStrokeWidth, focusConfig.innerColor, 'focus-ring-inner')
  );

  return {
    canRender: true,
    innerRing,
    outerRing,
    variant: 'adaptive',
  };
}

/**
 * Extracts geometric attributes from a DOM SVGElement based on its type.
 * These are the attributes needed to recreate the element's shape.
 */
function extractGeometricAttributes(
  element: SVGElement,
  elementType: string
): Record<string, string | number | undefined> {
  const attrs: Record<string, string | number | undefined> = {};

  switch (elementType) {
    case 'circle':
      attrs.cx = element.getAttribute('cx') || undefined;
      attrs.cy = element.getAttribute('cy') || undefined;
      attrs.r = element.getAttribute('r') || undefined;
      break;

    case 'rect':
      attrs.x = element.getAttribute('x') || undefined;
      attrs.y = element.getAttribute('y') || undefined;
      attrs.width = element.getAttribute('width') || undefined;
      attrs.height = element.getAttribute('height') || undefined;
      attrs.rx = element.getAttribute('rx') || undefined;
      attrs.ry = element.getAttribute('ry') || undefined;
      break;

    case 'ellipse':
      attrs.cx = element.getAttribute('cx') || undefined;
      attrs.cy = element.getAttribute('cy') || undefined;
      attrs.rx = element.getAttribute('rx') || undefined;
      attrs.ry = element.getAttribute('ry') || undefined;
      break;

    case 'path':
      attrs.d = element.getAttribute('d') || undefined;
      break;

    case 'polygon':
    case 'polyline':
      attrs.points = element.getAttribute('points') || undefined;
      break;

    case 'line':
      attrs.x1 = element.getAttribute('x1') || undefined;
      attrs.y1 = element.getAttribute('y1') || undefined;
      attrs.x2 = element.getAttribute('x2') || undefined;
      attrs.y2 = element.getAttribute('y2') || undefined;
      break;
  }

  return attrs;
}
