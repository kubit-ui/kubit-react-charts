import { useEffect, useImperativeHandle, useRef } from 'react';

type CustomEvent = MouseEvent & { autoClick?: boolean };
type UseAutoClickReturn<T> = [React.MutableRefObject<T | null>, React.MutableRefObject<boolean>];

export const useAutoClick = <T>(ref: React.ForwardedRef<T | null>): UseAutoClickReturn<T> => {
  const autoClick = useRef<boolean>(false);
  const innerRef = useRef<T | null>(null);

  useImperativeHandle(ref, () => innerRef.current as T, []);

  const handleClick = (e: CustomEvent) => {
    autoClick.current = !!e.autoClick;
  };

  useEffect(() => {
    if (!innerRef.current) {
      return;
    }
    const element = innerRef.current as unknown as HTMLElement;
    element.addEventListener('click', handleClick);
    // eslint-disable-next-line consistent-return
    return () => element.removeEventListener('click', handleClick);
  }, []);

  return [innerRef, autoClick];
};
