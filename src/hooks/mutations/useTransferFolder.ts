import { transferFolder } from '@/apis/folder-apis/transferFolder';
import { TransferFolderData, TransferFolderResponse } from '@/types/folders';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export function useTransferFolder(
  options?: UseMutationOptions<
    TransferFolderResponse,
    Error,
    TransferFolderData
  >
) {
  return useMutation<TransferFolderResponse, Error, TransferFolderData>({
    mutationFn: transferFolder,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
