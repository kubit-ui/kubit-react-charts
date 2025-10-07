import type { FC } from 'react';

import type { ChartTextProps } from './chartText.types';

/**
 * Functional component for rendering SVG text elements in React.
 *
 * This component abstracts the `<text>` SVG element, providing a convenient interface for rendering text within SVGs
 * using React. It accepts all standard SVG text attributes via `ChartTextProps`, along with additional React-specific
 * properties such as `className` and `tabIndex`. The component's children are expected to be the text content to be
 * rendered.
 *
 * @param {ChartTextProps} props - The properties for the text component.
 * @param {string} [props.className='circle'] - Optional. CSS class name for the text element. Defaults to 'circle'.
 * @param {number} [props.tabIndex=-1] - Optional. Specifies the tab order of the element. Defaults to -1, which means the element is not focusable.
 * @param {React.ReactNode} props.children - The text content to be rendered within the `<text>` element.
 * @returns {React.ReactElement} A React element representing the SVG text.
 */
export const ChartText: FC<ChartTextProps> = ({
  children,
  className = 'circle',
  tabIndex = -1,
  ...props
}) => {
  return (
    <text className={className} tabIndex={tabIndex} {...props}>
      {children}
    </text>
  );
};
