import { axiosInstance } from '../axiosInstance';

export const patchShareInvitationStatus = async (data: {
  requestId: number;
  requestStatus: 'ACCEPTED' | 'REJECTED';
  notificationType: 'INVITE_PAGE';
}) => {
  const response = await axiosInstance.patch(
    '/api/dispatch/share-page-invitations/status',
    data
  );
  return response.data;
};
