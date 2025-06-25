import { axiosInstance } from '@/apis/axiosInstance';

export default async function updateFolderBookmark(itemId: number) {
  try {
    const response = await axiosInstance.post('/api/favorite', {
      itemId,
      itemType: 'FOLDER',
    });
    return response.data;
  } catch (error) {
    console.error('Error updating folder bookmark:', error);
    throw error;
  }
}
