import { useEffect, useRef } from 'react';

interface UseIndicatorReturn {
  pathRef: React.MutableRefObject<SVGPathElement | null>;
  indicatorRef: React.MutableRefObject<SVGSVGElement | null>;
}

export const useIndicator = (xPosition: number, implement: boolean): UseIndicatorReturn => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const indicatorRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!implement || !pathRef.current || !indicatorRef.current) {
      return;
    }

    const path = pathRef.current;
    const indicator = indicatorRef.current;
    const pathLength = path.getTotalLength();

    let start = 0;
    let end = pathLength;
    let mid, points;

    // find the point on the path where the x position is, using binary search
    while (end - start > 0.01) {
      mid = (start + end) / 2;
      points = path.getPointAtLength(mid);
      if (points.x < xPosition) {
        start = mid;
      } else {
        end = mid;
      }
    }

    const point = path.getPointAtLength(end);

    indicator.setAttribute('transform', `translate(${point.x}, ${point.y})`);
    indicator.setAttribute('pointer-events', 'none');
  }, [xPosition]);

  return { indicatorRef, pathRef };
};
