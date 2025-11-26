import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { resolvePageImageUrl } from '@/utils/resolvePageImageUrl';
import { DEFAULT_SHARED_PAGE_IMAGE, baseCards } from '@/constants/homeCards';

interface PageListMenuProps {
  personalPage: any;
  sharedPages: any[];
  allCards: any[];
  activeIndex: number;
  isMenuOpen?: boolean;
  setIsMenuOpen?: (isOpen: boolean) => void;
}

export default function PageListMenu({
  personalPage,
  sharedPages,
  allCards,
  activeIndex,
  isMenuOpen: externalIsMenuOpen,
  setIsMenuOpen: externalSetIsMenuOpen,
}: PageListMenuProps) {
  const [internalIsMenuOpen, setInternalIsMenuOpen] = useState(false);
  const isMenuOpen =
    externalIsMenuOpen !== undefined ? externalIsMenuOpen : internalIsMenuOpen;
  const setIsMenuOpen = externalSetIsMenuOpen || setInternalIsMenuOpen;
  const navigate = useNavigate();

  // 페이지 이름 목록 생성 (처음에 불러온 데이터 그대로 사용)
  const pageList = useMemo(() => {
    const pages: Array<{
      title: string;
      index: number;
      imageUrl: string;
      pageId?: string;
      pageType: 'personal' | 'shared' | 'bookmark';
    }> = [];

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
          pageType: 'personal',
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
          pageId: page.pageId,
          pageType: 'shared',
        });
      }
    });

    // 북마크 페이지 추가
    const bookmarkCardIndex = allCards.findIndex(
      (card) => card.id === 'bookmark'
    );
    if (bookmarkCardIndex !== -1) {
      const bookmarkCard = baseCards.find((card) => card.id === 'bookmark');
      pages.push({
        title: '북마크',
        index: bookmarkCardIndex,
        imageUrl: bookmarkCard?.backgroundImage || DEFAULT_SHARED_PAGE_IMAGE,
        pageType: 'bookmark',
      });
    }

    return pages;
  }, [personalPage, sharedPages, allCards]);

  // 목록 항목 클릭 핸들러 - 실제 페이지로 이동
  const handleMenuItemClick = (page: {
    title: string;
    index: number;
    imageUrl: string;
    pageId?: string;
    pageType: 'personal' | 'shared' | 'bookmark';
  }) => {
    setIsMenuOpen(false);

    // 페이지 타입에 따라 라우팅
    switch (page.pageType) {
      case 'personal':
        navigate('/');
        break;
      case 'shared':
        if (page.pageId) {
          navigate(`/shared/${page.pageId}`);
        }
        break;
      case 'bookmark':
        navigate('/bookmarks');
        break;
    }
  };

  return (
    <>
      {/* 목록 메뉴 오버레이 */}
      {isMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => {
              if (setIsMenuOpen) {
                setIsMenuOpen(false);
              }
            }}
          />

          {/* 메뉴 */}
          <div className="fixed bottom-24 left-6 z-50">
            <div className="scrollbar-hide max-h-[28rem] space-y-6 overflow-y-auto">
              {pageList.length > 0 ? (
                pageList.map((page, idx) => {
                  const isActive = page.index === activeIndex;
                  return (
                    <button
                      key={`${page.title}-${idx}`}
                      onClick={() => handleMenuItemClick(page)}
                      className="flex w-full items-center gap-3 text-left transition-all"
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
                        className={`text-2xl font-medium ${
                          isActive
                            ? 'font-semibold text-white'
                            : 'text-white/70'
                        }`}
                      >
                        {page.title}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-2 py-2.5 text-center text-xl text-white/70">
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
