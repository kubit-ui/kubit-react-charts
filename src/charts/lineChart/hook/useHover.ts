import { useCallback, useState } from 'react';

interface UseHoverProps {
  canvasHeight: number;
  canvasWidth: number;
}

interface UseHoverReturn {
  xCursor: number;
  yCursor: number;
  svgRef: (node: SVGSVGElement | null) => void;
}

const outRange = -Infinity;

export const useHover = ({ canvasHeight, canvasWidth }: UseHoverProps): UseHoverReturn => {
  const [[xCursor, yCursor], setCursor] = useState([outRange, outRange]);

  const getCursor = useCallback(
    (e: MouseEvent | Touch, node: SVGSVGElement) => {
      const { height, left, top, width } = node.getBoundingClientRect();
      // get the x and y position of the mouse
      const x = e.clientX - left;
      const y = e.clientY - top;
      // scale the x and y to the canvas size
      const xPosition = (x * canvasWidth) / width;
      const yPosition = (y * canvasHeight) / height;
      // save the positions
      setCursor([xPosition, yPosition]);
    },
    [canvasWidth, canvasHeight]
  );

  const startTouch = (e: TouchEvent) => {
    e.preventDefault();
  };

  const svgRef = useCallback(
    (node: SVGSVGElement | null) => {
      if (node) {
        node.addEventListener('touchstart', startTouch);
        node.addEventListener('touchmove', e => getCursor(e.touches[0], node));
        node.addEventListener('mousemove', e => getCursor(e, node));
      }
      node?.removeEventListener('touchstart', startTouch);
      node?.removeEventListener('touchmove', e => getCursor(e.touches[0], node));
      node?.removeEventListener('mousemove', e => getCursor(e, node));
    },
    [canvasHeight, canvasWidth]
  );

  return { svgRef, xCursor, yCursor };
};
