import { safeDocument, safeGetComputedStyle } from '../ssr/ssr';
import { Unit } from '@/types/unit.enum';

/**
 * A mapping of string representations of units to their corresponding `Unit` enum values.
 * This is used to convert string-based unit identifiers into their respective `Unit` enum types.
 *
 * @example
 * stringToUnit["%"] // Returns Unit.PERCENT
 * stringToUnit["rem"] // Returns Unit.REM
 */
const stringToUnit: Record<string, (typeof Unit)[keyof typeof Unit]> = {
  [Unit.PERCENTAGE]: Unit.PERCENTAGE,
  [Unit.REM]: Unit.REM,
};

/**
 * An enumeration representing the dimensions of an SVG element.
 * This is used to specify whether the width or height dimension is being referenced.
 *
 * @enum {string}
 * @property {string} WIDTH - Represents the width dimension ('WIDTH').
 * @property {string} HEIGHT - Represents the height dimension ('HEIGHT').
 */
const Dimension = {
  HEIGHT: 'HEIGHT',
  WIDTH: 'WIDTH',
} as const;

const UNIT_VALUE_REGEX = /^(\d+(\.\d+)?)(px|rem|%)?$/;
const MATCH_VALUE_INDEX = 1;
const MATCH_UNIT_INDEX = 3;

/**
 * Extracts the numeric value and unit from a regex match result.
 *
 * @param match - The regex match array containing the value and unit.
 * @returns An object containing the numeric value and the unit as a string.
 */
const parseDimensionValue = (
  value: string | number
): { value: number; unit: (typeof Unit)[keyof typeof Unit] | undefined } => {
  if (typeof value === 'number') {
    return { unit: undefined, value };
  }
  const match = value.match(UNIT_VALUE_REGEX);

  if (!match) {
    throw new Error(`Invalid string format: "${value}"`);
  }

  const parsedValue = parseFloat(match[MATCH_VALUE_INDEX]); // match for group (\d+(\.\d+)?)
  const unit = match[MATCH_UNIT_INDEX]; // match for group (px|rem|%)

  return { unit: stringToUnit[unit], value: parsedValue };
};

/**
 * Calculates the percentage of a value based on the specified dimension (width or height) and the SVG element's dimensions.
 *
 * @param {number} value - The value to be converted to a percentage.
 * @param {`${Dimension}`} dimension - The dimension type (width or height).
 * @param {SVGSVGElement} svgElement - The SVG element to calculate dimensions for.
 * @returns {number} The calculated percentage value.
 */
const calculatePercentage = (
  value: number,
  dimension: keyof typeof Dimension,
  svgElement: SVGSVGElement
) => {
  const svgContainer = svgElement.parentElement;
  if (!svgContainer) {
    return 0;
  }
  const containerDimension =
    dimension === Dimension.WIDTH ? svgContainer.clientWidth : svgContainer.clientHeight;
  return (value / 100) * containerDimension;
};

/**
 * Calculates the rem value based on the root font size.
 * SSR-safe: Returns default 16px if not in browser environment.
 *
 * @param {number} value - The value in rem to be converted to pixels.
 * @returns {number} The calculated pixel value.
 */
const calculateRem = (value: number) => {
  const doc = safeDocument();
  if (!doc) {
    // SSR fallback: Default browser font size is typically 16px
    return value * 16;
  }

  const style = safeGetComputedStyle(doc.documentElement);
  if (!style) {
    return value * 16;
  }

  const remValue = parseFloat(style.fontSize);
  return value * (remValue || 16); // Fallback to 16 if fontSize is invalid
};

interface GetCanvasDimensionsProps {
  canvasHeight: string | number;
  canvasWidth: string | number;
  svgElement: SVGSVGElement;
}

interface GetCanvasDimensionsReturn {
  parsedCanvasWidth: number;
  parsedCanvasHeight: number;
}

/**
 * Calculates the dimensions of an SVG element based on the provided width and height values.
 * The width and height can be specified in pixels, percentages, or rem units.
 *
 * @param {GetCanvasDimensionsProps} props - The properties for calculating dimensions.
 * @param {string | number} props.canvasHeight - The height of the canvas (can be a string or number).
 * @param {string | number} props.canvasWidth - The width of the canvas (can be a string or number).
 * @param {SVGSVGElement} props.svgElement - The SVG element to calculate dimensions for.
 * @returns {GetCanvasDimensionsReturn} An object containing the calculated canva's width and height.
 */
export const getCanvasDimensions = ({
  canvasHeight,
  canvasWidth,
  svgElement,
}: GetCanvasDimensionsProps): GetCanvasDimensionsReturn => {
  const { unit: widthUnit, value: widthValue } = parseDimensionValue(canvasWidth);
  const parsedCanvasWidth =
    widthUnit === Unit.PERCENTAGE
      ? calculatePercentage(widthValue, Dimension.WIDTH, svgElement)
      : widthUnit === Unit.REM
        ? calculateRem(widthValue)
        : widthValue;

  const { unit: heightUnit, value: heightValue } = parseDimensionValue(canvasHeight);
  const parsedCanvasHeight =
    heightUnit === Unit.PERCENTAGE
      ? calculatePercentage(heightValue, Dimension.HEIGHT, svgElement)
      : heightUnit === Unit.REM
        ? calculateRem(heightValue)
        : heightValue;

  return { parsedCanvasHeight, parsedCanvasWidth };
};
