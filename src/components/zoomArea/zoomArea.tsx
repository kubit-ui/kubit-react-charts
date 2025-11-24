import { useMemo, useRef } from 'react';

import { SvgContainer } from '@/components/svgContainer/svgContainer';
import { getFocusConfig } from '@/utils/calculateFocusOutline/calculateFocusOutline';
import { getDataFingerprint } from '@/utils/getDataFingerprint/getDataFingerprint';

import { FocusRing } from '../focusRing/focusRing';
import { LineRenderer } from './components/LineRenderer';
import { SelectionArea } from './components/SelectionArea';
import { ZoomHandler } from './components/ZoomHandler';
import { useDragInteraction } from './hooks/useDragInteraction';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { useResponsiveCanvas } from './hooks/useResponsiveCanvas';
import { useZoomAreaFocus } from './hooks/useZoomAreaFocus';
import { useZoomData } from './hooks/useZoomData';
import { generateAccessibilityLabels } from './utils/accessibilityLabels';
import { getInteractionConfig } from './utils/interactionConfig';
import { calculateLinesPathData } from './utils/pathGeneration';
import { calculateHandlerPositions } from './utils/rangeAndPositions';
import { getSelectionConfig } from './utils/selectionConfig';
import { ZoomAreaElements, type ZoomAreaProps } from './zoomArea.type';

/**
 * `ZoomArea` component that renders a scaled chart with draggable zoom handlers for interactive data filtering.
 *
 * It includes full keyboard navigation support, accessibility features, and customizable appearance.
 *
 * @param props - See {@link ZoomAreaProps} for detailed documentation of all available properties.
 *
 * @returns A React functional component that renders an SVG-based zoom area with interactive handlers and accessibility features.
 */
