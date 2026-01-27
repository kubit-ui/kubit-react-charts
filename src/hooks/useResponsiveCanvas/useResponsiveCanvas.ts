import { useEffect, useMemo, useState } from 'react';

import { buildViewBox } from '@/components/svgContainer/utils/buildViewBox/buildViewBox';
import type { CanvasConfig } from '@/types/canvas.type';
import { getCanvasDimensions } from '@/utils/getCanvasDimensions/getCanvasDimensions';
import { parseStringToNumberPx } from '@/utils/parseStringToNumberPx.ts/parseStringToNumberPx';
import { isBrowser, safeQuerySelector } from '@/utils/ssr/ssr';

/**
 * Universal responsive canvas hook for chart components.
 *
 * Manages canvas dimensions, responsive behavior, and viewBox calculation.
 * Designed to eventually replace the legacy canvasConfig pattern across all chart components.
 *
 * Features:
 * - Responsive dimensions with ResizeObserver
 * - Automatic viewBox calculation
 * - Backward compatibility with canvasConfig
 * - Modern width/height prop API
 *
 * @param width - Canvas width (string with units or number in px)
 * @param height - Canvas height (string with units or number in px)
 * @param dataTestId - Unique identifier for the SVG element
 * @param canvasConfig - Legacy canvas configuration (optional, for backward compatibility)
 * @param extraSpace - Additional space around the canvas (default: 0)
 * @returns Object containing parsed dimensions and viewBox
 *
 * **Return Values:**
 * - `parsedCanvas`: Final calculated dimensions in pixels
 * - `viewBox`: SVG viewBox string for responsive scaling
 *
 * @example
 * ```tsx
 * // Modern API
 * const { parsedCanvas, viewBox } = useResponsiveCanvas({
 *   width: "70%",
 *   height: 400,
 *   dataTestId: "my-chart",
 *   extraSpace: 10
 * });
 *
 * // Legacy compatibility
 * const { parsedCanvas, viewBox } = useResponsiveCanvas({
 *   width: "100%",
 *   height: 300,
 *   dataTestId: "legacy-chart",
 *   canvasConfig: { width: "100%", height: 300, extraSpace: 5 }
 * });
 * ```
 */

interface UseResponsiveCanvasParams {
  width: string | number;
  height: string | number;
  dataTestId: string;
  canvasConfig?: CanvasConfig; // Legacy support
  extraSpace?: number | string;
}

interface UseResponsiveCanvasReturn {
  /** Parsed canvas dimensions in pixels */
  parsedCanvas: { width: number; height: number };
  /** SVG viewBox string */
  viewBox: string;
  /** Parsed extra space in pixels (optional) */
  parsedCanvasExtraSpace?: number;
}

export const useResponsiveCanvas = ({
  canvasConfig,
  dataTestId,
  extraSpace = 0,
  height,
  width,
}: UseResponsiveCanvasParams): UseResponsiveCanvasReturn => {
  // State for parsed/calculated dimensions
  const [parsedCanvas, setParsedCanvas] = useState<{
    width: number;
    height: number;
  }>({
    height: 0,
    width: 0,
  });

  // Determine effective configuration (legacy vs modern API)
  const effectiveCanvasConfig = useMemo(() => {
    if (canvasConfig) {
      // Legacy mode: use provided canvasConfig
      return canvasConfig;
    }
    // Modern mode: construct from height and width props
    return {
      extraSpace,
      height,
      width,
    };
  }, [canvasConfig, width, height, extraSpace]);

  // Extract and parse canvas configuration
  const {
    extraSpace: canvasExtraSpace,
    height: canvasHeight,
    width: canvasWidth,
  } = effectiveCanvasConfig;

  const parsedCanvasExtraSpace = canvasExtraSpace
    ? parseStringToNumberPx(canvasExtraSpace)
    : undefined;

  // Set up responsive dimensions with ResizeObserver
  useEffect(() => {
    // SSR-safe: Skip effect if not in browser
    if (!isBrowser()) {
      return;
    }

    // Find the SVG element for this specific component instance
    const svgElement = safeQuerySelector<SVGSVGElement>(`[data-testid="${dataTestId}"]`);
    if (!svgElement) {
      return;
    }

    const calculateDimensions = () => {
      const { parsedCanvasHeight, parsedCanvasWidth } = getCanvasDimensions({
        canvasHeight,
        canvasWidth,
        svgElement,
      });

      setParsedCanvas({
        height: parsedCanvasHeight,
        width: parsedCanvasWidth,
      });
    };

    // Calculate initial dimensions
    calculateDimensions();

    // Set up ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(() => {
      calculateDimensions();
    });

    // Start observing size changes
    resizeObserver.observe(svgElement);

    // Cleanup function
    // eslint-disable-next-line consistent-return
    return () => {
      resizeObserver.disconnect();
    };
  }, [canvasWidth, canvasHeight, dataTestId]);

  // Calculate viewBox based on parsed dimensions
  const viewBox = useMemo(() => {
    const calculatedViewBox = buildViewBox(
      parsedCanvas.width,
      parsedCanvas.height,
      parsedCanvasExtraSpace
    );

    return calculatedViewBox;
  }, [parsedCanvas.width, parsedCanvas.height, parsedCanvasExtraSpace]);

  return {
    parsedCanvas,
    parsedCanvasExtraSpace,
    viewBox,
  };
};
