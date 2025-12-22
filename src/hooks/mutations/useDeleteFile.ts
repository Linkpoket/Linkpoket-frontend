import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteFile } from '@/apis/file-apis/deleteFile';
import { DeleteFileData, DeleteFileResponse } from '@/types/files';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useDeleteFile(
  options?: UseMutationOptions<DeleteFileResponse, unknown, DeleteFileData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isBookmarksPage = location.pathname === '/bookmarks';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    mutationFn: deleteFile,
    onSuccess: (response, variables, context) => {
      // 저장 용량 업데이트
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });

      // 사이드바 폴더 리스트 업데이트
      queryClient.invalidateQueries({
        queryKey: ['folderList', variables.baseRequest.pageId],
      });

      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
        });
      }

      // 폴더 상세 페이지 쿼리 무효화
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
        });
      }

      // 메인 페이지에서만 personalPage 캐시 무효화
      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
        });
      }

      if (isBookmarksPage) {
        queryClient.invalidateQueries({
          queryKey: ['favorite'],
        });
      }

      // 파일 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['files', variables.baseRequest.pageId],
      });

      toast.success('파일이 삭제되었습니다.');

      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      toast.error('파일 삭제에 실패했습니다.');
      options?.onError?.(error, variables, context);
    },
  });
}
