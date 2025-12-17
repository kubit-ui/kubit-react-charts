import { NodeType } from '@/components/node/node.types';
import { Positions } from '@/types/position.enum';
import { logger } from '@/utils/logger/logger';

import { LineChart } from '../../lineChart';

const handleOnClick = (
  _e: React.MouseEvent<SVGPathElement, MouseEvent>,
  data:
    | {
        index?: number | undefined;
        dataValue?: any;
        dataKey?: string | undefined;
        xKey?: string | undefined;
      }
    | undefined
) => {
  if (data?.index !== undefined && data?.dataKey && data?.xKey) {
    logger.debug(
      `Data point clicked: ${data.dataKey}: ${data.dataValue[data.index][data.dataKey]} - ${data.xKey}: ${data.dataValue[data.index][data.xKey]}`
    );
    return;
  }
  logger.warn('No data found for clicked point');
};

const nodeBasisProps = {
  autoClick: true,
  fill: 'white',
  hasHalo: true,
  size: 1.3,
  stroke: 'red',
  strokeWidth: '0.2',
  type: NodeType.Circle,
};

export const WITH_INDICATORS = [
  <LineChart.Separator
    key="1"
    areaSeparator={{ fill: 'rgba(0,0,0,0.1)' }}
    topSeparator={{ stroke: 'black', strokeWidth: '0.3' }}
    yBreakAxis="0"
  />,
  <LineChart.Path
    key="2"
    aria-label="Line chart for lions data series"
    curved={true}
    dataKey="lions"
    indicatorConfig={{ ...nodeBasisProps, className: 'node-path-focus-border', stroke: 'pink' }}
    nodeConfig={{
      ...nodeBasisProps,
      onClick: handleOnClick,
      stroke: 'pink',
    }}
    stroke="pink"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="3"
    aria-label="Line chart for cats data series"
    curved={false}
    dataKey="cats"
    indicatorConfig={{ ...nodeBasisProps, className: 'node-path-focus-border', stroke: 'green' }}
    nodeConfig={{
      ...nodeBasisProps,
      onClick: handleOnClick,
      stroke: 'green',
    }}
    stroke="green"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="4"
    aria-label="Line chart for dogs data series"
    dataKey="dogs"
    indicatorConfig={{ ...nodeBasisProps, className: 'node-path-focus-border', stroke: '#0074d9' }}
    nodeConfig={{
      ...nodeBasisProps,
      onClick: handleOnClick,
      stroke: '#0074d9',
    }}
    stroke="#0074d9"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.Path
    key="5"
    aria-label="Line chart for rabbits data series"
    curved={true}
    dataKey="rabbits"
    indicatorConfig={{ ...nodeBasisProps, className: 'node-path-focus-border', stroke: 'red' }}
    nodeConfig={{
      ...nodeBasisProps,
      onClick: handleOnClick,
      stroke: 'red',
    }}
    stroke="red"
    strokeWidth="0.1"
    tabIndex={0}
  />,
  <LineChart.XAxis
    key="6"
    aria-label="X Axis"
    position={Positions.BOTTOM}
    role="img"
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickLine={{
      stroke: '#bbb',
      strokeDasharray: '0.3',
      strokeWidth: '0.1',
    }}
    tickLineHover={{
      stroke: '#000',
      strokeDasharray: '0',
    }}
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
    }}
    tickValues={{
      custom: { values: ['step 1', 'step 2', 'step 3', 'step 4', 'step 5', 'step 6'] },
    }}
  />,
  <LineChart.YAxis
    key="7"
    aria-label="YAxis"
    position={Positions.RIGHT}
    role="img"
    showTickLines={true}
    stroke="black"
    strokeWidth="0.1"
    tickLine={{
      stroke: '#bbb',
      strokeDasharray: '0.3',
      strokeWidth: '0.1',
    }}
    tickLineHover={{
      stroke: '#000',
      strokeDasharray: '0',
    }}
    tickText={{
      fontSize: 1,
      textAnchor: 'middle',
    }}
    tickValues={{ numeric: { max: 120000000000, min: -120000000000, step: 30000000000 } }}
  />,
];
