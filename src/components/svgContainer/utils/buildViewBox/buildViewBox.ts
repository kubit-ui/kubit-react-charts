/**
 * Constructs a viewBox attribute value for an SVG element.
 *
 * This function generates a string suitable for the `viewBox` attribute of an SVG element, allowing for control over
 * the visible area of the SVG. It can optionally include extra space around the edges, which is useful for ensuring
 * that content near the boundaries is not clipped.
 *
 * @param {number | string} width - The width of the viewBox. Can be a number (representing pixels) or a string (any valid CSS length value).
 * @param {number | string} height - The height of the viewBox. Similar to width, it can be a number or a string.
 * @param {number} [extraSpace=0] - Optional additional space to include on all sides of the viewBox. This expands the area beyond the specified width and height.
 *
 * @returns {string} The `viewBox` attribute value, formatted as "minX minY width height".
 */
export const buildViewBox = (
  width: number | string,
  height: number | string,
  extraSpace: number | string = 0
): string => {
  const minX = -extraSpace;
  const minY = -extraSpace;
  const viewBoxWidth = width;
  const viewBoxHeight = height;

  return `${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`;
};
