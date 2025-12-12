import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { getSelectionConfig } from '../../utils/selectionConfig';
import { SelectionArea } from '../SelectionArea';

const mockProps = {
  currentRange: { end: 3, start: 1 },
  dataLength: 5,
  dataTestId: 'test-selection-area',
  endX: 80,
  height: 100,
  onBlur: vi.fn(),
  onFocus: vi.fn(),
  onKeyDown: vi.fn(),
  onMouseDown: vi.fn(),
  onTouchStart: vi.fn(),
  selectionConfig: getSelectionConfig({}), // Use default resolved configuration
  startX: 20,
};

describe('SelectionArea', () => {
  it('should render with basic props and handle visibility logic', () => {
    render(<SelectionArea {...mockProps} />);

    const selectionArea = screen.getByTestId('test-selection-area');
    expect(selectionArea).toBeInTheDocument();
    expect(selectionArea).toHaveAttribute('tabIndex', '0');
    expect(selectionArea).toHaveAttribute('role', 'slider');
  });

  it('should apply custom selection configuration', () => {
    const customConfig = getSelectionConfig({
      fill: '#custom-fill',
      fillOpacity: 0.8,
      stroke: '#custom-stroke',
      strokeWidth: 3,
    });

    render(<SelectionArea {...mockProps} selectionConfig={customConfig} />);

    const selectionRect = screen.getByTestId('test-selection-area');
    expect(selectionRect).toHaveAttribute('fill', '#custom-fill');
    expect(selectionRect).toHaveAttribute('fill-opacity', '0.8');
    expect(selectionRect).toHaveAttribute('stroke', '#custom-stroke');
    expect(selectionRect).toHaveAttribute('stroke-width', '3');
  });

  it('should handle accessibility attributes and screen reader text', () => {
    const screenReaderText = 'Selection area covering data from 2021 to 2023';

    render(<SelectionArea {...mockProps} screenReaderText={screenReaderText} />);

    const selectionArea = screen.getByTestId('test-selection-area');
    expect(selectionArea).toHaveAttribute('aria-label', screenReaderText);
    expect(selectionArea).toHaveAttribute('aria-valuemin', '0');
    expect(selectionArea).toHaveAttribute('aria-valuemax', '4');
    expect(selectionArea).toHaveAttribute('aria-valuetext', screenReaderText);
  });

  it('should handle event handlers and positioning', () => {
    const handlers = {
      onBlur: vi.fn(),
      onFocus: vi.fn(),
      onKeyDown: vi.fn(),
      onMouseDown: vi.fn(),
      onTouchStart: vi.fn(),
    };

    render(<SelectionArea {...mockProps} {...handlers} />);

    const selectionArea = screen.getByTestId('test-selection-area');
    expect(selectionArea).toBeInTheDocument();

    // Should have proper positioning based on startX and endX
    expect(selectionArea).toHaveAttribute('x', '20');
    expect(selectionArea).toHaveAttribute('width', '60'); // endX - startX = 80 - 20 = 60
    expect(selectionArea).toHaveAttribute('height', '100');
  });

  it('should handle hide overlay on full range configuration', () => {
    // Test with full range - should be hidden
    const { rerender } = render(
      <SelectionArea
        {...mockProps}
        currentRange={{ end: 4, start: 0 }}
        dataLength={5}
        selectionConfig={getSelectionConfig({ hideOverlayOnFullRange: true })}
      />
    );

    const selectionArea = screen.getByTestId('test-selection-area');
    expect(selectionArea).toHaveStyle({ visibility: 'hidden' });

    // Test with partial range - should be visible
    rerender(
      <SelectionArea
        {...mockProps}
        currentRange={{ end: 3, start: 1 }}
        dataLength={5}
        selectionConfig={getSelectionConfig({ hideOverlayOnFullRange: true })}
      />
    );

    expect(selectionArea).toHaveStyle({ visibility: 'visible' });

    // Test with hideOverlayOnFullRange disabled - should always be visible
    rerender(
      <SelectionArea
        {...mockProps}
        currentRange={{ end: 4, start: 0 }}
        dataLength={5}
        selectionConfig={getSelectionConfig({ hideOverlayOnFullRange: false })}
      />
    );

    expect(selectionArea).toHaveStyle({ visibility: 'visible' });
  });
});
