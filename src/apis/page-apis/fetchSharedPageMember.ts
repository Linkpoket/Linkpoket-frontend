import { axiosInstance } from '../axiosInstance';
import { PageParamsData } from '@/types/pages';
import { SharedPageMemberList } from '@/types/members';

export async function fetchSharedPageMember(
  data: PageParamsData
): Promise<SharedPageMemberList> {
  try {
    const response = await axiosInstance.get<SharedPageMemberList>(
      '/api/share-pages/members',
      {
        params: {
          pageId: data.pageId,
          commandType: 'VIEW',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('공유 페이지 멤버 조회 실패:', error);
    throw error;
  }
}
