import { UpdateFolderData } from '@/types/folders';
import { axiosInstance } from '../axiosInstance';

export default async function updateFolder(data: UpdateFolderData) {
  try {
    const response = await axiosInstance.put('/api/folders', data);
    return response.data;
  } catch (error: unknown) {
    console.error('Error updating folder:', error);
    throw error;
  }
}
