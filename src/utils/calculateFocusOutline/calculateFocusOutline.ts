import { FOCUS_DEFAULT, type FocusConfig } from '@/types/focusConfig.type';

export interface FocusOutlineConfig {
  /** Type of element for focus calculation */
  elementType: 'circle' | 'rectangle';
  /** Element width in pixels */
  elementWidth: number;
  /** Element height in pixels */
  elementHeight: number;
  /** Position of the element center */
  elementPosition: { x: number; y: number };
  /** Stroke width of the element */
  elementStrokeWidth?: number;
  /** Stroke width of the outer focus outline */
  outlineStrokeWidth?: number;
  /** Stroke width of the inner focus outline */
  innerStrokeWidth?: number;
  /** Gap between the outer and inner outlines */
  gap?: number;
}

/**
 * Dimensions for circle focus outlines
 */
export interface CircleFocusOutline {
  type: 'circle';
  outer: {
    cx: number;
    cy: number;
    r: number;
  };
  inner: {
    cx: number;
    cy: number;
    r: number;
  };
}

/**
 * Dimensions for rectangle focus outlines
 */
export interface RectangleFocusOutline {
  type: 'rectangle';
  outer: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  inner: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

/**
 * Union type for focus outline results
 */
export type FocusOutlineDimensions = CircleFocusOutline | RectangleFocusOutline;

/**
 * Calculates the dimensions of the focus outlines (outer and inner) for an SVG element.
 * Supports elements with different width and height dimensions.
 *
 * @param config - Configuration for the calculation.
 * @returns Object with the dimensions and positions of the outer and inner rectangles.
 */
export const calculateFocusOutline = ({
  elementHeight,
  elementPosition,
  elementStrokeWidth = 0,
  elementType,
  elementWidth,
  gap = 0,
  innerStrokeWidth = 2,
  outlineStrokeWidth = 2,
}: FocusOutlineConfig): FocusOutlineDimensions => {
  if (elementType === 'circle') {
    // For circles, work with radius
    const elementRadius = elementWidth / 2;

    // Calculate inner circle radius
    // Position inner circle adjacent to the inner edge of the outer stroke (no gap)
    // The element's stroke extends strokeWidth/2 outward from the element edge
    // The same happens for the inner stroke
    // This ensures the inner circle is positioned correctly without gaps
    const innerRadius = elementRadius + elementStrokeWidth / 2 + innerStrokeWidth / 2 + gap;

    // Calculate outer circle radius
    // Position outer ring completely outside the element and the inner stroke
    // The element's stroke extends strokeWidth/2 outward from the element edge
    // The inner stroke is added to ensure the outer ring is clearly visible
    // The outline stroke / 2 is added to ensure the outer ring is clearly visible
    const outerRadius = innerRadius + innerStrokeWidth / 2 + outlineStrokeWidth / 2;

    return {
      inner: {
        cx: elementPosition.x,
        cy: elementPosition.y,
        r: innerRadius,
      },
      outer: {
        cx: elementPosition.x,
        cy: elementPosition.y,
        r: outerRadius,
      },
      type: 'circle',
    };
  }

  // Calculate inner rectangle dimensions
  // Here we have to take into account that height and width must grow in both sides
  // to ensure the inner rectangle is positioned correctly without gaps
  // that is why here we do not divide by 2
  const innerWidth = elementWidth + elementStrokeWidth + innerStrokeWidth + gap * 2;
  const innerHeight = elementHeight + elementStrokeWidth + innerStrokeWidth + gap * 2;
  const innerX = elementPosition.x - innerWidth / 2;
  const innerY = elementPosition.y - innerHeight / 2;

  // Calculate outer rectangle dimensions
  // Must account for the fact that both inner and outer strokes extend outward from their borders
  // Inner stroke extends innerStrokeWidth/2 on each side, outer stroke extends outlineStrokeWidth/2 on each side
  // We also take into account if some gap between outlines is wanted
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
    type: 'rectangle',
  };
};

/**
 * Helper function to get focus complete config
 */
export const getFocusConfig = (focusConfig?: FocusConfig): Required<FocusConfig> => ({
  gap: focusConfig?.gap ?? FOCUS_DEFAULT.OUTLINES_GAP,
  innerColor: focusConfig?.innerColor ?? FOCUS_DEFAULT.FOCUS_INNER,
  innerStrokeWidth: focusConfig?.innerStrokeWidth ?? FOCUS_DEFAULT.INNER_FOCUS_STROKE_WIDTH,
  outlineColor: focusConfig?.outlineColor ?? FOCUS_DEFAULT.FOCUS_COLOR,
  outlineStrokeWidth: focusConfig?.outlineStrokeWidth ?? FOCUS_DEFAULT.OUTER_FOCUS_STROKE_WIDTH,
});
