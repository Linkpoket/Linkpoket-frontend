import { axiosInstance } from '../axiosInstance';
import { UpdatePageDescriptionData } from '@/types/pages';

export default async function updateSharedPageDescription(
  data: UpdatePageDescriptionData
) {
  try {
    const response = await axiosInstance.put(
      '/api/share-pages/description',
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error updating shared page description:', error);
    throw error;
  }
}
