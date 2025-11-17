import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import { useUserStore } from '@/stores/userStore';
import { UserActions } from '@/components/header/UserActions';
import { AuthButtons } from '@/components/header/AuthButtons';
import useFetchJoinedPage from '@/hooks/queries/useFetchJoinedPage';
import {
  baseCards,
  DEFAULT_SHARED_PAGE_IMAGE,
  HomeCard,
} from '@/constants/homeCards';
import { resolvePageImageUrl } from '@/utils/resolvePageImageUrl';

export default function MobileHome() {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { nickname, isLoggedIn } = useUserStore();

  // 공유 페이지 데이터 가져오기
  const { joinedPage } = useFetchJoinedPage();

  // 동적으로 카드 목록 생성 (기본 카드 + 공유 페이지 카드)
  const [allCards, setAllCards] = useState<HomeCard[]>(baseCards);

  useEffect(() => {
    // 공유 페이지 카드 생성
    const sharedPageCards: HomeCard[] = (joinedPage || []).map(
      (page: any, index: number) => ({
        id: `shared-page-${page.pageId}`,
        title: page.pageTitle || `공유 페이지 ${index + 1}`,
        category: 'shared',
        tags: ['collaboration', 'team', 'project'],
        interestedCount: page.memberCount || 0,
        backgroundImage: resolvePageImageUrl(
          page.pageImageUrl,
          DEFAULT_SHARED_PAGE_IMAGE
        ),
        pageId: page.pageId,
        isSharedPage: true,
      })
    );

    // 기본 카드 + 공유 페이지 카드 합치기
    setAllCards([...baseCards, ...sharedPageCards]);
  }, [joinedPage]);

  // === Infinite loop setup ===
  const L = allCards.length;
  const CLONES = 13; // 홀수 권장 (조금 더 여유)
  const MIDDLE_BLOCK = Math.floor(CLONES / 2);
  const EXT_LEN = L * CLONES;
  const START_GLOBAL_INDEX = L * MIDDLE_BLOCK; // 중앙 블록의 첫 카드 (개인페이지)

  const cards = Array.from({ length: EXT_LEN }, (_, i) => allCards[i % L]);

  const trackRef = useRef<HTMLDivElement>(null);
  const [nearestGlobal, setNearestGlobal] =
    useState<number>(START_GLOBAL_INDEX);
  const nearestRef = useRef<number>(START_GLOBAL_INDEX);
  const rafRef = useRef<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 가운데 정렬
  const centerOn = (globalIndex: number, behavior: ScrollBehavior = 'auto') => {
    const track = trackRef.current;
    if (!track) return;
    const el = track.children[globalIndex] as HTMLElement | undefined;
    if (!el) return;
    const center = el.offsetLeft + el.offsetWidth / 2;
    const targetLeft = center - track.clientWidth / 2;
    track.scrollTo({ left: targetLeft, behavior });
  };

  // 초기 위치
  useLayoutEffect(() => {
    // 약간의 지연 후 초기 위치 설정
    const timer = setTimeout(() => {
      console.log('🎯 초기 위치 설정:', {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCards]);

  // 스크롤 중: 화면 중심과 가장 가까운 카드 계산 (강조/점 표시용)
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

  // 스크롤 종료 시(디바운스) -> 하드-엔드(양쪽 끝)에서만 처음으로 순간이동
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const idx = nearestRef.current;

        // === 하드-엔드(진짜 끝) 감지 ===
        const atHardRight =
          track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        const atHardLeft = track.scrollLeft <= 2;

        if (atHardRight || atHardLeft) {
          const target = START_GLOBAL_INDEX; // 중앙 블록 첫 카드(사실상의 '처음')
          requestAnimationFrame(() => {
            centerOn(target, 'auto'); // 순간 점프
            setNearestGlobal(target);
            nearestRef.current = target;
          });
          return;
        }

        // (선택) 완충 경계 점프가 필요 없으면 아래 두 블록은 삭제해도 됨
        if (idx < L) {
          const target = idx + L * MIDDLE_BLOCK;
          requestAnimationFrame(() => {
            centerOn(target, 'auto');
            setNearestGlobal(target);
            nearestRef.current = target;
          });
          return;
        }
        if (idx >= L * (CLONES - 1)) {
          const target = idx - L * MIDDLE_BLOCK;
          requestAnimationFrame(() => {
            centerOn(target, 'auto');
            setNearestGlobal(target);
            nearestRef.current = target;
          });
          return;
        }
      }, 120); // 120ms 동안 추가 스크롤 없으면 "정지"로 판단
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

  if (!isMobile) return null;

  const activeIndex = nearestGlobal % L;

  // 점을 눌렀을 때 현재와 가장 가까운 중앙 블록 위치로 이동
  const goToDot = (dotIndex: number) => {
    const centralStart = L * MIDDLE_BLOCK;
    const target = centralStart + dotIndex; // 중앙 블록의 해당 카드
    centerOn(target, 'smooth');
    setNearestGlobal(target);
    nearestRef.current = target;
  };

  // 카드 클릭 핸들러
  const handleCardClick = (card: HomeCard) => {
    console.log('Card clicked:', card.title);

    // 공유 페이지 카드인 경우
    if (card.isSharedPage && card.pageId) {
      navigate(`/shared/${card.pageId}`);
      return;
    }

    // 기본 카드들
    switch (card.id) {
      case 'space-travel': // 개인 페이지
        navigate('/');
        break;
      case 'ocean-life': // 북마크
        navigate('/bookmarks');
        break;
      default:
        console.log('Unknown card:', card.id);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-6 pt-12">
        <div>
          <p className="text-sm text-gray-500">Hi {nickname || 'User'}</p>
          <h1 className="text-3xl font-black text-black">LINKREW</h1>
        </div>
        <div className="flex items-center gap-[24px]">
          {isLoggedIn ? <UserActions /> : <AuthButtons />}
        </div>
      </div>

      {/* 모바일 캐러셀 */}
      <div className="mt-16 pb-10">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="scrollbar-none mx-auto flex max-w-md snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 perspective-[1200px]"
          style={{
            WebkitOverflowScrolling: 'touch' as any,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            // 프로그램적으로 스크롤할 때 부드럽게
            scrollBehavior: 'smooth' as any,
          }}
        >
          {cards.map((card, globalIndex) => {
            const delta = globalIndex - nearestGlobal;
            const ad = Math.abs(delta);

            // 느린 전환(700ms)
            const scale = Math.max(0.88, 1 - ad * 0.08);
            const opacity = Math.max(0.6, 1 - ad * 0.22);
            const rotateY = delta * -6;
            const zIndex = 100 - ad;
            const blur =
              ad === 0 ? 'blur-0' : ad === 1 ? 'blur-[0.4px]' : 'blur-[1.0px]';

            return (
              <article
                key={`${card.id}-${globalIndex}`}
                data-card
                className={`relative h-96 min-h-80 w-[76%] shrink-0 snap-center overflow-hidden rounded-3xl shadow-2xl max-[375px]:h-80 max-[375px]:w-[76%] ${blur} ${card.id === 'ocean-life' ? 'cursor-pointer' : ''}`}
                style={{
                  transform: `translateZ(0) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition:
                    'transform 700ms cubic-bezier(.2,.8,.2,1), opacity 700ms ease, filter 700ms ease',
                }}
                aria-label={card.title}
                onClick={() => handleCardClick(card)}
              >
                {/* 배경 */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${card.backgroundImage})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                {card.isPopular && (
                  <div className="absolute top-4 left-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-white transition ${activeIndex === globalIndex % L ? 'bg-pink-500' : 'bg-pink-500/70'}`}
                    >
                      PERSONAL
                    </span>
                  </div>
                )}

                {/* 북마크 아이콘 (북마크 카드에만 표시) */}
                {card.id === 'ocean-life' && (
                  <div className="absolute top-4 right-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-8 w-8 text-orange-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                {/* 내용 */}
                <div className="absolute right-6 bottom-20 left-6">
                  <h2 className="mb-4 text-4xl leading-tight font-bold text-white">
                    {card.title.split(' ').map((w, i) => (
                      <div key={i}>{w}</div>
                    ))}
                  </h2>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {card.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-white/80 px-3 py-1 text-sm text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-purple-500"
                        />
                      ))}
                    </div>
                    <span className="ml-3 text-sm text-white">
                      {card.interestedCount} people interested
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 하단 점(인디케이터) */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {allCards.map((c, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={c.id}
                onClick={() => goToDot(i)}
                aria-label={`Go to ${c.title}`}
                className={`relative h-2 rounded-full transition-all ${active ? 'w-6 bg-black' : 'w-2 bg-black/30'} `}
                style={{ borderRadius: '9999px' }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
