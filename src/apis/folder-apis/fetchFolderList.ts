import { axiosInstance } from '../axiosInstance';

export default async function fetchFolderList(pageId: string) {
  try {
    const response = await axiosInstance.post('/api/folders/sidebar', {
      pageId: pageId,
      commandType: 'VIEW',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching folder list:', error);
    throw error;
  }
}
