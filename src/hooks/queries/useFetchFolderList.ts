import fetchFolderList from '@/apis/folder-apis/fetchFolderList';
import { useQuery } from '@tanstack/react-query';

export default function useFetchFolderList(pageId: string) {
  const { data, ...rest } = useQuery({
    queryKey: ['folderList', pageId],
    queryFn: () => fetchFolderList(pageId),
    placeholderData: (prev) => prev,
    structuralSharing: true,
  });

  return { folderList: data, ...rest };
}
