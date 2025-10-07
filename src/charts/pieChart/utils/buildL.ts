interface CoordinatesType {
  x: number;
  y: number;
}

interface BuildLProps {
  singleStroke?: boolean;
  innerRadius: number;
  innerEnd: CoordinatesType;
  center: CoordinatesType;
}

export const buildL = ({
  center,
  innerEnd,
  innerRadius,
  singleStroke,
}: BuildLProps): string | undefined => {
  if (singleStroke) {
    return undefined;
  } if (innerRadius > 0) {
    return `L ${innerEnd.x},${innerEnd.y}`;
  }

  return `L ${center.x},${center.y}`;
};
