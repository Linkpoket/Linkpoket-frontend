import { axiosInstance } from '../axiosInstance';
import { UpdatePageTitleData } from '@/types/pages';

export default async function updateSharedPageTitle(data: UpdatePageTitleData) {
  try {
    const response = await axiosInstance.put('/api/share-pages/title', data);
    return response.data;
  } catch (error) {
    console.error('Error updating shared page title:', error);
    throw error;
  }
}
