import type { ReactNode } from 'react';

import { describe, expect, it, vi } from 'vitest';

import { getChildrenAttr } from '../getChildrenAttr';

describe('getChildrenAttr', () => {
  it('should combined the children data-key attributes and call updateValue if it changes', () => {
    const updateValue = vi.fn();
    const children = [
      <div key="1" data-key="a" />,
      <div key="2" data-key="b" />,
      <div key="3" data-key="c" />,
    ];

    getChildrenAttr({
      attrName: 'data-key',
      children,
      originalValue: '',
      updateValue,
    });

    expect(updateValue).toHaveBeenCalledWith('abc');
  });

  it('should not call updateValue if the combined value is equal to the original', () => {
    const updateValue = vi.fn();
    const children = [<div key="1" data-key="x" />, <div key="2" data-key="y" />];

    getChildrenAttr({
      attrName: 'data-key',
      children,
      originalValue: 'xy',
      updateValue,
    });

    expect(updateValue).not.toHaveBeenCalled();
  });

  it('should ignore children without the specified attribute', () => {
    const updateValue = vi.fn();
    const children = [<div key="1" data-key="1" />, <span key="2" />, <div key="3" data-key="2" />];

    getChildrenAttr({
      attrName: 'data-key',
      children,
      originalValue: '',
      updateValue,
    });

    expect(updateValue).toHaveBeenCalledWith('12');
  });

  it('should handle empty children', () => {
    const updateValue = vi.fn();
    const children: ReactNode[] = [];

    getChildrenAttr({
      attrName: 'data-key',
      children,
      originalValue: '',
      updateValue,
    });

    expect(updateValue).not.toHaveBeenCalled();
  });
});
