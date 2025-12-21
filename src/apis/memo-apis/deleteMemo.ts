import { axiosInstance } from '../axiosInstance';
import { MemoDeleteRequest, MemoDeleteResponseWrapper } from '@/types/memos';

export async function deleteMemo(
  data: MemoDeleteRequest
): Promise<MemoDeleteResponseWrapper> {
  try {
    const response = await axiosInstance.delete<MemoDeleteResponseWrapper>(
      '/api/memos',
      {
        data,
      }
    );

    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      console.error('API에러:', error.response.data);
    }
    console.error('메모 삭제 실패:', error);
    throw error;
  }
}
