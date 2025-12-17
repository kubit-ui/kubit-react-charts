import { type FC, useState } from 'react';

import { ZoomArea } from '@/components/zoomArea/zoomArea';
import type { IZoomAreaDataPoint } from '@/components/zoomArea/zoomArea.type';
import { Positions } from '@/types/position.enum';

import { LineChart } from '../../lineChart';

export const ZOOM_INTEGRATION_DATA = [
  { birds: 35, cats: 25, dogs: 15, year: 2015 },
  { birds: 38, cats: 28, dogs: 70, year: 2016 },
  { birds: 42, cats: 32, dogs: 27, year: 2017 },
  { birds: 45, cats: 30, dogs: 20, year: 2018 },
  { birds: 50, cats: 35, dogs: 25, year: 2019 },
  { birds: 55, cats: 30, dogs: 67, year: 2020 },
  { birds: 60, cats: 40, dogs: 28, year: 2021 },
  { birds: 65, cats: 45, dogs: 15, year: 2022 },
  { birds: 68, cats: 42, dogs: 66, year: 2023 },
  { birds: 72, cats: 48, dogs: 38, year: 2024 },
  { birds: 75, cats: 52, dogs: 42, year: 2025 },
  { birds: 78, cats: 55, dogs: 45, year: 2026 },
];

export const LINE_CONFIGS = [
  {
    curved: true,
    dataKey: 'dogs',
    ['aria-label']: 'Line chart for dogs data series',
    // fill: '#0074d9',
    fillOpacity: 0.1,
    stroke: '#0074d9',
    strokeWidth: 2,
    yKey: 'dogs',
  },
  {
    dataKey: 'cats',
    ['aria-label']: 'Line chart for cats data series',
    // fill: '#ff4136',
    fillOpacity: 0.1,
    stroke: '#ff4136',
    strokeWidth: 2,
    yKey: 'cats',
  },
  {
    dataKey: 'birds',
    ['aria-label']: 'Line chart for birds data series',
    // fill: '#2ecc40',
    fillOpacity: 0.1,
    stroke: '#2ecc40',
    strokeWidth: 2,
    yKey: 'birds',
  },
];

export const LineChartWithZoomAreaTemplate: FC = () => {
  // State for filtered data - initially all data
  const [filteredData, setFilteredData] = useState<IZoomAreaDataPoint[]>(ZOOM_INTEGRATION_DATA);

  // Handler for changes in filtered data
  const handleDataChange = (newFilteredData: IZoomAreaDataPoint[]) => {
    setFilteredData(newFilteredData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* LineChart that receives filtered data */}
      <LineChart
        caption="Line Chart with Zoom Integration"
        data={filteredData}
        dataTestId="main-line-chart"
        width="50%"
        xKey="year"
      >
        {LINE_CONFIGS.map(config => (
          <LineChart.Path
            key={config.dataKey}
            aria-label={config['aria-label']}
            curved={config.curved}
            dataKey={config.dataKey}
            // nodeConfig={{
            //   type: NodeType.Circle,
            //   fill: config.stroke,
            //   stroke: 'white',
            //   strokeWidth: '0.2',
            //   size: 1.2,
            //   hasHalo: true,
            // }}
            stroke={config.stroke}
            strokeWidth="0.15"
            tabIndex={0}
          />
        ))}
        <LineChart.XAxis
          aria-label="Year"
          position={Positions.BOTTOM}
          role="img"
          showTickLines={true}
          stroke="#666"
          strokeWidth="0.1"
          tickText={{
            fontSize: 1,
            textAnchor: 'middle',
            top: 1,
          }}
        />

        <LineChart.YAxis
          aria-label="Quantity"
          position={Positions.LEFT}
          role="img"
          showTickLines={true}
          stroke="#666"
          strokeWidth="0.1"
          tickText={{
            fontSize: 1,
            left: 1,
            textAnchor: 'middle',
          }}
        />
      </LineChart>

      {/* ZoomArea for range selection */}
      <ZoomArea
        ariaLabel="Zoom area for data selection"
        caption="Drag handlers to select date range"
        data={ZOOM_INTEGRATION_DATA}
        height="70px"
        initialRange={{ end: ZOOM_INTEGRATION_DATA.length - 3, start: 2 }}
        lines={LINE_CONFIGS.map(config => ({
          curved: config.curved,
          dataKey: config.dataKey,
          fillOpacity: config.fillOpacity,
          stroke: config.stroke,
          strokeWidth: 1.5,
          yKey: config.yKey,
        }))}
        screenReaderTextConfig={{
          endHandler: 'Custom screenreader Date to {{endValue}}',
          selectionArea: 'Custom screenreader Date from {{startValue}} to {{endValue}}',
          startHandler: 'Custom screenreader Date from {{startValue}}',
        }}
        width="50%"
        xKey="year"
        onDataChange={handleDataChange}
      />
    </div>
  );
};

export const WITH_ZOOM_AREA_TEMPLATE = <LineChartWithZoomAreaTemplate />;
