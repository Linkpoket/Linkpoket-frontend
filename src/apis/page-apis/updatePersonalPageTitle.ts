import { axiosInstance } from '../axiosInstance';
import { UpdatePageTitleData } from '@/types/pages';

export default async function updatePersonalPageTitle(
  data: UpdatePageTitleData
) {
  try {
    const response = await axiosInstance.put('/api/personal-pages/title', {
      data,
    });
    return response.data;
  } catch (error) {
    console.error('개인 페이지 제목 업데이트 실패:', error);
    throw error;
  }
}
