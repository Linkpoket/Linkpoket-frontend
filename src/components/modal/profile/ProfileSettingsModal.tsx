import { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useProfileModalStore } from '@/stores/profileModalStore';
import { useLogoutMutation } from '@/hooks/mutations/auth/useLogoutMutation';
import { useUpdateProfileNickname } from '@/hooks/mutations/useUpdateProfileNickname';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { Input } from '@/components/common-ui/Input';
import Modal from '@/components/common-ui/Modal';
import ChevronRight from '@/assets/common-ui-assets/ChevronRight.svg?react';
import ProfileChangeBody from './ProfileChangeBody';
import { Button } from '@/components/common-ui/button';

export const ProfileSettingsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { nickname, email, colorCode } = useUserStore();

  const { mutate: logout } = useLogoutMutation();
  const { mutate: patchNickname, isPending } = useUpdateProfileNickname();
  const { openWithdrawModal } = useProfileModalStore();

  const [inputValue, setInputValue] = useState(nickname || '');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const trimmedInput = inputValue.trim();
  const isNicknameInvalid = trimmedInput === '' || trimmedInput.length > 20;
  const isNicknameUnchanged = trimmedInput === nickname.trim();

  const openWithdrawAndClose = () => {
    onClose();
    openWithdrawModal();
  };

  const profileActions = [
    {
      title: '로그아웃',
      subscription: '해당 기기에서 로그아웃합니다.',
      icon: <ChevronRight />,
      fn: () => logout(),
    },
    {
      title: '회원탈퇴',
      subscription: '계정을 영구적으로 삭제합니다.',
      icon: <ChevronRight />,
      fn: openWithdrawAndClose,
    },
  ];

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[calc(100vw-32px)] max-w-[500px] md:w-[500px]"
    >
      {isEditingProfile ? (
        <ProfileChangeBody onBack={() => setIsEditingProfile(false)} />
      ) : (
        <>
          <Modal.Header showCloseButton>프로필</Modal.Header>
          <Modal.Body hasFooter={false}>
            <div className="mb-4 flex flex-col gap-[12px] sm:flex-row">
              <div className="flex flex-col items-center">
                <div
                  style={{ backgroundColor: colorCode }}
                  className="flex h-[50px] w-[50px] items-center justify-center rounded-full p-[8px]"
                >
                  {nickname.charAt(0).toUpperCase()}
                </div>
                <button
                  className="text-gray-50 hover:cursor-pointer"
                  onClick={() => setIsEditingProfile(true)}
                >
                  변경
                </button>
              </div>
              <div className="flex w-full flex-col">
                <div className="flex flex-col flex-wrap items-start gap-2 sm:flex-row sm:items-center">
                  <Input
                    className="w-full sm:w-auto md:w-[295px]"
                    placeholder="닉네임을 입력해 주세요"
                    value={inputValue}
                    onChange={handleChange}
                    variant={isNicknameInvalid ? 'error' : 'default'}
                    isModal
                  />
                  <Button
                    className="w-full sm:w-auto"
                    disabled={
                      isPending || isNicknameInvalid || isNicknameUnchanged
                    }
                    onClick={() => {
                      const trimmed = inputValue.trim();
                      if (trimmed === '' || trimmed.length > 20) return;
                      patchNickname(trimmed);
                    }}
                  >
                    {isPending ? '변경 중...' : '변경'}
                  </Button>
                </div>
                {isNicknameInvalid && (
                  <p className="text-status-danger mt-1 text-sm">
                    닉네임은 1자 이상 20자 이하로 입력해주세요.
                  </p>
                )}
                <p className="text-[16px] font-[400] text-gray-50">{email}</p>
              </div>
            </div>

            <div className="space-y-2">
              {profileActions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center hover:cursor-pointer"
                  onClick={item.fn}
                >
                  <div className="flex w-full flex-col">
                    <span
                      className={`text-gray-90 text-lg font-bold ${idx !== 0 && 'text-status-danger'}`}
                    >
                      {item.title}
                    </span>
                    <span className="text-gray-70">{item.subscription}</span>
                  </div>
                  {item.icon}
                </div>
              ))}
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default ProfileSettingsModal;
