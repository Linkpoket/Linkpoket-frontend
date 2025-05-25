import { useMutation } from '@tanstack/react-query';
import deleteFolder from '@/apis/folder-apis/deleteFolder';
import { queryClient } from '@/lib/queryClient';

export default function useDeleteFolder(pageId: number, commandType: string) {
  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folders', pageId, commandType],
      });
    },
  });
}
