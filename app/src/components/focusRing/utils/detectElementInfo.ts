import type { ReactElement } from 'react';

/**
 * Supported SVG element types for auto-detection
 */
export type SupportedElementType =
  | 'rect'
  | 'circle'
  | 'ellipse'
  | 'path'
  | 'polygon'
  | 'polyline'
  | 'line'
  | 'text'
  | 'unknown';

/**
 * Bounding box information
 */
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Information about a detected SVG element
 */
export interface ElementInfo {
  /** Type of the element */
  elementType: 'rectangle' | 'circle' | 'ellipse' | 'path' | 'unknown';
  /** Size of the element (width and height for rectangles, diameter for circles) */
  elementSize?: number;
  /** Position of the element center */
  elementPosition?: { x: number; y: number };
  /** Stroke width of the element */
  elementStrokeWidth?: number;
  /** Width for rectangles/ellipses */
  elementWidth?: number;
  /** Height for rectangles/ellipses */
  elementHeight?: number;
  /** Radius for circles */
  elementRadius?: number;
  /** Whether the detection was successful */
  isValid?: boolean;
  /** Original element type for debugging */
  originalElementType?: SupportedElementType;
}

/**
 * Cache for complex path bounds analysis
 */
const pathBoundsCache = new Map<string, BoundingBox>();

/**
 * Validates and parses a numeric property with fallback
 */
