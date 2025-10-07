/**
 * Defines the structure for a feDropShadow.
 *
 * @property {number} dx - Controls the offset of the shadow in the horizontal direction.
 * @property {number} dy - Controls the offset of the shadow in the vertical direction.
 * @property {number} stdDeviation - Controls the amount of blur applied to the shadow.
 * @property {string} floodColor - Controls the color of the shadow.
 * @property {number} floodOpacity - Controls the opacity of the shadow.
 */
export interface ShadowSvgConfig {
  dx?: number;
  dy?: number;
  stdDeviation?: number;
  floodColor?: string;
  floodOpacity?: number;
}

/**
 * Defines the structure for apply shadow to svg.
 *
 * @property {string} id - The id of the shadow.
 * @property {string | number} x - Define the x position of the filter effect region relative to the element to wich the filter is applied
 * @property {string | number} y - Define the y position of the filter effect region relative to the element to wich the filter is applied
 * @property {string | number} width - Define the width of the filter effect region.
 * @property {string | number} height - Define the height of the filter effect region
 * @property {ShadowSvgConfig} shadowSvgConfig - Properties for feDropShadow.
 */
export interface ShadowSvgProps {
  id: string;
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  shadowSvgConfig: ShadowSvgConfig;
}
