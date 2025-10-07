import { BarOrientation } from '../../bar.type';
import { getSegments } from '../getSegments';

describe('getSegments', () => {
  it('should calculate segments for horizontal orientation', () => {
    const result = getSegments({
      barConfig: {
        barWidth: 5,
        gap: 2,
        singleConfig: [
          { color: 'red', coverage: 50 },
          { color: 'pink', coverage: 50 },
        ],
      },
      orientation: BarOrientation.HORIZONTAL,
      x1: 0,
      x2: 100,
      y1: 0,
      y2: 0,
    });

    expect(result).toEqual([
      [0, 49], // First segment
      [50, 100], // Second segment (gap applied)
    ]);
  });

  it('should calculate segments for vertical orientation', () => {
    const result = getSegments({
      barConfig: {
        barWidth: 5,
        gap: 4,
        singleConfig: [
          { color: 'blue', coverage: 30 },
          { color: 'green', coverage: 70 },
        ],
      },
      orientation: BarOrientation.VERTICAL,
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 100,
    });

    expect(result).toEqual([
      [0, 28], // First segment
      [30, 100], // Second segment (gap applied)
    ]);
  });

  it('should handle empty singleConfig', () => {
    const result = getSegments({
      barConfig: {
        barWidth: 5,
        gap: 2,
        singleConfig: [],
      },
      orientation: BarOrientation.HORIZONTAL,
      x1: 0,
      x2: 100,
      y1: 0,
      y2: 0,
    });

    expect(result).toEqual([]);
  });

  it('should handle 100% coverage for a single segment', () => {
    const result = getSegments({
      barConfig: {
        barWidth: 5,
        gap: 0,
        singleConfig: [{ color: 'yellow', coverage: 100 }],
      },
      orientation: BarOrientation.HORIZONTAL,
      x1: 0,
      x2: 100,
      y1: 0,
      y2: 0,
    });

    expect(result).toEqual([[0, 100]]);
  });

  it('should handle negative barStart and barEnd values', () => {
    const result = getSegments({
      barConfig: {
        barWidth: 5,
        gap: 2,
        singleConfig: [
          { color: 'pink', coverage: 50 },
          { color: 'red', coverage: 50 },
        ],
      },
      orientation: BarOrientation.HORIZONTAL,
      x1: -100,
      x2: 0,
      y1: 0,
      y2: 0,
    });

    expect(result).toEqual([
      [-100, -51], // First segment
      [-50, 0], // Second segment (gap applied)
    ]);
  });
});
