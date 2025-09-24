import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateFolderBookmark from '@/apis/folder-apis/updateFolderBookmark';
import { useLocation } from 'react-router-dom';

export default function useUpdateFolderBookmark({
  folderId,
  pageId,
}: {
  folderId: string;
  pageId: string;
}) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    mutationFn: () => updateFolderBookmark(folderId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorite'],
        refetchType: 'active',
      });
      queryClient.invalidateQueries({
        queryKey: ['bookmark', folderId],
        refetchType: 'active',
      });
      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
          refetchType: 'active',
        });
      }
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
          refetchType: 'active',
        });
      }
      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
          refetchType: 'active',
        });
      }
    },
  });
}
