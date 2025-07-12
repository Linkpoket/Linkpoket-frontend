import fetchFolderList from '@/apis/folder-apis/fetchFolderList';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useFetchFolderList(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetchFolderList(pageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folderList', pageId],
      });
    },
  });
}
