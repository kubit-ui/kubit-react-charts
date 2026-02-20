import { type ForwardRefRenderFunction, type ForwardedRef, forwardRef } from 'react';

import type { SvgContainerProps } from './svgContainer.types';

/**
 * Renders an SVG container with customizable properties.
 *
 * This component is designed to encapsulate an SVG element, providing a flexible interface for defining its dimensions,
 * accessibility features, and other attributes. It supports dynamic content through its children, allowing for complex
 * SVG graphics to be composed within. The component also adheres to accessibility standards by allowing ARIA attributes
 * and roles to be specified.
 *
 * @param {SvgContainerProps} props - The properties for configuring the SVG container.
 * @param {string | number} props.width - The width of the SVG container. Can be specified as a number (pixels) or a string (percentage, em, etc.).
 * @param {string | number} props.height - The height of the SVG container. Similar to width, it accepts both numbers and strings.
 * @param {ReactNode} props.children - The SVG content to be rendered inside the container. This can include shapes, paths, text, and other SVG elements.
 * @param {string} [props.className='svg-container'] - An optional CSS class name for styling the SVG container.
 * @param {string} [props.role='img'] - An optional ARIA role to define the semantic meaning of the SVG container. Defaults to 'img'.
 * @param {string} [props.ariaLabel='Chart Container'] - An optional ARIA label to provide an accessible name for the SVG container.
 * @param {number} [props.tabIndex=0] - An optional tab index to control the SVG container's focusability and order in the tab navigation sequence.
 * @param {string} [props.caption='Chart Container'] - An optional caption for the SVG content. This is rendered as a <title> element within the SVG for accessibility purposes.
 * @param {string} [props.viewBox] - An optional attribute to specify the position and dimension, in user space, of an SVG viewport.
 * @param {string} [props.dataTestId] - An optional attribute used for identifying the element in tests.
 * @param {string} [props.overflow] - Controls SVG overflow behavior. Can be set via the overflow prop or CSS className. Common values: 'visible', 'hidden', 'scroll', 'auto'. Use className for styling control.
 * @param {backgroundColor} [props.backgroundColor] - Sets a background color for the svg.
 *
 * @returns {ReactElement} A React element representing the SVG container.
 */
const SvgContainerComponent: ForwardRefRenderFunction<SVGSVGElement, SvgContainerProps> = (
  {
    ariaHidden,
    ariaLabel,
    backgroundColor,
    caption,
    children,
    className,
    dataTestId,
    height,
    imageSrc,
    overflow,
    radius = '0px',
    role,
    tabIndex,
    viewBox,
    width,
    ...callbacks
  },
  ref
) => {
  return (
    <svg
      ref={ref}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      className={className}
      data-testid={dataTestId}
      height={height}
      role={role}
      style={{
        backgroundColor: backgroundColor,
        borderRadius: radius,
        overflow: overflow,
      }}
      tabIndex={tabIndex}
      viewBox={viewBox}
      width={width}
      onMouseDown={e => e.preventDefault()}
      {...callbacks}
    >
      {caption && <title>{caption}</title>}
      {imageSrc && <image height={height} href={imageSrc} width={width} x="0" y="0" />}
      {children}
    </svg>
  );
};

export const SvgContainer = forwardRef(SvgContainerComponent) as (
  props: SvgContainerProps & {
    ref?: ForwardedRef<SVGSVGElement>;
  }
) => React.JSX.Element;
