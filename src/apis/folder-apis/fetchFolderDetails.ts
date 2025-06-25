import { axiosInstance } from '../axiosInstance';
import { FetchFolderDetailsProps } from '@/types/folders';

export default async function fetchFolderDetails(
  data: FetchFolderDetailsProps
) {
  try {
    const response = await axiosInstance.get('/api/folders/details', {
      params: {
        pageId: data.pageId,
        commandType: data.commandType,
        folderId: data.folderId,
        sortType: data.sortType,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching folder details:', error);
    throw error;
  }
}
