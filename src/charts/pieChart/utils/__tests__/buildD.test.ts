import { buildL } from '../buildL';

// app/src/charts/pieChart/utils/buildL.test.ts

describe('buildL', () => {
  it('should return undefined when singleStroke is true', () => {
    const result = buildL({
      center: { x: 0, y: 0 },
      innerEnd: { x: 5, y: 5 },
      innerRadius: 10,
      singleStroke: true,
    });
    expect(result).toBeUndefined();
  });

  it('should return "L innerEnd.x,innerEnd.y" when innerRadius > 0', () => {
    const result = buildL({
      center: { x: 0, y: 0 },
      innerEnd: { x: 5, y: 5 },
      innerRadius: 10,
      singleStroke: false,
    });
    expect(result).toBe('L 5,5');
  });

  it('should return "L center.x,center.y" when innerRadius is 0', () => {
    const result = buildL({
      center: { x: 0, y: 0 },
      innerEnd: { x: 5, y: 5 },
      innerRadius: 0,
      singleStroke: false,
    });
    expect(result).toBe('L 0,0');
  });

  it('should return "L center.x,center.y" when innerRadius is negative', () => {
    const result = buildL({
      center: { x: 0, y: 0 },
      innerEnd: { x: 5, y: 5 },
      innerRadius: -5,
      singleStroke: false,
    });
    expect(result).toBe('L 0,0');
  });
});
