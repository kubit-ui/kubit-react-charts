export const PLOT_TEMPLATE_KEYS = {
  DATA_KEY: '{{dataKey}}',
  NAME: '{{name}}',
  VALUE: '{{value}}',
  X: '{{x}}',
  Y: '{{y}}',
} as const;

export const DEFAULT_ARIA_LABEL_TEMPLATE = `${PLOT_TEMPLATE_KEYS.NAME}, ${PLOT_TEMPLATE_KEYS.VALUE}`;

const DATA_KEY_REGEXP = new RegExp(PLOT_TEMPLATE_KEYS.DATA_KEY, 'g');
const NAME_REGEXP = new RegExp(PLOT_TEMPLATE_KEYS.NAME, 'g');
const VALUE_REGEXP = new RegExp(PLOT_TEMPLATE_KEYS.VALUE, 'g');
const X_REGEXP = new RegExp(PLOT_TEMPLATE_KEYS.X, 'g');
const Y_REGEXP = new RegExp(PLOT_TEMPLATE_KEYS.Y, 'g');

export interface BuildAriaLabelParams {
  ariaLabel?: string;
  dataKey: string;
  name?: string;
  formattedValue: string;
  x: number;
  y: number;
}

export const buildAriaLabel = ({
  ariaLabel,
  dataKey,
  name,
  formattedValue,
  x,
  y,
}: BuildAriaLabelParams): string => {
  const template = ariaLabel ?? DEFAULT_ARIA_LABEL_TEMPLATE;
  const displayName = name ?? dataKey;

  return template
    .replace(DATA_KEY_REGEXP, dataKey)
    .replace(NAME_REGEXP, displayName)
    .replace(VALUE_REGEXP, formattedValue)
    .replace(X_REGEXP, String(x))
    .replace(Y_REGEXP, String(y));
};

export const formatValue = <T>(value: T): string => {
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  if (typeof value === 'string') {
    return value;
  }
  return JSON.stringify(value);
};
