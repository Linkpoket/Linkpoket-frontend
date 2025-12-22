import { axiosInstance } from '../axiosInstance';
import {
  LinkMemoDeleteRequest,
  LinkMemoDeleteResponseWrapper,
} from '@/types/linkMemos';

export async function deleteLinkMemo(
  data: LinkMemoDeleteRequest
): Promise<LinkMemoDeleteResponseWrapper> {
  try {
    const response = await axiosInstance.delete<LinkMemoDeleteResponseWrapper>(
      '/api/link-memos',
      {
        data,
      }
    );

    return response.data;
  } catch (error: any) {
    // 404 에러는 백엔드 API가 없는 경우
    if (error?.response?.status === 404) {
      console.error(
        '링크 메모 API가 존재하지 않습니다. 백엔드 서버를 확인해주세요.'
      );
    }
    console.error('링크 메모 삭제 실패:', error);
    throw error;
  }
}
