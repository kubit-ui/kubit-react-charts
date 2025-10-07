export const calculateShapePoints = (
  centerX: number,
  centerY: number,
  points: number,
  outerRadius: number,
  innerRadius: number
): string => {
  let result = '';

  // Determine whether drawing a regular shape or a star
  const isRegularShape = outerRadius === innerRadius;
  const iterations = isRegularShape ? points : 2 * points;

  for (let i = 0; i < iterations; i++) {
    // Use only outerRadius for regular shapes, alternate for stars
    const radius = isRegularShape ? outerRadius : i % 2 === 0 ? outerRadius : innerRadius;
    // Adjust angle to alternate points, subtracting Math.PI / 2 to start vertically
    const angle = ((Math.PI * 2) / iterations) * i - Math.PI / 2;
    // Calculate x and y based on angle and radius
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    // Concatenar el punto al resultado
    result += `${x},${y} `;
  }

  return result.trim();
};
