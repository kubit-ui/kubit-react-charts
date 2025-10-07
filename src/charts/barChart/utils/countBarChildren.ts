import { Children, isValidElement } from 'react';

import type { BarChartChildrenType } from '../barChart.type';
import { BarChartPath } from '../fragments/barChartPath';

export const countBarChildren = (children: BarChartChildrenType): number => {
  let higherOrder = 0;
  Children.toArray(children).forEach(child => {
    if (isValidElement(child) && child.type === BarChartPath && child.props.order > higherOrder) {
      higherOrder = child.props.order;
    }
  });
  return higherOrder;
};
