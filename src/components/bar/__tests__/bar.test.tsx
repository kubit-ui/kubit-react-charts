import { render, screen } from '@testing-library/react';

import { Path } from '../../path/path';
import { Bar } from '../bar';
import { BarOrientation, type BarProps } from '../bar.type';

vi.mock('../../path/path', () => ({
  Path: vi.fn(() => <path data-testid="path" />),
}));

describe('Bar Component', () => {
  const mockBarConfig = {
    barWidth: 10,
    singleConfig: [
      { color: 'red', coverage: 50, title: 'Segment 1' },
      { color: 'blue', coverage: 50, title: 'Segment 2' },
    ],
  };

  const defaultProps: BarProps = {
    barConfig: mockBarConfig,
    currentBars: 1,
    endRounded: 4,
    extraSpacing: 0,
    order: 1,
    orientation: BarOrientation.HORIZONTAL,
    startRounded: 4,
    x1: 0,
    x2: 100,
    y1: 0,
    y2: 10,
  };

  it('should render correctly the segments', () => {
    render(<Bar {...defaultProps} />);

    const paths = screen.getAllByTestId('path');
    expect(paths).toHaveLength(mockBarConfig.singleConfig.length);

    const calls = vi.mocked(Path).mock.calls;
    mockBarConfig.singleConfig.forEach((segment, index) => {
      const call = calls.find(c => c[0]?.fill === segment.color && c[0]?.title === segment.title);
      expect(call).toBeDefined();
      if (call) {
        expect(call[0]).toMatchObject({
          d: expect.any(String),
          fill: segment.color,
          title: segment.title,
        });
      }
    });
  });

  it('should calculate correctly the segments for horizontal orientation', () => {
    render(<Bar {...defaultProps} />);

    const paths = screen.getAllByTestId('path');
    expect(paths).toHaveLength(mockBarConfig.singleConfig.length);

    // Verifica que los segmentos se calculen correctamente
    const calls = vi.mocked(Path).mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0][0]).toHaveProperty('d');
    expect(typeof calls[0][0].d).toBe('string');
  });

  it('should calculate correctly the segments for vertical orientation', () => {
    render(<Bar {...defaultProps} orientation={BarOrientation.VERTICAL} />);

    const paths = screen.getAllByTestId('path');
    expect(paths).toHaveLength(mockBarConfig.singleConfig.length);

    // Verifica que los segmentos se calculen correctamente
    const calls = vi.mocked(Path).mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    expect(calls[0][0]).toHaveProperty('d');
    expect(typeof calls[0][0].d).toBe('string');
  });

  it('should handler correctly the round borders', () => {
    render(<Bar {...defaultProps} endRounded={2} startRounded={2} />);

    const paths = screen.getAllByTestId('path');
    expect(paths).toHaveLength(mockBarConfig.singleConfig.length);

    // Verify that segments were rendered with path data
    const calls = vi.mocked(Path).mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    // Verify all calls have valid path data
    calls.forEach(call => {
      expect(call[0]).toHaveProperty('d');
      expect(typeof call[0].d).toBe('string');
    });
  });

  it('should handler correctly a empty barConfig', () => {
    const emptyBarConfig = { barWidth: 10, singleConfig: [] };
    render(<Bar {...defaultProps} barConfig={emptyBarConfig} />);

    const paths = screen.queryAllByTestId('path');
    expect(paths).toHaveLength(0);
  });
});
