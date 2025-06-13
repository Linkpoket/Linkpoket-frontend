import Bell from '@/assets/widget-ui-assets/Bell.svg?react';
import Menu from '@/assets/widget-ui-assets/Menu.svg?react';
import { useCallback, useState } from 'react';
import NotificationModal from '../modal/page/NotificationModal';
import ModalMenu from '../modal/page/ModalMenu';
import { useFetchNotifications } from '@/hooks/queries/useFetchNotification';
import { usePatchShareInvitationStatus } from '@/hooks/mutations/usePatchShareInvitationStatus';
import { usePatchDirectoryTransmissionStatus } from '@/hooks/mutations/usePatchDirectoryTransmissionStatus';
import { useDeleteDirectoryRequest } from '@/hooks/mutations/useDeleteDirectoryRequest';

export function UserActions() {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: notifications = [] } = useFetchNotifications();

  const { mutate: patchShareInvitation, isPending: isShareProcessing } =
    usePatchShareInvitationStatus();
  const { mutate: patchDirectoryTransmission, isPending: isProcessing } =
    usePatchDirectoryTransmissionStatus();
  const { mutate: deleteDirectoryRequest } = useDeleteDirectoryRequest();

  const handleStatusChange = useCallback(
    (
      requestId: number,
      requestStatus: 'ACCEPTED' | 'REJECTED',
      type: 'INVITE_PAGE' | 'TRANSMIT_DIRECTORY'
    ) => {
      if (type === 'INVITE_PAGE') {
        patchShareInvitation({
          requestId,
          requestStatus,
          notificationType: 'INVITE_PAGE',
        });
      } else if (type === 'TRANSMIT_DIRECTORY') {
        patchDirectoryTransmission({
          requestId,
          requestStatus,
          notificationType: 'TRANSMIT_DIRECTORY',
        });
      } else {
        console.warn('Unknown notification type:', type);
      }
    },
    [patchShareInvitation, patchDirectoryTransmission]
  );

  return (
    <div className="flex items-center">
      <button
        className={`hover:bg-gray-10 active:bg-gray-10 flex h-[38px] w-[38px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px] ${isAlarmOpen ? 'bg-gray-10 rounded-[8px]' : ''} `}
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(false);
          setIsAlarmOpen((prev) => !prev);
        }}
      >
        <Bell className="h-[20px] w-[20px]" />
      </button>
      {isAlarmOpen && (
        <NotificationModal
          isOpen={isAlarmOpen}
          setIsOpen={setIsAlarmOpen}
          notifications={notifications}
          isProcessing={isProcessing}
          isShareProcessing={isShareProcessing}
          onAccept={({ id, type }) => handleStatusChange(id, 'ACCEPTED', type)}
          onReject={({ id, type }) => handleStatusChange(id, 'REJECTED', type)}
          onDelete={(dispatchId) => deleteDirectoryRequest({ dispatchId })}
        />
      )}

      <button
        className={`hover:bg-gray-10 active:bg-gray-10 flex h-[38px] w-[38px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px] ${isMenuOpen ? 'bg-gray-10 rounded-[8px]' : ''} `}
        onClick={(e) => {
          e.stopPropagation();
          setIsAlarmOpen(false);
          setIsMenuOpen((prev) => !prev);
        }}
      >
        <Menu className="relative" />
      </button>

      {isMenuOpen && (
        <ModalMenu
          isHost={true}
          // isDarkMode={isDarkMode}
          // onToggleDarkMode={handleToggleDarkMode}
          setIsOpen={() => setIsMenuOpen(!isMenuOpen)}
          onWithDrawPage={() => console.log('탈퇴')}
          onContact={() => console.log('문의')}
        />
      )}
    </div>
  );
}
