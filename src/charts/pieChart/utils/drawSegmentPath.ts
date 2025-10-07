import { buildL } from './buildL';
import { RotateDirection } from './rotationDirection';

interface CoordinatesType {
  x: number;
  y: number;
}

interface DrawSegmentPathProps {
  center: CoordinatesType;
  outerStart: CoordinatesType;
  outerEnd: CoordinatesType;
  innerStart: CoordinatesType;
  innerEnd: CoordinatesType;
  radius: number;
  innerRadius: number;
  singleStroke?: boolean;
  largeArcFlag: string;
  rotateDirection?: (typeof RotateDirection)[keyof typeof RotateDirection];
}

export const drawSegmentPath = ({
  center,
  innerEnd,
  innerRadius,
  innerStart,
  largeArcFlag,
  outerEnd,
  outerStart,
  radius,
  rotateDirection,
  singleStroke,
}: DrawSegmentPathProps): string => {
  let M, A, L, m, AA, MR, AR, mR, AAR, Z;

  if (rotateDirection === RotateDirection.CLOCKWISE) {
    M = `M ${outerStart.x},${outerStart.y}`;
    A = `A ${radius},${radius} 0 ${largeArcFlag} 1 ${outerEnd.x}, ${outerEnd.y}`;
    L = buildL({ center, innerEnd: innerEnd, innerRadius, singleStroke });
    m = singleStroke ? `M ${innerEnd.x},${innerEnd.y}` : undefined;
    AA =
      innerRadius > 0
        ? `A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x},${innerStart.y}`
        : undefined;

    // mirror rounder value, needed for a single circle
    MR = `M ${outerStart.x},${outerStart.y}`;
    mR = `M ${innerEnd.x},${innerEnd.y}`;
    AR = `A ${radius},${radius} 0 ${largeArcFlag} 0 ${outerEnd.x},${outerEnd.y}`;
    AAR = `A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x},${innerStart.y}`;

    Z = singleStroke ? undefined : 'Z';
  } else {
    M = `M ${outerStart.x} ${outerStart.y}`;
    A = `A ${radius},${radius} 0 ${largeArcFlag},0 ${outerEnd.x}, ${outerEnd.y}`;
    L = buildL({ center, innerEnd, innerRadius, singleStroke });
    m = singleStroke ? `M ${innerEnd.x},${innerEnd.y}` : undefined;
    AA =
      innerRadius > 0
        ? `A ${innerRadius}, ${innerRadius} 0 ${largeArcFlag},1 ${innerStart.x},${innerStart.y}`
        : undefined;

    // mirror rounder value, needed for a single circle
    MR = `M ${outerStart.x},${outerStart.y}`;
    mR = `M ${innerEnd.x},${innerEnd.y}`;
    AR = `A ${radius},${radius} 0 ${largeArcFlag} 1 ${outerEnd.x},${outerEnd.y}`;
    AAR = `A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x},${innerStart.y}`;

    Z = singleStroke ? undefined : 'Z';
  }

  // values
  const base = [M, A, L, m, AA, Z];
  const mirror = singleStroke ? [MR, AR, mR, AAR] : [];
  return base.concat(mirror).filter(Boolean).join(' ');
};
