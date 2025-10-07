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

    mockBarConfig.singleConfig.forEach(segment => {
      expect(Path).toHaveBeenCalledWith(
        expect.objectContaining({
          d: expect.any(String),
          fill: segment.color,
          title: segment.title,
        }),
        expect.anything()
      );
    });
  });

  it('should calculate correctly the segments for horizontal orientation', () => {
    render(<Bar {...defaultProps} />);

    const paths = screen.getAllByTestId('path');
    expect(paths).toHaveLength(mockBarConfig.singleConfig.length);

    // Verifica que los segmentos se calculen correctamente
    expect(Path).toHaveBeenCalledWith(
      expect.objectContaining({
        d: expect.any(String),
      }),
      expect.anything()
    );
  });

  it('should calculate correctly the segments for vertical orientation', () => {
    render(<Bar {...defaultProps} orientation={BarOrientation.VERTICAL} />);

    const paths = screen.getAllByTestId('path');
    expect(paths).toHaveLength(mockBarConfig.singleConfig.length);

    // Verifica que los segmentos se calculen correctamente
    expect(Path).toHaveBeenCalledWith(
      expect.objectContaining({
        d: expect.any(String),
      }),
      expect.anything()
    );
  });

  it('should handler correctly the round borders', () => {
    render(<Bar {...defaultProps} endRounded={2} startRounded={2} />);

    const paths = screen.getAllByTestId('path');
    expect(paths).toHaveLength(mockBarConfig.singleConfig.length);

    // Verify that the first segment has`startRounded`
    expect(Path).toHaveBeenCalledWith(
      expect.objectContaining({
        d: expect.any(String),
      }),
      expect.anything()
    );

    // Verify that the last segment has `endRounded`
    expect(Path).toHaveBeenCalledWith(
      expect.objectContaining({
        d: expect.any(String),
      }),
      expect.anything()
    );
  });

  it('should handler correctly a empty barConfig', () => {
    const emptyBarConfig = { barWidth: 10, singleConfig: [] };
    render(<Bar {...defaultProps} barConfig={emptyBarConfig} />);

    const paths = screen.queryAllByTestId('path');
    expect(paths).toHaveLength(0);
  });
});
