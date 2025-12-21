import { axiosInstance } from '../axiosInstance';
import { MemoResponseWrapper, ItemType } from '@/types/memos';

export interface MemoViewParams {
  pageId: string;
  commandType: 'VIEW';
  itemType: ItemType;
  itemId: string;
}

export async function fetchMemo(
  params: MemoViewParams
): Promise<MemoResponseWrapper | null> {
  try {
    const response = await axiosInstance.get<MemoResponseWrapper>(
      `/api/memos/${params.itemType}/${params.itemId}/latest`,
      {
        params: {
          pageId: params.pageId,
          commandType: params.commandType,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      console.warn('API에러:', error.response.data);
      return {
        status: 200,
        message: '메모가 없습니다.',
        data: null,
      };
    }
    console.error('메모 조회 실패:', error);
    throw error;
  }
}
