import '@testing-library/jest-dom';

import { fireEvent } from '@testing-library/react';

import { render } from '@/tests/render/render';
import type { ShadowSvgConfig } from '@/utils/shadowSvg/shadowSvg.types';

import { Path } from '../path';

describe('Path', () => {
  test('renders Path component', () => {
    const { getByRole } = render(
      <Path
        d="M 21 21 L 34.856406460551014 12.999999999999995 A 16 16 0 0 1 21.00000000000001 37 Z"
        fill="red"
        tabIndex={0}
        title="Segment 1"
      />
    );

    expect(getByRole('img')).toBeInTheDocument();
  });

  test('handles onClick event', () => {
    const handleClick = vi.fn();

    const { getByRole } = render(
      <Path
        d="M 21 21 L 34.856406460551014 12.999999999999995 A 16 16 0 0 1 21.00000000000001 37 Z"
        fill="red"
        tabIndex={0}
        title="Segment 1"
        onClick={handleClick}
      />
    );

    fireEvent.click(getByRole('img'));
    expect(handleClick).toHaveBeenCalled();
  });

  test('handles onFocus event', () => {
    const handleFocus = vi.fn();

    const { getByRole } = render(
      <Path
        d="M 21 21 L 34.856406460551014 12.999999999999995 A 16 16 0 0 1 21.00000000000001 37 Z"
        fill="red"
        tabIndex={0}
        title="Segment 1"
        onFocus={handleFocus}
      />
    );

    fireEvent.focus(getByRole('img'));
    expect(handleFocus).toHaveBeenCalled();
  });

  test('handles onBlur event', () => {
    const handleBlur = vi.fn();

    const { getByRole } = render(
      <Path
        d="M 21 21 L 34.856406460551014 12.999999999999995 A 16 16 0 0 1 21.00000000000001 37 Z"
        fill="red"
        tabIndex={0}
        title="Segment 1"
        onBlur={handleBlur}
      />
    );

    fireEvent.blur(getByRole('img'));
    expect(handleBlur).toHaveBeenCalled();
  });

  test('render with shadow', () => {
    const shadowSvgConfig: ShadowSvgConfig = {
      dx: 2,
      dy: 2,
      floodColor: 'black',
      floodOpacity: 1,
      stdDeviation: 4,
    };

    const { container } = render(
      <Path
        d="M 21 21 L 34.856406460551014 12.999999999999995 A 16 16 0 0 1 21.00000000000001 37 Z"
        fill="red"
        shadowSvgConfig={shadowSvgConfig}
        tabIndex={0}
        title="Segment 1"
      />
    );

    const filterElement = container.querySelector('filter');
    expect(filterElement).toBeInTheDocument();
    expect(filterElement).toHaveAttribute('x', '-20%');
    expect(filterElement).toHaveAttribute('y', '-20%');
    expect(filterElement).toHaveAttribute('width', '140%');
    expect(filterElement).toHaveAttribute('height', '140%');
    const feDropShadowElement = container.querySelector('feDropShadow');
    expect(feDropShadowElement).toBeInTheDocument();
    expect(feDropShadowElement).toHaveAttribute('dx', '2');
    expect(feDropShadowElement).toHaveAttribute('dy', '2');
    expect(feDropShadowElement).toHaveAttribute('stdDeviation', '4');
  });
});
