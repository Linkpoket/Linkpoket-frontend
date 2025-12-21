import { useState } from 'react';
import Modal from '@/components/common-ui/Modal';
import { Button } from '@/components/common-ui/button';
import useUpdateSharedPageInvitation from '@/hooks/mutations/updateSharedPageInvitation';
import { UpdateSharedPageInvitationData } from '@/types/pages';
import toast from 'react-hot-toast';

interface EmailInputWithRoleProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  role: string;
  onRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

//Input과 PageSortedBox를 합칠 수 없어 개별적으로 컴포넌트 임시제작
const EmailInputWithRole = ({
  email,
  onEmailChange,
  role,
  onRoleChange,
  className,
}: EmailInputWithRoleProps) => {
  return (
    <div className={`relative ${className}`}>
      <input
        id="invite-email"
        value={email}
        onChange={onEmailChange}
        placeholder="초대할 사용자의 이메일을 입력해 주세요"
        className="border-gray-30 focus:border-primary-40 focus:ring-primary-30 w-full rounded-lg border bg-white px-4 py-3 pr-[100px] text-[16px] font-medium transition-all focus:ring-2 focus:outline-none"
      />
      <div className="absolute top-1/2 right-1 -translate-y-1/2">
        <select
          id="user-role"
          value={role}
          onChange={onRoleChange}
          className="border-gray-5 text-gray-60 bg-gray-5 h-[42px] w-[87px] rounded-lg border px-3 text-[14px] font-[600] focus:outline-none"
        >
          <option value="VIEWER">뷰어</option>
          <option value="EDITOR">에디터</option>
          <option value="HOST">호스트</option>
        </select>
      </div>
    </div>
  );
};

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageId: string;
}

const InviteUserModal = ({ isOpen, onClose, pageId }: InviteUserModalProps) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('VIEWER');
  const [buttonStatus, setButtonStatus] = useState<'초대' | '완료'>('초대');

  const updateSharedPageInvitation = useUpdateSharedPageInvitation({
    pageId,
    onSuccess: () => {
      toast.success('초대 요청이 완료되었습니다.');
      setEmail('');
      setRole('VIEWER');
      setButtonStatus('초대');
      onClose();
    },
    onError: (error: any) => {
      // 에러 메시지 추출
      const errorMessage =
        error?.response?.data?.message ||
        error?.errorData?.detail ||
        error?.errorData?.title ||
        error?.message ||
        '초대 요청이 실패했습니다.';

      console.error('공유 페이지 초대 에러:', error);
      toast.error(errorMessage);
      setButtonStatus('초대'); // 에러 발생 시 버튼 상태 리셋
    },
  });

  const handleInvite = () => {
    if (!email.trim()) {
      toast.error('이메일을 입력해주세요.');
      return;
    }

    // 이메일 형식 간단 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    const requestBody: UpdateSharedPageInvitationData = {
      baseRequest: {
        pageId,
        commandType: 'SHARED_PAGE_INVITATION',
      },
      receiverEmail: email.trim(),
      permissionType: role,
    };

    updateSharedPageInvitation.mutate(requestBody);
    setButtonStatus('완료');
  };

  // 모달이 닫힐 때 상태 초기화
  const handleClose = () => {
    setEmail('');
    setRole('VIEWER');
    setButtonStatus('초대');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="p-[24px]">
      <Modal.Header>멤버 초대</Modal.Header>
      <div>
        <div className="flex items-center gap-4">
          <EmailInputWithRole
            email={email}
            onEmailChange={(e) => setEmail(e.target.value)}
            role={role}
            onRoleChange={(e) => setRole(e.target.value)}
            className="flex-1"
          />
          <Button
            size="sm"
            variant="primary"
            className="h-[44px] w-[64px] text-[17px] font-bold"
            onClick={handleInvite}
            disabled={
              buttonStatus === '완료' || updateSharedPageInvitation.isPending
            }
          >
            {buttonStatus}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InviteUserModal;
