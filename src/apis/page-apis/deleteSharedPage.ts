import { DeleteSharedPageData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export async function deleteSharedPage(data: DeleteSharedPageData) {
  try {
    const response = await axiosInstance.delete('/api/page', {
      data,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting shared page:', error);
    throw error;
  }
}
