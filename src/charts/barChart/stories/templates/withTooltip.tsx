import { useState } from 'react';

import { BarOrientation } from '@/components/bar/bar.type';

import { BarChart } from '../../barChart';
import type { BarHoverData } from '../../barChart.type';
import { COMPARATIVE_DATA } from './data';

/**
 * Example demonstrating how to implement tooltips with BarChart
 * 
 * This component shows how to:
 * - Track hover state for individual bars
 * - Display contextual information in a tooltip
 * - Position the tooltip relative to the cursor
 * - Handle mouse enter/leave events
 */
export const BarChartWithTooltip = (): React.ReactElement => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: BarHoverData | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    data: null,
  });

  const handleBarMouseEnter = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    data: BarHoverData
  ) => {
    setTooltip({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      data,
    });
  };

  const handleBarMouseLeave = () => {
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      data: null,
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <BarChart
        data={COMPARATIVE_DATA}
        gapBetweenBars={1}
        height="100%"
        orientation={BarOrientation.VERTICAL}
        pKey="year"
        width="100%"
      >
        <BarChart.Path
          barConfig={{
            barWidth: 6,
            singleConfig: [
              {
                color: '#FF6B6B',
                coverage: 1,
                'aria-label': 'Birds data',
              },
            ],
          }}
          dataIdx={0}
          dataKey="birds"
          onMouseEnter={handleBarMouseEnter}
          onMouseLeave={handleBarMouseLeave}
        />
        <BarChart.Path
          barConfig={{
            barWidth: 6,
            singleConfig: [
              {
                color: '#4ECDC4',
                coverage: 1,
                'aria-label': 'Dogs data',
              },
            ],
          }}
          dataIdx={1}
          dataKey="dogs"
          onMouseEnter={handleBarMouseEnter}
          onMouseLeave={handleBarMouseLeave}
        />
        <BarChart.Path
          barConfig={{
            barWidth: 6,
            singleConfig: [
              {
                color: '#95E1D3',
                coverage: 1,
                'aria-label': 'Rabbits data',
              },
            ],
          }}
          dataIdx={2}
          dataKey="rabbits"
          onMouseEnter={handleBarMouseEnter}
          onMouseLeave={handleBarMouseLeave}
        />
        <BarChart.XAxis />
        <BarChart.YAxis
          tickValues={{
            numeric: {
              max: 80,
              step: 20,
            },
          }}
        />
      </BarChart>

      {/* Custom Tooltip Component */}
      {tooltip.visible && tooltip.data && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            pointerEvents: 'none',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: '150px',
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>
            {tooltip.data.dataKey.charAt(0).toUpperCase() + tooltip.data.dataKey.slice(1)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <span style={{ opacity: 0.8 }}>Year:</span>
            <span style={{ fontWeight: 'bold' }}>{tooltip.data.xData}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <span style={{ opacity: 0.8 }}>Count:</span>
            <span style={{ fontWeight: 'bold' }}>{tooltip.data.value}</span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Simplified example for horizontal bar charts with tooltips
 */
export const BarChartHorizontalWithTooltip = (): React.ReactElement => {
  const [hoveredBar, setHoveredBar] = useState<BarHoverData | null>(null);

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <BarChart
        data={COMPARATIVE_DATA}
        gapBetweenBars={1}
        height="100%"
        orientation={BarOrientation.HORIZONTAL}
        pKey="year"
        width="100%"
      >
        <BarChart.Path
          barConfig={{
            barWidth: 6,
            singleConfig: [
              {
                color: '#FF6B6B',
                coverage: 1,
              },
            ],
          }}
          dataIdx={0}
          dataKey="birds"
          onMouseEnter={(_, data) => setHoveredBar(data)}
          onMouseLeave={() => setHoveredBar(null)}
        />
        <BarChart.Path
          barConfig={{
            barWidth: 6,
            singleConfig: [
              {
                color: '#4ECDC4',
                coverage: 1,
              },
            ],
          }}
          dataIdx={1}
          dataKey="dogs"
          onMouseEnter={(_, data) => setHoveredBar(data)}
          onMouseLeave={() => setHoveredBar(null)}
        />
        <BarChart.Path
          barConfig={{
            barWidth: 6,
            singleConfig: [
              {
                color: '#95E1D3',
                coverage: 1,
              },
            ],
          }}
          dataIdx={2}
          dataKey="rabbits"
          onMouseEnter={(_, data) => setHoveredBar(data)}
          onMouseLeave={() => setHoveredBar(null)}
        />
        <BarChart.XAxis
          tickValues={{
            numeric: {
              max: 80,
              step: 20,
            },
          }}
        />
        <BarChart.YAxis />
      </BarChart>

      {/* Info Panel showing hovered bar data */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: 'white',
          border: '2px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
          minWidth: '200px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#333' }}>
          Bar Information
        </h3>
        {hoveredBar ? (
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '8px' }}>
              <strong>Category:</strong> {hoveredBar.dataKey}
            </div>
            <div style={{ marginBottom: '8px' }}>
              <strong>Year:</strong> {hoveredBar.yData}
            </div>
            <div style={{ marginBottom: '8px' }}>
              <strong>Value:</strong> {hoveredBar.value}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '12px' }}>
              <em>Hover over bars to see details</em>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
            Hover over a bar to see details
          </div>
        )}
      </div>
    </div>
  );
};
