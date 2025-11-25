import { lazy, Suspense } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useProfileModalStore } from '@/stores/profileModalStore';
import { ProfileSettingsModalSkeleton } from '../skeleton/ProfileSettingModal';
import { DeleteModalSkeleton } from '../skeleton/DeleteModalSkeleton';

const ProfileSettingsModal = lazy(
  () => import('../modal/profile/ProfileSettingsModal')
);
const WithdrawAccountModal = lazy(
  () => import('../modal/profile/WithdrawAccountModal')
);

/*
프로필 버튼 컴포넌트
프로필 표시 및 프로필 관련 모달 관리만을 위해 분리 
 */
export const ProfileButton = () => {
  const { colorCode, nickname } = useUserStore();
  const {
    openProfileModal,
    isProfileModalOpen,
    isWithdrawModalOpen,
    closeProfileModal,
    closeWithdrawModal,
  } = useProfileModalStore();

  return (
    <>
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

      {isProfileModalOpen && (
        <Suspense fallback={<ProfileSettingsModalSkeleton />}>
          <ProfileSettingsModal
            isOpen={isProfileModalOpen}
            onClose={closeProfileModal}
          />
        </Suspense>
      )}

      {isWithdrawModalOpen && (
        <Suspense fallback={<DeleteModalSkeleton />}>
          <WithdrawAccountModal
            isOpen={isWithdrawModalOpen}
            onClose={closeWithdrawModal}
          />
        </Suspense>
      )}
    </>
  );
};
