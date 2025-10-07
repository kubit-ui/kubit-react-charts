import { describe, expect, it } from 'vitest';

import type { IZoomAreaDataPoint, ZoomRange } from '../../zoomArea.type';
import { generateAccessibilityLabels } from '../accessibilityLabels';

describe('generateAccessibilityLabels', () => {
  const sampleData: IZoomAreaDataPoint[] = [
    { sales: 100, year: '2020' },
    { sales: 150, year: '2021' },
    { sales: 200, year: '2022' },
    { sales: 175, year: '2023' },
    { sales: 250, year: '2024' },
    { sales: 300, year: '2025' },
  ];

  it('should generate correct labels for integer and fractional indices', () => {
    const range: ZoomRange = { end: 3.7, start: 1.3 };
    const xKey = 'year';

    const labels = generateAccessibilityLabels(sampleData, xKey, range);

    expect(labels.startHandler).toBe('2021');
    expect(labels.endHandler).toBe('2024');
    expect(labels.selectionArea).toBe('2021 - 2024');
  });

  it('should work with different xKey property names', () => {
    const alternativeData = [
      { month: 'Jan', value: 10 },
      { month: 'Feb', value: 20 },
      { month: 'Mar', value: 30 },
    ];

    const range: ZoomRange = { end: 1, start: 0 };
    const xKey = 'month';

    const labels = generateAccessibilityLabels(alternativeData, xKey, range);

    expect(labels.startHandler).toBe('Jan');
    expect(labels.endHandler).toBe('Feb');
    expect(labels.selectionArea).toBe('Jan - Feb');
  });

  it('should handle boundary conditions and out-of-bounds ranges', () => {
    // Test full range
    const fullRange: ZoomRange = { end: 5, start: 0 };
    const fullLabels = generateAccessibilityLabels(sampleData, 'year', fullRange);

    expect(fullLabels.startHandler).toBe('2020');
    expect(fullLabels.endHandler).toBe('2025');

    // Test out-of-bounds range (should be clamped)
    const outOfBounds: ZoomRange = { end: 10, start: -1 };
    const clampedLabels = generateAccessibilityLabels(sampleData, 'year', outOfBounds);

    expect(clampedLabels.startHandler).toBe('2020');
    expect(clampedLabels.endHandler).toBe('2025');
  });

  it('should handle edge cases: empty data and single element', () => {
    // Empty data
    const emptyLabels = generateAccessibilityLabels([], 'year', { end: 0, start: 0 });
    expect(emptyLabels.startHandler).toBe('0');
    expect(emptyLabels.endHandler).toBe('0');
    expect(emptyLabels.selectionArea).toBe('0 - 0');

    // Single element
    const singleData = [{ value: 100, year: '2023' }];
    const singleLabels = generateAccessibilityLabels(singleData, 'year', { end: 0, start: 0 });
    expect(singleLabels.startHandler).toBe('2023');
    expect(singleLabels.endHandler).toBe('2023');
    expect(singleLabels.selectionArea).toBe('2023 - 2023');
  });

  it('should use consistent indexing logic with data filtering', () => {
    const range: ZoomRange = { end: 3.7, start: 1.3 };
    const xKey = 'year';

    const labels = generateAccessibilityLabels(sampleData, xKey, range);

    // Simulate the same filtering logic as in useZoomData
    const startIndex = Math.max(0, Math.floor(range.start));
    const endIndex = Math.min(sampleData.length - 1, Math.ceil(range.end));
    const filteredData = sampleData.slice(startIndex, endIndex + 1);

    expect(labels.startHandler).toBe(`${filteredData[0][xKey]}`);
    expect(labels.endHandler).toBe(`${filteredData[filteredData.length - 1][xKey]}`);
  });

  it('should use custom templates when provided in config', () => {
    const range: ZoomRange = { end: 3, start: 1 };
    const xKey = 'year';
    const config = {
      endHandler: 'Date to {{endValue}}',
      selectionArea: 'Range from {{startValue}} to {{endValue}}',
      startHandler: 'Date from {{startValue}}',
    };

    const labels = generateAccessibilityLabels(sampleData, xKey, range, config);

    expect(labels.startHandler).toBe('Date from 2021');
    expect(labels.endHandler).toBe('Date to 2023');
    expect(labels.selectionArea).toBe('Range from 2021 to 2023');
  });
});
