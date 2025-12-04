import { axiosInstance } from '@/apis/axiosInstance';

export default async function updateFolderBookmark(itemId: string) {
  try {
    const response = await axiosInstance.post('/api/favorite', {
      itemId,
      itemType: 'FOLDER',
    });
    return response.data;
  } catch (error) {
    console.error('폴더 북마크 업데이트 실패:', error);
    throw error;
  }
}
