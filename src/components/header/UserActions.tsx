import Bell from '@/assets/widget-ui-assets/Bell.svg?react';
import Menu from '@/assets/widget-ui-assets/Menu.svg?react';
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import HeaderMenu from './HeaderMenu';
import { useFetchNotifications } from '@/hooks/queries/useFetchNotification';
import { usePatchShareInvitationStatus } from '@/hooks/mutations/usePatchShareInvitationStatus';
import { usePatchDirectoryTransmissionStatus } from '@/hooks/mutations/usePatchDirectoryTransmissionStatus';
import { useDeleteDirectoryRequest } from '@/hooks/mutations/useDeleteDirectoryRequest';
import { useProfileModalStore } from '@/stores/profileModalStore';
import { useNotificationStore } from '@/stores/notification';
import { useDeleteInvitation } from '@/hooks/mutations/useDeleteInvitation';
import { NotificationModalSkeleton } from '../skeleton/NotificationModalSkeleton';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { useUserStore } from '@/stores/userStore';

const NotificationModal = lazy(() => import('../modal/page/NotificationModal'));

export function UserActions() {
  const [isAlarmOpen, setIsAlarmOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const { data: notifications = [], refetch } = useFetchNotifications();
  const { data: userInfo } = useUserInfo();
  const { openProfileModal } = useProfileModalStore();
  const { setUser, colorCode, nickname } = useUserStore();

  useEffect(() => {
    if (
      !JSON.parse(localStorage.getItem('user-store') || '{}').state?.colorCode
    ) {
      setUser(
        userInfo?.data?.nickName || '',
        userInfo?.data?.email || '',
        userInfo?.data?.colorCode || ''
      );
    } else {
      setUser(
        JSON.parse(localStorage.getItem('user-store') || '{}').state
          ?.nickname || '',
        JSON.parse(localStorage.getItem('user-store') || '{}').state?.email ||
          '',
        JSON.parse(localStorage.getItem('user-store') || '{}').state
          ?.colorCode || ''
      );
    }
  }, [userInfo, setUser]);

  const unreadCount = useNotificationStore((state) => state.unreadCount);

  const rawCount = Math.max(unreadCount, notifications.length);

  const displayCountText = useMemo(() => {
    return rawCount > 99 ? '99+' : String(rawCount);
  }, [rawCount]);

  const { mutate: patchShareInvitation, isPending: isShareProcessing } =
    usePatchShareInvitationStatus();
  const { mutate: patchDirectoryTransmission, isPending: isProcessing } =
    usePatchDirectoryTransmissionStatus();
  const { mutate: deleteDirectoryRequest } = useDeleteDirectoryRequest();
  const { mutate: deleteInvitation } = useDeleteInvitation();

  const handleAlarmClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsAlarmOpen((prev) => {
      if (prev) {
        // 이미 열려있으면 "그냥 닫기"만 한다 (다시 열지 않음)
        return false;
      }
      // 닫혀있을 때만 refetch 후 열기
      refetch();
      return true;
    });
  };

  const handleStatusChange = useCallback(
    (
      requestId: string,
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

  const handleDelete = useCallback(
    (dispatchId: string, type: 'INVITE_PAGE' | 'TRANSMIT_DIRECTORY') => {
      if (type === 'INVITE_PAGE') {
        deleteInvitation({ dispatchId });
      } else {
        deleteDirectoryRequest({ dispatchId });
      }
    },
    [deleteInvitation, deleteDirectoryRequest]
  );

  return (
    <>
      <div className="flex items-center gap-[8px]">
        {/* 알림 버튼 */}
        <button
          className={`hover:bg-gray-10 active:bg-gray-10 flex h-[32px] w-[32px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px] ${isAlarmOpen ? 'bg-gray-10 rounded-[8px]' : ''} `}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={handleAlarmClick}
          aria-label="알림 보기"
        >
          <div className="relative">
            <Bell className="h-[22px] w-[22px]" />
            {/* 하이브리드 카운트 사용 */}
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

        {isAlarmOpen && (
          <Suspense fallback={<NotificationModalSkeleton />}>
            <NotificationModal
              isOpen={isAlarmOpen}
              setIsOpen={setIsAlarmOpen}
              notifications={notifications}
              isProcessing={isProcessing}
              isShareProcessing={isShareProcessing}
              onAccept={({ id, type }) =>
                handleStatusChange(id, 'ACCEPTED', type)
              }
              onReject={({ id, type }) =>
                handleStatusChange(id, 'REJECTED', type)
              }
              onDelete={handleDelete}
            />
          </Suspense>
        )}

        {/* 프로필 버튼 */}
        <button
          className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px]"
          onClick={openProfileModal}
          aria-label="프로필 열기"
        >
          <div
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full"
            style={{ backgroundColor: colorCode }}
          >
            {nickname.charAt(0).toUpperCase()}
          </div>
        </button>

        {/* 메뉴 버튼 */}
        <button
          className={`hover:bg-gray-10 active:bg-gray-10 flex h-[32px] w-[32px] cursor-pointer items-center justify-center hover:rounded-[8px] active:rounded-[8px] ${isMenuOpen ? 'bg-gray-10 rounded-[8px]' : ''} `}
          onClick={(e) => {
            e.stopPropagation();
            setIsAlarmOpen(false);
            setIsMenuOpen((prev) => !prev);
          }}
          aria-label="메뉴 열기"
        >
          <Menu className="relative" />
        </button>

        {isMenuOpen && (
          <HeaderMenu
            isHost={true}
            setIsOpen={() => setIsMenuOpen(!isMenuOpen)}
            onWithDrawPage={() => console.log('탈퇴')}
            onContact={() => setIsContactOpen(!isContactOpen)}
            isContactOpen={isContactOpen}
          />
        )}
      </div>
    </>
  );
}
