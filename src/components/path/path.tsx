import {
  type ForwardedRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

import { useFocus } from '@/hooks/useFocus/useFocus';
import { useHover } from '@/hooks/useHover/useHover';
import { cssGradientToSVG } from '@/utils/cssGradientToSvg/cssGradientToSvg';
import { pickCustomAttributes } from '@/utils/pickCustomAttributes/pickCustomAttributes';
import { ShadowSvg } from '@/utils/shadowSvg/shadowSvg';

import { NodePath } from './components/nodePath/nodePath';
import './path.css';
import type { PathProps } from './path.types';

const ENTER = {
  code: 'Enter',
  key: 'Enter',
  keyCode: 13,
  which: 13,
};

const SHADOW_FILTER_ID = 'shadow';

/**
 * Represents a customizable SVG path component in
 *
 * This component renders an SVG path with various customizable properties such as fill color, stroke color, and stroke width.
 * It supports dynamic SVG gradients through a utility function, interactive event handlers, and accessibility features.
 * Additionally, it can render optional nodes (control points) along the path for visual editing or debugging purposes.
 *
 * @param {PathProps} props - The properties for the path component.
 * @param {string} [props.fill='transparent'] - The fill color of the path. Defaults to 'transparent'.
 * @param {string} [props.gradient] - A CSS gradient string that will be converted to an SVG gradient.
 * @param {string | number} [props.dataValue] - The value of the represented data.
 * @param {string} [props.d] - The SVG path data string.
 * @param {number} [props.tabIndex] - The tab index for keyboard navigation.
 * @param {Function} [props.onClick] - Click event handler.
 * @param {Function} [props.onMouseEnter] - Mouse enter event handler.
 * @param {Function} [props.onMouseLeave] - Mouse leave event handler.
 * @param {Function} [props.onFocus] - Focus event handler.
 * @param {Function} [props.onBlur] - Blur event handler.
 * @param {Function} [props.onKeyDown] - KeyDown event handler.
 * @param {string} [props.title] - A text title for the path, used for accessibility.
 * @param {string} [props.role='img'] - ARIA role for the path.
 * @param {string} [props.ariaLabel] - ARIA label for the path.
 * @param {string} [props.classNames=''] - Additional CSS class names for the path.
 * @param {string} [props.stroke='none'] - The stroke color of the path.
 * @param {string} [props.strokeWidth='0'] - The stroke width of the path.
 * @param {string} [props.dataTestId] - A data attribute used for testing.
 * @param {Array} [props.points] - An array of points for rendering nodes along the path.
 * @param {Object} [props.nodeConfig] - Configuration for the nodes.
 *
 * @returns {ReactElement} A React element representing the SVG path.
 */
const PathComponent = (
  {
    classNames = '',
    fill = 'transparent',
    stroke = '#0000FF',
    strokeWidth = '1',
    focusConfig = {
      stroke: '#0000FF',
      strokeWidth: '0.5',
    },
    hoverConfig = {
      stroke: '#0000FF',
      strokeWidth: '0.5',
    },
    role = 'img',
    ...props
  }: PathProps,
  ref: ForwardedRef<unknown> | undefined | null
): ReactElement => {
  const { handleBlur, handleFocus, isFocused } = useFocus(props.onFocus, props.onBlur);
  const { handleMouseEnter, handleMouseLeave, isHovered } = useHover(
    props.onMouseEnter,
    props.onMouseLeave
  );
  const pathRef = useRef<SVGPathElement | null>(null);
  const nodeRef = useRef<SVGSVGElement[] | null[]>([]);
  const mainRef = useRef<SVGSVGElement | null>(null);

  useImperativeHandle(ref, () => ({
    get main() {
      return mainRef.current;
    },
    get node() {
      return nodeRef.current;
    },
    get path() {
      return pathRef.current;
    },
  }));

  const handleKeyDown = (event: KeyboardEvent<SVGElement>) => {
    if (event.key === ENTER.key) {
      props.onKeyDown?.(props.dataValue);
    }
  };

  const handleClick = () => {
    props.onClick?.(props.dataValue);
  };

  const handleDoubleClick = (e: MouseEvent<SVGPathElement>) => {
    props.onDoubleClick?.(e, props.dataValue);
  };

  const handleMouseDown = (e: MouseEvent<SVGPathElement>) => {
    e.preventDefault();
  };

  const gradientSvgElement = props.gradient && cssGradientToSVG(props.gradient);

  // Extract custom data-* and aria-* attributes
  const customAttributes = pickCustomAttributes(props);

  // Merge props to include focus and hover styles
  const defaultProps = {
    ...props,
    classNames: `path ${classNames}`,
    fill: gradientSvgElement ? 'url(#gradientePath)' : fill,
    filter: 'url(#shadow)',
    role,
    stroke,
    strokeWidth,
  };

  const mergedProps = {
    ...defaultProps,
    ...(isFocused && focusConfig),
    ...(isHovered && hoverConfig),
  };

  return (
    <g ref={mainRef} tabIndex={-1}>
      {gradientSvgElement && gradientSvgElement}
      {mergedProps.shadowSvgConfig && (
        <ShadowSvg id={SHADOW_FILTER_ID} shadowSvgConfig={mergedProps.shadowSvgConfig} />
      )}
      <g
        aria-label={mergedProps.ariaLabel}
        className={mergedProps.classNames}
        data-draw={true}
        filter={mergedProps.shadowSvgConfig && mergedProps.filter}
        opacity={mergedProps.opacity}
        orientation={mergedProps.orientation}
        role={mergedProps.role}
        rotate={mergedProps.rotate}
        tabIndex={mergedProps.tabIndex}
        transform={mergedProps.transform}
        visibility={mergedProps.visibility}
        {...customAttributes}
        onBlur={handleBlur}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <path
          ref={pathRef}
          d={mergedProps.d}
          data-testid={mergedProps.dataTestId}
          fill={mergedProps.dFill ? 'transparent' : mergedProps.fill}
          fillOpacity={mergedProps.fillOpacity}
          fillRule={mergedProps.fillRule}
          stroke={mergedProps.stroke}
          strokeDasharray={mergedProps.strokeDasharray}
          strokeDashoffset={mergedProps.strokeDashoffset}
          strokeLinecap={mergedProps.strokeLinecap}
          strokeLinejoin={mergedProps.strokeLinejoin}
          strokeMiterlimit={mergedProps.strokeMiterlimit}
          strokeOpacity={mergedProps.strokeOpacity}
          strokeWidth={mergedProps.strokeWidth}
        >
          {mergedProps.title && <title>{mergedProps.title}</title>}
        </path>
        {/* Use the dFill prop to create a fill independently of the data (d) */}
        {mergedProps.dFill && (
          <path
            d={mergedProps.dFill}
            fill={mergedProps.fill}
            fillOpacity={mergedProps.fillOpacity}
            fillRule={mergedProps.fillRule}
          />
        )}
      </g>
      {mergedProps.points &&
        mergedProps.nodeConfig &&
        mergedProps.points.map(([x, y]: [number, number], index: number) => {
          const nodeData = {
            dataKey: mergedProps.dataKey,
            dataValue: mergedProps.dataValue,
            index,
            xKey: mergedProps?.xKey,
          };

          return (
            <NodePath
              key={`${index.toString()}`}
              ref={rf => (nodeRef.current[index] = rf)}
              data={nodeData}
              nodeConfig={mergedProps.nodeConfig}
              tabIndex={-1}
              x={x}
              y={y}
            />
          );
        })}
    </g>
  );
};

export const Path = forwardRef(PathComponent);
