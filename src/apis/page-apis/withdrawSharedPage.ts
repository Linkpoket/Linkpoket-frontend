import { DeleteSharedPageData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export async function WithdrawSharedPageData(data: DeleteSharedPageData) {
  try {
    const response = await axiosInstance.delete('/api/share-pages/leave', {
      data,
    });
    return response.data;
  } catch (error) {
    console.error('공유 페이지 탈퇴 실패:', error);
    throw error;
  }
}
