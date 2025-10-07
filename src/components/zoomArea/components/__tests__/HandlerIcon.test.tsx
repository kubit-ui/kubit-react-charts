import { render } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { HandlerIcon } from '../HandlerIcon';

describe('HandlerIcon', () => {
  it('should render handler icon with correct positioning and attributes', () => {
    render(
      <svg>
        <HandlerIcon fill="#333333" x={50} y={40} />
      </svg>
    );

    // Should render the icon group
    const iconGroup = document.querySelector('g[transform="translate(45, 35)"]');
    expect(iconGroup).toBeInTheDocument();
    expect(iconGroup).toHaveAttribute('fill', '#333333');
  });

  it('should apply custom fill color', () => {
    render(
      <svg>
        <HandlerIcon fill="#666666" x={25} y={30} />
      </svg>
    );

    const iconGroup = document.querySelector('g[fill="#666666"]');
    expect(iconGroup).toBeInTheDocument();
  });

  it('should use default fill when not provided', () => {
    render(
      <svg>
        <HandlerIcon x={75} y={50} />
      </svg>
    );

    const iconGroup = document.querySelector('g');
    expect(iconGroup).toBeInTheDocument();
    expect(iconGroup).toHaveAttribute('fill', '#8f8f8f'); // Default fill
  });
});
