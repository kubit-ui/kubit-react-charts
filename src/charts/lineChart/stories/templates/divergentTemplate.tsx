import { NodeType } from '@/components/node/node.types';
import { Positions } from '@/types/position.enum';

import { LineChart } from '../../lineChart';

export const divergentTemplate = ({
  cb,
}: {
  cb: (active: { x: number; y: number } | undefined) => void;
}): JSX.Element[] => {
  return [
    <LineChart.Path
      key="1"
      closestClick={true}
      dataKey="cats"
      nodeConfig={{
        fill: 'white',
        hasHalo: true,
        onClick: (_e, data) => {
          cb(data?.nodePosition);
        },
        size: 0,
        stroke: 'red',
        strokeWidth: '0.2',
        type: NodeType.Circle,
      }}
      stroke="#0074d9"
      strokeWidth="0.1"
      tabIndex={0}
    />,
    <LineChart.XAxis
      key="3"
      aria-label="XAxis"
      position={Positions.BOTTOM}
      showTickLines={true}
      stroke="black"
      strokeWidth="0.1"
      tickText={{
        fontSize: 1,
        textAnchor: 'middle',
        top: 1,
      }}
    />,
    <LineChart.YAxis
      key="4"
      aria-label="Yaxis"
      position={Positions.LEFT}
      showTickLines={true}
      stroke="black"
      strokeWidth="0.1"
      tickText={{
        fontSize: 1,
        right: 1,
        textAnchor: 'middle',
      }}
    />,
  ];
};
