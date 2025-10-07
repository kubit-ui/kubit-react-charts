import type { LineProps } from '@/components/line/line.types';

/**
 * Filters and extracts line-related properties from a given object.
 *
 * This utility function is designed to take a generic object `props` and extract from it
 * properties that are relevant to rendering a line in SVG. It's particularly useful when
 * you have a component that receives a mix of its own props and props that should be passed
 * directly to a child `<Line>` component.
 *
 * @param props - The input object containing potential line properties.
 * @returns An object containing only the properties relevant to a `<Line>` component.
 *
 * Note: The function uses a type assertion to treat the input `props` as any, allowing for
 * flexible input types. However, this means the function assumes the caller has ensured that
 * the input object contains properties compatible with `LineProps`.
 */
export const filterLineProps = <T>(props: T): LineProps => {
  const {
    ariaLabel,
    className,
    dataTestId,
    opacity,
    stroke,
    strokeDasharray,
    strokeDashoffset,
    strokeLinecap,
    strokeLinejoin,
    strokeOpacity,
    strokeWidth,
    style,
    tabIndex,
    transform,
    x1,
    x2,
    y1,
    y2,
  } = props as any;
  return {
    ariaLabel,
    className,
    dataTestId,
    opacity,
    stroke,
    strokeDasharray,
    strokeDashoffset,
    strokeLinecap,
    strokeLinejoin,
    strokeOpacity,
    strokeWidth,
    style,
    tabIndex,
    transform,
    x1,
    x2,
    y1,
    y2,
  };
};
