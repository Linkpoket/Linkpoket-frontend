import updateDragandDrop from '@/apis/folder-apis/updateDragandDrop';
import { UpdateDragandDropProps } from '@/types/folders';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateDragandDrop(data: UpdateDragandDropProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDragandDropProps) => updateDragandDrop(data),
    onSuccess: () => {
      Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', data.baseRequest.pageId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['folderList', data.baseRequest.pageId],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', data.baseRequest.pageId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
          refetchType: 'active',
        }),
      ]);
    },
  });
}
