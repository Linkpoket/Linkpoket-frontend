import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import { useUserStore } from '@/stores/userStore';
import useFetchPagesOverview from '@/hooks/queries/useFetchPagesOverview';
import useFetchFavorite from '@/hooks/queries/useFetchFavorite';
import { HomeCard } from '@/constants/homeCards';
import { useHomeCards } from '@/hooks/useHomeCards';
import { useInfiniteCarousel } from '@/hooks/useInfiniteCarousel';
import { MobileHomeHeader } from '@/components/home/MobileHomeHeader';
import { MobileCarouselCard } from '@/components/home/MobileCarouselCard';
import { CarouselIndicator } from '@/components/home/CarouselIndicator';
import PageListMenu from '@/components/common-ui/PageListMenu';
import MobileNavigation from '@/navigation/mobileNavigation';

export default function MobileHome() {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { nickname, isLoggedIn } = useUserStore();

  const { data: overviewData } = useFetchPagesOverview();
  const { personalPage, sharedPages } = overviewData || {};
  const { data: bookmarkData } = useFetchFavorite();

  const allCards = useHomeCards({ overviewData, bookmarkData });
  const { cards, trackRef, nearestGlobal, activeIndex, handleScroll, goToDot } =
    useInfiniteCarousel({ allCards });

  const [isPageListMenuOpen, setIsPageListMenuOpen] = useState(false);

  if (!isMobile) return null;

  const handleCardClick = (card: HomeCard) => {
    console.log('Card clicked:', card.title);

    if (card.isSharedPage && card.pageId) {
      navigate(`/shared/${card.pageId}`);
      return;
    }

    switch (card.id) {
      case 'personal-page':
        navigate('/');
        break;
      case 'bookmark':
        navigate('/bookmarks');
        break;
      default:
        console.log('Unknown card:', card.id);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <MobileHomeHeader nickname={nickname} isLoggedIn={isLoggedIn} />

      <div className="mt-16 pb-10">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="scrollbar-none mx-auto flex max-w-md snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-14 perspective-[1200px]"
          style={{
            WebkitOverflowScrolling: 'touch' as any,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth' as any,
          }}
        >
          {cards.map((card, globalIndex) => (
            <MobileCarouselCard
              key={`${card.id}-${globalIndex}`}
              card={card}
              globalIndex={globalIndex}
              nearestGlobal={nearestGlobal}
              activeIndex={activeIndex}
              cardLength={allCards.length}
              onCardClick={handleCardClick}
            />
          ))}
        </div>

        <CarouselIndicator
          cards={allCards}
          activeIndex={activeIndex}
          onDotClick={goToDot}
        />
      </div>

      {/* 페이지 목록 메뉴 */}
      <PageListMenu
        personalPage={personalPage}
        sharedPages={sharedPages || []}
        allCards={allCards}
        activeIndex={activeIndex}
        isMenuOpen={isPageListMenuOpen}
        setIsMenuOpen={setIsPageListMenuOpen}
      />
      {/* 모바일 네비게이션 */}
      <MobileNavigation
        onPageListMenuToggle={() => setIsPageListMenuOpen(!isPageListMenuOpen)}
      />
    </div>
  );
}
