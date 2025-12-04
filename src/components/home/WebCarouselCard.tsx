import { HomeCard } from '@/constants/homeCards';

interface WebCarouselCardProps {
  card: HomeCard;
  index: number;
  onCardClick: (card: HomeCard) => void;
  onMouseEnter: (card: HomeCard) => void;
}

export const WebCarouselCard = ({
  card,
  index,
  onCardClick,
  onMouseEnter,
}: WebCarouselCardProps) => {
  return (
    <div
      key={card.id}
      className="home-card group relative flex-shrink-0 cursor-pointer snap-start overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => onCardClick(card)}
      onMouseEnter={() => onMouseEnter(card)}
    >
      {/* 배경 이미지 */}
      <img
        src={card.backgroundImage}
        alt={card.title}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
        {...({ fetchPriority: index === 0 ? 'high' : 'auto' } as any)}
        width={256}
        height={256}
        className="absolute inset-0 h-full w-full bg-gray-200 object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* 인기 태그 */}
      {card.isPopular && (
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
            PERSONAL
          </span>
        </div>
      )}

      {/* 북마크 아이콘 (북마크 카드에만 표시) */}
      {card.id === 'bookmark' && (
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

      {/* 제목과 정보 */}
      <div className="absolute right-4 bottom-4 left-4">
        <h3 className="mb-2 text-xl font-bold text-white">{card.title}</h3>
        {/* 개인 페이지와 북마크에서는 memberCount 표시 안 함 */}
        {card.id !== 'personal-page' &&
          card.id !== 'bookmark' &&
          card.memberCount > 0 && (
            <p className="text-sm text-white/90">
              {card.memberCount} people interested
            </p>
          )}
      </div>
    </div>
  );
};
