import { createSVGElement, isBrowser, safeDocument } from '../ssr/ssr';

interface TextBoundProps {
  data: string[];
  bound: 'width' | 'height';
  viewBox: string;
  fontSize: string;
  svgWidth: string;
  svgHeight: string;
}

export const textBound = ({
  bound,
  data,
  fontSize,
  svgHeight,
  svgWidth,
  viewBox,
}: TextBoundProps): number => {
  // SSR-safe: Return 0 if not in browser or no data
  if (!isBrowser() || !data.length) {
    return 0;
  }

  const doc = safeDocument();
  if (!doc) {
    return 0;
  }

  const svgContainer = createSVGElement('svg');
  if (!svgContainer) {
    return 0;
  }

  svgContainer.setAttribute(
    'style',
    'position: absolute; visibility: hidden; top: -9999px; left: -9999px;'
  );
  svgContainer.setAttribute('viewBox', viewBox);
  svgContainer.setAttribute('width', svgWidth);
  svgContainer.setAttribute('height', svgHeight);
  doc.body.appendChild(svgContainer);

  const sizes = data.map((d: string) => {
    const text = createSVGElement('text');
    if (!text) {
      return 0;
    }
    text.setAttribute('font-size', fontSize);
    text.textContent = d;
    svgContainer.appendChild(text);
    const size = text.getBBox()[bound];
    text.remove();
    return size;
  });

  svgContainer.remove();
  return Math.max(...sizes, 0); // Ensure at least 0 is returned
};
