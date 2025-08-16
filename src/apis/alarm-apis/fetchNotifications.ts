import { NotificationItem } from '@/types/modalAlarm';
import { axiosInstance } from '../axiosInstance';

export const fetchNotifications = async (): Promise<NotificationItem[]> => {
  const response = await axiosInstance.get('/api/dispatch/notifications');
  console.log('알림조회데이터:', response.data.data);
  const {
    SharePageInvitationRequests = [],
    DirectoryTransmissionRequests = [],
  } = response.data.data;

  const merged: NotificationItem[] = [
    ...SharePageInvitationRequests,
    ...DirectoryTransmissionRequests,
  ];

  return merged;
};
