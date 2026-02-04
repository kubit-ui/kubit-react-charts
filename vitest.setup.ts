import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';

import 'html-validate/vitest';
import { beforeAll } from 'vitest';

beforeAll(() => {
  // Mock HTMLCanvasElement.getContext to avoid the error
  HTMLCanvasElement.prototype.getContext = function () {
    return null;
  };

  // Mock ResizeObserver - simple implementation
  if (typeof global.ResizeObserver === 'undefined') {
    // @ts-ignore
    global.ResizeObserver = class ResizeObserver {
      constructor(callback: any) {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});
