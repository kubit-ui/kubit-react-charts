interface RotateDirectionReturnValues {
  initialAngle: number;
  finalAngle: number;
  carryAngle: number;
}

interface RotateDirectionProps {
  startAngle: number;
  angleEquivalent: number;
  gapAngle: number;
  direction?: (typeof RotateDirection)[keyof typeof RotateDirection];
}

export const RotateDirection = {
  CLOCKWISE: 'CLOCKWISE',
  COUNTER_CLOCKWISE: 'COUNTER_CLOCKWISE',
} as const;

export const rotationDirection = ({
  angleEquivalent,
  direction,
  gapAngle,
  startAngle,
}: RotateDirectionProps): RotateDirectionReturnValues => {
  const clockDir = direction === RotateDirection.CLOCKWISE;
  const initialAngle = clockDir ? startAngle + gapAngle / 2 : startAngle - gapAngle / 2;
  const finalAngle = clockDir
    ? startAngle + angleEquivalent - gapAngle / 2
    : startAngle - angleEquivalent + gapAngle / 2;
  const carryAngle = clockDir ? startAngle + angleEquivalent : startAngle - angleEquivalent;

  return { carryAngle, finalAngle, initialAngle };
};
