import { axiosInstance } from '../axiosInstance';
import { UpdatePageTitleData } from '@/types/pages';

export default async function updateSharedPageTitle(data: UpdatePageTitleData) {
  try {
    const response = await axiosInstance.put('/api/share-pages/title', data);
    return response.data;
  } catch (error) {
    console.error('공유 페이지 제목 업데이트 실패:', error);
    throw error;
  }
}
