import axios from 'axios';
import { NotificationItem } from '@/types/modalAlarm';

export const fetchNotifications = async (): Promise<NotificationItem[]> => {
  const response = await axios.get('/api/dispatch/notifications');
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
