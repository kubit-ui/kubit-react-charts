// tests for getDataFingerprint
import type { BarChartIDataPoint, DataItem, IDataPoint } from '@/charts';

import { getDataFingerprint } from '../getDataFingerprint';

describe('getDataFingerprint', () => {
  describe('Basic functionality', () => {
    it('should return a JSON string representation of the data', () => {
      const data = [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ];
      const result = getDataFingerprint(data);
      expect(result).toBe(JSON.stringify(data));
    });

    it('should generate different fingerprints for different data', () => {
      const data1 = [{ x: 1, y: 2 }];
      const data2 = [{ x: 1, y: 3 }];

      const fingerprint1 = getDataFingerprint(data1);
      const fingerprint2 = getDataFingerprint(data2);

      expect(fingerprint1).not.toBe(fingerprint2);
    });
  });

  describe('LineChart data (IDataPoint[])', () => {
    it('should handle typical LineChart data with mixed types', () => {
      const data: IDataPoint[] = [
        { active: true, date: '2023-01', profit: 200, revenue: 1000 },
        { active: false, date: '2023-02', profit: 300, revenue: 1200 },
        { active: true, date: '2023-03', profit: 250, revenue: 1100 },
      ];
      const result = getDataFingerprint(data);
      expect(result).toBe(JSON.stringify(data));
      expect(result).toContain('2023-01');
      expect(result).toContain('revenue');
      expect(result).toContain('true');
    });
  });

  describe('BarChart data (BarChartIDataPoint[])', () => {
    it('should handle typical BarChart data', () => {
      const data: BarChartIDataPoint[] = [
        { category: 'Product A', quarter: 'Q1', sales: 1000 },
        { category: 'Product B', quarter: 'Q1', sales: 1500 },
        { category: 'Product C', quarter: 'Q1', sales: 800 },
      ];
      const result = getDataFingerprint(data);
      expect(result).toBe(JSON.stringify(data));
      expect(result).toContain('Product A');
      expect(result).toContain('sales');
    });
  });

  describe('PieChart data (DataItem)', () => {
    it('should handle typical PieChart data structure', () => {
      const data: DataItem = {
        segments: [
          { color: '#FF6B6B', name: 'Desktop', value: 45 },
          { color: '#4ECDC4', name: 'Mobile', value: 35 },
          { color: '#45B7D1', name: 'Tablet', value: 20 },
        ],
      };
      const result = getDataFingerprint(data);
      expect(result).toBe(JSON.stringify(data));
      expect(result).toContain('Desktop');
      expect(result).toContain('#FF6B6B');
    });
  });
});
