import { useState } from 'react';
import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';
import { useDeleteAccountMutation } from '@/hooks/mutations/auth/useDeleteAccountMutation';

const WithdrawAccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate: deleteAccount } = useDeleteAccountMutation({
    onMutate: () => setIsDeleting(true),
    onSettled: () => setIsDeleting(false),
  });

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="p-4 md:max-w-[544px]"
      data-ignore-outside-click
    >
      <Modal.Header className="border-none text-[22px] font-bold">
        <div className="flex items-center">
          <Status className="mr-[10px] py-[2.5px]" />
          회원 탈퇴
        </div>
        <p className="text-gray-90 pl-9 text-base font-normal">
          탈퇴 시 모든 데이터가 삭제되며, 복구가 불가능합니다.
          <br />
          정말 탈퇴하시겠습니까?
        </p>
      </Modal.Header>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton disabled={isDeleting} />
        <Modal.ConfirmButton
          onClick={() => deleteAccount()}
          variant="primary"
          disabled={isDeleting}
        >
          {isDeleting ? '처리중...' : '탈퇴'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
};

export default WithdrawAccountModal;
