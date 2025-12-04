import { HomeCard } from '@/constants/homeCards';

interface MobileCarouselCardProps {
  card: HomeCard;
  globalIndex: number;
  nearestGlobal: number;
  activeIndex: number;
  cardLength: number;
  onCardClick: (card: HomeCard) => void;
}

export const MobileCarouselCard = ({
  card,
  globalIndex,
  nearestGlobal,
  activeIndex,
  cardLength,
  onCardClick,
}: MobileCarouselCardProps) => {
  const delta = globalIndex - nearestGlobal;
  const ad = Math.abs(delta);

  const scale = Math.max(0.88, 1 - ad * 0.08);
  const opacity = Math.max(0.6, 1 - ad * 0.22);
  const rotateY = delta * -3;
  const zIndex = 100 - ad;
  const blur = ad === 0 ? 'blur-0' : ad === 1 ? 'blur-[0.2px]' : 'blur-[0.5px]';

  const isActive = activeIndex === globalIndex % cardLength;

  return (
    <article
      key={`${card.id}-${globalIndex}`}
      data-card
      className={`relative h-96 min-h-80 w-[74%] shrink-0 snap-center overflow-hidden rounded-3xl shadow-2xl max-[375px]:h-80 max-[375px]:w-[76%] ${blur} ${card.id === 'bookmark' ? 'cursor-pointer' : ''}`}
      style={{
        transform: `translateZ(0) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        willChange: 'transform, opacity',
        transition:
          'transform 500ms cubic-bezier(.25,.46,.45,.94), opacity 500ms ease, filter 500ms ease',
      }}
      aria-label={card.title}
      onClick={() => onCardClick(card)}
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
            className={`rounded-full px-3 py-1 text-xs font-semibold text-white transition ${isActive ? 'bg-pink-500' : 'bg-pink-500/70'}`}
          >
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
        {/* 개인 페이지와 북마크에서는 memberCount 표시 안 함 */}
        {card.id !== 'personal-page' &&
          card.id !== 'bookmark' &&
          card.memberCount > 0 && (
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
                {card.memberCount} people interested
              </span>
            </div>
          )}
      </div>
    </article>
  );
};
