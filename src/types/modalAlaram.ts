export interface NotificationItem {
  id: number;
  type: 'link' | 'edit';
  senderEmail?: string;
  receiverEmail?: string;
  directoryName?: string;
  dateTime: string;
  iconUrl?: string;
}

export interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
}
