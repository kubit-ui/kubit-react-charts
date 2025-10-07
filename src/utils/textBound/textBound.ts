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
  if (!window || !document || !data.length) {
    return 0;
  }
  const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgContainer.setAttribute(
    'style',
    'position: absolute; visibility: hidden; top: -9999px; left: -9999px;'
  );
  svgContainer.setAttribute('viewBox', viewBox);
  svgContainer.setAttribute('width', svgWidth);
  svgContainer.setAttribute('height', svgHeight);
  document.body.appendChild(svgContainer);

  const sizes = data.map((d: string) => {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('font-size', fontSize);
    text.textContent = d;
    svgContainer.appendChild(text);
    const size = text.getBBox()[bound];
    text.remove();
    return size;
  });

  svgContainer.remove();
  return Math.max(...sizes);
};
