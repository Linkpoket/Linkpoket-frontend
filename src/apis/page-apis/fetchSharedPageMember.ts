import { axiosInstance } from '../axiosInstance';
import { PageParamsData } from '@/types/pages';

export async function fetchSharedPageMember(data: PageParamsData) {
  try {
    const response = await axiosInstance.get('/api/share-pages/members', {
      params: {
        pageId: data.pageId,
        commandType: 'VIEW',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shared page member:', error);
    throw error;
  }
}
