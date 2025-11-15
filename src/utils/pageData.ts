import { FolderDetail } from '@/types/folders';
import { LinkDetail } from '@/types/links';

export const getPageDataLength = (
  folderData: FolderDetail[],
  linkData: LinkDetail[]
) => {
  const folderDataLength = folderData?.length ?? 0;
  const linkDataLength = linkData?.length ?? 0;

  return {
    folderDataLength,
    linkDataLength,
  };
};

type PageData = FolderDetail | LinkDetail;

export const sortPageData = (
  data: PageData[],
  sortType: string
): PageData[] => {
  if (!data || data.length === 0) return [];

  const sortedData = [...data];

  switch (sortType) {
    case '최신순':
      return sortedData.sort((a, b) => {
        if (a.orderIndex !== undefined && b.orderIndex !== undefined) {
          return (b.orderIndex || 0) - (a.orderIndex || 0);
        }
        const dateA = new Date(a.createdDate || '').getTime();
        const dateB = new Date(b.createdDate || '').getTime();
        return dateB - dateA;
      });

    case '이름순':
      return sortedData.sort((a, b) => {
        const nameA = ('folderId' in a ? a.folderName : a.linkName) || '';
        const nameB = ('folderId' in b ? b.folderName : b.linkName) || '';
        return nameA.localeCompare(nameB);
      });

    case '기본순':
    default:
      return sortedData.sort((a, b) => {
        if (a.orderIndex !== undefined && b.orderIndex !== undefined) {
          return (a.orderIndex || 0) - (b.orderIndex || 0);
        }
        const dateA = new Date(a.createdDate || '').getTime();
        const dateB = new Date(b.createdDate || '').getTime();
        return dateA - dateB;
      });
  }
};
