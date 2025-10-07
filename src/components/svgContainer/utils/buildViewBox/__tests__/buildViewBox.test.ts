import { buildViewBox } from '../buildViewBox';

describe('buildViewBox', () => {
  it('should return a correct viewBox string with no extra space', () => {
    const viewBox = buildViewBox(100, 200, 0);
    expect(viewBox).toBe('0 0 100 200');
  });

  it('should return a correct viewBox string with extra space', () => {
    const viewBox = buildViewBox(100, 200, 20);
    expect(viewBox).toBe('-20 -20 100 200');
  });

  it('should handle string inputs', () => {
    const viewBox = buildViewBox('100', '200', 20);
    expect(viewBox).toBe('-20 -20 100 200');
  });

  it('should handle missing extraSpace parameter', () => {
    const viewBox = buildViewBox(100, 200);
    expect(viewBox).toBe('0 0 100 200');
  });
});
