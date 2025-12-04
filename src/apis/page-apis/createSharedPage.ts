import { CreateSharedPageData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export async function createSharedPage(data: CreateSharedPageData) {
  try {
    const response = await axiosInstance.post('/api/share-pages', data);
    return response.data;
  } catch (error) {
    console.error('공유 페이지 생성 실패:', error);
    throw error;
  }
}
