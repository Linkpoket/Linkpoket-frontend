import { useCallback, useRef } from 'react';

export function useDebouncedCallback<T>(
  callback: (value: T) => void,
  delay: number
): (value: T) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (value: T) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(value), delay);
    },
    [callback, delay]
  );
}
