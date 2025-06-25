import { useEffect, useState } from 'react';

const DESKTOP_BREAKPOINT = 768;

export function useMobile() {
  const [isUnderDesktop, setIsUnderDesktop] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${DESKTOP_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsUnderDesktop(window.innerWidth < DESKTOP_BREAKPOINT);
    };

    mql.addEventListener('change', onChange);

    setIsUnderDesktop(window.innerWidth < DESKTOP_BREAKPOINT);

    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isUnderDesktop;
}
