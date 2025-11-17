import { logger } from '../logger/logger';
import type { GradientStop } from './cssGradientToSvg.types';

/**
 * Converts a CSS linear gradient string into an SVG linear gradient.
 *
 * This function parses a CSS gradient string, extracts its angle and color stops,
 * and then generates an SVG element with a corresponding linear gradient definition.
 * The SVG element is hidden and can be used within an SVG image or as a reference
 * for fill patterns. Currently, it supports gradients at angles of 90, 180, and 270 degrees.
 *
 * @param cssGradient - A string representing the CSS linear gradient. The string should
 *                      start with the gradient angle (in degrees) followed by color stops,
 *                      where each color stop is defined by its color and optional offset.
 *                      Example: "180, red, blue 50%".
 * @param id - An optional string that specifies the ID attribute for the generated
 *             linearGradient element. This ID can be used to reference the gradient
 *             from other SVG elements. Defaults to 'gradientePath'.
 * @returns An SVG element containing a linearGradient definition based on the provided
 *          CSS gradient string. If the angle is not supported, it returns an empty
 *          React fragment.
 */
export const cssGradientToSVG = (cssGradient: string, id = 'gradientePath'): JSX.Element => {
  const parts = cssGradient.split(',').map(part => part.trim());
  const angle = parseInt(parts[0], 10); // Extract the angle
  const stops: GradientStop[] = parts.slice(1).map(part => {
    const [color, offset] = part.split(' ');
    return { color, offset };
  });

  const y1 = '0%';
  let x1 = '0%',
    x2 = '0%',
    y2 = '0%';
  switch (angle) {
    case 180:
      y2 = '100%';
      break;
    case 90:
      x2 = '100%';
      break;
    case 270:
      x1 = '100%';
      break;
    default:
      logger.warn(`Unsupported gradient angle: ${angle}°. Supported angles are 90, 180, 270.`);
      return <></>; // Return an empty fragment for unsupported angles
  }

  return (
    <defs>
      <linearGradient id={id} x1={x1} x2={x2} y1={y1} y2={y2}>
        {stops.map((stop, index) => (
          <stop
            key={`${index}-${stop.offset}`.toString()}
            offset={stop.offset}
            stopColor={stop.color}
          />
        ))}
      </linearGradient>
    </defs>
  );
};
