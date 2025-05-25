import fetchFolderDetails from '@/apis/folder-apis/fetchFolderDetails';
import { FetchFolderDetailsProps } from '@/types/folders';
import { useQuery } from '@tanstack/react-query';

export default function useFetchFolderDetails(data: FetchFolderDetailsProps) {
  return useQuery({
    queryKey: [
      'folderDetails',
      data.pageId,
      data.commandType,
      data.folderId,
      data.sortType,
    ],
    queryFn: () => fetchFolderDetails(data),
  });
}
