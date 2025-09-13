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
  const isBookmarksPage = location.pathname === '/bookmarks';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    mutationFn: () => updateFolderBookmark(folderId),

    onSuccess: () => {
      if (isBookmarksPage) {
        queryClient.invalidateQueries({
          queryKey: ['bookmark', folderId],
          refetchType: 'active',
        });
      }
      if (isBookmarksPage) {
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
          refetchType: 'active',
        });
      }
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
        if (isMainPage) {
          queryClient.invalidateQueries({
            queryKey: ['personalPage'],
            refetchType: 'active',
          });
        }
      }
    },
  });
}
