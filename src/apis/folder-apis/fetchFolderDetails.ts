import { axiosInstance } from '../axiosInstance';
import { FolderDetailsProps, FolderDetailsResponse } from '@/types/folders';
import { folderDetailsResponseSchema } from '@/schemas/folders';

export default async function fetchFolderDetails(
  data: FolderDetailsProps
): Promise<FolderDetailsResponse> {
  try {
    const response = await axiosInstance.get('/api/folders/details', {
      params: {
        pageId: data.pageId,
        commandType: 'VIEW',
        folderId: data.folderId,
        sortType: 'BASIC',
      },
    });

    const validation = folderDetailsResponseSchema.safeParse(response.data);
    if (!validation.success) {
      console.error('폴더 상세 정보 검증 실패:', validation.error);
      throw new Error('폴더 상세 정보 검증 실패');
    }
    return validation.data as FolderDetailsResponse;
  } catch (error) {
    console.error('폴더 상세 정보 조회 실패:', error);
    throw error;
  }
}
