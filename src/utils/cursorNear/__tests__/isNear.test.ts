import { isNear } from '../isNear';

describe('isNear', () => {
  it('should return true when cursor is within the position area', () => {
    expect(isNear(100, 100, 0.3)).toBe(true);
    expect(isNear(100.3, 100, 0.3)).toBe(true);
    expect(isNear(99.7, 100, 0.3)).toBe(true);
  });

  it('should return false when cursor is outside the position area', () => {
    expect(isNear(102, 100, 0.3)).toBe(false);
    expect(isNear(98, 100, 0.3)).toBe(false);
  });

  it('should handle different line widths', () => {
    expect(isNear(101, 100, 1)).toBe(true);
    expect(isNear(99, 100, 1)).toBe(true);
    expect(isNear(106, 100, 1)).toBe(false);
    expect(isNear(95, 100, 1)).toBe(false);
  });
});
