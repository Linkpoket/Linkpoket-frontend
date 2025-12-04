import { UpdateSharedPageInvitationData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export default async function updateSharedPageInvitation(
  data: UpdateSharedPageInvitationData
) {
  try {
    const response = await axiosInstance.post(
      '/api/dispatch/share-page-invitations',
      data
    );
    return response.data;
  } catch (error) {
    console.error('공유 페이지 초대 업데이트 실패:', error);
    throw error;
  }
}
