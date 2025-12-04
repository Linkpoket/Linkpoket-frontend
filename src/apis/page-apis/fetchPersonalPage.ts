import { axiosInstance } from '../axiosInstance';
import { PageData } from '@/types/pages';
import { pageDataSchema } from '@/schemas/pages';

export async function fetchPersonalPage(): Promise<PageData> {
  try {
    const response = await axiosInstance.get<PageData>(
      '/api/personal-pages/main'
    );

    const validation = pageDataSchema.safeParse(response.data);
    if (!validation.success) {
      console.error('개인 페이지 검증 실패:', validation.error);
      throw new Error('개인 페이지 검증 실패');
    }
    return validation.data as PageData;
  } catch (error) {
    console.error('개인 페이지 조회 실패:', error);
    throw error;
  }
}
