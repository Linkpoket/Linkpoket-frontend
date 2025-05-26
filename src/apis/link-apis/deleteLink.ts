import { DeleteLinkData } from '@/types/links';
import { axiosInstance } from '../axiosInstance';

export async function deleteLink(data: DeleteLinkData) {
  try {
    const response = await axiosInstance.delete('/api/links', { data });
    return response.data;
  } catch (error) {
    console.error('삭제 실패:', error);
    throw error;
  }
}
