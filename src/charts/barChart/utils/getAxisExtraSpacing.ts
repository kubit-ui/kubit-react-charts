import { Children, type ReactElement, type ReactNode, isValidElement } from "react";

import { BarOrientation } from "@/components/bar/bar.type";
import { Positions } from "@/types/position.enum";
import { buildTickValues } from "@/utils/buildTickValues/buildTickValues";
import { textBound } from "@/utils/textBound/textBound";

import type {
  BarChartChildrenType,
  BarChartExtraSpacings,
  BarChartIDataPoint,
} from "../barChart.type";
import { BarChartPath } from "../fragments/barChartPath";
import { BarChartXAxis } from "../fragments/barChartXAxis";
import { BarChartYAxis } from "../fragments/barChartYAxis";
import { getBarDataValues } from "./getBarDataValue";
import { getBarKeyRoundMaxValue } from "./getRoundedBarMaxValue";

const handleBarChartXAxis = (
  child: ReactElement,
  data: BarChartIDataPoint[],
  pKey: string,
  ajustedX: number,
  barsSpacing: number,
  viewBox: string,
  canvasHeight: number,
  canvasWidth: number,
) => {
  const { position, tickText, tickValues, valueFormatter } = child.props as any;
  const fontSize = tickText?.fontSize ?? 0;
  const spaceFontSize = fontSize * ajustedX;

  const xData = tickValues
    ? (getBarDataValues(tickValues) as string[])
    : (data.map((d) => d[pKey]) as string[]);
  const formattedXData: string[] = valueFormatter ? xData.map(valueFormatter) : xData;
  const fontSpacing = textBound({
    bound: "width",
    data: formattedXData,
    fontSize,
    svgHeight: `${canvasHeight}`,
    svgWidth: `${canvasWidth}`,
    viewBox,
  });
  const securityXSpace = (() => (barsSpacing > fontSpacing ? barsSpacing : fontSpacing))();

  const extraSpaceBottomY =
    position === Positions.BOTTOM ? spaceFontSize + (tickText?.top ?? 0) : 0;
  const extraSpaceTopY = position === Positions.TOP ? spaceFontSize + (tickText?.bottom ?? 0) : 0;
  const barChartXPosition = (() => position || Positions.BOTTOM)();
  const xBreakAxis = tickValues?.numeric
    ? (tickValues.numeric.breakAxis ?? 0)
    : (tickText?.custom?.breakAxis ?? 0);

  return {
    barChartXPosition,
    extraSpaceBottomY,
    extraSpaceTopY,
    securityXSpace,
    xBreakAxis,
    xData,
  };
};

const handleBarChartYAxis = (
  child: ReactElement,
  data: BarChartIDataPoint[],
  pKey: string,
  ajustedY: number,
  barSpacing: number,
  viewBox: string,
  canvasHeight: number,
  canvasWidth: number,
) => {
  const { position, tickText, tickValues, valueFormatter } = child.props as any;
  const fontSize = tickText?.fontSize ?? 0;
  const spaceFontSize = fontSize * ajustedY; //! review

  const dataValues =
    tickValues ||
    buildTickValues([...new Set(getBarKeyRoundMaxValue(data, pKey) as unknown as string[])]);
  const yData = getBarDataValues(dataValues) as string[];
  const formattedYData: string[] = valueFormatter ? yData.map(valueFormatter) : yData;

  const securityYSpace = (() => (barSpacing > spaceFontSize ? barSpacing : spaceFontSize))();
  const textWidth = textBound({
    bound: "width",
    data: formattedYData,
    fontSize,
    svgHeight: `${canvasHeight}`,
    svgWidth: `${canvasWidth}`,
    viewBox,
  });

  const extraSpaceLeftX = position === Positions.LEFT ? textWidth + (tickText?.right ?? 0) : 0;
  const extraSpaceRightX = position === Positions.RIGHT ? textWidth + (tickText?.left ?? 0) : 0;
  const barChartYPosition = (() => position || Positions.LEFT)();
  const yBreakAxis = tickValues?.numeric
    ? (tickValues.numeric.breakAxis ?? 0)
    : (tickText?.custom?.breakAxis ?? 0);

  return {
    barChartYPosition,
    extraSpaceLeftX,
    extraSpaceRightX,
    securityYSpace,
    yAxisText: textWidth,
    yBreakAxis,
    yData,
  };
};

interface GetExtraSpacing {
  children: BarChartChildrenType;
  data: BarChartIDataPoint[];
  pKey: string;
  ajustedX: number;
  ajustedY: number;
  gapBetweenBars: number;
  orientation: (typeof BarOrientation)[keyof typeof BarOrientation];
  viewBox: string;
  canvasHeight: number;
  canvasWidth: number;
}

export const getAxisExtraSpacing = ({
  ajustedX,
  ajustedY,
  canvasHeight,
  canvasWidth,
  children,
  data,
  gapBetweenBars,
  orientation,
  pKey,
  viewBox,
}: GetExtraSpacing): BarChartExtraSpacings => {
  let result: BarChartExtraSpacings = {
    barChartXPosition: Positions.BOTTOM,
    barChartYPosition: Positions.LEFT,
    extraSpaceBottomY: 0,
    extraSpaceLeftX: 0,
    extraSpaceRightX: 0,
    extraSpaceTopY: 0,
    securityXSpace: 0,
    securityYSpace: 0,
    xAxisText: 0,
    xBreakAxis: 0,
    xData: [] as string[],
    yAxisText: 0,
    yBreakAxis: 0,
    yData: [] as string[],
  };
  let barsSpacing = gapBetweenBars;
  const reviews = [] as number[];

  Children.forEach(children, (child: ReactNode) => {
    if (isValidElement(child)) {
      if (child.type === BarChartPath && !reviews.includes((child.props as any).order)) {
        reviews.push((child.props as any).order);
        barsSpacing += (child.props as any).barConfig.barWidth ?? 0;
      }
      if (child.type === BarChartXAxis) {
        const securitySpace = orientation === BarOrientation.VERTICAL ? barsSpacing : 0;
        result = {
          ...result,
          ...handleBarChartXAxis(
            child,
            data,
            pKey,
            ajustedX,
            securitySpace,
            viewBox,
            canvasHeight,
            canvasWidth,
          ),
        };
      } else if (child.type === BarChartYAxis) {
        const securitySpace = orientation === BarOrientation.HORIZONTAL ? barsSpacing : 0;
        result = {
          ...result,
          ...handleBarChartYAxis(
            child,
            data,
            pKey,
            ajustedY,
            securitySpace,
            viewBox,
            canvasHeight,
            canvasWidth,
          ),
        };
      }
    }
  });

  return result;
};
