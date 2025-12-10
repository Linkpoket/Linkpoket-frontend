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
    // 404 에러는 백엔드 API가 없는 경우 (서버 재시작 필요)
    if (error?.response?.status === 404) {
      console.error(
        '❌ 메모 API가 존재하지 않습니다.\n' +
          '백엔드 서버가 새로운 Memo API를 인식하지 못하고 있습니다.\n' +
          '다음 명령어로 백엔드 서버를 재시작해주세요:\n' +
          'cd Linkrew-backEnd && ./gradlew clean build && docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file .env.local restart'
      );
    }
    console.error('메모 생성 실패:', error);
    throw error;
  }
}
