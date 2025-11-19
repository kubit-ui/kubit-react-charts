import { type ForwardedRef, forwardRef } from 'react';

import { FocusRing } from '@/components/focusRing/focusRing';
import { useFocus } from '@/hooks/useFocus/useFocus';
import { useHover } from '@/hooks/useHover/useHover';

import { Circle } from './components/circle/circle';
import { Square } from './components/square/square';
import { Triangle } from './components/triangle/triangle';
import './plot.css';
import { PLOT_SIZE_MAP, type PlotProps, PlotSize, PlotType } from './plot.types';

// Map of components by type
const Component = {
  [PlotType.CIRCLE]: Circle,
  [PlotType.SQUARE]: Square,
  [PlotType.TRIANGLE]: Triangle,
};

const PlotComponent = <T = string,>(
  {
    className,
    data,
    dataTestId = 'plot',
    fill,
    fillOpacity,
    focusConfig,
    hasHoverEffect,
    hoverConfig,
    id,
    label,
    onBlur,
    onClick,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    opacity,
    position = { x: 0, y: 0 },
    size = PlotSize.MEDIUM,
    stroke,
    strokeWidth,
    tabIndex,
    type = PlotType.CIRCLE,
    ...props
  }: PlotProps<T>,
  ref: ForwardedRef<SVGElement>
) => {
  const { handleMouseEnter, handleMouseLeave, isHovered } = useHover(onMouseEnter, onMouseLeave);
  const { handleBlur, handleFocus, isFocused } = useFocus(onFocus, onBlur);

  // Extract properties from hoverConfig with default values
  const {
    fill: hoverFill = fill,
    opacity: hoverOpacity = 0.3,
    scale: hoverScale = 1.3,
    stroke: hoverStroke = fill,
    strokeWidth: hoverStrokeWidth = 0,
  } = hoverConfig || {};

  // Calculate size in pixels
  const sizeInPixels = typeof size === 'number' ? size : PLOT_SIZE_MAP[size];

  // Properties for the main plot shape - focus handlers managed by FocusRing
  const plotShapeProps = {
    ...props,
    ['aria-label']: label,
    className: `plot ${className || ''}`,
    dataTestId,
    fill, // Maintains original fill color
    fillOpacity, // Maintains original opacity
    id,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onClick,
    onKeyDown,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    opacity, // Maintains original overall opacity
    position,
    role: 'button',
    size: sizeInPixels,
    stroke, // Maintains original stroke color
    strokeWidth: hasHoverEffect && isHovered ? 0 : strokeWidth, // Removed isFocused dependency
    tabIndex,
  };

  // Get the correct component based on type
  const PlotShape = Component[type];

  return (
    <>
      {/* Creates another shape that will appear behind, which brings the hover effect */}
      {hasHoverEffect && isHovered && !isFocused && (
        <PlotShape
          dataTestId={`${dataTestId}-hover`}
          fill={hoverFill}
          opacity={hoverOpacity}
          position={position}
          size={sizeInPixels * hoverScale}
          stroke={hoverStroke}
          strokeWidth={hoverStrokeWidth}
        />
      )}

      {/* Main plot component wrapped with FocusRing */}
      <FocusRing dataTestId={dataTestId} focusConfig={focusConfig} isFocused={isFocused}>
        <PlotShape ref={ref} {...plotShapeProps} />
      </FocusRing>
    </>
  );
};

/**
 * `Plot` component which renders an interactive point in a chart with hover effects and accessibility features.
 *
 * @template T - The type of the value represented by this plot point's data. Defaults to string.
 *
 * @param props - `PlotProps` include:
 *
 * - `type`: Type of the plot point (circle, square, triangle). By default is `PlotType.Circle`.
 * - `size`: Size of the plot point. Can be a predefined size from PlotSize enum or a direct pixel size.
 * - `fill`: Fill color of the plot point.
 * - `fillOpacity`: Fill color opacity. By default is 1.
 * - `hasHoverEffect`: Whether the plot has a hover effect. By default is `true`.
 * - `position`: Required. The position of the plot point on the plane.
 * - `dataTestId`: Identifier for testing. By default is 'Plot'.
 * - `stroke`: Stroke color of the plot point. By default is 'transparent'.
 * - `strokeWidth`: Stroke width of the plot point. By default is 0.
 * - `opacity`: Overall opacity of the plot point. By default is 1.
 * - `label`: Accessible label for the plot point.
 * - `tabIndex`: Tab index for keyboard navigation. By default is -1 to support programmatic focus management.
 * - `id`: Unique identifier for the plot point.
 * - `className`: Additional CSS classes for the plot point.
 * - `hoverConfig`: Configuration for the hover effect.
 * - `data`: Data associated with this plot point, with value of type T.
 * - `onClick`: Function executed when clicking on the plot point.
 * - `onKeyDown`: Function executed when pressing a key while the plot point has focus.
 * - `onFocus`: Function executed when focusing the plot point.
 * - `onBlur`: Function executed when removing focus from the plot point.
 * - `onMouseEnter`: Function executed when hovering over the plot point.
 * - `onMouseLeave`: Function executed when moving the mouse away from the plot point.
 *
 * @returns An SVG element representing the plot point with event handlers and accessibility features.
 */
export const Plot = forwardRef(PlotComponent) as <T = string>(
  props: PlotProps<T> & {
    ref?: ForwardedRef<SVGElement>;
  }
) => JSX.Element;
