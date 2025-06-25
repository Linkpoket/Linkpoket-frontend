import { useCallback, useRef } from 'react';

type DebouncedFunction<T> = (value: T) => void;

export function useDebounce<T>(
  callback: (value: T) => void,
  delay: number
): DebouncedFunction<T> {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (value: T) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay]
  );
}
