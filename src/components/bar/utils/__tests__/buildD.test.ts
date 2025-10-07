import { BarOrientation } from '../../bar.type';
import { buildD } from '../buildD';

describe('buildD', () => {
  it('should generate a horizontal path with no rounded corners', () => {
    const result = buildD({
      barWidth: 10,
      currentBars: 3,
      endRounded: 0,
      extraSpacing: 5,
      order: 2,
      orientation: BarOrientation.HORIZONTAL,
      startRounded: 0,
      x1: 0,
      x2: 20,
      y1: 0,
      y2: 10,
    });
    expect(result).toBe('M0,5 L20,15 L20,5 L0,-5 Z');
  });

  it('should generate a horizontal path with rounded start and end', () => {
    const result = buildD({
      barWidth: 10,
      currentBars: 3,
      endRounded: 5,
      extraSpacing: 5,
      order: 2,
      orientation: BarOrientation.HORIZONTAL,
      startRounded: 5,
      x1: 0,
      x2: 20,
      y1: 0,
      y2: 10,
    });
    expect(result).toBe('M 5,5 L15,15 Q25 10, 15 5 L5,-5 Q-5 0, 5 5');
  });

  it('should generate a vertical path with no rounded corners', () => {
    const result = buildD({
      barWidth: 10,
      currentBars: 3,
      endRounded: 0,
      extraSpacing: 5,
      order: 2,
      orientation: BarOrientation.VERTICAL,
      startRounded: 0,
      x1: 0,
      x2: 10,
      y1: 0,
      y2: 20,
    });
    expect(result).toBe('M5,0 L15,20 L5,20 L-5,0 Z');
  });

  it('should generate a vertical path with rounded start and end', () => {
    const result = buildD({
      barWidth: 10,
      currentBars: 3,
      endRounded: 5,
      extraSpacing: 5,
      order: 2,
      orientation: BarOrientation.VERTICAL,
      startRounded: 5,
      x1: 0,
      x2: 10,
      y1: 0,
      y2: 20,
    });
    expect(result).toBe('M5, -5 L15,25 Q10 15, 5 25 L-5,-5 Q0 5, 5 -5');
  });

  it('should handle a single bar with no extra spacing', () => {
    const result = buildD({
      barWidth: 10,
      currentBars: 1,
      endRounded: 0,
      extraSpacing: 0,
      order: 1,
      orientation: BarOrientation.HORIZONTAL,
      startRounded: 0,
      x1: 0,
      x2: 20,
      y1: 0,
      y2: 10,
    });
    expect(result).toBe('M0,5 L20,15 L20,5 L0,-5 Z');
  });
});
