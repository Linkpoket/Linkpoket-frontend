import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createFolder } from '@/apis/folder-apis/createFolder';
import { CreateFolderData } from '@/types/folders';
import { queryClient } from '@/lib/queryClient';

export function useCreateFolder(
  pageId: number,
  commandType: string,
  options: UseMutationOptions<any, unknown, CreateFolderData>
) {
  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['folders', pageId, commandType],
      });
    },
    ...options,
  });
}
