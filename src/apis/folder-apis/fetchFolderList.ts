import { axiosInstance } from '../axiosInstance';
import { FolderListResponse } from '@/types/folders';

export default async function fetchFolderList(
  pageId: string
): Promise<FolderListResponse> {
  try {
    const response = await axiosInstance.get('/api/folders/sidebar', {
      params: {
        pageId: pageId,
        commandType: 'VIEW',
      },
    });
    return response.data;
  } catch (error) {
    console.error('폴더 목록 조회 실패:', error);
    throw error;
  }
}
