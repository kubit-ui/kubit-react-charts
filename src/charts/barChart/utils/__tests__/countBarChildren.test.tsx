import { BarChartPath } from '../../fragments/barChartPath';
import { countBarChildren } from '../countBarChildren';

const singleConfig = {
  barWidth: 3,
  gap: 1,
  singleConfig: [{ color: 'pink', coverage: 100 }],
};

describe('countBarChildren', () => {
  it('should return 0 when no have a valid prop', () => {
    const result = countBarChildren(null);
    expect(result).toBe(0);
  });

  it('should return 0 when no have valid children', () => {
    const children = [
      <div key="test-0">Elemento no válido</div>,
      <span key="test-1">Otro elemento no válido</span>,
    ];
    const result = countBarChildren(children);
    expect(result).toBe(0);
  });

  it('should return the higher order value between the valid children', () => {
    const children = [
      <BarChartPath key="test-0" barConfig={singleConfig} dataIdx={0} dataKey="x" order={1} />,
      <BarChartPath key="test-1" barConfig={singleConfig} dataIdx={1} dataKey="x" order={3} />,
      <BarChartPath key="test-2" barConfig={singleConfig} dataIdx={2} dataKey="x" order={2} />,
    ];
    const result = countBarChildren(children);
    expect(result).toBe(3);
  });

  it('should ignore elements that are not of type BarChartPath', () => {
    const children = [
      <BarChartPath key="test-0" barConfig={singleConfig} dataIdx={0} dataKey="x" order={1} />,
      <div key="test-1">Elemento no válido</div>,
      <BarChartPath key="test-2" barConfig={singleConfig} dataIdx={0} dataKey="x" order={5} />,
      <span key="test-3">Otro elemento no válido</span>,
    ];
    const result = countBarChildren(children);
    expect(result).toBe(5);
  });

  it('should correctly handle nested children', () => {
    const children = [
      <BarChartPath key="test-0" barConfig={singleConfig} dataIdx={0} dataKey="x" order={2} />,
      <>
        <BarChartPath barConfig={singleConfig} dataIdx={0} dataKey="x" order={4} />
        <BarChartPath barConfig={singleConfig} dataIdx={0} dataKey="x" order={3} />
      </>,
    ];
    const result = countBarChildren(children);
    expect(result).toBe(2);
  });
});
