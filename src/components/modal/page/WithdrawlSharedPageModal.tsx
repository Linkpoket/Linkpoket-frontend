import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';
import { forwardRef } from 'react';
import { useWithdrawSharedPage } from '@/hooks/mutations/useWithdrawSharedPage';
import { DeleteSharedPageData } from '@/types/pages';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
interface WithdrawSharedPageModalProps {
  isOpen: boolean;
  pageId: string;
  onClose: () => void;
}

const WithdrawSharedPageModal = forwardRef<
  HTMLDivElement,
  WithdrawSharedPageModalProps
>(({ isOpen, onClose, pageId }, ref) => {
  const navigate = useNavigate();
  const { mutate: withdrawSharedPage, isPending } = useWithdrawSharedPage();

  const handleWithdraw = () => {
    const requestBody: DeleteSharedPageData = {
      baseRequest: {
        pageId,
        commandType: 'SHARED_PAGE_LEAVE',
      },
    };

    withdrawSharedPage(requestBody, {
      onSuccess: () => {
        onClose();
        navigate('/');
        toast.success('공유 페이지 탈퇴 완료');
      },
      onError: (error) => {
        toast.error('공유 페이지 탈퇴 실패');
        throw error;
      },
    });
  };

  return (
    <Modal
      ref={ref}
      isOpen={isOpen}
      onClose={onClose}
      className="p-4 md:max-w-[544px]"
    >
      <Modal.Header className="border-none text-[22px] font-bold">
        <div className="flex items-center space-x-[10px]">
          <Status />
          <span>공유 페이지 탈퇴</span>
        </div>
        <p className="text-gray-90 mt-2 ml-9 text-base font-normal">
          탈퇴하면 해당 공유 페이지에 더 이상 접근할 수 없습니다
          <br />
          공유 페이지에서 정말 탈퇴하시겠습니까?
        </p>
      </Modal.Header>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton />
        <Modal.ConfirmButton
          onClick={() => {
            handleWithdraw();
          }}
          disabled={isPending}
        >
          {isPending ? '탈퇴 중...' : '탈퇴'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
});

export default WithdrawSharedPageModal;
