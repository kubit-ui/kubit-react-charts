export const ajustedTextSpace = (
  textAnchor: 'middle' | 'start' | 'end' | undefined,
  value: number,
  extra: number
): number => {
  let ajusted: number;
  switch (textAnchor) {
    case 'middle':
      ajusted = value / 2 + extra;
      break;
    case 'end':
      ajusted = value + extra;
      break;
    default:
      ajusted = 0;
      break;
  }
  return ajusted;
};
