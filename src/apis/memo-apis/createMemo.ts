import { axiosInstance } from '../axiosInstance';
import { MemoCreateRequest, MemoCreateResponseWrapper } from '@/types/memos';

export async function createMemo(
  data: MemoCreateRequest
): Promise<MemoCreateResponseWrapper> {
  try {
    const response = await axiosInstance.post<MemoCreateResponseWrapper>(
      '/api/memos',
      data
    );

    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      console.error('API에러:', error.response.data);
    }
    console.error('메모 생성 실패:', error);
    throw error;
  }
}
