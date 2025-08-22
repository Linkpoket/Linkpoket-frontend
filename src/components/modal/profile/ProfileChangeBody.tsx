import Modal from '@/components/common-ui/Modal';
import { useUserStore } from '@/stores/userStore';
import { useState } from 'react';
import ChevronLeft from '@/assets/common-ui-assets/ChevronLeft.svg?react';
import Check from '@/assets/common-ui-assets/Check.svg?react';
import { useUpdateProfileColor } from '@/hooks/mutations/useUpdateProfileColor';
import { COLOR_OPTIONS } from '@/styles/tokens';
import toast from 'react-hot-toast';

const ProfileChangeBody = ({ onBack }: { onBack: () => void }) => {
  const { nickname, colorCode } = useUserStore();
  const [profileColor, setProfileColor] = useState(colorCode || '');
  const { mutate: updateColor, isPending } = useUpdateProfileColor();

  const handleSaveAndBack = () => {
    if (profileColor !== colorCode) {
      updateColor(profileColor, {
        onSuccess: () => {
          toast.success('프로필 색상이 변경되었습니다.');
          onBack();
        },
        onError: (error) => {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('알 수 없는 오류가 발생했습니다.');
          }
        },
      });
    } else {
      onBack();
    }
  };

  return (
    <>
      <Modal.Header>
        <div className="relative flex">
          <button
            disabled={isPending}
            className={`hover:cursor-pointer ${
              isPending ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={handleSaveAndBack}
            aria-label="변경사항 저장하고 닫기"
          >
            <ChevronLeft />
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2">
            프로필 색상 변경
          </h1>
        </div>
      </Modal.Header>
      <Modal.Body hasFooter={false}>
        <div className="flex flex-col items-center">
          <div
            style={{ backgroundColor: profileColor }}
            className="flex h-[80px] w-[80px] items-center justify-center rounded-full text-[44px] text-white"
          >
            {nickname.charAt(0).toUpperCase()}
          </div>
          <div className="mt-6 grid grid-cols-5 gap-4">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color}
                disabled={isPending}
                className={`relative h-[55px] w-[55px] rounded-full ${
                  isPending ? 'cursor-not-allowed opacity-50' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setProfileColor(color)}
                type="button"
                aria-label={`색상 ${color} 선택`}
                aria-pressed={profileColor === color}
              >
                {profileColor === color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default ProfileChangeBody;
