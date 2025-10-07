import { ajustedTextSpace } from '../ajustedTextSpace';

describe('ajustedTextSpace', () => {
  it('should return the ajusted value correctly, when the textAnchor is middle', () => {
    const result = ajustedTextSpace('middle', 100, 10);
    expect(result).toBe(60); // 100 / 2 + 10
  });

  it('should return the ajusted value correctly, when the textAnchor is end', () => {
    const result = ajustedTextSpace('end', 100, 10);
    expect(result).toBe(110); // 100 + 10
  });

  it('should return the ajusted value correctly, when the textAnchor is start', () => {
    const result = ajustedTextSpace('start', 100, 10);
    expect(result).toBe(0);
  });

  it('should return 0 when the textAnchor is undefined', () => {
    const result = ajustedTextSpace(undefined, 100, 10);
    expect(result).toBe(0); // default case
  });
});
