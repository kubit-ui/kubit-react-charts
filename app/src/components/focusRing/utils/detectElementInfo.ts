import type { ReactElement } from 'react';

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
}

/**
 * Detects SVG element properties from React element props
 *
 * @param element - React element to analyze
 * @returns ElementInfo with detected properties
 */
export function detectElementInfo(element: ReactElement): ElementInfo {
  const { props, type } = element;

  // Handle string element types (rect, circle, etc.)
  if (typeof type !== 'string') {
    return { elementType: 'unknown' };
  }

  const strokeWidth = parseFloat(props.strokeWidth || props['stroke-width'] || '0');

  switch (type.toLowerCase()) {
    case 'rect': {
      const x = parseFloat(props.x || '0');
      const y = parseFloat(props.y || '0');
      const width = parseFloat(props.width || '0');
      const height = parseFloat(props.height || '0');

      if (width <= 0 || height <= 0) {
        return { elementType: 'unknown' };
      }

      return {
        elementHeight: height,
        elementPosition: {
          x: x + width / 2,
          y: y + height / 2,
        },
        elementSize: Math.max(width, height), // Use the larger dimension as size
        elementStrokeWidth: strokeWidth,
        elementType: 'rectangle',
        elementWidth: width,
      };
    }

    case 'circle': {
      const cx = parseFloat(props.cx || '0');
      const cy = parseFloat(props.cy || '0');
      const r = parseFloat(props.r || '0');

      if (r <= 0) {
        return { elementType: 'unknown' };
      }

      return {
        elementPosition: { x: cx, y: cy },
        elementRadius: r,
        elementSize: r * 2, // Diameter
        elementStrokeWidth: strokeWidth,
        elementType: 'circle',
      };
    }

    case 'ellipse': {
      const cx = parseFloat(props.cx || '0');
      const cy = parseFloat(props.cy || '0');
      const rx = parseFloat(props.rx || '0');
      const ry = parseFloat(props.ry || '0');

      if (rx <= 0 || ry <= 0) {
        return { elementType: 'unknown' };
      }

      return {
        elementHeight: ry * 2,
        elementPosition: { x: cx, y: cy },
        elementSize: Math.max(rx * 2, ry * 2), // Use larger axis as size
        elementStrokeWidth: strokeWidth,
        elementType: 'ellipse',
        elementWidth: rx * 2,
      };
    }

    case 'path': {
      // For path elements, we'll try to extract basic info from the d attribute
      const d = props.d;
      if (!d || typeof d !== 'string') {
        return { elementStrokeWidth: strokeWidth, elementType: 'path' };
      }

      // Basic path analysis - this is simplified and could be enhanced
      const pathBounds = analyzePathBounds(d);
      if (pathBounds) {
        return {
          elementHeight: pathBounds.height,
          elementPosition: {
            x: pathBounds.x + pathBounds.width / 2,
            y: pathBounds.y + pathBounds.height / 2,
          },
          elementSize: Math.max(pathBounds.width, pathBounds.height),
          elementStrokeWidth: strokeWidth,
          elementType: 'rectangle', // Treat paths as rectangles for now
          elementWidth: pathBounds.width,
        };
      }

      return { elementStrokeWidth: strokeWidth, elementType: 'path' };
    }

    case 'polygon':
    case 'polyline': {
      const points = props.points;
      if (!points || typeof points !== 'string') {
        return { elementType: 'unknown' };
      }

      const bounds = analyzePolygonBounds(points);
      if (bounds) {
        return {
          elementHeight: bounds.height,
          elementPosition: {
            x: bounds.x + bounds.width / 2,
            y: bounds.y + bounds.height / 2,
          },
          elementSize: Math.max(bounds.width, bounds.height),
          elementStrokeWidth: strokeWidth,
          elementType: 'rectangle', // Treat polygons as rectangles
          elementWidth: bounds.width,
        };
      }

      return { elementStrokeWidth: strokeWidth, elementType: 'unknown' };
    }

    default:
      return { elementStrokeWidth: strokeWidth, elementType: 'unknown' };
  }
}

/**
 * Basic path bounds analysis from d attribute
 * This is a simplified implementation that handles basic paths
 */
function analyzePathBounds(
  d: string
): { x: number; y: number; width: number; height: number } | null {
  try {
    // Extract numbers from the path string
    const numbers = d.match(/-?\d+(?:\.\d+)?/g);
    if (!numbers || numbers.length < 4) {
      return null;
    }

    const coords = numbers.map(n => parseFloat(n));
    const xCoords = coords.filter((_, i) => i % 2 === 0);
    const yCoords = coords.filter((_, i) => i % 2 === 1);

    if (xCoords.length === 0 || yCoords.length === 0) {
      return null;
    }

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
  } catch {
    return null;
  }
}

/**
 * Basic polygon bounds analysis from points attribute
 */
function analyzePolygonBounds(
  points: string
): { x: number; y: number; width: number; height: number } | null {
  try {
    // Parse points string (format: "x1,y1 x2,y2 x3,y3" or "x1 y1 x2 y2 x3 y3")
    const coords = points
      .replace(/,/g, ' ')
      .split(/\s+/)
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (coords.length < 4 || coords.length % 2 !== 0) {
      return null;
    }

    const xCoords = coords.filter((_, i) => i % 2 === 0);
    const yCoords = coords.filter((_, i) => i % 2 === 1);

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
  } catch {
    return null;
  }
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
    };
  } catch {
    return null;
  }
}
