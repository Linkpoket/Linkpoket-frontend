import { DeleteSharedPageData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export async function deleteSharedPage(data: DeleteSharedPageData) {
  try {
    const response = await axiosInstance.delete('/api/share-pages', {
      data,
    });
    return response.data;
  } catch (error) {
    console.error('공유 페이지 삭제 실패:', error);
    throw error;
  }
}