function validateNumericProp(value: any, fallback: number = 0): number {
  if (value === undefined || value === null) {
    return fallback;
  }
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Gets stroke width from various prop formats
 */
function getStrokeWidth(props: any): number {
  const strokeWidth = props.strokeWidth || props['stroke-width'] || props.stroke_width || '0';

  return validateNumericProp(strokeWidth, 0);
}

/**
 * Validates if ElementInfo has minimum required properties
 */
function isValidElementInfo(info: ElementInfo): boolean {
  return !!(
    info.elementPosition &&
    (info.elementSize || (info.elementWidth && info.elementHeight)) &&
    info.elementType !== 'unknown'
  );
}

/**
 * Gets cached path bounds or returns null
 */
function getCachedPathBounds(pathData: string): BoundingBox | null {
  return pathBoundsCache.get(pathData) || null;
}

/**
 * Creates ElementInfo from BoundingBox
 */
function createElementInfoFromBounds(
  bounds: BoundingBox,
  strokeWidth: number,
  elementType: ElementInfo['elementType']
): ElementInfo {
  return {
    elementHeight: bounds.height,
    elementPosition: {
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
    },
    elementSize: Math.max(bounds.width, bounds.height),
    elementStrokeWidth: strokeWidth,
    elementType,
    elementWidth: bounds.width,
  };
}

/**
 * Detects SVG element properties from React element props with enhanced validation and fallbacks
 *
 * @param element - React element to analyze
 * @returns ElementInfo with detected properties
 */
export function detectElementInfo(element: ReactElement): ElementInfo {
  if (!element) {
    return { elementType: 'unknown', isValid: false };
  }

  const { props, type } = element;

  // Handle string element types (rect, circle, etc.)
  if (typeof type !== 'string') {
    return {
      elementType: 'unknown',
      isValid: false,
      originalElementType: 'unknown',
    };
  }

  const elementType = type.toLowerCase() as SupportedElementType;
  const strokeWidth = getStrokeWidth(props);

  // Try primary detection method
  const detectedInfo = detectFromProps(elementType, props, strokeWidth);

  if (isValidElementInfo(detectedInfo)) {
    return {
      ...detectedInfo,
      isValid: true,
      originalElementType: elementType,
    };
  }

  // Return fallback info
  return {
    elementStrokeWidth: strokeWidth,
    elementType: 'unknown',
    isValid: false,
    originalElementType: elementType,
  };
}

/**
 * Detects element info from props based on element type
 */
function detectFromProps(
  elementType: SupportedElementType,
  props: any,
  strokeWidth: number
): ElementInfo {
  switch (elementType) {
    case 'rect':
      return detectRectInfo(props, strokeWidth);

    case 'circle':
      return detectCircleInfo(props, strokeWidth);

    case 'ellipse':
      return detectEllipseInfo(props, strokeWidth);

    case 'path':
      return detectPathInfo(props, strokeWidth);

    case 'polygon':
    case 'polyline':
      return detectPolygonInfo(props, strokeWidth);

    case 'line':
      return detectLineInfo(props, strokeWidth);

    case 'text':
      return detectTextInfo(props, strokeWidth);

    default:
      return {
        elementStrokeWidth: strokeWidth,
        elementType: 'unknown',
      };
  }
}

/**
 * Detects rectangle element properties
 */
function detectRectInfo(props: any, strokeWidth: number): ElementInfo {
  const x = validateNumericProp(props.x, 0);
  const y = validateNumericProp(props.y, 0);
  const width = validateNumericProp(props.width);
  const height = validateNumericProp(props.height);

  if (width <= 0 || height <= 0) {
    return { elementType: 'unknown' };
  }

  return {
    elementHeight: height,
    elementPosition: {
      x: x + width / 2,
      y: y + height / 2,
    },
    elementSize: Math.max(width, height),
    elementStrokeWidth: strokeWidth,
    elementType: 'rectangle',
    elementWidth: width,
  };
}

/**
 * Detects circle element properties
 */
function detectCircleInfo(props: any, strokeWidth: number): ElementInfo {
  const cx = validateNumericProp(props.cx, 0);
  const cy = validateNumericProp(props.cy, 0);
  const r = validateNumericProp(props.r);

  if (r <= 0) {
    return { elementType: 'unknown' };
  }

  return {
    elementHeight: r * 2,
    elementPosition: { x: cx, y: cy },
    elementRadius: r,
    elementSize: r * 2, // Diameter
    elementStrokeWidth: strokeWidth,
    elementType: 'circle',
    elementWidth: r * 2,
  };
}

/**
 * Detects ellipse element properties
 */
function detectEllipseInfo(props: any, strokeWidth: number): ElementInfo {
  const cx = validateNumericProp(props.cx, 0);
  const cy = validateNumericProp(props.cy, 0);
  const rx = validateNumericProp(props.rx);
  const ry = validateNumericProp(props.ry);

  if (rx <= 0 || ry <= 0) {
    return { elementType: 'unknown' };
  }

  return {
    elementHeight: ry * 2,
    elementPosition: { x: cx, y: cy },
    elementSize: Math.max(rx * 2, ry * 2),
    elementStrokeWidth: strokeWidth,
    elementType: 'ellipse',
    elementWidth: rx * 2,
  };
}

/**
 * Detects path element properties with enhanced analysis
 */
function detectPathInfo(props: any, strokeWidth: number): ElementInfo {
  const d = props.d;
  if (!d || typeof d !== 'string') {
    return {
      elementStrokeWidth: strokeWidth,
      elementType: 'path',
    };
  }

  // Try cached bounds first
  const cachedBounds = getCachedPathBounds(d);
  if (cachedBounds) {
    return createElementInfoFromBounds(cachedBounds, strokeWidth, 'rectangle');
  }

  // Analyze path bounds
  const pathBounds = analyzePathBoundsEnhanced(d);
  if (pathBounds) {
    // Cache the result for future use
    pathBoundsCache.set(d, pathBounds);
    return createElementInfoFromBounds(pathBounds, strokeWidth, 'rectangle');
  }

  return {
    elementStrokeWidth: strokeWidth,
    elementType: 'path',
  };
}

/**
 * Detects polygon/polyline element properties
 */
function detectPolygonInfo(props: any, strokeWidth: number): ElementInfo {
  const points = props.points;
  if (!points || typeof points !== 'string') {
    return { elementType: 'unknown' };
  }

  const bounds = analyzePolygonBoundsEnhanced(points);
  if (bounds) {
    return createElementInfoFromBounds(bounds, strokeWidth, 'rectangle');
  }

  return {
    elementStrokeWidth: strokeWidth,
    elementType: 'unknown',
  };
}

/**
 * Detects line element properties
 */
function detectLineInfo(props: any, strokeWidth: number): ElementInfo {
  const x1 = validateNumericProp(props.x1, 0);
  const y1 = validateNumericProp(props.y1, 0);
  const x2 = validateNumericProp(props.x2, 0);
  const y2 = validateNumericProp(props.y2, 0);

  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  const width = maxX - minX || strokeWidth; // Use strokeWidth for vertical/horizontal lines
  const height = maxY - minY || strokeWidth;

  return {
    elementHeight: height,
    elementPosition: {
      x: minX + width / 2,
      y: minY + height / 2,
    },
    elementSize: Math.max(width, height),
    elementStrokeWidth: strokeWidth,
    elementType: 'rectangle',
    elementWidth: width,
  };
}

/**
 * Detects text element properties (basic implementation)
 */
function detectTextInfo(props: any, strokeWidth: number): ElementInfo {
  const x = validateNumericProp(props.x, 0);
  const y = validateNumericProp(props.y, 0);
  const fontSize = validateNumericProp(props.fontSize || props['font-size'], 16);

  // Estimate text dimensions (rough calculation)
  const textContent = props.children || props.textContent || '';
  const textLength = String(textContent).length || 1;
  const estimatedWidth = textLength * fontSize * 0.6; // Rough estimate
  const estimatedHeight = fontSize * 1.2;

  return {
    elementHeight: estimatedHeight,
    elementPosition: {
      x: x + estimatedWidth / 2,
      y: y - estimatedHeight / 2, // Text baseline adjustment
    },
    elementSize: Math.max(estimatedWidth, estimatedHeight),
    elementStrokeWidth: strokeWidth,
    elementType: 'rectangle',
    elementWidth: estimatedWidth,
  };
}

/**
 * Enhanced path bounds analysis with improved SVG command parsing
 */
function analyzePathBoundsEnhanced(d: string): BoundingBox | null {
  try {
    // Improved regex to handle SVG path commands
    const commands = d.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/gi);
    if (!commands) {
      return null;
    }

    const points: Array<{ x: number; y: number }> = [];
    let currentX = 0;
    let currentY = 0;

    commands.forEach(cmd => {
      const command = cmd[0].toUpperCase();
      const coords =
        cmd
          .slice(1)
          .match(/-?\d+(?:\.\d+)?/g)
          ?.map(n => parseFloat(n)) || [];

      switch (command) {
        case 'M': // Move to
        case 'L': // Line to
          for (let i = 0; i < coords.length; i += 2) {
            currentX = coords[i];
            currentY = coords[i + 1];
            points.push({ x: currentX, y: currentY });
          }
          break;
        case 'H': // Horizontal line
          coords.forEach(x => {
            currentX = x;
            points.push({ x: currentX, y: currentY });
          });
          break;
        case 'V': // Vertical line
          coords.forEach(y => {
            currentY = y;
            points.push({ x: currentX, y: currentY });
          });
          break;
        case 'C': // Cubic Bézier curve
          for (let i = 0; i < coords.length; i += 6) {
            // Add control points and end point
            points.push({ x: coords[i], y: coords[i + 1] });
            points.push({ x: coords[i + 2], y: coords[i + 3] });
            currentX = coords[i + 4];
            currentY = coords[i + 5];
            points.push({ x: currentX, y: currentY });
          }
          break;
        default:
          // For other commands, try to extract any coordinate pairs
          for (let i = 0; i < coords.length; i += 2) {
            if (coords[i + 1] !== undefined) {
              points.push({ x: coords[i], y: coords[i + 1] });
            }
          }
      }
    });

    if (points.length === 0) {
      return null;
    }

    return calculateBounds(points);
  } catch {
    // Error analyzing path bounds
    return null;
  }
}

