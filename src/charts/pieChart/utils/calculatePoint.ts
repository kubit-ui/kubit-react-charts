/**
 * Calculates the coordinates of a point on a circle given the center, radius, and angle.
 * @param center - The coordinates of the center of the circle.
 * @param radius - The radius of the circle.
 * @param angle - The angle in radians.
 * @returns The coordinates of the calculated point.
 */
export const calculatePoint = (
  center: { x: number; y: number },
  radius: number,
  angle: number
): { x: number; y: number } => {
  return {
    x: center.x + radius * Math.cos(angle),
    y: center.y + radius * Math.sin(angle),
  };
};
