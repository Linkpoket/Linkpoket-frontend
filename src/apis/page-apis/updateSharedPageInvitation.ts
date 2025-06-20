import { UpdateSharedPageInvitationData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export default async function updateSharedPageInvitation(
  data: UpdateSharedPageInvitationData
) {
  try {
    const response = await axiosInstance.post(
      '/api/page/updateSharedPageInvitation',
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error updating shared page invitation:', error);
    throw error;
  }
}
