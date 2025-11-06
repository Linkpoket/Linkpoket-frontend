import { useMobile } from '@/hooks/useMobile';
import LinkLogo from '@/components/common-ui/LinkLogo';
import { LinkDetail } from '@/types/links';

interface LinksInFolderProps {
  displayLinks: LinkDetail[];
}

export default function LinksInFolder({ displayLinks }: LinksInFolderProps) {
  const isMobile = useMobile();

  return (
    <>
      {/* 여러 겹의 카드 - 실제 링크 파비콘 표시 */}
      <div
        className="absolute top-5 left-[48%] -translate-x-1/2 rounded-[14px] bg-white/60 shadow-[0_2px_6px_rgba(0,0,0,0.08)] backdrop-blur-sm"
        style={{
          transform: 'translateX(20%) rotate(8deg)',
          width: isMobile ? '54px' : '74px',
          height: isMobile ? '48px' : '67px',
        }}
      >
        {/* 첫 번째 링크 파비콘 */}
        {displayLinks &&
          displayLinks[2] &&
          (() => {
            const firstLink = displayLinks[2];
            const imageUrl = (() => {
              const url = firstLink.representImageUrl;
              if (
                url &&
                (url.toLowerCase().includes('.png') ||
                  url.toLowerCase().includes('.jpg') ||
                  url.toLowerCase().includes('.jpeg'))
              ) {
                return firstLink.representImageUrl;
              }
              if (firstLink.faviconUrl) {
                return firstLink.faviconUrl;
              }
              return null;
            })();

            return !imageUrl ? (
              <div className="absolute top-2 right-2">
                <LinkLogo
                  title={firstLink.linkName || '?'}
                  size={isMobile ? 14 : 18}
                />
              </div>
            ) : (
              <img
                src={imageUrl}
                alt=""
                className="absolute top-2 right-2 h-[18%] w-[18%] rounded-sm object-cover"
              />
            );
          })()}
      </div>
      <div
        className="absolute top-7 left-[18%] rounded-[13px] bg-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.10)] backdrop-blur-md"
        style={{
          transform: 'rotate(-6deg)',
          width: isMobile ? '52px' : '72px',
          height: isMobile ? '47px' : '65px',
        }}
      >
        {/* 두 번째 링크 파비콘 */}
        {displayLinks &&
          displayLinks[1] &&
          (() => {
            const secondLink = displayLinks[1];
            const imageUrl = (() => {
              const url = secondLink.representImageUrl;
              if (
                url &&
                (url.toLowerCase().includes('.png') ||
                  url.toLowerCase().includes('.jpg') ||
                  url.toLowerCase().includes('.jpeg'))
              ) {
                return secondLink.representImageUrl;
              }
              if (secondLink.faviconUrl) {
                return secondLink.faviconUrl;
              }
              return null;
            })();

            return !imageUrl ? (
              <div className="absolute top-2 right-2">
                <LinkLogo
                  title={secondLink.linkName || '?'}
                  size={isMobile ? 14 : 18}
                />
              </div>
            ) : (
              <img
                src={imageUrl}
                alt=""
                className="absolute top-2 right-2 h-[18%] w-[18%] rounded-sm object-cover"
              />
            );
          })()}
      </div>
      <div
        className="absolute top-9 left-[10%] rounded-[12px] bg-white/60 shadow-[0_3px_10px_rgba(0,0,0,0.12)] backdrop-blur-md"
        style={{
          transform: 'rotate(-4deg)',
          width: isMobile ? '50px' : '70px',
          height: isMobile ? '45px' : '63px',
        }}
      >
        {/* 세 번째 링크 파비콘 */}
        {displayLinks &&
          displayLinks[0] &&
          (() => {
            const thirdLink = displayLinks[0];
            const imageUrl = (() => {
              const url = thirdLink.representImageUrl;
              if (
                url &&
                (url.toLowerCase().includes('.png') ||
                  url.toLowerCase().includes('.jpg') ||
                  url.toLowerCase().includes('.jpeg'))
              ) {
                return thirdLink.representImageUrl;
              }
              if (thirdLink.faviconUrl) {
                return thirdLink.faviconUrl;
              }
              return null; // 이미지가 없으면 null 반환
            })();

            return !imageUrl ? (
              <div className="absolute top-2 right-2">
                <LinkLogo
                  title={thirdLink.linkName || '?'}
                  size={isMobile ? 24 : 36}
                />
              </div>
            ) : (
              <img
                src={imageUrl}
                alt=""
                className="absolute top-2 right-2 h-[36%] w-[36%] rounded-sm object-cover"
              />
            );
          })()}
      </div>
    </>
  );
}
