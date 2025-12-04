import { DeleteFolderData } from '@/types/folders';
import { axiosInstance } from '../axiosInstance';

export default async function deleteFolder(data: DeleteFolderData) {
  try {
    const response = await axiosInstance.delete('/api/folders', {
      data,
    });
    return response.data;
  } catch (error) {
    console.error('폴더 삭제 실패:', error);
    throw error;
  }
}
