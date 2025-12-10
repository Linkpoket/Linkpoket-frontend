import { LinkDetail } from '@/types/links';
import { FolderDetail } from '@/types/folders';

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
