import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateFolderBookmark from '@/apis/folder-apis/updateFolderBookmark';

export default function useUpdateFolderBookmark({
  folderId,
  pageId,
}: {
  folderId: string;
  pageId: string;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateFolderBookmark(folderId),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['bookmark', folderId] }),
        queryClient.invalidateQueries({ queryKey: ['favorite'] }),
        queryClient.invalidateQueries({ queryKey: ['sharedPage', pageId] }),
        queryClient.invalidateQueries({ queryKey: ['personalPage'] }),
      ]);
    },
  });
}
