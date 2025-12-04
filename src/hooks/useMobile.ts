import { useEffect, useState } from 'react';

const DESKTOP_BREAKPOINT = 768;

export function useMobile() {
  const [isUnderDesktop, setIsUnderDesktop] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    // 768px 이하를 모바일로 처리 (max-width: 768px)
    const mql = window.matchMedia(`(max-width: ${DESKTOP_BREAKPOINT}px)`);

    const onChange = () => {
      setIsUnderDesktop(window.innerWidth <= DESKTOP_BREAKPOINT);
    };

    mql.addEventListener('change', onChange);

    setIsUnderDesktop(window.innerWidth <= DESKTOP_BREAKPOINT);

    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isUnderDesktop;
}
