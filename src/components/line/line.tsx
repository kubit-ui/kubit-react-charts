import type { FC } from 'react';

import type { LineProps } from './line.types';

/**
 * `Line` component that renders an SVG line element with customizable properties.
 *
 * @returns A `line` SVG element with the specified properties and attributes.
 */
export const Line: FC<LineProps> = ({
  ariaLabel = '',
  className = 'line',
  dataTestId,
  tabIndex = -1,
  ...props
}) => {
  return (
    <line
      {...props}
      aria-label={ariaLabel}
      className={className}
      data-testid={dataTestId}
      tabIndex={tabIndex}
    />
  );
};
