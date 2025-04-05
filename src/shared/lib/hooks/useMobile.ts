// import * as React from 'react';

// const MOBILE_BREAKPOINT = 768;

// export function useIsMobile() {
//   const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
//     undefined
//   );

//   React.useEffect(() => {
//     const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
//     const onChange = () => {
//       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     };
//     mql.addEventListener('change', onChange);
//     setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     return () => mql.removeEventListener('change', onChange);
//   }, []);

//   return !!isMobile;
// }

//해당 코드는 뷰포트 768을 기준으로 모바일인지 아닌지 판단하는 커스텀훅임. 다음과 같이 사용할 수 있음.
// const isMobile = useIsMobile();

// return (
//   <div>
//     {isMobile ? <MobileHeader /> : <DesktopHeader />}
//   </div>
// );
