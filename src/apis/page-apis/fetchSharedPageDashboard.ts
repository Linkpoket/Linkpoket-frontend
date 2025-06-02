import { PageParamsData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export async function fetchSharedPageDashboard(data: PageParamsData) {
  try {
    const response = await axiosInstance.get(
      '/api/share-pages/dashboard/permission',
      {
        params: {
          pageId: data.pageId,
          commandType: 'VIEW',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching shared page dashboard:', error);
    throw error;
  }
}
