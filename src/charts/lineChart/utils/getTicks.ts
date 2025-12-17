import type { TickData } from '@/components/tick/tick.types';

interface GetXTickProps {
  tickValues: string[];
  maxSpaceAvailable: number;
  xAxisLeftSpacing: number;
  xAxisRightSpacing: number;
  yAxisLeftSpacing: number;
  yAxisRightSpacing: number;
}

export const getXTicks = ({
  tickValues,
  maxSpaceAvailable,
  xAxisLeftSpacing,
  xAxisRightSpacing,
  yAxisLeftSpacing,
  yAxisRightSpacing,
}: GetXTickProps): TickData[] => {
  const initPos = Math.max(yAxisLeftSpacing, xAxisLeftSpacing);
  const endPos = maxSpaceAvailable - Math.max(xAxisRightSpacing, yAxisRightSpacing);
  if (tickValues.length <= 1) {
    return [
      {
        position: initPos,
        value: tickValues[0],
      },
    ];
  }
  const step = (endPos - initPos) / (tickValues.length - 1);
  const ticks = tickValues.map((value, idx) => {
    const position = initPos + step * idx;
    return { position, value };
  });

  return ticks;
};

interface GetYTickProps {
  tickValues: string[];
  maxSpaceAvailable: number;
  xAxisTopSpacing: number;
  xAxisBottomSpacing: number;
  yAxisTopSpacing: number;
  yAxisBottomSpacing: number;
}

export const getYTicks = ({
  maxSpaceAvailable,
  tickValues,
  xAxisTopSpacing,
  xAxisBottomSpacing,
  yAxisTopSpacing,
  yAxisBottomSpacing,
}: GetYTickProps): TickData[] => {
  const initPos = maxSpaceAvailable - Math.max(xAxisBottomSpacing, yAxisBottomSpacing);
  const endPos = Math.max(yAxisTopSpacing, xAxisTopSpacing);
  if (tickValues.length <= 1) {
    return [
      {
        position: initPos,
        value: tickValues[0],
      },
    ];
  }
  const step = (initPos - endPos) / (tickValues.length - 1);
  const ticks = tickValues.map((value, idx) => {
    const position = initPos - step * idx;
    return { position, value };
  });

  return ticks;
};
