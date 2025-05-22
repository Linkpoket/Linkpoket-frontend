import { axiosInstance } from '../axiosInstance';
import { CreateFolderData } from '@/types/folders';

export async function createFolder(data: CreateFolderData) {
  try {
    const response = await axiosInstance.post('/api/directories', data);
    return response.data;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
}
