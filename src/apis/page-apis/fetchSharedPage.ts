import { axiosInstance } from '../axiosInstance';
import { PageData, PageParamsData } from '@/types/pages';
import { pageDataSchema } from '@/schemas/pages';

export async function fetchSharedPage(data: PageParamsData): Promise<PageData> {
  try {
    const response = await axiosInstance.get<PageData>(
      '/api/share-pages/main',
      {
        params: {
          pageId: data.pageId,
          commandType: 'VIEW',
        },
      }
    );

    const validation = pageDataSchema.safeParse(response.data);
    if (!validation.success) {
      console.error('공유 페이지 검증 실패:', validation.error);
      throw new Error('공유 페이지 검증 실패');
    }
    return validation.data as PageData;
  } catch (error) {
    console.error('공유 페이지 조회 실패:', error);
    throw error;
  }
}
