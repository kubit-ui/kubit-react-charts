import { getCanvasDimensions } from '../getCanvasDimensions';

describe('getCanvasDimensions', () => {
  let svgElement: SVGSVGElement;

  beforeEach(() => {
    svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
    const parentElement = document.createElement('div');

    Object.defineProperty(parentElement, 'clientWidth', { configurable: true, value: 500 });
    Object.defineProperty(parentElement, 'clientHeight', { configurable: true, value: 400 });

    document.body.appendChild(parentElement);
    parentElement.appendChild(svgElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should calculate dimensions with pixel values', () => {
    const result = getCanvasDimensions({
      canvasHeight: '200px',
      canvasWidth: '300px',
      svgElement,
    });

    expect(result).toEqual({
      parsedCanvasHeight: 200,
      parsedCanvasWidth: 300,
    });
  });

  it('should calculate dimensions with percentage values', () => {
    const result = getCanvasDimensions({
      canvasHeight: '50%',
      canvasWidth: '60%',
      svgElement,
    });

    expect(result).toEqual({
      parsedCanvasHeight: 200, // 50% of 400px
      parsedCanvasWidth: 300, // 60% of 500px
    });
  });

  it('should calculate dimensions with rem values', () => {
    document.documentElement.style.fontSize = '16px';

    const result = getCanvasDimensions({
      canvasHeight: '2rem',
      canvasWidth: '3rem',
      svgElement,
    });

    expect(result).toEqual({
      parsedCanvasHeight: 32, // 2 * 16
      parsedCanvasWidth: 48, // 3 * 16
    });
  });

  it('should calculate dimensions with mixed units', () => {
    const result = getCanvasDimensions({
      canvasHeight: '50%',
      canvasWidth: '300px',
      svgElement,
    });

    expect(result).toEqual({
      parsedCanvasHeight: 200, // 50% of 400px
      parsedCanvasWidth: 300,
    });
  });

  it('should return 0 for percentage values if parent element is missing', () => {
    // Eliminar el elemento padre del svgElement
    if (svgElement.parentElement) {
      svgElement.parentElement.removeChild(svgElement);
    }

    const result = getCanvasDimensions({
      canvasHeight: '50%',
      canvasWidth: '60%',
      svgElement,
    });

    expect(result).toEqual({
      parsedCanvasHeight: 0,
      parsedCanvasWidth: 0,
    });
  });

  it('should throw an error for invalid string formats', () => {
    expect(() =>
      getCanvasDimensions({
        canvasHeight: 'invalid',
        canvasWidth: '300px',
        svgElement,
      })
    ).toThrow('Invalid string format: "invalid"');
  });

  it('should handle numeric values directly', () => {
    const result = getCanvasDimensions({
      canvasHeight: 200,
      canvasWidth: 300,
      svgElement,
    });

    expect(result).toEqual({
      parsedCanvasHeight: 200,
      parsedCanvasWidth: 300,
    });
  });
});
