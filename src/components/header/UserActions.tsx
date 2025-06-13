import Bell from '@/assets/widget-ui-assets/Bell.svg?react';
import Menu from '@/assets/widget-ui-assets/Menu.svg?react';
import { useState } from 'react';
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

  const { mutate: patchShareInvitation } = usePatchShareInvitationStatus();
  const { mutate: patchDirectoryTransmission } =
    usePatchDirectoryTransmissionStatus();
  const { mutate: deleteDirectoryRequest } = useDeleteDirectoryRequest();

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
          setIsOpen={() => setIsAlarmOpen(!isAlarmOpen)}
          notifications={notifications}
          onAccept={(requestId, type) => {
            if (type === 'INVITE_PAGE')
              patchShareInvitation({
                requestId,
                requestStatus: 'ACCEPTED',
                notificationType: 'INVITE_PAGE',
              });
            else if (type === 'TRANSMIT_DIRECTORY')
              patchDirectoryTransmission({
                requestId,
                requestStatus: 'ACCEPTED',
                notificationType: 'TRANSMIT_DIRECTORY',
              });
          }}
          onReject={(requestId, type) => {
            if (type === 'INVITE_PAGE')
              patchShareInvitation({
                requestId,
                requestStatus: 'REJECTED',
                notificationType: 'INVITE_PAGE',
              });
            else if (type === 'TRANSMIT_DIRECTORY')
              patchDirectoryTransmission({
                requestId,
                requestStatus: 'REJECTED',
                notificationType: 'TRANSMIT_DIRECTORY',
              });
          }}
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
