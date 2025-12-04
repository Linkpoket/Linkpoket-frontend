import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollProps {
  cardsLength: number;
  initialVisibleCount?: number;
  loadMoreCount?: number;
  threshold?: number;
}

export const useInfiniteScroll = ({
  cardsLength,
  initialVisibleCount = 12,
  loadMoreCount = 12,
  threshold = 200,
}: UseInfiniteScrollProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(initialVisibleCount);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onScroll = () => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - threshold) {
        setVisibleCount((c) => Math.min(cardsLength, c + loadMoreCount));
      }
    };

    el.addEventListener('scroll', onScroll, {
      passive: true,
    } as AddEventListenerOptions);

    return () => el.removeEventListener('scroll', onScroll);
  }, [cardsLength, threshold, loadMoreCount]);

  useEffect(() => {
    setVisibleCount(Math.min(initialVisibleCount, cardsLength));
  }, [cardsLength, initialVisibleCount]);

  return {
    listRef,
    visibleCount,
  };
};
