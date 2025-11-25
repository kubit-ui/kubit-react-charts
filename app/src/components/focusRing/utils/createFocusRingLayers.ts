import type { FocusConfig } from '@/types/focusConfig.type';

/**
 * Props for rendering a focus ring element
 */
export interface FocusRingElementProps {
  /** SVG element type (e.g., 'circle', 'rect', 'path') */
  type: string;
  /** Props to pass to React.createElement */
  props: Record<string, unknown>;
}

/**
 * Result of creating focus ring layers
 */
export interface FocusRingLayers {
  /** Outer focus ring element props (blue) */
  outerRing: FocusRingElementProps;
  /** Inner focus ring element props (white) */
  innerRing: FocusRingElementProps;
  /** Can this element be rendered with focus rings? */
  canRender: boolean;
  /** Variant used for rendering */
  variant: 'adaptive' | 'bounding-box';
}

/**
 * Creates adaptive focus ring layers from a DOM SVGElement.
 *
 * This function reads properties directly from the DOM element and creates
 * props objects for rendering new SVG elements with scaled stroke-width for the focus rings.
 *
 * This unified approach works for both targetRef and children modes by
 * reading from the mounted DOM element.
 *
 * @param element - The SVG DOM element to create focus rings for
 * @param focusConfig - Focus ring configuration (colors, widths, gap)
 * @returns Focus ring layers (outer and inner props) or null if not supported
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

  // Extract all attributes from the DOM element using cloneNode
  // This automatically preserves all geometric attributes (cx, cy, r, x, y, width, height, d, points, etc.)
  const allAttributes = extractAllAttributes(element);

  // Common props for focus rings (without data-testid, that's added by the renderer)
  const getFocusRingProps = (strokeWidth: number, strokeColor: string, className: string) => ({
    ...allAttributes,
    className,
    fill: 'none',
    stroke: strokeColor,
    strokeLinecap,
    strokeLinejoin,
    strokeMiterlimit,
    strokeWidth,
  });

  // Return props objects for outer and inner rings
  // The renderer will create the React elements and add data-testid
  return {
    canRender: true,
    innerRing: {
      props: getFocusRingProps(innerStrokeWidth, focusConfig.innerColor, 'focus-ring-inner'),
      type: elementType,
    },
    outerRing: {
      props: getFocusRingProps(outerStrokeWidth, focusConfig.outlineColor, 'focus-ring-outer'),
      type: elementType,
    },
    variant: 'adaptive',
  };
}

/**
 * Extracts all attributes from a DOM SVGElement.
 * This replaces the manual switch-case approach by reading all attributes directly from the DOM.
 * Works for any SVG element type (circle, rect, ellipse, path, polygon, polyline, line, etc.)
 */
function extractAllAttributes(element: SVGElement): Record<string, string | undefined> {
  const attrs: Record<string, string | undefined> = {};

  // Attributes that should be excluded (React incompatible or will be overridden)
  const excludedAttributes = new Set([
    'style', // React expects an object, not a string
    'class', // Use className instead
    'id', // Avoid duplicate IDs in the DOM (causes focus/navigation issues)
    'data-testid', // Avoid duplicate test IDs
    'aria-label', // Focus rings don't need separate labels
    'aria-labelledby', // Focus rings don't need separate labels
    'role', // Focus rings are purely decorative
    'tabindex', // Focus rings should not be focusable
  ]);

  // Iterate through all attributes of the element
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];

    // Skip excluded attributes
    if (excludedAttributes.has(attr.name)) {
      continue;
    }

    attrs[attr.name] = attr.value;
  }

  return attrs;
}
