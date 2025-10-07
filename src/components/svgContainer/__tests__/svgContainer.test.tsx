import '@testing-library/jest-dom';

import { render } from '@/tests/render/render';

import { SvgContainer } from '../svgContainer';

describe('SvgContainer', () => {
  test('renders SvgContainer component', () => {
    const { getByRole } = render(
      <SvgContainer
        ariaLabel="Chart Container"
        className="svg-container"
        height={500}
        role="img"
        width={500}
      >
        <circle cx={50} cy={50} r={50} />
      </SvgContainer>
    );

    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('width', '500');
    expect(getByRole('img')).toHaveAttribute('height', '500');
    expect(getByRole('img')).toHaveClass('svg-container');
    expect(getByRole('img')).toHaveAttribute('aria-label', 'Chart Container');
  });
});
