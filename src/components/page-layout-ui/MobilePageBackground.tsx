import { useMobile } from '@/hooks/useMobile';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';

export default function MobilePageBackground() {
  const isMobile = useMobile();
  const { data } = useFetchPersonalPage('');
  const pageImageUrl = data?.data.pageImageUrl;

  return (
    <div>
      {isMobile && (
        <div className="relative w-full">
          <img
            src={
              pageImageUrl ||
              'https://d3b39vpyptsv01.cloudfront.net/photo/1/2/17f552dbb8d76670480cd3ec5e9ac0c2.jpg'
            }
            alt="Page background"
            className="w-full object-cover"
            style={{ aspectRatio: '10 / 5.5' }}
            loading="eager"
            decoding="async"
          />
          {/* 하단 그라데이션 */}
          <div className="absolute right-0 bottom-[-10px] left-0 h-37 bg-gradient-to-t from-white via-white/12 via-white/50 via-white/88 to-transparent"></div>
        </div>
      )}
    </div>
  );
}
