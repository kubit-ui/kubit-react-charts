// Template keys for accessibility labels
export const TEMPLATE_KEYS = {
  DATA_KEY: '{{dataKey}}',
  INDEX: '{{index}}',
  X_VALUE: '{{xValue}}',
  Y_VALUE: '{{yValue}}',
} as const;

export interface NodeTemplateData {
  index: number;
  dataValue?: string | number | Array<Record<string, unknown>>;
  dataKey?: string;
  xKey?: string;
}

/**
 * Processes template string in accessibility labels by replacing placeholders with actual values
 *
 * @param template - The template string with placeholders (e.g., "Point {{index}}: {{dataKey}} = {{yValue}}")
 * @param nodeData - Contains index, dataValue, dataKey, and xKey for the current node
 * @param dataValue - The actual data array or value (optional, uses nodeData.dataValue if not provided)
 * @returns The processed string with placeholders replaced by actual values
 *
 * @example
 * ```typescript
 * const template = "Data point {{index}}: {{dataKey}} = {{yValue}}";
 * const nodeData = { index: 0, dataKey: "sales", xKey: "month" };
 * const dataValue = [{ month: "Jan", sales: 100 }];
 *
 * const result = processAccessibilityTemplate(template, nodeData, dataValue);
 * // Result: "Data point 1: sales = 100"
 * ```
 */
const extractValuesFromDataPoint = (
  dataPoint: Record<string, unknown> | undefined,
  nodeData: NodeTemplateData
) => {
  const xValue = dataPoint && nodeData.xKey ? (dataPoint[nodeData.xKey]?.toString() ?? '') : '';
  const yValue =
    dataPoint && nodeData.dataKey ? (dataPoint[nodeData.dataKey]?.toString() ?? '') : '';
  return { xValue, yValue };
};

const replaceTemplatePlaceholders = (
  template: string,
  nodeData: NodeTemplateData,
  xValue: string,
  yValue: string
): string => {
  let result = template;

  if (nodeData.dataKey !== undefined) {
    result = result.replace(new RegExp(TEMPLATE_KEYS.DATA_KEY, 'g'), nodeData.dataKey);
  }

  // Always replace xValue and yValue placeholders, even with empty strings
  result = result.replace(new RegExp(TEMPLATE_KEYS.X_VALUE, 'g'), xValue);
  result = result.replace(new RegExp(TEMPLATE_KEYS.Y_VALUE, 'g'), yValue);

  if (nodeData.index !== undefined) {
    result = result.replace(new RegExp(TEMPLATE_KEYS.INDEX, 'g'), (nodeData.index + 1).toString());
  }

  return result;
};

export const processAccessibilityTemplate = (
  template: string,
  nodeData: NodeTemplateData,
  dataValue?: string | number | Array<Record<string, unknown>>
): string | undefined => {
  if (!template) {return undefined;}
  // Use provided dataValue or fall back to nodeData.dataValue
  const actualDataValue = dataValue ?? nodeData.dataValue;

  // Get the actual data point for this node
  const dataPoint = Array.isArray(actualDataValue) ? actualDataValue[nodeData.index] : undefined;

  // Extract values
  const { xValue, yValue } = extractValuesFromDataPoint(dataPoint, nodeData);

  // Replace template placeholders
  return replaceTemplatePlaceholders(template, nodeData, xValue, yValue);
};
