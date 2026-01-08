// Template keys for accessibility labels
export const PIE_CHART_TEMPLATE_KEYS = {
  DATA_KEY: '{{dataKey}}',
  INDEX: '{{index}}',
  GROUP_NAME: '{{groupName}}',
  GROUP_VALUE: '{{groupValue}}',
} as const;

type BuildAriaLabel = (params: {
  ariaLabel?: string;
  dataKey: string;
  index: number;
  groupName: string;
  groupValue: number;
}) => string | undefined;

export const buildAriaLabel: BuildAriaLabel = ({
  ariaLabel,
  dataKey,
  index,
  groupName,
  groupValue,
}) => {
  if (!ariaLabel) {
    return undefined;
  }

  const dataKeyRegExp = new RegExp(PIE_CHART_TEMPLATE_KEYS.DATA_KEY, 'g');
  const indexRegExp = new RegExp(PIE_CHART_TEMPLATE_KEYS.INDEX, 'g');
  const groupNameRegExp = new RegExp(PIE_CHART_TEMPLATE_KEYS.GROUP_NAME, 'g');
  const groupValueRegExp = new RegExp(PIE_CHART_TEMPLATE_KEYS.GROUP_VALUE, 'g');

  return ariaLabel
    .replace(dataKeyRegExp, dataKey)
    .replace(indexRegExp, String(index))
    .replace(groupNameRegExp, groupName)
    .replace(groupValueRegExp, String(groupValue));
};
