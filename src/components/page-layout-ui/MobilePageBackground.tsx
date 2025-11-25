import { resolvePageImageUrl } from '@/utils/resolvePageImageUrl';
import { BackButton } from '@/components/common-ui/BackButton';
import { CopyLinkButton } from '@/components/common-ui/CopyLinkButton';

const FALLBACK_IMAGE =
  'https://d3b39vpyptsv01.cloudfront.net/photo/1/2/17f552dbb8d76670480cd3ec5e9ac0c2.jpg';

export default function MobilePageBackground({
  isMobile,
  pageImageUrl,
  pageTitle,
}: {
  pageImageUrl: string;
  isMobile: boolean;
  pageTitle?: string;
}) {
  return (
    <div>
      {isMobile && (
        <div className="relative w-full">
          <img
            src={resolvePageImageUrl(pageImageUrl, FALLBACK_IMAGE)}
            alt="Page background"
            className="w-full object-cover"
            style={{ aspectRatio: '10 / 5.5' }}
            loading="eager"
            decoding="async"
          />
          {/* 하단 그라데이션 */}
          <div className="absolute right-0 bottom-[-10px] left-0 h-37 bg-gradient-to-t from-white via-white/12 via-white/50 via-white/88 to-transparent"></div>
          {/* 타이틀 - 그림 위로 */}
          {pageTitle && (
            <div className="absolute top-20 right-6 left-6">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                {pageTitle}
              </h1>
            </div>
          )}
          {/* 버튼들 - 이미지 위에 배치 */}
          <BackButton isMobile={isMobile} />
          <CopyLinkButton isMobile={isMobile} />
        </div>
      )}
    </div>
  );
}
