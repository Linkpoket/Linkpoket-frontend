import { axiosInstance } from '../axiosInstance';
import { FetchJoinedPageResponseData } from '@/types/pages';

export async function fetchJoinedPage(): Promise<FetchJoinedPageResponseData> {
  try {
    const response = await axiosInstance.get<FetchJoinedPageResponseData>(
      '/api/personal-pages/overview'
    );
    return response.data;
  } catch (error) {
    console.error('참여 페이지 조회 실패:', error);
    throw error;
  }
}
