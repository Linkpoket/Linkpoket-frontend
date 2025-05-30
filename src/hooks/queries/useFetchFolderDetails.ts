import fetchFolderDetails from '@/apis/folder-apis/fetchFolderDetails';
import { FetchFolderDetailsProps } from '@/types/folders';
import { useQuery } from '@tanstack/react-query';

export default function useFetchFolderDetails(data: FetchFolderDetailsProps) {
  return useQuery({
    queryKey: ['folderDetails', data.pageId, data.folderId, data.commandType],
    queryFn: () => fetchFolderDetails(data),
  });
}
