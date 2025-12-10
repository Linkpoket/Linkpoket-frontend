import fetchFolderDetails from '@/apis/folder-apis/fetchFolderDetails';
import { FolderDetailsProps } from '@/types/folders';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function useFetchFolderDetails(data: FolderDetailsProps) {
  return useSuspenseQuery({
    queryKey: ['folderDetails', data.pageId, data.folderId],
    queryFn: () => fetchFolderDetails(data),
    select: (response) => response.data,
  });
}
