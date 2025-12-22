import { DeleteFileData, DeleteFileResponse } from '@/types/files';
import { axiosInstance } from '../axiosInstance';

export async function deleteFile(
  data: DeleteFileData
): Promise<DeleteFileResponse> {
  try {
    const response = await axiosInstance.delete('/api/files', { data });
    return response.data;
  } catch (error) {
    console.error('파일 삭제 실패:', error);
    throw error;
  }
}
