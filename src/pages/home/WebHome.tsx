import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchPagesOverview from '@/hooks/queries/useFetchPagesOverview';
import useFetchFavorite from '@/hooks/queries/useFetchFavorite';
import { HomeCard } from '@/constants/homeCards';
import { useHomeCards } from '@/hooks/useHomeCards';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { WebCarouselCard } from '@/components/home/WebCarouselCard';
import { FolderList } from '@/components/home/FolderList';

export default function WebHome() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<HomeCard | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { data: overviewData } = useFetchPagesOverview();
  const { data: bookmarkData } = useFetchFavorite();

  const cards = useHomeCards({ overviewData, bookmarkData });
  const { listRef, visibleCount } = useInfiniteScroll({
    cardsLength: cards.length,
  });

  useEffect(() => {
    if (cards.length > 0 && overviewData && bookmarkData) {
      setIsDataLoaded(true);
    }
  }, [cards, overviewData, bookmarkData]);

  useEffect(() => {
    if (overviewData) {
      console.log('📦 Overview 데이터:', overviewData.rawData);
      console.log('👤 개인 페이지:', overviewData.personalPage);
      console.log('👥 공유 페이지들:', overviewData.sharedPages);
    }
  }, [overviewData]);

  const getRandomColor = (index: number) => {
    const colors = [
      '#8B5CF6', // 보라색
      '#EF4444', // 빨간색
      '#F59E0B', // 주황색
      '#10B981', // 초록색
      '#3B82F6', // 파란색
      '#EC4899', // 핑크색
      '#06B6D4', // 청록색
      '#84CC16', // 라임색
      '#F97316', // 오렌지색
      '#8B5A2B', // 갈색
    ];
    return colors[index % colors.length];
  };

  const handleCardClick = (card: HomeCard) => {
    console.log('Card clicked:', card.title);

    // 공유 페이지 카드인 경우
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
    <div className="min-h-screen bg-white">
      <main className="scrollbar-hide flex min-h-[calc(100vh-200px)] items-center justify-center px-8">
        <div
          ref={listRef}
          className="home-card-list scrollbar-hide flex w-full max-w-7xl snap-x overflow-x-auto pt-12 pb-6 pl-4"
        >
          {cards.slice(0, visibleCount).map((card, index) => (
            <WebCarouselCard
              key={card.id}
              card={card}
              index={index}
              onCardClick={handleCardClick}
              onMouseEnter={setHoveredCard}
            />
          ))}
        </div>
      </main>

      <FolderList
        hoveredCard={hoveredCard}
        isDataLoaded={isDataLoaded}
        getRandomColor={getRandomColor}
      />
    </div>
  );
}
