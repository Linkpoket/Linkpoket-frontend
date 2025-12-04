import { NotificationItem, NotificationsResponse } from '@/types/modalAlarm';
import { axiosInstance } from '../axiosInstance';

export const fetchNotifications = async (): Promise<NotificationItem[]> => {
  const response = await axiosInstance.get<NotificationsResponse>(
    '/api/dispatch/notifications'
  );
  const { SharePageInvitationRequests = [], FolderTransmissionRequests = [] } =
    response.data.data;

  const merged: NotificationItem[] = [
    ...SharePageInvitationRequests,
    ...FolderTransmissionRequests,
  ];

  return merged;
};
