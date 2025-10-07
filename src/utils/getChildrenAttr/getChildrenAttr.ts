import { Children, type ReactNode, isValidElement } from 'react';

interface GetChildrenAttrProps {
  attrName: string;
  originalValue: string;
  children: ReactNode[];
  updateValue: (v: string) => void;
}

export const getChildrenAttr = ({
  attrName,
  children,
  originalValue,
  updateValue,
}: GetChildrenAttrProps): void => {
  let combineString = '';
  Children.toArray(children).forEach((child: React.ReactNode) => {
    if (isValidElement(child)) {
      const attrValue = child.props[attrName];
      if (attrValue) {
        combineString += attrValue;
      }
    }
  });
  if (combineString !== originalValue) {
    updateValue(combineString);
  }
};
