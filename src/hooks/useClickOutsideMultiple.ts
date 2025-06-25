import { useEffect } from 'react';

export function useClickOutsideMultiple(
  refs: React.RefObject<HTMLElement>[],
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const validRefs = refs.filter((ref) => ref.current !== null);
      if (validRefs.length === 0) return;

      let matchFound = false;
      validRefs.forEach((ref) => {
        if (ref.current!.contains(target)) {
          matchFound = true;
        }
      });

      if (!matchFound) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, setIsOpen, enabled]);
}
