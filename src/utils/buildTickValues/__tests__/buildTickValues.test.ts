import { buildTickValues, getDivisor } from '../buildTickValues';

declare global {
  interface SVGElement {
    getBBox: () => { x: number; y: number; width: number; height: number };
  }
}

describe('buildTickValues', () => {
  beforeEach(() => {
    SVGElement.prototype.getBBox = vi.fn(() => ({
      height: 50,
      width: 100,
      x: 0,
      y: 0,
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should return default tick values when data is empty', () => {
    const result = buildTickValues([]);
    expect(result).toEqual({ numeric: { max: 2, min: 0, step: 1 } });
  });

  it('should calculate correct tick values for positive data', () => {
    const data = ['10', '20', '30'];
    const result = buildTickValues(data);
    expect(result.numeric.min).toBe(10);
    expect(result.numeric.max).toBe(30);
    expect(result.numeric.step).toBe(10);
  });

  it('should calculate correct tick values for negative data', () => {
    const data = ['-10', '-20', '-30'];
    const result = buildTickValues(data);
    expect(result.numeric.min).toBe(-30);
    expect(result.numeric.max).toBe(-10);
    expect(result.numeric.step).toBe(10);
  });

  it('should calculate correct tick values for mixed positive and negative data', () => {
    const data = ['-15', '0', '25'];
    const result = buildTickValues(data);
    expect(result.numeric.min).toBe(-15);
    expect(result.numeric.max).toBe(25);
    expect(result.numeric.step).toBe(20);
  });

  it('should handle data with decimal values correctly', () => {
    const data = ['1.5', '2.5', '3.5'];
    const result = buildTickValues(data);
    expect(result.numeric.min).toBe(1.5);
    expect(result.numeric.max).toBe(3.5);
    expect(result.numeric.step).toBe(1);
  });

  it('should handle non-numeric strings gracefully', () => {
    const data = ['10', '15', '20'];
    const result = buildTickValues(data);
    expect(result.numeric.min).toBe(10);
    expect(result.numeric.max).toBeGreaterThanOrEqual(20);
    expect(result.numeric.step).toBe(5);
  });
});

describe('getDivisor', () => {
  it('should return 3 for numbers divisible by 3', () => {
    expect(getDivisor(9)).toBe(3);
  });

  it('should return 4 for numbers divisible by 4', () => {
    expect(getDivisor(8)).toBe(4);
  });

  it('should return 5 for numbers divisible by 5', () => {
    expect(getDivisor(10)).toBe(5);
  });

  it('should return 2 for numbers divisible by 2 but not 3, 4, or 5', () => {
    expect(getDivisor(14)).toBe(2);
  });

  it('should return 1 for numbers not divisible by 2, 3, 4, or 5', () => {
    expect(getDivisor(7)).toBe(1);
  });
});
