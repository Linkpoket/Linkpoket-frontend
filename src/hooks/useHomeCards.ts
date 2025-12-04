import { useEffect, useState } from 'react';
import {
  baseCards,
  DEFAULT_SHARED_PAGE_IMAGE,
  HomeCard,
} from '@/constants/homeCards';
import { resolvePageImageUrl } from '@/utils/resolvePageImageUrl';

interface UseHomeCardsProps {
  overviewData?: {
    personalPage?: any;
    sharedPages?: any[];
  };
  bookmarkData?: {
    folderSimpleResponses?: any[];
  };
}

export const useHomeCards = ({
  overviewData,
  bookmarkData,
}: UseHomeCardsProps) => {
  const [allCards, setAllCards] = useState<HomeCard[]>(baseCards);

  useEffect(() => {
    if (!overviewData || !bookmarkData) {
      return;
    }

    const { personalPage, sharedPages } = overviewData;

    if (personalPage || (sharedPages && sharedPages.length > 0)) {
      const updatedBaseCards = baseCards.map((card) => {
        let folders: any[] = [];
        let backgroundImage = card.backgroundImage;

        switch (card.id) {
          case 'personal-page':
            folders =
              personalPage?.folders?.map((folder: any) => ({
                folderId: folder.folderId,
                folderTitle: folder.folderName,
              })) || [];
            backgroundImage = resolvePageImageUrl(
              personalPage?.pageImageUrl,
              card.backgroundImage
            );
            break;
          case 'bookmark':
            folders =
              bookmarkData?.folderSimpleResponses?.map((folder: any) => ({
                folderId: folder.folderId,
                folderTitle: folder.folderTitle,
              })) || [];
            break;
        }

        return { ...card, folders, backgroundImage };
      });

      const sharedPageCards: HomeCard[] = (sharedPages || []).map(
        (page: any) => ({
          id: `shared-page-${page.pageId}`,
          title: page.pageTitle,
          category: 'shared',
          tags: ['collaboration', 'team'],
          memberCount: page.memberCount || 0,
          backgroundImage: resolvePageImageUrl(
            page.pageImageUrl,
            DEFAULT_SHARED_PAGE_IMAGE
          ),
          pageId: page.pageId,
          isSharedPage: true,
          folders:
            page.folders?.map((folder: any) => ({
              folderId: folder.folderId,
              folderTitle: folder.folderName,
            })) || [],
        })
      );

      setAllCards([...updatedBaseCards, ...sharedPageCards]);
    }
  }, [overviewData, bookmarkData]);

  return allCards;
};
