import { axiosInstance } from '@/apis/axiosInstance';

export default async function updateLinkBookmark(itemId: number) {
  try {
    const response = await axiosInstance.post('/api/favorite', {
      itemId,
      itemType: 'LINK',
    });
    return response.data;
  } catch (error) {
    console.error('Error updating link bookmark:', error);
    throw error;
  }
}
