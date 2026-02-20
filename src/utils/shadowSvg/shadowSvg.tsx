import type { ShadowSvgProps } from './shadowSvg.types';

export const ShadowSvg = ({
  height = '140%',
  width = '140%',
  x = '-20%',
  y = '-20%',
  ...props
}: ShadowSvgProps): React.JSX.Element => {
  return (
    <defs>
      <filter height={height} id={props.id} width={width} x={x} y={y}>
        <feDropShadow {...props.shadowSvgConfig} />
      </filter>
    </defs>
  );
};
