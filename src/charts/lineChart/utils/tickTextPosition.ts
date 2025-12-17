import { Positions } from '@/types/position.enum';
import { ajustedTextSpace } from '@/utils/ajustedTextSpace/ajustedTextSpace';
import { getTickTextXCoordinate } from '@/utils/getTickTextCoordinate/getTickTextCoordinates';

import type { LineChartXAxisProps, LineChartYAxisProps } from '../lineChart.type';

type GetYAxisTextXCoordinate = (params: {
  tickText?: LineChartYAxisProps['tickText'];
  yAxisPosition: LineChartYAxisProps['position'];
  textWidth: number;
  yAxisX1: number;
}) => number;

export const getYAxisTextXCoordinate: GetYAxisTextXCoordinate = ({
  tickText,
  yAxisPosition,
  textWidth,
  yAxisX1,
}) => {
  if (tickText?.useAxisAsOrigin) {
    let xTickText = yAxisX1;
    xTickText += tickText.right ?? 0;
    xTickText -= tickText.left ?? 0;

    return xTickText;
  }
  // TODO Review this logic, I don't understand the logic behind it
  // Maybe it only makes sense when anchor is middle
  // IMPORTANT: When changing or deleting this logic, review the getYAxisLeftTextSpacing and getYAxisRightTextSpacing functions
  const textAnchor = tickText?.textAnchor || 'middle';
  let ajustedSpace = 0;
  if (yAxisPosition === Positions.RIGHT) {
    ajustedSpace = tickText?.right ?? 0;
  } else if (yAxisPosition === Positions.LEFT) {
    ajustedSpace = tickText?.left ?? 0;
  }
  const ajustedText = ajustedTextSpace(textAnchor, textWidth, ajustedSpace);
  const xTickText = getTickTextXCoordinate(
    yAxisPosition as (typeof Positions)[keyof typeof Positions],
    yAxisX1,
    ajustedText
  );
  return xTickText;
};

type GetYAxisLeftTextSpacing = (params: {
  tickText?: LineChartYAxisProps['tickText'];
  textWidth: number;
  yAxisPosition: (typeof Positions)[keyof typeof Positions];
}) => number;

export const getYAxisLeftTextSpacing: GetYAxisLeftTextSpacing = ({
  tickText,
  textWidth,
  yAxisPosition,
}) => {
  if (yAxisPosition !== Positions.LEFT) {
    return 0;
  }
  if (tickText?.useAxisAsOrigin) {
    const { textAnchor = 'start' } = tickText;
    let res: number = 0;
    if (textAnchor === 'end') {
      res = textWidth;
    }
    if (textAnchor === 'middle') {
      res = textWidth / 2;
    }
    res += tickText.left ?? 0;
    res -= tickText.right ?? 0;
    return Math.max(0, res);
  }
  // TODO Review this logic, I don't understand the logic behind it
  // This left spacing is applied because the logic in getYAxisTextXCoordinate
  const textAnchor = tickText?.textAnchor;
  const extraSpace = tickText?.left ?? 0;
  if (textAnchor === 'start') {
    return 0;
  }
  if (textAnchor === 'middle') {
    return textWidth + extraSpace;
  }
  if (textAnchor === 'end') {
    return 2 * textWidth + extraSpace;
  }
  return textWidth / 2 + extraSpace;
};

type GetYAxisRightTextSpacing = (params: {
  tickText?: LineChartYAxisProps['tickText'];
  textWidth: number;
  yAxisPosition: (typeof Positions)[keyof typeof Positions];
}) => number;

export const getYAxisRightTextSpacing: GetYAxisRightTextSpacing = ({
  tickText,
  textWidth,
  yAxisPosition,
}) => {
  if (yAxisPosition !== Positions.RIGHT) {
    return 0;
  }
  if (tickText?.useAxisAsOrigin) {
    const { textAnchor = 'start' } = tickText;
    let res: number = textWidth;
    if (textAnchor === 'end') {
      res = 0;
    }
    if (textAnchor === 'middle') {
      res = textWidth / 2;
    }
    res -= tickText.left ?? 0;
    res += tickText.right ?? 0;
    return Math.max(0, res);
  }
  // TODO Review this logic, I don't understand the logic behind it
  // This size is applied because the logic in getYAxisTextXCoordinate
  const textAnchor = tickText?.textAnchor;
  const extraSpace = tickText?.right ?? 0;
  if (textAnchor === 'start') {
    return textWidth;
  }
  if (textAnchor === 'middle') {
    return textWidth + extraSpace;
  }
  if (textAnchor === 'end') {
    return textWidth + extraSpace;
  }
  return 2 * textWidth - textWidth / 2 + extraSpace;
};

type GetXAxisLeftTextSpacing = (params: {
  tickText?: LineChartXAxisProps['tickText'];
  textWidth: number;
}) => number;

export const getXAxisLeftTextSpacing: GetXAxisLeftTextSpacing = ({ tickText, textWidth }) => {
  const textAnchor = tickText?.textAnchor ?? 'start';
  if (textAnchor === 'start') {
    return 0;
  }
  if (textAnchor === 'middle') {
    return textWidth / 2;
  }
  return textWidth;
};

type GetXAxisRightTextSpacing = (params: {
  tickText?: LineChartXAxisProps['tickText'];
  textWidth: number;
}) => number;

export const getXAxisRightTextSpacing: GetXAxisRightTextSpacing = ({ tickText, textWidth }) => {
  const textAnchor = tickText?.textAnchor ?? 'start';
  if (textAnchor === 'end') {
    return 0;
  }
  if (textAnchor === 'middle') {
    return textWidth / 2;
  }
  return textWidth;
};
