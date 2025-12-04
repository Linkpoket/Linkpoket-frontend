import { useEffect, useState } from 'react';
import { useMobile } from '@/hooks/useMobile';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const scrollElement = document.getElementById('app-scroll-container');
    const target: HTMLElement | Window = scrollElement ?? window;

    const getScrollTop = () =>
      scrollElement ? scrollElement.scrollTop : window.scrollY;

    const handleScroll = () => {
      setIsVisible(getScrollTop() > 10);
    };

    handleScroll();
    target.addEventListener('scroll', handleScroll);
    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    const scrollElement = document.getElementById('app-scroll-container');
    if (scrollElement) {
      scrollElement.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible || isMobile) return null;

  return (
    <button
      onClick={handleScrollToTop}
      aria-label="맨 위로 이동"
      className="bg-gray-90 hover:bg-gray-70 animate-bounce-slow fixed right-12 bottom-12 z-[9999] flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 19V5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
