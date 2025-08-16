import {
  transferFolder,
  TransferFolderError,
} from '@/apis/folder-apis/transferFolder';
import { TransferFolderData, TransferFolderResponse } from '@/types/folders';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export function useTransferFolder(
  options?: UseMutationOptions<
    TransferFolderResponse,
    TransferFolderError,
    TransferFolderData
  >
) {
  return useMutation<
    TransferFolderResponse,
    TransferFolderError,
    TransferFolderData
  >({
    mutationFn: transferFolder,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      // 이제 error.errorCode, error.detail 등을 타입 안전하게 사용 가능
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