export const ZoomArea: React.FC<ZoomAreaProps> = ({
  ariaHidden,
  ariaLabel,
  backgroundColor,
  canvasConfig, // Optional - auto-calculated based on width/height if not provided
  caption,
  classNames,
  data,
  focusConfig,
  handlerConfig,
  height = '40px', // 2.5rem, defined by size_400 token in Figma
  initialRange,
  interactionConfig,
  lines,
  onDataChange,
  role,
  screenReaderTextConfig,
  selectionConfig,
  width = '100%',
  xKey,
  ...eventHandlers
}) => {
  const dataTestId = 'zoom-area';

  // Resolve interaction config with defaults
  const resolvedInteractionConfig = getInteractionConfig(interactionConfig);

  // Resolve selection config with defaults
  const resolvedSelectionConfig = getSelectionConfig(selectionConfig);

  // Resolve focus config with defaults
  const resolvedFocusConfig = getFocusConfig(focusConfig);

  // Hook for core data filtering functionality
  const { currentRange, handleRangeChange } = useZoomData({
    data,
    initialRange,
    onDataChange,
  });

  // Hook for responsive dimensions of the component when set as percentage
  const { parsedCanvas, viewBox } = useResponsiveCanvas({
    canvasConfig,
    dataTestId,
    height,
    width,
  });

  // Create a fingerprint of the data/lines to avoid unnecessary updates
  const dataFingerprint = getDataFingerprint(data);
  const linesFingerprint = JSON.stringify(lines);

  // Create ref for SelectionArea to enable separate focus ring rendering
  const selectionAreaRef = useRef<SVGRectElement>(null);

  const accessibilityLabels = generateAccessibilityLabels(
    data,
    xKey,
    currentRange,
    screenReaderTextConfig
  );

  // Memoize expensive line calculations
  const linesData = useMemo(() => {
    return calculateLinesPathData(data, lines, parsedCanvas.width, parsedCanvas.height);
  }, [dataFingerprint, linesFingerprint, parsedCanvas.width, parsedCanvas.height]);

  // Memoize handler positions calculation
  const { endX, startX } = useMemo(
    () => calculateHandlerPositions(currentRange, data.length, parsedCanvas.width),
    [currentRange, dataFingerprint, parsedCanvas.width]
  );

  // Interaction hooks
  const { handleBlur, handleFocus, isFocused } = useZoomAreaFocus();
  const { handleKeyDown } = useKeyboardNavigation({
    currentRange,
    dataLength: data.length,
    interactionConfig: resolvedInteractionConfig,
    onRangeChange: handleRangeChange,
  });
  const { groupRef, handleMouseDown, handleTouchStart } = useDragInteraction({
    currentRange,
    dataLength: data.length,
    interactionConfig: resolvedInteractionConfig,
    onRangeChange: handleRangeChange,
    width: parsedCanvas.width,
  });

  return (
    <SvgContainer
      ref={groupRef}
      ariaHidden={ariaHidden}
      ariaLabel={ariaLabel}
      backgroundColor={backgroundColor}
      caption={caption}
      className={classNames}
      data-testid={dataTestId}
      height={height}
      // set overflow visible so handlers and focus rings are visible always
      overflow="visible"
      role={role}
      viewBox={viewBox}
      width={width}
      {...eventHandlers}
    >
      {/* Render all lines */}
      <LineRenderer linesData={linesData} />

      {/* Selection area overlay - rendered below handlers */}
      <SelectionArea
        ref={selectionAreaRef}
        currentRange={currentRange}
        dataLength={data.length}
        dataTestId={`${dataTestId}-selection-area`}
        endX={endX}
        height={parsedCanvas.height}
        screenReaderText={accessibilityLabels.selectionArea}
        selectionConfig={resolvedSelectionConfig}
        startX={startX}
        onBlur={handleBlur}
        onFocus={handleFocus(ZoomAreaElements.SELECTION_AREA)}
        onKeyDown={handleKeyDown(ZoomAreaElements.SELECTION_AREA)}
        onMouseDown={handleMouseDown(ZoomAreaElements.SELECTION_AREA)}
        onTouchStart={handleTouchStart(ZoomAreaElements.SELECTION_AREA)}
      />

      {/* Start handler */}
      <ZoomHandler
        dataTestId={`${dataTestId}-start-handler`}
        focusConfig={resolvedFocusConfig}
        handlerConfig={handlerConfig}
        height={parsedCanvas.height}
        isFocused={isFocused(ZoomAreaElements.START_HANDLER)}
        max={currentRange.end - resolvedInteractionConfig.minHandlerDistance}
        min={0}
        screenReaderText={accessibilityLabels.startHandler}
        type={ZoomAreaElements.START_HANDLER}
        value={currentRange.start}
        x={startX}
        onBlur={handleBlur}
        onFocus={handleFocus(ZoomAreaElements.START_HANDLER)}
        onKeyDown={handleKeyDown(ZoomAreaElements.START_HANDLER)}
        onMouseDown={handleMouseDown(ZoomAreaElements.START_HANDLER)}
        onTouchStart={handleTouchStart(ZoomAreaElements.START_HANDLER)}
      />

      {/* End handler */}
      <ZoomHandler
        dataTestId={`${dataTestId}-end-handler`}
        focusConfig={resolvedFocusConfig}
        handlerConfig={handlerConfig}
        height={parsedCanvas.height}
        isFocused={isFocused(ZoomAreaElements.END_HANDLER)}
        max={data.length - 1}
        min={currentRange.start + resolvedInteractionConfig.minHandlerDistance}
        screenReaderText={accessibilityLabels.endHandler}
        type={ZoomAreaElements.END_HANDLER}
        value={currentRange.end}
        x={endX}
        onBlur={handleBlur}
        onFocus={handleFocus(ZoomAreaElements.END_HANDLER)}
        onKeyDown={handleKeyDown(ZoomAreaElements.END_HANDLER)}
        onMouseDown={handleMouseDown(ZoomAreaElements.END_HANDLER)}
        onTouchStart={handleTouchStart(ZoomAreaElements.END_HANDLER)}
      />

      {/* Selection area focus ring - rendered above handlers for correct z-order */}
      <FocusRing
        dataTestId="selection-area-focus"
        focusConfig={{ ...resolvedFocusConfig, variant: 'bounding-box' }}
        isFocused={isFocused(ZoomAreaElements.SELECTION_AREA)}
        targetRef={selectionAreaRef}
      />
    </SvgContainer>
  );
};
