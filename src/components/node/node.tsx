import {
  type FocusEvent,
  type ForwardRefRenderFunction,
  type ForwardedRef,
  type KeyboardEvent,
  type MouseEvent,
  forwardRef,
} from 'react';

import { useAutoClick } from '@/charts/lineChart/hook';

import { Circle } from './components/circle/circle';
import { Hexagon } from './components/hexagon/hexagon';
import { Pentagon } from './components/pentagon/pentagon';
import { Square } from './components/square/square';
import { Star } from './components/star/star';
import { Straight } from './components/straight/straight';
import { Triangle } from './components/triangle/triangle';
import { type NodeProps, NodeType } from './node.types';

const Component = {
  [NodeType.Circle]: Circle,
  [NodeType.Hexagon]: Hexagon,
  [NodeType.Pentagon]: Pentagon,
  [NodeType.Square]: Square,
  [NodeType.Star]: Star,
  [NodeType.Straight]: Straight,
  [NodeType.Triangle]: Triangle,
};

/**
 * Node component that renders interactive geometric shapes for data visualization.
 *
 * @param props - `NodeProps` include:
 * - `type`: Node type (`NodeType.Circle`, `NodeType.Square`, `NodeType.Triangle`, `NodeType.Star`, `NodeType.Pentagon`, `NodeType.Hexagon`, `NodeType.Straight`). By default is `NodeType.Circle`.
 * - `size`: Shape size. By default is 1.
 * - `fill`: Shape fill color. By default is 'transparent'.
 * - `fillOpacity`: Fill color opacity.
 * - `hasHalo`: Indicates if the shape has a halo effect. By default is `false`.
 * - `position`: Shape position in the plane, with properties `x` and `y`. By default is `{ x: 0, y: 0 }`.
 * - `dataTestId`: Identifier for testing. By default is an empty string.
 * - `stroke`: Shape stroke color.
 * - `strokeWidth`: Shape stroke width.
 * - `opacity`: Shape opacity.
 * - `tabIndex`: Tab index for keyboard navigation.
 * - `id`: Shape unique identifier.
 * - `className`: Additional CSS classes for the shape.
 * - `data`: Shape related data, including index, data value, data key and `x` key.
 * - `onClick`: Function executed when clicking on the shape.
 * - `onKeyDown`: Function executed when pressing a key while the shape has focus.
 * - `onFocus`: Function executed when focusing the shape.
 * - `onBlur`: Function executed when removing focus from the shape.
 * - `onMouseEnter`: Function executed when hovering over the shape.
 * - `onMouseLeave`: Function executed when moving the mouse away from the shape.
 *
 * @returns An SVG element corresponding to the specified node type (`circle`, `rect`, `polygon`), or `null` if the type is not recognized.
 */

const NodeComponent: ForwardRefRenderFunction<SVGSVGElement, NodeProps> = (
  {
    dataTestId = 'node',
    haloConfig,
    hasHalo = false,
    onBlur,
    onClick,
    onDoubleClick,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    position = { x: 0, y: 0 },
    size = 1,
    type = NodeType.Circle,
    ...props
  },
  ref
) => {
  // It needed to recovery the autoClick info into js event, because the react event can't be modified or handle custom properties
  const [clickRef, autoClick] = useAutoClick<SVGSVGElement>(ref);

  // TODO - Enrich events with data, stop using extra parameters for callbacks
  const handleClick = (event: MouseEvent<SVGPathElement>) => {
    onClick?.(event, { ...props.data, nodePosition: position }, autoClick.current);
  };

  const handleDoubleClick = (event: MouseEvent<SVGPathElement>) => {
    onDoubleClick?.(event, props.data);
  };

  const handleKeyDown = (event: KeyboardEvent<SVGPathElement>) => {
    if (event.key === 'Enter') {
      onKeyDown?.(event, props.data);
    }
  };

  const handleFocus = (event: FocusEvent<SVGPathElement>) => {
    onFocus?.(event, props.data);
  };

  const handleBlur = (event: FocusEvent<SVGPathElement>) => {
    onBlur?.(event);
  };

  const handleMouseEnter = (event: MouseEvent<SVGPathElement>) => {
    onMouseEnter?.(event, props.data);
  };

  const handleMouseLeave = (event: MouseEvent<SVGPathElement>) => {
    onMouseLeave?.(event);
  };

  const nodeProps = {
    ...props,
    className: `node ${props.className}`,
    onBlur: handleBlur,
    onClick: handleClick,
    onDoubleClick: handleDoubleClick,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  // Props for halo - exclude interactive handlers and accessibility attributes
  const haloProps = {
    className: props.className,
    fill: haloConfig?.fill || props.fill,
    fillOpacity: haloConfig?.fillOpacity || 0.25,
    opacity: haloConfig?.opacity || 0.3,
    stroke: haloConfig?.stroke || props.stroke,
    strokeWidth: haloConfig?.strokeWidth || props.strokeWidth,
  };

  const InnerNode = Component[type];

  return (
    <>
      {hasHalo && (
        <InnerNode
          {...haloProps}
          aria-hidden="true"
          dataTestId={`${dataTestId}-halo`}
          position={position}
          size={size + size / 2}
        />
      )}
      <InnerNode
        {...nodeProps}
        ref={clickRef}
        dataTestId={dataTestId}
        position={position}
        size={size}
      />
    </>
  );
};

export const Node = forwardRef(NodeComponent) as (
  props: NodeProps & {
    ref?: ForwardedRef<SVGSVGElement>;
  }
) => React.JSX.Element;
