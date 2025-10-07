import { BarOrientation, type BarProps } from '../bar.type';

type GetSegmentProps = Omit<BarProps, 'barWidth' | 'currentBars' | 'position'>;
type GetSegmentReturn = [number, number][];

const transformCoverage = (coveragePercent: number, maxValue: number) => {
  return (coveragePercent / 100) * maxValue;
};
const ajustedGap = (positive: boolean, value: number, gap: number) => {
  return positive ? value + gap / 2 : value - gap / 2;
};

export const getSegments = ({
  barConfig,
  orientation,
  x1,
  x2,
  y1,
  y2,
}: GetSegmentProps): GetSegmentReturn => {
  const { gap = 0, singleConfig } = barConfig;
  const isHorizontal = orientation === BarOrientation.HORIZONTAL;
  // the start of the bar based on the orientation
  const barStart = isHorizontal ? x1 : y1;
  // the end of the bar based on the orientation
  const barEnd = isHorizontal ? x2 : y2;
  // ajusted type based on the values of the start and end
  const ajustedType = {
    end: barEnd < barStart,
    start: barEnd > barStart,
  };

  return singleConfig.reduce((acc, single, idx) => {
    const { coverage: coveragePercent } = single;
    // calculate the coverage based on the percentage and the bar size
    const coverage = transformCoverage(coveragePercent, barEnd - barStart);
    // if the index is 0, the start is the barStart, otherwise it's the end of the previous segment
    const start = idx === 0 ? barStart : ajustedGap(ajustedType.start, acc[idx - 1][1], gap);
    // if the index is the last, the end is the barEnd, otherwise it's the start + coverage
    const end =
      idx + 1 === singleConfig.length ? barEnd : ajustedGap(ajustedType.end, start + coverage, gap);
    acc.push([start, end]);
    return acc;
  }, [] as GetSegmentReturn);
};
