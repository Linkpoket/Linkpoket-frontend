import { axiosInstance } from '@/apis/axiosInstance';

export default async function updateLinkBookmark(itemId: string) {
  try {
    const response = await axiosInstance.post('/api/favorite', {
      itemId,
      itemType: 'LINK',
    });
    return response.data;
  } catch (error) {
    console.error('링크 북마크 업데이트 실패:', error);
    throw error;
  }
}
