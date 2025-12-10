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
    // 404 에러는 메모가 없는 것으로 처리 (백엔드에서 null 반환하는 경우와 동일하게 처리)
    // 백엔드 API가 없는 경우도 404로 처리
    if (error?.response?.status === 404) {
      // 백엔드 서버가 새로운 API를 인식하지 못하는 경우 (서버 재시작 필요)
      // 하지만 조회는 메모가 없는 것으로 처리하여 UI가 깨지지 않도록 함
      console.warn(
        '⚠️ 메모 API 응답 404:\n' +
          '메모가 없거나 백엔드 서버가 새로운 Memo API를 인식하지 못하고 있습니다.\n' +
          '서버를 재시작하려면: cd Linkrew-backEnd && ./gradlew clean build && docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file .env.local restart'
      );
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
