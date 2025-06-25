import { CreateSharedPageData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export async function createSharedPage(data: CreateSharedPageData) {
  try {
    const response = await axiosInstance.post('/api/share-pages', data);
    return response.data;
  } catch (error) {
    console.error('Error creating shared page:', error);
    throw error;
  }
}
