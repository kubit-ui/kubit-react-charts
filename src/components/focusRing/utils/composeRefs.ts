import type { ForwardedRef } from 'react';

/**
 * Composes multiple refs into a single ref callback
 * Allows using both internal and external refs simultaneously
 */
export function composeRefs<T>(
  ...refs: Array<ForwardedRef<T> | undefined>
): (instance: T | null) => void {
  return (instance: T | null) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref) {
        ref.current = instance;
      }
    });
  };
}
