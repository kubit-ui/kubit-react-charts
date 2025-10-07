interface FSReturnValue {
  idx: number;
  match: boolean;
}

export const findSurroundingNumber = (points: number[], xPosition: number): FSReturnValue => {
  let idx = 0;
  let match = false;

  // TODO: performance the init and last point
  for (let i = 0; i < points.length; i++) {
    if (Math.round(points[i]) === Math.round(xPosition)) {
      match = true;
      idx = i;
      break;
    }
  }

  return { idx, match };
};

export const findClosestNumber = (points: number[], xPosition: number): number => {
  let closest = 0;
  let minDiff = Math.abs(points[0] - xPosition);

  for (let i = 1; i < points.length; i++) {
    const diff = Math.abs(points[i] - xPosition);
    if (diff < minDiff) {
      closest = i;
      minDiff = diff;
    }
  }

  return closest;
};
