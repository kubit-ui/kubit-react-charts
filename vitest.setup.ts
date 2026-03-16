import '@testing-library/jest-dom/vitest';
import 'html-validate/vitest';
import { beforeAll, vi } from 'vitest';

// Suppress CSS parsing warnings from jsdom
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const message = args[0]?.toString() || '';
  if (message.includes('Could not parse CSS stylesheet')) {
    return;
  }
  originalConsoleError(...args);
};

class MockResizeObserver {
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

beforeAll(() => {
  // Mock HTMLCanvasElement.getContext to avoid the error
  HTMLCanvasElement.prototype.getContext = function () {
    return null;
  };

  // Mock de ResizeObserver global
  (
    globalThis as typeof globalThis & { ResizeObserver: typeof ResizeObserver }
  ).ResizeObserver = MockResizeObserver as typeof ResizeObserver;
});
