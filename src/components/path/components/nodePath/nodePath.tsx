import { forwardRef } from 'react';

import { processAccessibilityTemplate } from '@/charts/lineChart/utils/accessibilityTemplateProcessor';

import { pickCustomAttributes } from '../../../../utils/pickCustomAttributes/pickCustomAttributes';
import { Node } from '../../../node/node';
import type { NodePathProps } from '../../path.types';

const NODE_PATH_FOCUS_BORDER = 'node-path-focus-border';
/**
 * NodePathComponent renders a Node with custom attributes including processed aria-label templates.
 *
 * aria-label attributes in nodeConfig that contain template placeholders like {{dataKey}} will be processed
 * and replaced with actual values from the data.
 */
const NodePathComponent: React.ForwardRefRenderFunction<
  SVGSVGElement,
  {
    nodeConfig?: NodePathProps;
    data?: {
      index?: number;
      dataValue?: any;
      dataKey?: string;
      xKey?: string;
    };
    x: number;
    y: number;
    tabIndex?: number;
  }
> = ({ data, nodeConfig, tabIndex = 0, x, y }, ref) => {
  // Extract custom aria-* and data-* attributes from nodeConfig
  const customAttributes = nodeConfig ? pickCustomAttributes(nodeConfig) : {};

  // Process aria-label template if it exists and contains placeholders
  if (
    customAttributes['aria-label'] &&
    data &&
    typeof customAttributes['aria-label'] === 'string'
  ) {
    const ariaLabelValue = customAttributes['aria-label'];

    if (ariaLabelValue.includes('{{')) {
      const processedAriaLabel = processAccessibilityTemplate(
        ariaLabelValue,
        {
          dataKey: data.dataKey,
          dataValue: data.dataValue,
          index: data.index ?? 0,
          xKey: data.xKey,
        },
        data.dataValue
      );
      if (processedAriaLabel) {
        customAttributes['aria-label'] = processedAriaLabel;
      }
    }
  }
  return (
    <>
      {nodeConfig && (
        <Node
          {...nodeConfig}
          ref={ref}
          {...customAttributes}
          className={NODE_PATH_FOCUS_BORDER}
          data={data}
          hasHalo={nodeConfig.hasHalo}
          position={{
            x: x,
            y: y,
          }}
          tabIndex={tabIndex}
        />
      )}
    </>
  );
};

export const NodePath = forwardRef(NodePathComponent);
