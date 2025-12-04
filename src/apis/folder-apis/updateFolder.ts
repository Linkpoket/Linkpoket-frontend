import { UpdateFolderData } from '@/types/folders';
import { axiosInstance } from '../axiosInstance';

export default async function updateFolder(data: UpdateFolderData) {
  try {
    const response = await axiosInstance.put('/api/folders', data);
    return response.data;
  } catch (error: unknown) {
    console.error('폴더 업데이트 실패:', error);
    throw error;
  }
}
