export type NotificationType = 'INVITE_PAGE' | 'TRANSMIT_DIRECTORY';

export type NotificationRequestStatus = 'WAITING' | 'ACCEPTED' | 'REJECTED';

export interface SenderInfo {
  email: string;
  nickname: string;
  colorCode: string;
  sentAt: string;
}

export interface NotificationItem {
  id: string;
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
  isShareProcessing: boolean;
  onAccept?: (params: { id: string; type: NotificationType }) => void;
  onReject?: (params: { id: string; type: NotificationType }) => void;
  onDelete?: (
    dispatch: string,
    type: 'INVITE_PAGE' | 'TRANSMIT_DIRECTORY'
  ) => void;
}
