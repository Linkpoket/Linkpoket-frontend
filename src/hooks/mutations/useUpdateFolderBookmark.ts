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
      Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: ['bookmark', folderId],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
          refetchType: 'active',
        }),
      ]);
    },
  });
}
