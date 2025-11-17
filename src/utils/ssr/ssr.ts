/**
 * SSR (Server-Side Rendering) utilities
 * 
 * Provides safe access to browser APIs when rendering on the server.
 * Compatible with Next.js, Remix, Gatsby, and other SSR frameworks.
 */

/**
 * Check if code is running in a browser environment
 * @returns true if window is defined (browser), false otherwise (SSR)
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

/**
 * Check if code is running in a server environment
 * @returns true if running on server (no window), false otherwise
 */
export const isServer = (): boolean => {
  return !isBrowser();
};

/**
 * Safely access window object
 * @returns window object if in browser, undefined if on server
 */
export const safeWindow = (): Window | undefined => {
  return isBrowser() ? window : undefined;
};

/**
 * Safely access document object
 * @returns document object if in browser, undefined if on server
 */
export const safeDocument = (): Document | undefined => {
  return isBrowser() ? document : undefined;
};

/**
 * Safely execute code that requires browser APIs
 * Returns undefined on server, executes callback in browser
 * 
 * @param callback - Function to execute in browser environment
 * @returns Result of callback if in browser, undefined if on server
 * 
 * @example
 * ```ts
 * const width = safeExecute(() => window.innerWidth) ?? 0;
 * ```
 */
export const safeExecute = <T>(callback: () => T): T | undefined => {
  if (!isBrowser()) {
    return undefined;
  }
  try {
    return callback();
  } catch (error) {
    return undefined;
  }
};

/**
 * Safely execute code with a fallback value for SSR
 * 
 * @param callback - Function to execute in browser environment
 * @param fallback - Value to return if on server or if callback fails
 * @returns Result of callback if in browser, fallback otherwise
 * 
 * @example
 * ```ts
 * const fontSize = safeExecuteWithFallback(
 *   () => parseFloat(getComputedStyle(document.documentElement).fontSize),
 *   16
 * );
 * ```
 */
export const safeExecuteWithFallback = <T>(callback: () => T, fallback: T): T => {
  return safeExecute(callback) ?? fallback;
};

/**
 * Create an SVG element safely (browser-only)
 * Returns undefined on server
 * 
 * @param tagName - SVG element tag name
 * @returns SVG element if in browser, undefined if on server
 */
export const createSVGElement = <K extends keyof SVGElementTagNameMap>(
  tagName: K
): SVGElementTagNameMap[K] | undefined => {
  const doc = safeDocument();
  if (!doc) {
    return undefined;
  }
  return doc.createElementNS('http://www.w3.org/2000/svg', tagName);
};

/**
 * Get computed style safely
 * Returns undefined on server
 * 
 * @param element - Element to get computed style for
 * @returns CSSStyleDeclaration if in browser, undefined if on server
 */
export const safeGetComputedStyle = (
  element: Element
): CSSStyleDeclaration | undefined => {
  const win = safeWindow();
  if (!win) {
    return undefined;
  }
  return win.getComputedStyle(element);
};

/**
 * Query selector safely
 * Returns null on server or if not found
 * 
 * @param selector - CSS selector string
 * @returns Element if found in browser, null otherwise
 */
export const safeQuerySelector = <T extends Element = Element>(
  selector: string
): T | null => {
  const doc = safeDocument();
  if (!doc) {
    return null;
  }
  return doc.querySelector<T>(selector);
};
