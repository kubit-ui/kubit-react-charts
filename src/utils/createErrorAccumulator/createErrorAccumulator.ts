import type { ChartError, ChartErrorCollection, ErrorType } from '@/types/errors.type';

export const createErrorAccumulator = (
  onErrors?: (errors: ChartErrorCollection) => void
): {
  addError: (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => void;
  getAccumulatedErrors: () => ChartErrorCollection;
  clearErrors: () => void;
} => {
  const errors = new Map<keyof typeof ErrorType, ChartError[]>();

  const getAccumulatedErrors = (): ChartErrorCollection => {
    const result: ChartErrorCollection = {};

    // Return all errors by type as arrays (internal format)
    errors.forEach((errorArray, errorType) => {
      result[errorType] = errorArray;
    });

    return result;
  };

  const addError = (errorType: keyof typeof ErrorType, error: Omit<ChartError, 'type'>) => {
    if (!error) {
      return;
    }

    // Create complete error with type
    const completeError: ChartError = { ...error, type: errorType };

    // Get existing errors for this type or create new array
    const existingErrors = errors.get(errorType) || [];

    // Add new error to the array
    existingErrors.push(completeError);

    // Set the updated array back to the Map
    errors.set(errorType, existingErrors);

    // Call onErrors callback immediately if provided
    if (onErrors) {
      const accumulatedErrors = getAccumulatedErrors();

      // BACKWARDS COMPATIBILITY: Detect if callback expects legacy format
      // If there's only one error per type, we offer compatibility with previous format
      const compatibleErrors: ChartErrorCollection = {};

      Object.entries(accumulatedErrors).forEach(([key, errorArray]) => {
        const keyType = key as keyof typeof ErrorType;

        // If it's an error array and has only one, it might be compatible with legacy format
        if (Array.isArray(errorArray) && errorArray.length === 1) {
          // Try to determine if callback expects legacy format
          // For maximum compatibility, we offer the array but could also
          // offer the single element depending on context
          compatibleErrors[keyType] = errorArray;
        } else {
          // Multiple errors - only array format
          compatibleErrors[keyType] = errorArray;
        }
      });

      onErrors(compatibleErrors);
    }
  };

  const clearErrors = () => {
    errors.clear();

    // Call onErrors with empty object when clearing if callback is provided
    if (onErrors) {
      onErrors({});
    }
  };

  return { addError, clearErrors, getAccumulatedErrors };
};
