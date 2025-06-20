import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';
import { forwardRef } from 'react';
import { useDeleteSharedPage } from '@/hooks/mutations/useDeleteSharedPage';
import { DeleteSharedPageData } from '@/types/pages';
import { useNavigate } from 'react-router-dom';
interface DeleteSharedPageModalProps {
  isOpen: boolean;
  pageId: number;
  onClose: () => void;
}

const DeleteSharedPageModal = forwardRef<
  HTMLDivElement,
  DeleteSharedPageModalProps
>(({ isOpen, onClose, pageId }, ref) => {
  const navigate = useNavigate();
  const { mutate: deleteSharedPage, isPending } = useDeleteSharedPage();

  const handleDelete = () => {
    const requestBody: DeleteSharedPageData = {
      baseRequest: {
        pageId,
        commandType: 'SHARED_PAGE_DELETION',
      },
    };

    deleteSharedPage(requestBody, {
      onSuccess: () => {
        onClose();
        navigate('/');
      },
      onError: (error) => {
        console.error('공유 페이지 삭제 실패:', error);
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
        <div className="flex items-center">
          <Status className="mr-[10px] py-[2.5px]" />
          공유 페이지 삭제
        </div>
        <p className="text-gray-90 pl-9 text-base font-normal">
          해당 공유 페이지를 삭제하면 복구할 수 없습니다. <br />
          정말 삭제하시겠습니까?
        </p>
      </Modal.Header>

      <Modal.Footer className="pt-0">
        <Modal.CancelButton />
        <Modal.ConfirmButton
          onClick={() => {
            handleDelete();
          }}
          disabled={isPending}
        >
          {isPending ? '삭제 중...' : '삭제'}
        </Modal.ConfirmButton>
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteSharedPageModal;
