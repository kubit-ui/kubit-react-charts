import { render, screen } from '@testing-library/react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ZoomArea } from '../zoomArea';

class ResizeObserverMock {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(_callback: any) {
    // Mock constructor
  }

  disconnect = vi.fn();
  observe = vi.fn();
  unobserve = vi.fn();
}

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', ResizeObserverMock);
});

const mockData = [
  { sales: 100, year: 2020 },
  { sales: 150, year: 2021 },
  { sales: 200, year: 2022 },
  { sales: 180, year: 2023 },
];

const mockLines = [
  {
    curved: true,
    fill: '#0078D4',
    fillOpacity: 0.2,
    stroke: '#0078D4',
    yKey: 'sales',
  },
];

describe('ZoomArea', () => {
  it('should render with basic props and data structure', () => {
    const mockOnDataChange = vi.fn();

    render(
      <ZoomArea
        data={mockData}
        height="100px"
        lines={mockLines}
        width="400px"
        xKey="year"
        onDataChange={mockOnDataChange}
      />
    );

    // Should render the main component
    expect(screen.getByTestId('zoom-area')).toBeInTheDocument();

    // Should render all sub-components
    expect(screen.getByTestId('zoom-area-selection-area')).toBeInTheDocument();
    expect(screen.getByTestId('zoom-area-start-handler')).toBeInTheDocument();
    expect(screen.getByTestId('zoom-area-end-handler')).toBeInTheDocument();
  });

  it('should render with custom configuration and dimensions', () => {
    const mockOnDataChange = vi.fn();

    render(
      <ZoomArea
        backgroundColor="#f0f0f0"
        data={mockData}
        handlerConfig={{ fill: '#red', stroke: '#darkred' }}
        height="120px"
        lines={mockLines}
        selectionConfig={{ fill: '#blue', fillOpacity: 0.3 }}
        width="500px"
        xKey="year"
        onDataChange={mockOnDataChange}
      />
    );

    const zoomArea = screen.getByTestId('zoom-area');
    expect(zoomArea).toBeInTheDocument();
    expect(zoomArea).toHaveAttribute('width', '500px');
    expect(zoomArea).toHaveAttribute('height', '120px');
  });

  it('should handle accessibility props and aria attributes', () => {
    const mockOnDataChange = vi.fn();

    render(
      <ZoomArea
        ariaHidden={false}
        ariaLabel="Custom zoom area"
        caption="Zoom control for chart data"
        data={mockData}
        height="100px"
        lines={mockLines}
        role="region"
        width="400px"
        xKey="year"
        onDataChange={mockOnDataChange}
      />
    );

    const zoomArea = screen.getByTestId('zoom-area');
    expect(zoomArea).toHaveAttribute('aria-label', 'Custom zoom area');
    expect(zoomArea).toHaveAttribute('role', 'region');
    expect(zoomArea).toHaveAttribute('aria-hidden', 'false');
  });

  it('should integrate all hooks and render complete functional component', () => {
    const mockOnDataChange = vi.fn();

    render(
      <ZoomArea
        data={mockData}
        height="80px"
        initialRange={{ end: 3, start: 1 }}
        interactionConfig={{ minHandlerDistance: 2 }}
        lines={mockLines}
        width="600px"
        xKey="year"
        onDataChange={mockOnDataChange}
      />
    );

    // All core elements should be present and functional
    expect(screen.getByTestId('zoom-area')).toBeInTheDocument();
    expect(screen.getByTestId('zoom-area-selection-area')).toBeInTheDocument();
    expect(screen.getByTestId('zoom-area-start-handler')).toBeInTheDocument();
    expect(screen.getByTestId('zoom-area-end-handler')).toBeInTheDocument();

    // SVG container should have proper viewBox
    const svgContainer = screen.getByTestId('zoom-area');
    expect(svgContainer).toHaveAttribute('viewBox');
  });
});
