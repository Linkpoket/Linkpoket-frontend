import { axiosInstance } from '../axiosInstance';
import {
  FileResponse,
  FileListByPageRequest,
  FileListByFolderRequest,
} from '@/types/files';

export async function fetchFilesByPageId(
  pageId: string,
  commandType: 'VIEW' = 'VIEW',
  sortType: 'BASIC' | 'NAME' | 'DATE' = 'BASIC'
): Promise<FileResponse[]> {
  try {
    const response = await axiosInstance.get<{ data: FileResponse[] }>(
      `/api/files/page/${pageId}`,
      {
        params: {
          commandType,
          sortType,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('파일 목록 조회 실패:', error);
    throw error;
  }
}

export async function fetchFilesByFolderId(
  params: FileListByFolderRequest
): Promise<FileResponse[]> {
  try {
    const { pageId, folderId, commandType, sortType = 'BASIC' } = params;
    const response = await axiosInstance.get<{ data: FileResponse[] }>(
      `/api/files/folder/${folderId}`,
      {
        params: {
          pageId,
          commandType,
          sortType,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('폴더 파일 목록 조회 실패:', error);
    throw error;
  }
}
