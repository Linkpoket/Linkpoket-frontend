import { TransferFolderData, TransferFolderResponse } from '@/types/folders';
import { axiosInstance } from '../axiosInstance';

export async function transferFolder(
  data: TransferFolderData
): Promise<TransferFolderResponse> {
  try {
    const response = await axiosInstance.post(
      '/api/dispatch/directory-transmissions',
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
