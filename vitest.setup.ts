import '@testing-library/jest-dom';

import 'html-validate/vitest';
import { beforeAll } from 'vitest';

beforeAll(() => {
  // Mock HTMLCanvasElement.getContext to avoid the error
  HTMLCanvasElement.prototype.getContext = function () {
    return null;
  };
});
