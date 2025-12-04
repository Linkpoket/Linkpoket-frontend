import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import Bell from '@/assets/widget-ui-assets/Bell.svg?react';
import { useFetchNotifications } from '@/hooks/queries/useFetchNotification';
import { useNotificationStore } from '@/stores/notification';
import { usePatchShareInvitationStatus } from '@/hooks/mutations/usePatchShareInvitationStatus';
import { usePatchDirectoryTransmissionStatus } from '@/hooks/mutations/usePatchDirectoryTransmissionStatus';
import { useDeleteDirectoryRequest } from '@/hooks/mutations/useDeleteDirectoryRequest';
import { useDeleteInvitation } from '@/hooks/mutations/useDeleteInvitation';
import { NotificationModalSkeleton } from '../skeleton/NotificationModalSkeleton';

const NotificationModal = lazy(() => import('../modal/page/NotificationModal'));

/* 
알림 컴포넌트
알림 표시 및 관리만을 위해 분리 
*/

export const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notifications = [], refetch } = useFetchNotifications();
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  const { mutate: patchShareInvitation, isPending: isShareProcessing } =
    usePatchShareInvitationStatus();
  const { mutate: patchDirectoryTransmission, isPending: isProcessing } =
    usePatchDirectoryTransmissionStatus();
  const { mutate: deleteDirectoryRequest } = useDeleteDirectoryRequest();
  const { mutate: deleteInvitation } = useDeleteInvitation();

  const rawCount = Math.max(unreadCount, notifications.length);
  const displayCountText = useMemo(
    () => (rawCount > 99 ? '99+' : String(rawCount)),
    [rawCount]
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => {
      if (prev) {
        return false;
      }
      refetch();
      return true;
    });
  };

  const handleStatusChange = useCallback(
    (
      dispatchRequestId: string,
      requestStatus: 'ACCEPTED' | 'REJECTED',
      type: 'INVITE_PAGE' | 'TRANSMIT_DIRECTORY'
    ) => {
      if (type === 'INVITE_PAGE') {
        patchShareInvitation({
          dispatchRequestId,
          requestStatus,
          notificationType: 'INVITE_PAGE',
        });
      } else if (type === 'TRANSMIT_DIRECTORY') {
        patchDirectoryTransmission({
          dispatchRequestId,
          requestStatus,
          notificationType: 'TRANSMIT_DIRECTORY',
        });
      } else {
        console.warn('Unknown notification type:', type);
      }
    },
    [patchShareInvitation, patchDirectoryTransmission]
  );

  const handleDelete = useCallback(
    (dispatchRequestId: string, type: 'INVITE_PAGE' | 'TRANSMIT_DIRECTORY') => {
      if (type === 'INVITE_PAGE') {
        deleteInvitation({ dispatchRequestId });
      } else {
        deleteDirectoryRequest({ dispatchRequestId });
      }
    },
    [deleteInvitation, deleteDirectoryRequest]
  );

  return (
    <>
      <button
        className={`hover:bg-gray-10 active:bg-gray-10 flex h-[32px] w-[32px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px] ${isOpen ? 'bg-gray-10 rounded-[8px]' : ''}`}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={handleClick}
        aria-label="알림 보기"
      >
        <div className="relative">
          <Bell className="h-[22px] w-[22px]" />
          {rawCount > 0 && (
            <span
              className="bg-status-danger absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-[4px] text-xs leading-none text-white"
              aria-label={`안읽은 알림 ${displayCountText}`}
            >
              {displayCountText}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <Suspense fallback={<NotificationModalSkeleton />}>
          <NotificationModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            notifications={notifications}
            isProcessing={isProcessing}
            isShareProcessing={isShareProcessing}
            onAccept={({ dispatchRequestId, type }) =>
              handleStatusChange(dispatchRequestId, 'ACCEPTED', type)
            }
            onReject={({ dispatchRequestId, type }) =>
              handleStatusChange(dispatchRequestId, 'REJECTED', type)
            }
            onDelete={handleDelete}
          />
        </Suspense>
      )}
    </>
  );
};
