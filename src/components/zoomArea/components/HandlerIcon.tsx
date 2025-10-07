import type { FC } from 'react';

/**
 * Default color for handler icons
 */
const DEFAULT_ICON_COLOR = '#8f8f8f';

/**
 * Icon offset for perfect centering (5px = ICON_SIZE / 2)
 */
const ICON_OFFSET = 5;

/**
 * Props for the HandlerIcon component
 */
interface HandlerIconProps {
  /** X position of the handler */
  x: number;
  /** Y position of the handler center */
  y: number;
  /** Fill color for the dots */
  fill?: string;
}

/**
 * Renders a handler icon with 3 vertical bars (grip pattern).
 *
 * Icon specifications:
 * - Size: 10x10 pixels (ICON_SIZE)
 * - Centering: offset by 5 pixels (ICON_OFFSET = ICON_SIZE / 2)
 *
 * The icon is centered on the handler by applying a translation of:
 * x - ICON_OFFSET, y - ICON_OFFSET
 */
export const HandlerIcon: FC<HandlerIconProps> = ({ fill = DEFAULT_ICON_COLOR, x, y }) => {
  return (
    <g
      fill={fill}
      pointerEvents="none"
      transform={`translate(${x - ICON_OFFSET}, ${y - ICON_OFFSET})`}
    >
      {/* 
        Icon: 10x10 pixel grip pattern with 3 vertical bars
        Paths are designed for a 10x10 coordinate system (0,0 to 10,10)
        Positioned to be perfectly centered on the handler
      */}
      {/* 
        Three vertical bars creating a grip pattern
        Paths derived from Figma design for visual consistency
      */}
      <path d="M4.99948 9.99802C4.47168 9.99802 4.04419 9.64335 4.04419 9.20547V0.79255C4.04419 0.354666 4.47168 0 4.99948 0C5.52728 0 5.95477 0.354666 5.95477 0.79255V9.20745C5.95477 9.64533 5.52728 10 4.99948 10V9.99802Z" />
      <path d="M0.955289 8.78839C0.427492 8.78839 0 8.43372 0 7.99584V2.00416C0 1.56628 0.427492 1.21161 0.955289 1.21161C1.48309 1.21161 1.91058 1.56628 1.91058 2.00416V7.99584C1.91058 8.43372 1.48309 8.78839 0.955289 8.78839Z" />
      <path d="M8.08936 7.99584C8.08936 8.43372 8.51685 8.78839 9.04464 8.78839C9.57244 8.78839 9.99993 8.43372 9.99993 7.99584V2.00416C9.99993 1.56628 9.57244 1.21161 9.04464 1.21161C8.51685 1.21161 8.08936 1.56628 8.08936 2.00416V7.99584Z" />
    </g>
  );
};
