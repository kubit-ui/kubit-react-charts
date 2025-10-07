import { calculateLinesPathData, generateCurvedPath } from '../pathGeneration';

describe('pathGeneration', () => {
  describe('generateCurvedPath', () => {
    it('should handle edge cases: empty and single point', () => {
      expect(generateCurvedPath([])).toBe('');
      expect(generateCurvedPath([[10, 20]])).toBe('M 10 20');
    });

    it('should generate curved path for multiple points', () => {
      const points: Array<[number, number]> = [
        [0, 10],
        [10, 20],
        [20, 15],
      ];
      const result = generateCurvedPath(points);

      expect(result).toContain('M 0 10'); // Start with move
      expect(result).toContain('C'); // Contains curve commands
      expect(result).toContain('10 20'); // Contains control points
      expect(result).toContain('20 15'); // End point
    });
  });

  describe('calculateLinesPathData', () => {
    const mockData = [
      { month: 'Jan', profit: 20, sales: 100 },
      { month: 'Feb', profit: 30, sales: 150 },
      { month: 'Mar', profit: 25, sales: 120 },
    ];

    const mockLines = [
      { curved: true, stroke: '#blue', yKey: 'sales' },
      { curved: false, stroke: '#red', yKey: 'profit' },
    ];

    it('should handle empty inputs gracefully', () => {
      expect(calculateLinesPathData([], mockLines, 400, 100)).toEqual([]);
      expect(calculateLinesPathData(mockData, [], 400, 100)).toEqual([]);
    });

    it('should generate path data for all lines with correct configs', () => {
      const result = calculateLinesPathData(mockData, mockLines, 400, 100);

      expect(result).toHaveLength(2);
      expect(result[0].config).toEqual(mockLines[0]);
      expect(result[1].config).toEqual(mockLines[1]);
    });

    it('should generate curved vs straight paths based on config', () => {
      const curvedResult = calculateLinesPathData(mockData, [mockLines[0]], 400, 100);
      const straightResult = calculateLinesPathData(mockData, [mockLines[1]], 400, 100);

      expect(curvedResult[0].linePath).toContain('C'); // Curved path
      expect(straightResult[0].linePath).toContain('L'); // Straight lines
      expect(straightResult[0].linePath).not.toContain('C'); // No curves
    });

    it('should generate fill path only when fill is specified', () => {
      const lineWithFill = { ...mockLines[0], fill: '#lightblue' };
      const lineWithoutFill = mockLines[0];

      const withFillResult = calculateLinesPathData(mockData, [lineWithFill], 400, 100);
      const withoutFillResult = calculateLinesPathData(mockData, [lineWithoutFill], 400, 100);

      expect(withFillResult[0].fillPath).not.toBe('');
      expect(withFillResult[0].fillPath).toContain('Z'); // Closed path
      expect(withoutFillResult[0].fillPath).toBe('');
    });
  });
});
