/**
 * Utilities for detecting SVG element properties using DOM measurements
 */

/**
 * Information about a detected SVG element's bounding box
 */
export interface ElementInfo {
  /** Position of the element center */
  elementPosition: { x: number; y: number };
  /** Stroke width of the element */
  elementStrokeWidth: number;
  /** Width of the bounding box */
  elementWidth: number;
  /** Height of the bounding box */
  elementHeight: number;
  /** Size (max of width/height) - kept for backward compatibility */
  elementSize: number;
  /** Whether the detection was successful */
  isValid: boolean;
}

/**
 * Detects SVG element properties using DOM getBBox() method
 *
 * This function leverages the browser's native getBBox() API to accurately
 * calculate the bounding box of any SVG element, including transforms,
 * paths, and complex shapes.
 *
 * @param element - SVG DOM element to analyze
 * @returns ElementInfo with detected properties, or null if detection fails
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
      elementWidth: bbox.width,
      isValid: true,
    };
  } catch {
    // Error detecting element bounds
    return null;
  }
}
