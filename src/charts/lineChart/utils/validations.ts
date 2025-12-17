import type { TickData } from '@/components/tick/tick.types';
import type { ChartError, ErrorType } from '@/types/errors.type';
import {
  BuildError,
  buildCanvasDimensionsError,
  buildError,
} from '@/utils/buildErrors/buildErrors';

import { AXIS_VALIDATION } from '../../constants/chartDefaults';
import type { IDataPoint } from '../lineChart.type';

type ValidateData = (params: {
  data: IDataPoint[];
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}) => { error: Omit<ChartError, 'type'> | undefined };

export const validateData: ValidateData = ({ data, addError }) => {
  let error: Omit<ChartError, 'type'> | undefined = undefined;
  if (!data || data.length === 0) {
    const dataError = {
      error: buildError(BuildError.LINE_CHART_NO_DATA),
    };
    addError?.('LINE_CHART_CONTEXT_ERROR', dataError);
    error = dataError;
  }

  if (data && data.length === 1) {
    const singlePointError = {
      error: buildError(BuildError.LINE_CHART_SINGLE_POINT),
    };
    addError?.('LINE_CHART_CONTEXT_ERROR', singlePointError);
    error = singlePointError;
  }
  return { error };
};

type ValidateCanvasDimensions = (params: {
  canvasWidth: number;
  canvasHeight: number;
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}) => { error: Omit<ChartError, 'type'> | undefined };

export const validateCanvasDimensions: ValidateCanvasDimensions = ({
  canvasWidth,
  canvasHeight,
  addError,
}) => {
  let error: Omit<ChartError, 'type'> | undefined = undefined;
  if (canvasWidth <= 0 || canvasHeight <= 0) {
    const canvasError = {
      error: buildCanvasDimensionsError(canvasWidth, canvasHeight),
    };
    addError?.('LINE_CHART_CONTEXT_ERROR', canvasError);
    error = canvasError;
  }
  return { error };
};

type ValidateYTickValues = (params: {
  yTickValues: TickData[];
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}) => { error: Omit<ChartError, 'type'> | undefined };

export const validateYTickValues: ValidateYTickValues = ({ yTickValues, addError }) => {
  let error: Omit<ChartError, 'type'> | undefined = undefined;
  if (yTickValues) {
    const hasInsufficientTicks = yTickValues.length < AXIS_VALIDATION.MIN_TICK_COUNT;
    const hasIdenticalValues =
      yTickValues.length >= AXIS_VALIDATION.MIN_TICK_COUNT &&
      new Set(yTickValues.map(tick => tick.value)).size === AXIS_VALIDATION.UNIQUE_VALUE_THRESHOLD;

    if (hasInsufficientTicks) {
      const yAxisError = {
        error: buildError(BuildError.LINE_CHART_Y_AXIS_INSUFFICIENT_TICKS),
      };
      addError?.('LINE_CHART_Y_AXIS_ERROR', yAxisError);
      if (!error) {
        error = yAxisError;
      }
    }

    if (hasIdenticalValues) {
      const yAxisError = {
        error: buildError(BuildError.LINE_CHART_Y_AXIS_IDENTICAL_VALUES),
      };
      addError?.('LINE_CHART_Y_AXIS_ERROR', yAxisError);
      if (!error) {
        error = yAxisError;
      }
    }
  }
  return { error };
};

type ValidateXTickValues = (params: {
  xTickValues: TickData[];
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}) => { error: Omit<ChartError, 'type'> | undefined };

export const validateXTickValues: ValidateXTickValues = ({ xTickValues, addError }) => {
  let error: Omit<ChartError, 'type'> | undefined = undefined;
  // Validate X-axis tick values
  if (xTickValues) {
    if ((xTickValues ?? []).some(({ position }) => isNaN(position))) {
      const xTickError = {
        error: buildError(BuildError.INVALID_X_TICK),
      };
      addError?.('LINE_CHART_CONTEXT_ERROR', xTickError);
      error = xTickError;
    }
    const hasInsufficientTicks = xTickValues.length < AXIS_VALIDATION.MIN_TICK_COUNT;
    const hasIdenticalValues =
      xTickValues.length >= AXIS_VALIDATION.MIN_TICK_COUNT &&
      new Set(xTickValues.map(tick => tick.value)).size === AXIS_VALIDATION.UNIQUE_VALUE_THRESHOLD;

    if (hasInsufficientTicks) {
      const xAxisError = {
        error: buildError(BuildError.LINE_CHART_X_AXIS_INSUFFICIENT_TICKS),
      };
      addError?.('LINE_CHART_X_AXIS_ERROR', xAxisError);
      if (!error) {
        error = xAxisError;
      }
    }

    if (hasIdenticalValues) {
      const xAxisError = {
        error: buildError(BuildError.LINE_CHART_X_AXIS_IDENTICAL_VALUES),
      };
      addError?.('LINE_CHART_X_AXIS_ERROR', xAxisError);
      if (!error) {
        error = xAxisError;
      }
    }
  }
  return { error };
};

type ValidateXCoordinates = (params: {
  xCoordinates: { x1: number; x2: number };
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}) => { error: Omit<ChartError, 'type'> | undefined };

export const validateXCoordinates: ValidateXCoordinates = ({ xCoordinates, addError }) => {
  let error: Omit<ChartError, 'type'> | undefined = undefined;
  if (xCoordinates.x1 === xCoordinates.x2) {
    const xAxisError = {
      error: buildError(BuildError.LINE_CHART_X_AXIS_ZERO_LENGTH),
    };
    addError?.('LINE_CHART_X_AXIS_ERROR', xAxisError);

    error = xAxisError;
  }
  return { error };
};

type ValidateYCoordinates = (params: {
  yCoordinates: { y1: number; y2: number };
  addError?: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
}) => { error: Omit<ChartError, 'type'> | undefined };

export const validateYCoordinates: ValidateYCoordinates = ({ yCoordinates, addError }) => {
  let error: Omit<ChartError, 'type'> | undefined = undefined;
  if (yCoordinates.y1 === yCoordinates.y2) {
    const yAxisError = {
      error: buildError(BuildError.LINE_CHART_Y_AXIS_ZERO_LENGTH),
    };
    addError?.('LINE_CHART_Y_AXIS_ERROR', yAxisError);
    if (!error) {
      error = yAxisError;
    }
  }
  return { error };
};
