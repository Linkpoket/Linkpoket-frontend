import updateDragandDrop from '@/apis/folder-apis/updateDragandDrop';
import { UpdateDragandDropProps } from '@/types/folders';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

export default function useUpdateDragandDrop(data: UpdateDragandDropProps) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isBookmarksPage = location.pathname === '/bookmarks';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    mutationFn: (data: UpdateDragandDropProps) => updateDragandDrop(data),

    onSuccess: () => {
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', data.baseRequest.pageId],
        });
      }
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderList', data.baseRequest.pageId],
          refetchType: 'active',
        });
      }
      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', data.baseRequest.pageId],
        });
      }
      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }
      if (isBookmarksPage) {
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
          refetchType: 'active',
        });
      }
    },
  });
}
