import type { FC } from 'react';

/**
 * Default color for lines when no stroke is provided
 */
const DEFAULT_LINE_COLOR = '#0078D4';

/**
 * Line data for rendering
 */
interface LineData {
  linePath: string;
  fillPath: string;
  config: {
    yKey: string;
    dataKey?: string;
    stroke?: string;
    strokeWidth?: string | number;
    fill?: string;
    fillOpacity?: number;
  };
}

/**
 * Props for the LineRenderer component
 */
interface LineRendererProps {
  /** Array of line data to render */
  linesData: LineData[];
}

/**
 * Renders all lines and fill areas for the zoom area chart
 */
export const LineRenderer: FC<LineRendererProps> = ({ linesData }) => {
  return (
    <>
      {linesData.map((lineData, index) => (
        <g key={lineData.config.dataKey || lineData.config.yKey || index}>
          {/* Fill area under the line */}
          {lineData.config.fill && lineData.fillPath && (
            <path
              d={lineData.fillPath}
              fill={lineData.config.fill}
              fillOpacity={lineData.config.fillOpacity || 0.2}
              stroke="none"
            />
          )}
          {/* Line path */}
          <path
            d={lineData.linePath}
            fill="none"
            stroke={lineData.config.stroke || DEFAULT_LINE_COLOR}
            strokeWidth={lineData.config.strokeWidth || 1}
          />
        </g>
      ))}
    </>
  );
};
