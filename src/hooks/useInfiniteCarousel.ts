import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { HomeCard } from '@/constants/homeCards';

interface UseInfiniteCarouselProps {
  allCards: HomeCard[];
}

interface UseInfiniteCarouselReturn {
  cards: HomeCard[];
  trackRef: React.RefObject<HTMLDivElement>;
  nearestGlobal: number;
  activeIndex: number;
  handleScroll: () => void;
  goToDot: (dotIndex: number) => void;
}

export const useInfiniteCarousel = ({
  allCards,
}: UseInfiniteCarouselProps): UseInfiniteCarouselReturn => {
  const L = allCards.length;
  const CLONES = 5;
  const MIDDLE_BLOCK = Math.floor(CLONES / 2);
  const EXT_LEN = L * CLONES;
  const START_GLOBAL_INDEX = L * MIDDLE_BLOCK;

  const cards = Array.from({ length: EXT_LEN }, (_, i) => allCards[i % L]);

  const trackRef = useRef<HTMLDivElement>(null);
  const [nearestGlobal, setNearestGlobal] =
    useState<number>(START_GLOBAL_INDEX);
  const nearestRef = useRef<number>(START_GLOBAL_INDEX);
  const rafRef = useRef<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const centerOn = (globalIndex: number, behavior: ScrollBehavior = 'auto') => {
    const track = trackRef.current;
    if (!track) return;
    const el = track.children[globalIndex] as HTMLElement | undefined;
    if (!el) return;
    const center = el.offsetLeft + el.offsetWidth / 2;
    const targetLeft = center - track.clientWidth / 2;
    track.scrollTo({ left: targetLeft, behavior });
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      console.log('🎯 [MOBILE] 초기 위치 설정:', {
        START_GLOBAL_INDEX,
        L,
        MIDDLE_BLOCK,
        firstCard: allCards[0]?.title,
        targetCard: allCards[START_GLOBAL_INDEX % L]?.title,
      });
      centerOn(START_GLOBAL_INDEX, 'auto');
      setNearestGlobal(START_GLOBAL_INDEX);
      nearestRef.current = START_GLOBAL_INDEX;
    }, 100);

    return () => clearTimeout(timer);
  }, [allCards, L, START_GLOBAL_INDEX, MIDDLE_BLOCK]);

  const handleScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const centerX = track.scrollLeft + track.clientWidth / 2;

      let closestIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < track.children.length; i++) {
        const el = track.children[i] as HTMLElement;
        if (!el?.dataset.card) continue;
        const cardCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(cardCenter - centerX);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = i;
        }
      }
      setNearestGlobal(closestIdx);
      nearestRef.current = closestIdx;
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const centerX = track.scrollLeft + track.clientWidth / 2;

        let closestIdx = 0;
        let minDist = Infinity;
        for (let i = 0; i < track.children.length; i++) {
          const el = track.children[i] as HTMLElement;
          if (!el?.dataset.card) continue;
          const cardCenter = el.offsetLeft + el.offsetWidth / 2;
          const dist = Math.abs(cardCenter - centerX);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = i;
          }
        }

        const idx = closestIdx;

        const atHardRight =
          track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        const atHardLeft = track.scrollLeft <= 2;

        if (atHardRight || atHardLeft) {
          const target = START_GLOBAL_INDEX;
          requestAnimationFrame(() => {
            centerOn(target, 'smooth');
            setNearestGlobal(target);
            nearestRef.current = target;
          });
          return;
        }

        if (minDist > 5) {
          requestAnimationFrame(() => {
            centerOn(idx, 'smooth');
            setNearestGlobal(idx);
            nearestRef.current = idx;
          });
        }

        if (idx < L) {
          const target = idx + L * MIDDLE_BLOCK;
          requestAnimationFrame(() => {
            centerOn(target, 'smooth');
            setNearestGlobal(target);
            nearestRef.current = target;
          });
          return;
        }
        if (idx >= L * (CLONES - 1)) {
          const target = idx - L * MIDDLE_BLOCK;
          requestAnimationFrame(() => {
            centerOn(target, 'smooth');
            setNearestGlobal(target);
            nearestRef.current = target;
          });
          return;
        }
      }, 150);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [L, CLONES, MIDDLE_BLOCK, START_GLOBAL_INDEX]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const activeIndex = nearestGlobal % L;

  const goToDot = (dotIndex: number) => {
    const centralStart = L * MIDDLE_BLOCK;
    const target = centralStart + dotIndex;
    centerOn(target, 'smooth');
    setNearestGlobal(target);
    nearestRef.current = target;
  };

  return {
    cards,
    trackRef,
    nearestGlobal,
    activeIndex,
    handleScroll,
    goToDot,
  };
};
