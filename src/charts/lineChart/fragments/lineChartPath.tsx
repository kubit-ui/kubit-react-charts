import { type FC, type ReactElement, useContext, useEffect, useRef } from 'react';

import { Line } from '@/components/line/line';
import { Node } from '@/components/node/node';
import { Path } from '@/components/path/path';
import { getPoints } from '@/utils/getPoints/getPoints';
import { pickCustomAttributes } from '@/utils/pickCustomAttributes/pickCustomAttributes';

import { LineChartContext } from '../context/lineChartContext';
import { useIndicator } from '../hook/useIndicator';
import type { IDataPoint, LineChartPathProps } from '../lineChart.type';
import { findClosestNumber, findSurroundingNumber } from '../utils/findSurroundingNumber';
import { getPathData } from '../utils/getPathData';
import { handleNodesFocus } from '../utils/handleNodesFocus';
import './lineChartPath.css';
import { LineChartProjection } from './lineChartProjection';

const getAxisData = (data: IDataPoint[], key: string) => {
  return data.map(dt => dt[key]);
};

export const LineChartPath: FC<LineChartPathProps> = ({
  ariaLabel,
  closestClick,
  curved,
  getNodeFocusInfo,
  getNodesCoords,
  indicatorConfig,
  lineProjection,
  onClick,
  ...props
}): ReactElement => {
  // recovery the context values
  const { xAxisCoordinates, yAxisCoordinates, ...context } = useContext(LineChartContext);
  // the node indicator logic
  const { indicatorRef, pathRef } = useIndicator(context.xCursor, !!indicatorConfig);
  const showIndicator = !!indicatorConfig && context.xCursor !== -Infinity;
  const innerRefs = useRef<{
    path: SVGPathElement | null;
    node: SVGSVGElement[] | null[];
    main: SVGSVGElement;
  }>(null);
  const pressedRef = useRef<number | null>(null);
  // the projection line logic
  const { autoClick, lineIndicator, ...nodeIndicatorConfig } = indicatorConfig || {};
  // line indicator <Y> coordinates
  const y1 = context.extraSpaceTopY;
  const y2 = Number(context.canvasHeight) - context.extraSpaceBottomY;
  // the path
  const { tickValues: xTickValues } = xAxisCoordinates;
  const { tickValues: yTickValues } = yAxisCoordinates;
  const xData = getAxisData(context.data, context.xKey);
  const yData = getAxisData(context.data, props.dataKey as string);
  const xPoints = getPoints(xTickValues, xData, true);
  const yPoints = getPoints(yTickValues, yData);
  const points = xPoints.map((x, i) => [x, yPoints[i]]) as [number, number][];

  // the path data
  const dataOnlyLine = getPathData({
    curved,
    extendToBottom: false,
    points,
    svgHeight: Number(context.canvasHeight) - context.extraSpaceBottomY,
  });
  const dataFill = getPathData({
    curved,
    extendToBottom: !!props.fill || !!props.gradient,
    points,
    svgHeight: Number(context.canvasHeight) - context.extraSpaceBottomY,
  });
  // the ref to the path and handler the nodes focus
  useEffect(() => {
    if (!innerRefs.current?.path) {
      return;
    }
    pathRef.current = innerRefs.current.path;
    const main = innerRefs.current.main;
    const nodes = innerRefs.current.node as SVGSVGElement[];
    const data = xData.map((d, i) => ({ x: d, y: yData[i] }));
    const { mount, unmount } = handleNodesFocus({ data, getNodeFocusInfo, nodes, ref: main });
    mount();
    // eslint-disable-next-line consistent-return
    return () => unmount();
  }, []);
  //  the auto click logic
  useEffect(() => {
    if (props.nodeConfig && showIndicator && autoClick) {
      const { idx, match } = findSurroundingNumber(xPoints, context.xCursor);
      if (match && idx !== pressedRef.current) {
        pressedRef.current = idx;
        const evt = new MouseEvent('click', { bubbles: true }) as MouseEvent & {
          autoClick: boolean;
        };
        evt.autoClick = true;
        innerRefs.current?.node?.[idx]?.dispatchEvent(evt);
        navigator?.vibrate?.(200);
      } else {
        pressedRef.current = null;
      }
    }
  }, [context.xCursor]);
  // Return the nodes coordinates
  useEffect(() => {
    getNodesCoords?.(points);
  }, [points]);
  // the click handler
  const handleClick = (data: string | number | IDataPoint[] | undefined) => {
    onClick?.(data);
    if (closestClick) {
      const closest = findClosestNumber(xPoints, context.xCursor);
      const evt = new MouseEvent('click', { bubbles: true }) as MouseEvent & { autoClick: boolean };
      evt.autoClick = false;
      innerRefs.current?.node?.[closest]?.dispatchEvent(evt);
    }
  };

  // Extract custom attributes (aria-*, data-*) and handle deprecated ariaLabel
  const customAttributes = pickCustomAttributes(props);
  const mergedProps = {
    ...props,
    ...customAttributes,
    // Handle deprecated ariaLabel - give precedence to ariaLabel for backward compatibility
    ...(ariaLabel && { 'aria-label': ariaLabel }),
  };

  return (
    <>
      <Path
        ref={innerRefs}
        d={dataOnlyLine}
        dFill={dataFill}
        dataTestId={`${context.dataTestId}path`}
        dataValue={context.data}
        points={points}
        xKey={context.xKey}
        onClick={handleClick}
        {...mergedProps}
      />
      {lineProjection && (
        <LineChartProjection
          curved={curved}
          dataKey={props.dataKey as string}
          lineProjection={lineProjection}
          points={points}
          svgHeight={Number(context.canvasHeight) - context.extraSpaceBottomY}
        />
      )}
      {showIndicator && (
        <>
          {!!lineIndicator && (
            <Line
              {...lineIndicator}
              className="pointer-events-none"
              x1={context.xCursor}
              x2={context.xCursor}
              y1={y1}
              y2={y2}
            />
          )}
          <g ref={indicatorRef} className="pointer-events-none">
            <Node {...nodeIndicatorConfig} />
          </g>
        </>
      )}
    </>
  );
};
