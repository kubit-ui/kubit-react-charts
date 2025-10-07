import '@testing-library/jest-dom';

import { type RenderResult, render as renderTestingLibrary } from '@testing-library/react';

/**
 * Custom render function for React components, with an option to wrap the component in an SVG element.
 *
 * This function extends the functionality of the Testing Library's render method by allowing the
 * rendered component to be optionally wrapped in an SVG element. This is particularly useful for
 * testing components that are intended to be used within an SVG context.
 *
 * @param node - The React element to be rendered.
 * @param withSvg - A boolean flag that determines whether the component should be wrapped in an SVG element.
 *                  Defaults to true, meaning the component will be wrapped in an SVG element unless specified otherwise.
 * @returns The result of the render operation, providing various utilities to query and interact with the rendered component.
 */
export const render = (node: React.ReactElement, withSvg = true): RenderResult => {
  /**
   * A functional component that conditionally wraps its children in an SVG element.
   *
   * @param children - The child components to be potentially wrapped in an SVG element.
   * @returns The children wrapped in an SVG element if withSvg is true, otherwise the children as is.
   */
  const Wrapper = ({ children }: React.PropsWithChildren) =>
    withSvg ? <svg>{children}</svg> : children;

  return renderTestingLibrary(node, { wrapper: Wrapper });
};
