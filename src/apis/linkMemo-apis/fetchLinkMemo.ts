import { axiosInstance } from '../axiosInstance';
import { LinkMemoResponseWrapper } from '@/types/linkMemos';

export interface LinkMemoViewParams {
  pageId: string;
  commandType: 'VIEW';
  linkId: string;
}

export async function fetchLinkMemo(
  params: LinkMemoViewParams
): Promise<LinkMemoResponseWrapper | null> {
  try {
    const response = await axiosInstance.get<LinkMemoResponseWrapper>(
      `/api/link-memos/${params.linkId}/latest`,
      {
        params: {
          pageId: params.pageId,
          commandType: params.commandType,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    // 404 에러는 메모가 없는 것으로 처리 (백엔드에서 null 반환하는 경우와 동일하게 처리)
    // 백엔드 API가 없는 경우도 404로 처리
    if (error?.response?.status === 404) {
      console.log('링크 메모 API가 없거나 메모가 없습니다.');
      return {
        status: 200,
        message: '메모가 없습니다.',
        data: null,
      };
    }
    console.error('링크 메모 조회 실패:', error);
    throw error;
  }
}
