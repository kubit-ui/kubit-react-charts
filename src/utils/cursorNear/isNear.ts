export const isNear = (cursor: number, position: number, extraArea: number = 1): boolean => {
  return cursor >= position - extraArea && cursor <= position + extraArea;
};
