import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { getFocusConfig } from '../../../../utils/calculateFocusOutline/calculateFocusOutline';
import { ZoomAreaElements } from '../../zoomArea.type';
import { ZoomHandler } from '../ZoomHandler';

const mockProps = {
  dataTestId: 'test-zoom-handler',
  focusConfig: getFocusConfig({}),
  height: 100,
  isFocused: false,
  max: 4,
  min: 0,
  onBlur: vi.fn(),
  onFocus: vi.fn(),
  onKeyDown: vi.fn(),
  onMouseDown: vi.fn(),
  onTouchStart: vi.fn(),
  type: ZoomAreaElements.START_HANDLER,
  value: 2,
  x: 50,
};

describe('ZoomHandler', () => {
  it('should render with basic props and positioning', () => {
    render(<ZoomHandler {...mockProps} />);

    const handler = screen.getByTestId('test-zoom-handler');
    expect(handler).toBeInTheDocument();
    expect(handler).toHaveAttribute('role', 'slider');
    expect(handler).toHaveAttribute('tabIndex', '0');
  });

  it('should apply custom handler configuration', () => {
    const customConfig = {
      fill: '#custom-fill',
      radius: 20,
      stroke: '#custom-stroke',
      strokeWidth: 3,
    };

    render(<ZoomHandler {...mockProps} handlerConfig={customConfig} />);

    const handlerGroup = screen.getByTestId('test-zoom-handler-group');
    expect(handlerGroup).toBeInTheDocument();

    // The custom config should be applied to the handler circle
    const handlerCircle = screen.getByTestId('test-zoom-handler');
    expect(handlerCircle).toHaveAttribute('fill', '#custom-fill');
    expect(handlerCircle).toHaveAttribute('stroke', '#custom-stroke');
    expect(handlerCircle).toHaveAttribute('stroke-width', '3');
    expect(handlerCircle).toHaveAttribute('r', '20');
  });

  it('should handle accessibility attributes correctly', () => {
    const screenReaderText = 'Start handler at position 2';

    render(<ZoomHandler {...mockProps} screenReaderText={screenReaderText} />);

    const handler = screen.getByTestId('test-zoom-handler');
    expect(handler).toHaveAttribute('aria-label', screenReaderText);
    expect(handler).toHaveAttribute('aria-valuemin', '0');
    expect(handler).toHaveAttribute('aria-valuemax', '4');
    expect(handler).toHaveAttribute('aria-valuetext', screenReaderText);
  });

  it('should handle focus state and different handler types', () => {
    render(<ZoomHandler {...mockProps} isFocused={true} type={ZoomAreaElements.END_HANDLER} />);

    const handlerGroup = screen.getByTestId('test-zoom-handler-group');
    expect(handlerGroup).toBeInTheDocument();

    const handler = screen.getByTestId('test-zoom-handler');
    expect(handler).toBeInTheDocument();

    // Should render appropriate handler type icon
    expect(handlerGroup.querySelector('path')).toBeInTheDocument();
  });
});
