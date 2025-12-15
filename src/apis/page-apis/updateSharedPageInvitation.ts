import { UpdateSharedPageInvitationData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export default async function updateSharedPageInvitation(
  data: UpdateSharedPageInvitationData
) {
  try {
    console.log('📤 공유 페이지 초대 요청 전송:', {
      url: '/api/dispatch/share-page-invitations',
      data,
    });

    const response = await axiosInstance.post(
      '/api/dispatch/share-page-invitations',
      data
    );

    console.log('✅ 공유 페이지 초대 요청 성공:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ 공유 페이지 초대 업데이트 실패:', {
      error,
      response: error?.response,
      status: error?.response?.status,
      data: error?.response?.data,
    });
    throw error;
  }
}
