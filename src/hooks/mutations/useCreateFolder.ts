import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { createFolder } from '@/apis/folder-apis/createFolder';
import { CreateFolderData } from '@/types/folders';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCreateFolder(
  pageId: string,
  options?: UseMutationOptions<any, unknown, CreateFolderData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    ...options,
    mutationFn: createFolder,

    // onMutate: async (variables) => {
    //   const context: Record<string, any> = {};

    //   // 관련 쿼리 취소
    //   if (isSharedPage)
    //     await queryClient.cancelQueries({ queryKey: ['sharedPage', pageId] });
    //   if (isFolderPage)
    //     await queryClient.cancelQueries({
    //       queryKey: ['folderDetails', pageId],
    //     });
    //   if (isMainPage)
    //     await queryClient.cancelQueries({ queryKey: ['personalPage'] });

    //   // 기존 데이터 저장
    //   if (isSharedPage)
    //     context.sharedPage = queryClient.getQueryData(['sharedPage', pageId]);
    //   if (isFolderPage)
    //     context.folderDetails = queryClient.getQueryData([
    //       'folderDetails',
    //       pageId,
    //     ]);
    //   if (isMainPage)
    //     context.personalPage = queryClient.getQueryData(['personalPage']);

    //   // 임시 UI 업데이트
    //   const tempFolder = {
    //     folderId: '',
    //     folderName: variables.folderName,
    //     orderIndex: 9999,
    //     createdDate: new Date().toISOString().split('T')[0],
    //     isFavorite: false,
    //   };

    //   if (isSharedPage) {
    //     queryClient.setQueryData(['sharedPage', pageId], (old: any) => {
    //       if (!old) return old;

    //       return {
    //         ...old,
    //         data: {
    //           ...old.data,
    //           folderDetailResponses: [
    //             ...(old.data?.folderDetailResponses || []),
    //             tempFolder,
    //           ],
    //         },
    //       };
    //     });
    //   }

    //   if (isFolderPage) {
    //     queryClient.setQueryData(['folderDetails', pageId], (old: any) => {
    //       if (!old) return old;

    //       return {
    //         ...old,
    //         data: {
    //           ...old.data,
    //           folderDetailResponses: [
    //             ...(old.data?.folderDetailResponses || []),
    //             tempFolder,
    //           ],
    //         },
    //       };
    //     });
    //   }

    //   if (isMainPage) {
    //     queryClient.setQueryData(['personalPage'], (old: any) => {
    //       if (!old) return old;

    //       return {
    //         ...old,
    //         data: {
    //           ...old.data,
    //           folderDetailResponses: [
    //             ...(old.data?.folderDetailResponses || []),
    //             tempFolder,
    //           ],
    //         },
    //       };
    //     });
    //   }

    //   return context;
    // },

    onError: (error, variables, context: any) => {
      // rollback
      // if (context?.sharedPage)
      //   queryClient.setQueryData(['sharedPage', pageId], context.sharedPage);
      // if (context?.folderDetails)
      //   queryClient.setQueryData(
      //     ['folderDetails', pageId],
      //     context.folderDetails
      //   );
      // if (context?.personalPage)
      //   queryClient.setQueryData(['personalPage'], context.personalPage);
      console.error('폴더 생성 에러:', error);
      toast.error(
        error instanceof Error ? error.message : '폴더 생성에 실패했습니다.'
      );
      options?.onError?.(error, variables, context);
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['folderList', pageId],
      });
      if (isSharedPage)
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
        });
      if (isFolderPage)
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
        });
      if (isMainPage)
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      options?.onSuccess?.(data, variables, context);
    },
  });
}
