import { axiosInstance } from '../axiosInstance';
import { BookmarkResponse } from '@/types/pages';

export async function fetchFavorite(): Promise<BookmarkResponse> {
  try {
    const response = await axiosInstance.get('/api/favorite');
    return response.data;
  } catch (error) {
    console.error('즐겨찾기 조회 실패:', error);
    throw error;
  }
}
