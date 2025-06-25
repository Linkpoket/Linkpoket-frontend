import { PatchSharedPageInvitationData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export default async function patchSharedPageInvitation(
  data: PatchSharedPageInvitationData
) {
  try {
    const response = await axiosInstance.patch(
      '/api/dispatch/share-page-invitations/status',
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error patching shared page invitation:', error);
    throw error;
  }
}
