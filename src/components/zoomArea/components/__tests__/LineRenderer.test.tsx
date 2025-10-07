import { render } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { LineRenderer } from '../LineRenderer';

const mockLinesData = [
  {
    config: {
      fill: '#0078D4',
      fillOpacity: 0.2,
      stroke: '#0078D4',
      strokeWidth: 2,
      yKey: 'sales',
    },
    fillPath: 'M0,50 L25,30 L50,40 L75,20 L100,35 L100,100 L0,100 Z',
    linePath: 'M0,50 L25,30 L50,40 L75,20 L100,35',
  },
  {
    config: {
      stroke: '#FF6B6B',
      strokeWidth: 1,
      yKey: 'revenue',
    },
    fillPath: '',
    linePath: 'M0,60 L25,45 L50,55 L75,35 L100,50',
  },
];

describe('LineRenderer', () => {
  it('should render multiple lines with different configurations', () => {
    render(
      <svg>
        <LineRenderer linesData={mockLinesData} />
      </svg>
    );

    // Should render all path elements
    const paths = document.querySelectorAll('path');
    expect(paths).toHaveLength(3); // 2 line paths + 1 fill path
  });

  it('should handle empty lines data gracefully', () => {
    render(
      <svg>
        <LineRenderer linesData={[]} />
      </svg>
    );

    // Should not crash and render empty group
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render lines with fill areas when fillPath is provided', () => {
    const linesWithFill = [
      {
        config: {
          fill: '#0078D4',
          fillOpacity: 0.3,
          stroke: '#0078D4',
          strokeWidth: 2,
          yKey: 'sales',
        },
        fillPath: 'M0,50 L100,30 L100,100 L0,100 Z',
        linePath: 'M0,50 L100,30',
      },
    ];

    render(
      <svg>
        <LineRenderer linesData={linesWithFill} />
      </svg>
    );

    const paths = document.querySelectorAll('path');
    expect(paths).toHaveLength(2); // 1 fill path + 1 line path

    // Fill path should be rendered first (below the line)
    const fillPath = paths[0];
    expect(fillPath).toHaveAttribute('fill', '#0078D4');
    expect(fillPath).toHaveAttribute('fill-opacity', '0.3');
  });

  it('should render lines without fill when fillPath is not provided', () => {
    const linesWithoutFill = [
      {
        config: {
          stroke: '#FF6B6B',
          strokeWidth: 1,
          yKey: 'revenue',
        },
        fillPath: '',
        linePath: 'M0,50 L100,30',
      },
    ];

    render(
      <svg>
        <LineRenderer linesData={linesWithoutFill} />
      </svg>
    );

    const paths = document.querySelectorAll('path');
    expect(paths).toHaveLength(1); // Only line path, no fill

    const linePath = paths[0];
    expect(linePath).toHaveAttribute('stroke', '#FF6B6B');
    expect(linePath).toHaveAttribute('stroke-width', '1');
    expect(linePath).toHaveAttribute('fill', 'none');
  });
});
