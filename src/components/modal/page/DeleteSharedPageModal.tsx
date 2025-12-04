import Modal from '@/components/common-ui/Modal';
import Status from '@/assets/common-ui-assets/Status.svg?react';
import { forwardRef } from 'react';
import { useDeleteSharedPage } from '@/hooks/mutations/useDeleteSharedPage';
import { DeleteSharedPageData } from '@/types/pages';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
interface DeleteSharedPageModalProps {
  isOpen: boolean;
  pageId: string;
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
        toast.success('공유 페이지 삭제 완료');
      },
      onError: (error) => {
        console.error('공유 페이지 삭제 실패:', error);
        toast.error(
          error instanceof Error ? error.message : '공유 페이지 삭제 실패'
        );
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
      <Modal.Header>
        <div className="flex items-center space-x-[10px]">
          <Status />
          <span>공유 페이지 삭제</span>
        </div>
        <p className="text-gray-90 mt-2 ml-9 text-base font-normal">
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
