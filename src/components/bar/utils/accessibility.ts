// Template keys for accessibility labels
export const BAR_TEMPLATE_KEYS = {
  DATA_KEY: '{{dataKey}}',
  X_KEY: '{{xKey}}',
  Y_KEY: '{{yKey}}',
  X_DATA: '{{xData}}',
  Y_DATA: '{{yData}}',
  COVERAGE: '{{coverage}}',
  INDEX: '{{index}}',
} as const;

type BuildAriaLabel = (params: {
  ariaLabel?: string;
  dataKey?: string;
  xKey?: string;
  yKey?: string;
  xData?: string | number;
  yData?: string | number;
  coverage: number;
  index: number;
}) => string | undefined;

export const buildAriaLabel: BuildAriaLabel = ({
  ariaLabel,
  dataKey,
  xKey,
  yKey,
  xData,
  yData,
  coverage,
  index,
}) => {
  if (!ariaLabel) {
    return undefined;
  }

  const dataKeyRegExp = new RegExp(BAR_TEMPLATE_KEYS.DATA_KEY, 'g');
  const xKeyRegExp = new RegExp(BAR_TEMPLATE_KEYS.X_KEY, 'g');
  const yKeyRegExp = new RegExp(BAR_TEMPLATE_KEYS.Y_KEY, 'g');
  const xDataRegExp = new RegExp(BAR_TEMPLATE_KEYS.X_DATA, 'g');
  const yDataRegExp = new RegExp(BAR_TEMPLATE_KEYS.Y_DATA, 'g');
  const coverageRegExp = new RegExp(BAR_TEMPLATE_KEYS.COVERAGE, 'g');
  const indexRegExp = new RegExp(BAR_TEMPLATE_KEYS.INDEX, 'g');

  return ariaLabel
    .replace(dataKeyRegExp, dataKey ?? '')
    .replace(xKeyRegExp, xKey ?? '')
    .replace(yKeyRegExp, yKey ?? '')
    .replace(xDataRegExp, String(xData ?? ''))
    .replace(yDataRegExp, String(yData ?? ''))
    .replace(coverageRegExp, String(coverage))
    .replace(indexRegExp, String(index));
};
