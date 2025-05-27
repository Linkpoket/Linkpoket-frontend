import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { createFolder } from '@/apis/folder-apis/createFolder';
import { CreateFolderData } from '@/types/folders';

export function useCreateFolder(
  pageId: number,
  commandType: string,
  options?: UseMutationOptions<any, unknown, CreateFolderData>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: createFolder,
    onSuccess: async (response, variables, context) => {
      console.log('폴더 생성 응답:', response);

      // 현재 캐시된 데이터 확인
      const currentData = queryClient.getQueryData([
        'selectedPage',
        pageId,
        commandType,
      ]);
      console.log('현재 캐시된 데이터:', currentData);

      // 쿼리 무효화 및 리페치
      await queryClient.invalidateQueries({
        queryKey: ['selectedPage', pageId, commandType],
        refetchType: 'active',
      });

      // 무효화 후 캐시 상태 확인
      const newData = queryClient.getQueryData([
        'selectedPage',
        pageId,
        commandType,
      ]);
      console.log('무효화 후 캐시 데이터:', newData);

      // 부모 컴포넌트의 onSuccess 콜백 실행
      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error('폴더 생성 에러:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}
