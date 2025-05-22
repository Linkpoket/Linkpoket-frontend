import { SelectedPageData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export async function fetchSharedPageDashboard(data: SelectedPageData) {
  try {
    const response = await axiosInstance.get('/api/page/dashboard', {
      params: {
        pageId: data.pageId,
        commandType: data.commandType,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shared page dashboard:', error);
    throw error;
  }
}