/**
 * Enhanced polygon bounds analysis with better parsing
 */
function analyzePolygonBoundsEnhanced(points: string): BoundingBox | null {
  try {
    // Parse points string with support for various formats
    const coords = points
      .replace(/,/g, ' ')
      .trim()
      .split(/\s+/)
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (coords.length < 4 || coords.length % 2 !== 0) {
      return null;
    }

    const pointList: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < coords.length; i += 2) {
      pointList.push({ x: coords[i], y: coords[i + 1] });
    }

    return calculateBounds(pointList);
  } catch {
    // Error analyzing polygon bounds
    return null;
  }
}

/**
 * Calculates bounding box from array of points
 */
function calculateBounds(points: Array<{ x: number; y: number }>): BoundingBox | null {
  if (points.length === 0) {
    return null;
  }

  const xCoords = points.map(p => p.x);
  const yCoords = points.map(p => p.y);

  const minX = Math.min(...xCoords);
  const maxX = Math.max(...xCoords);
  const minY = Math.min(...yCoords);
  const maxY = Math.max(...yCoords);

  return {
    height: maxY - minY,
    width: maxX - minX,
    x: minX,
    y: minY,
  };
}

/**
 * Fallback function that uses getBBox() to detect element bounds
 * This requires the element to be rendered in the DOM
 *
 * @param element - SVG element reference
 * @returns ElementInfo with detected bounds or null if detection fails
 */
export function detectElementBounds(element: SVGElement): ElementInfo | null {
  try {
    const bbox = element.getBBox();

    if (bbox.width <= 0 || bbox.height <= 0) {
      return null;
    }

    // Get stroke width from computed style
    const computedStyle = window.getComputedStyle(element);
    const strokeWidth = parseFloat(computedStyle.strokeWidth || '0');

    return {
      elementHeight: bbox.height,
      elementPosition: {
        x: bbox.x + bbox.width / 2,
        y: bbox.y + bbox.height / 2,
      },
      elementSize: Math.max(bbox.width, bbox.height),
      elementStrokeWidth: strokeWidth,
      elementType: 'rectangle', // Default to rectangle for getBBox results
      elementWidth: bbox.width,
      isValid: true,
    };
  } catch {
    // Error detecting element bounds
    return null;
  }
}

/**
 * Detects element info with cascading fallbacks
 * 1. Try props-based detection
 * 2. Fallback to DOM-based detection if element is available
 * 3. Return null if no valid information can be detected
 */
export function detectWithFallback(
  element: ReactElement,
  domElement?: SVGElement
): ElementInfo | null {
  // 1. Primary detection from props
  const propsInfo = detectElementInfo(element);
  if (propsInfo.isValid) {
    return propsInfo;
  }

  // 2. DOM-based fallback
  if (domElement) {
    const domInfo = detectElementBounds(domElement);
    if (domInfo?.isValid) {
      return {
        ...domInfo,
        originalElementType: (typeof element.type === 'string'
          ? element.type.toLowerCase()
          : 'unknown') as SupportedElementType,
      };
    }
  }

  // 3. No valid information found - return null instead of defaults
  // This allows the component to decide not to render the focus ring
  return null;
}
