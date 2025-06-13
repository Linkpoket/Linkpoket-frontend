export type NotificationType = 'INVITE_PAGE' | 'TRANSMIT_DIRECTORY';

export type NotificationRequestStatus = 'WAITING' | 'ACCEPTED' | 'REJECTED';

export interface SenderInfo {
  email: string;
  nickname: string;
  colorCode: string;
  sentAt: string;
}

export interface NotificationItem {
  id: number;
  senderInfo: SenderInfo;
  requestStatus: NotificationRequestStatus;
  notificationType: NotificationType;
  message: string;
}

export interface NotificationModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: NotificationItem[];
  isProcessing: boolean;
  onAccept?: (params: { id: number; type: NotificationType }) => void;
  onReject?: (params: { id: number; type: NotificationType }) => void;
  onDelete?: (id: number) => void;
}
