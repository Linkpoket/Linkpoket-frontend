export type NotificationType = 'INVITE_PAGE' | 'TRANSMIT_DIRECTORY';

export type NotificationRequestStatus = 'WAITING' | 'ACCEPTED' | 'REJECTED';

export interface SenderInfo {
  email: string;
  nickname: string;
  colorCode: string;
  sentAt: string;
}

export interface NotificationItem {
  dispatchRequestId: string;
  senderInfo: SenderInfo;
  requestStatus: NotificationRequestStatus;
  notificationType: NotificationType;
  message: string;
}

export interface NotificationsResponse {
  status: number;
  message: string;
  data: {
    SharePageInvitationRequests: NotificationItem[];
    FolderTransmissionRequests: NotificationItem[];
  };
}

export interface NotificationModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: NotificationItem[];
  isProcessing: boolean;
  isShareProcessing: boolean;
  onAccept?: (params: {
    dispatchRequestId: string;
    type: NotificationType;
  }) => void;
  onReject?: (params: {
    dispatchRequestId: string;
    type: NotificationType;
  }) => void;
  onDelete?: (dispatchRequestId: string, type: NotificationType) => void;
}
