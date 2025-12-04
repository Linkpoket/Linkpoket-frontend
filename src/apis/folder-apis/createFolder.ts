import { axiosInstance } from '../axiosInstance';
import { CreateFolderData } from '@/types/folders';

export async function createFolder(data: CreateFolderData) {
  try {
    const response = await axiosInstance.post('/api/folders', data);
    return response.data;
  } catch (error) {
    console.error('폴더 생성 실패:', error);
    throw error;
  }
}
