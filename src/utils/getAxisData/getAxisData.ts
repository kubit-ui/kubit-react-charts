export const getAxisData = <T extends Record<string, unknown>>(
  data: T[],
  key: string
): unknown[] => {
  return data.map(dt => dt[key]);
};
