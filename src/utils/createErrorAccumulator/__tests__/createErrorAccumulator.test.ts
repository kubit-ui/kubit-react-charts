import { describe, expect, it, vi } from 'vitest';

import { type ChartError, ErrorType } from '@/types/errors.type';

import { createErrorAccumulator } from '../createErrorAccumulator';

describe('createErrorAccumulator', () => {
  it('should create an error accumulator with required functions', () => {
    const accumulator = createErrorAccumulator();

    expect(accumulator).toHaveProperty('addError');
    expect(accumulator).toHaveProperty('getAccumulatedErrors');
    expect(accumulator).toHaveProperty('clearErrors');
    expect(typeof accumulator.addError).toBe('function');
    expect(typeof accumulator.getAccumulatedErrors).toBe('function');
    expect(typeof accumulator.clearErrors).toBe('function');
  });

  it('should accumulate multiple errors by source', () => {
    const accumulator = createErrorAccumulator();
    const error1: ChartError = {
      error: new Error('First error'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };
    const error2: ChartError = {
      error: new Error('Second error'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };
    const error3: ChartError = {
      error: new Error('Third error'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };

    accumulator.addError('LINE_CHART_CONTEXT_ERROR', error1);
    accumulator.addError('LINE_CHART_CONTEXT_ERROR', error2);
    accumulator.addError('LINE_CHART_CONTEXT_ERROR', error3);

    const errors = accumulator.getAccumulatedErrors();
    const contextErrors = errors['LINE_CHART_CONTEXT_ERROR'];

    expect(Array.isArray(contextErrors)).toBe(true);
    if (Array.isArray(contextErrors)) {
      expect(contextErrors.length).toBe(3);
      expect(contextErrors[0]?.error?.message).toBe('First error');
      expect(contextErrors[1]?.error?.message).toBe('Second error');
      expect(contextErrors[2]?.error?.message).toBe('Third error');
    }
  });

  it('should accumulate errors from different sources separately', () => {
    const accumulator = createErrorAccumulator();
    const contextError: ChartError = {
      error: new Error('Context error'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };
    const pathError: ChartError = {
      error: new Error('Path error'),
      type: ErrorType.LINE_CHART_PATH_ERROR,
    };
    const xAxisError: ChartError = {
      error: new Error('X-Axis error'),
      type: ErrorType.LINE_CHART_X_AXIS_ERROR,
    };
    const anotherContextError: ChartError = {
      error: new Error('Another context error'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };

    accumulator.addError('LINE_CHART_CONTEXT_ERROR', contextError);
    accumulator.addError('LINE_CHART_PATH_ERROR', pathError);
    accumulator.addError('LINE_CHART_X_AXIS_ERROR', xAxisError);
    accumulator.addError('LINE_CHART_CONTEXT_ERROR', anotherContextError);

    const errors = accumulator.getAccumulatedErrors();
    const contextErrors = errors['LINE_CHART_CONTEXT_ERROR'];
    const pathErrors = errors['LINE_CHART_PATH_ERROR'];
    const xAxisErrors = errors['LINE_CHART_X_AXIS_ERROR'];

    expect(Array.isArray(contextErrors)).toBe(true);
    if (Array.isArray(contextErrors)) {
      expect(contextErrors.length).toBe(2);
    }

    expect(Array.isArray(pathErrors)).toBe(true);
    if (Array.isArray(pathErrors)) {
      expect(pathErrors.length).toBe(1);
      expect(pathErrors[0]?.error?.message).toBe('Path error');
    }

    expect(Array.isArray(xAxisErrors)).toBe(true);
    if (Array.isArray(xAxisErrors)) {
      expect(xAxisErrors.length).toBe(1);
      expect(xAxisErrors[0]?.error?.message).toBe('X-Axis error');
    }
  });

  it('should return empty object when no errors are accumulated', () => {
    const accumulator = createErrorAccumulator();
    const errors = accumulator.getAccumulatedErrors();

    expect(errors).toEqual({});
  });

  it('should clear all errors', () => {
    const accumulator = createErrorAccumulator();
    const error1: ChartError = {
      error: new Error('Error 1'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };
    const error2: ChartError = {
      error: new Error('Error 2'),
      type: ErrorType.LINE_CHART_PATH_ERROR,
    };

    accumulator.addError('LINE_CHART_CONTEXT_ERROR', error1);
    accumulator.addError('LINE_CHART_PATH_ERROR', error2);

    let errors = accumulator.getAccumulatedErrors();
    expect(Object.keys(errors)).toHaveLength(2);

    accumulator.clearErrors();
    errors = accumulator.getAccumulatedErrors();
    expect(errors).toEqual({});
  });

  it('should handle null or undefined errors gracefully', () => {
    const accumulator = createErrorAccumulator();

    // @ts-expect-error - Testing null handling
    accumulator.addError('LINE_CHART_CONTEXT_ERROR', null);
    // @ts-expect-error - Testing undefined handling
    accumulator.addError('LINE_CHART_PATH_ERROR', undefined);

    const errors = accumulator.getAccumulatedErrors();
    expect(errors).toEqual({});
  });

  it('should maintain independent state across multiple accumulator instances', () => {
    const accumulator1 = createErrorAccumulator();
    const accumulator2 = createErrorAccumulator();

    const error1: ChartError = {
      error: new Error('Error 1'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };
    const error2: ChartError = {
      error: new Error('Error 2'),
      type: ErrorType.LINE_CHART_PATH_ERROR,
    };

    accumulator1.addError('LINE_CHART_CONTEXT_ERROR', error1);
    accumulator2.addError('LINE_CHART_PATH_ERROR', error2);

    const errors1 = accumulator1.getAccumulatedErrors();
    const errors2 = accumulator2.getAccumulatedErrors();

    expect(Object.keys(errors1)).toHaveLength(1);
    expect(Object.keys(errors2)).toHaveLength(1);
    expect(errors1).toHaveProperty('LINE_CHART_CONTEXT_ERROR');
    expect(errors2).toHaveProperty('LINE_CHART_PATH_ERROR');
  });

  it('should call onErrors callback when errors are added', () => {
    const onErrorsMock = vi.fn();
    const accumulator = createErrorAccumulator(onErrorsMock);

    const error: ChartError = {
      error: new Error('Test error'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };

    accumulator.addError('LINE_CHART_CONTEXT_ERROR', error);

    expect(onErrorsMock).toHaveBeenCalledTimes(1);
    expect(onErrorsMock).toHaveBeenCalledWith({
      LINE_CHART_CONTEXT_ERROR: [error],
    });
  });

  it('should call onErrors callback when errors are cleared', () => {
    const onErrorsMock = vi.fn();
    const accumulator = createErrorAccumulator(onErrorsMock);

    const error: ChartError = {
      error: new Error('Test error'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };

    accumulator.addError('LINE_CHART_CONTEXT_ERROR', error);
    expect(onErrorsMock).toHaveBeenCalledTimes(1);

    accumulator.clearErrors();
    expect(onErrorsMock).toHaveBeenCalledTimes(2);
    expect(onErrorsMock).toHaveBeenLastCalledWith({});
  });

  it('should handle multiple errors in onErrors callback', () => {
    const onErrorsMock = vi.fn();
    const accumulator = createErrorAccumulator(onErrorsMock);

    const error1: ChartError = {
      error: new Error('First error'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };
    const error2: ChartError = {
      error: new Error('Second error'),
      type: ErrorType.LINE_CHART_CONTEXT_ERROR,
    };
    const error3: ChartError = {
      error: new Error('Path error'),
      type: ErrorType.LINE_CHART_PATH_ERROR,
    };

    accumulator.addError('LINE_CHART_CONTEXT_ERROR', error1);
    accumulator.addError('LINE_CHART_CONTEXT_ERROR', error2);
    accumulator.addError('LINE_CHART_PATH_ERROR', error3);

    expect(onErrorsMock).toHaveBeenCalledTimes(3);

    // Check the final state
    const finalCall = onErrorsMock.mock.calls[2][0];
    expect(finalCall).toHaveProperty('LINE_CHART_CONTEXT_ERROR');
    expect(finalCall).toHaveProperty('LINE_CHART_PATH_ERROR');

    const contextErrors = finalCall['LINE_CHART_CONTEXT_ERROR'];
    const pathErrors = finalCall['LINE_CHART_PATH_ERROR'];

    expect(Array.isArray(contextErrors)).toBe(true);
    if (Array.isArray(contextErrors)) {
      expect(contextErrors.length).toBe(2);
    }

    expect(Array.isArray(pathErrors)).toBe(true);
    if (Array.isArray(pathErrors)) {
      expect(pathErrors.length).toBe(1);
    }
  });
});
