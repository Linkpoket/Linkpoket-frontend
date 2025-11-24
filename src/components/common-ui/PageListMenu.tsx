import { useState, useMemo } from 'react';
import { resolvePageImageUrl } from '@/utils/resolvePageImageUrl';
import { DEFAULT_SHARED_PAGE_IMAGE, baseCards } from '@/constants/homeCards';

interface PageListMenuProps {
  personalPage: any;
  sharedPages: any[];
  allCards: any[];
  activeIndex: number;
  onItemClick: (index: number) => void;
}

export default function PageListMenu({
  personalPage,
  sharedPages,
  allCards,
  activeIndex,
  onItemClick,
}: PageListMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 페이지 이름 목록 생성 (처음에 불러온 데이터 그대로 사용)
  const pageList = useMemo(() => {
    const pages: Array<{ title: string; index: number; imageUrl: string }> = [];

    // 개인 페이지 추가
    if (personalPage?.pageTitle) {
      const personalCardIndex = allCards.findIndex(
        (card) => card.id === 'space-travel'
      );
      if (personalCardIndex !== -1) {
        const personalCard = baseCards.find(
          (card) => card.id === 'space-travel'
        );
        const fallbackImage =
          personalCard?.backgroundImage || DEFAULT_SHARED_PAGE_IMAGE;
        pages.push({
          title: personalPage.pageTitle,
          index: personalCardIndex,
          imageUrl: resolvePageImageUrl(
            personalPage.pageImageUrl,
            fallbackImage
          ),
        });
      }
    }

    // 공유 페이지들 추가
    sharedPages.forEach((page: any) => {
      const cardIndex = allCards.findIndex(
        (card) => card.pageId === page.pageId
      );
      if (cardIndex !== -1) {
        pages.push({
          title: page.pageTitle,
          index: cardIndex,
          imageUrl: resolvePageImageUrl(
            page.pageImageUrl,
            DEFAULT_SHARED_PAGE_IMAGE
          ),
        });
      }
    });

    return pages;
  }, [personalPage, sharedPages, allCards]);

  // 목록 항목 클릭 핸들러
  const handleMenuItemClick = (index: number) => {
    onItemClick(index);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 좌측 하단 목록 아이콘 버튼 */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="목록 보기"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      </button>

      {/* 목록 메뉴 오버레이 */}
      {isMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* 메뉴 */}
          <div className="fixed bottom-24 left-6 z-50 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md">
            <div className="max-h-[60vh] space-y-2 overflow-y-auto">
              {pageList.length > 0 ? (
                pageList.map((page, idx) => {
                  const isActive = page.index === activeIndex;
                  return (
                    <button
                      key={`${page.title}-${idx}`}
                      onClick={() => handleMenuItemClick(page.index)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-all hover:bg-gray-100/50"
                    >
                      {/* 원형 이미지 */}
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <img
                          src={page.imageUrl}
                          alt={page.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {/* 페이지 이름 */}
                      <span
                        className={`font-medium ${
                          isActive
                            ? 'font-semibold text-black'
                            : 'text-gray-800'
                        }`}
                      >
                        {page.title}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-2 py-2.5 text-center text-gray-500">
                  페이지가 없습니다
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
