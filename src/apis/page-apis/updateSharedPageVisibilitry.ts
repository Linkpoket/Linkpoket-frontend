import { axiosInstance } from '../axiosInstance';

export interface UpdateSharedPageVisibilitryData {
  baseRequest: {
    pageId: string;
    commandType: 'EDIT';
  };
  pageVisibility: 'PUBLIC' | 'RESTRICTED';
}

export default async function updateSharedPageVisibilitry(
  data: UpdateSharedPageVisibilitryData
) {
  try {
    const response = await axiosInstance.put('/api/pages/visibility', data);
    return response.data;
  } catch (error) {
    console.error('공유 페이지 공개 설정 변경 실패:', error);
    throw error;
  }
}
