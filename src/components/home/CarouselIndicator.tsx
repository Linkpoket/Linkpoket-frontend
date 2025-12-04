import { HomeCard } from '@/constants/homeCards';

interface CarouselIndicatorProps {
  cards: HomeCard[];
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export const CarouselIndicator = ({
  cards,
  activeIndex,
  onDotClick,
}: CarouselIndicatorProps) => {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {cards.map((card, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={card.id}
            onClick={() => onDotClick(i)}
            aria-label={`Go to ${card.title}`}
            className={`relative h-2 rounded-full transition-all ${active ? 'w-6 bg-black' : 'w-2 bg-black/30'}`}
            style={{ borderRadius: '9999px' }}
          />
        );
      })}
    </div>
  );
};
