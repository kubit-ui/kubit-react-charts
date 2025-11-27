import type { FocusConfig } from '@/types/focusConfig.type';

import type { FocusRingLayers } from './utils.types';

/**
 * SVG geometric attributes that define shape position and dimensions.
 * These attributes are extracted from the original element to create focus rings.
 * Also used by MutationObserver to detect when focus rings need to be regenerated.
 */
export const SVG_GEOMETRIC_ATTRIBUTES = [
  // Circle attributes
  'cx',
  'cy',
  'r',
  // Rectangle and general positioning attributes
  'x',
  'y',
  'width',
  'height',
  // Ellipse attributes (cx, cy already included)
  'rx',
  'ry',
  // Path attributes
  'd',
  // Polygon and polyline attributes
  'points',
  // Line attributes
  'x1',
  'y1',
  'x2',
  'y2',
];

/**
 * SVG presentation attributes that affect stroke appearance.
 * These are preserved for focus rings when they match the original element's style.
 */
const SVG_STROKE_ATTRIBUTES = [
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-opacity',
];

/**
 * SVG element types that support adaptive focus rings.
 * These are geometric shapes that can be properly outlined with focus rings.
 */
const SUPPORTED_SVG_TYPES = ['circle', 'rect', 'ellipse', 'path', 'polygon', 'polyline', 'line'];

/**
 * Creates adaptive focus ring layers from a DOM SVGElement.
 *
 * This function reads properties directly from the DOM element and creates
 * props objects for rendering new SVG elements with scaled stroke-width for the focus rings.
 * The focus rings adapt to the exact shape of the element (circle → circle, path → path, etc.)
 *
 * This unified approach works for both targetRef and children modes by
 * reading from the mounted DOM element.
 *
 * @param element - The SVG graphics element to create focus rings for
 * @param focusConfig - Focus ring configuration (colors, widths, gap)
 * @returns Focus ring layers (outer and inner props) or null if not supported
 */
export function createAdaptiveFocusRings(
  element: SVGGraphicsElement,
  focusConfig: Required<FocusConfig>
): FocusRingLayers | null {
  const elementType = element.tagName.toLowerCase();

  // Validate that we have a valid SVG element
  if (!SUPPORTED_SVG_TYPES.includes(elementType)) {
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

  // Extract relevant attributes from the DOM element
  // This automatically preserves all geometric attributes (cx, cy, r, x, y, width, height, d, points, etc.)
  const allAttributes = extractRelevantAttributes(element);

  // Return props objects for outer and inner rings
  // The renderer will create the React elements and add data-testid
  return {
    innerRing: {
      props: {
        ...allAttributes,
        className: 'focus-ring-inner',
        fill: 'none',
        stroke: focusConfig.innerColor,
        strokeLinecap,
        strokeLinejoin,
        strokeMiterlimit,
        strokeWidth: innerStrokeWidth,
      },
      type: elementType,
    },
    outerRing: {
      props: {
        ...allAttributes,
        className: 'focus-ring-outer',
        fill: 'none',
        stroke: focusConfig.outlineColor,
        strokeLinecap,
        strokeLinejoin,
        strokeMiterlimit,
        strokeWidth: outerStrokeWidth,
      },
      type: elementType,
    },
    variant: 'adaptive',
  };
}

/**
 * Extracts relevant SVG attributes from a DOM SVGElement for focus ring creation.
 * Uses an allowlist approach: only geometric and stroke attributes are included.
 * This ensures focus rings inherit the correct shape and appearance while avoiding
 * React-incompatible attributes or those that would cause DOM conflicts.
 *
 * @param element - The SVG element to extract attributes from
 * @returns Object containing only the allowed attributes
 */
function extractRelevantAttributes(element: SVGElement): Record<string, string | undefined> {
  const attrs: Record<string, string | undefined> = {};

  // Create a Set of allowed attributes for fast lookup
  const allowedAttributes = new Set([
    ...SVG_GEOMETRIC_ATTRIBUTES,
    ...SVG_STROKE_ATTRIBUTES,
  ] as const);

  // Iterate through all attributes of the element
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];

    // Only include attributes that are in the allowlist
    if (allowedAttributes.has(attr.name)) {
      attrs[attr.name] = attr.value;
    }
  }

  return attrs;
}
