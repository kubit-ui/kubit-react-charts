import { textBound } from '../textBound';

declare global {
  interface SVGElement {
    getBBox: () => { x: number; y: number; width: number; height: number };
  }
}

describe('textBound', () => {
  beforeEach(() => {
    SVGElement.prototype.getBBox = vi.fn(() => ({
      height: 50,
      width: 100,
      x: 0,
      y: 0,
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should return the maximum width of the text elements', () => {
    const mockData = ['Hello', 'World', 'Test'];
    const result = textBound({
      bound: 'width',
      data: mockData,
      fontSize: '16px',
      svgHeight: '100px',
      svgWidth: '100px',
      viewBox: '0 0 100 100',
    });

    expect(result).toBeGreaterThan(0);
  });

  it('should return the maximum height of the text elements', () => {
    const mockData = ['Hello', 'World', 'Test'];
    const result = textBound({
      bound: 'height',
      data: mockData,
      fontSize: '16px',
      svgHeight: '100px',
      svgWidth: '100px',
      viewBox: '0 0 100 100',
    });

    expect(result).toBeGreaterThan(0);
  });

  it('should return 0 if window or document is not available', () => {
    const originalWindow = global.window;
    const originalDocument = global.document;

    global.window = undefined as unknown as Window & typeof globalThis;
    global.document = undefined as unknown as Document;

    const result = textBound({
      bound: 'width',
      data: ['Test'],
      fontSize: '16px',
      svgHeight: '100px',
      svgWidth: '100px',
      viewBox: '0 0 100 100',
    });

    expect(result).toBe(0);

    global.window = originalWindow;
    global.document = originalDocument;
  });

  it('should handle an empty data array and return 0', () => {
    const result = textBound({
      bound: 'width',
      data: [],
      fontSize: '16px',
      svgHeight: '100px',
      svgWidth: '100px',
      viewBox: '0 0 100 100',
    });

    expect(result).toBe(0);
  });
});
